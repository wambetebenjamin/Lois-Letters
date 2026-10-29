"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
      render: (container: HTMLElement, options: { sitekey: string; callback: (token: string) => void; "expired-callback": () => void; "error-callback": () => void }) => number;
      reset: (widgetId?: number) => void;
    };
  }
}

const v3Key = process.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY;
const v2Key = process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY;

async function verify(token: string, version: "v2" | "v3") {
  const response = await fetch("/api/recaptcha", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token, version }) });
  return response.ok;
}

export default function CaptchaControl({ onVerified }: { onVerified: (verified: boolean) => void }) {
  const [fallback, setFallback] = useState(!v3Key && Boolean(v2Key));
  const [working, setWorking] = useState(false);
  const [message, setMessage] = useState("");
  const v2Container = useRef<HTMLDivElement>(null);
  const widget = useRef<number | null>(null);
  const localOnly = !v3Key && !v2Key;

  useEffect(() => {
    if (!fallback || !v2Key || !v2Container.current) return;
    const target = v2Container.current;
    const render = () => {
      if (widget.current !== null || !window.grecaptcha || !target) return;
      widget.current = window.grecaptcha.render(target, {
        sitekey: v2Key,
        callback: async (token) => {
          setWorking(true);
          try { const passed = await verify(token, "v2"); onVerified(passed); setMessage(passed ? "Verification complete." : "Verification could not be confirmed. Try again."); }
          catch { onVerified(false); setMessage("Verification is unavailable right now."); }
          finally { setWorking(false); }
        },
        "expired-callback": () => { onVerified(false); setMessage("The verification expired. Please try again."); },
        "error-callback": () => { onVerified(false); setMessage("The verification service is unavailable."); },
      });
    };
    if (window.grecaptcha?.render) { window.grecaptcha.ready(render); return; }
    const existing = document.getElementById("lois-recaptcha-script") as HTMLScriptElement | null;
    if (existing) { existing.addEventListener("load", render, { once: true }); return; }
    const script = document.createElement("script");
    script.id = "lois-recaptcha-script";
    script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = () => window.grecaptcha?.ready(render);
    script.onerror = () => setMessage("The verification service could not load.");
    document.head.appendChild(script);
  }, [fallback, onVerified]);

  const runV3 = async () => {
    setWorking(true);
    setMessage("Checking this request…");
    try {
      if (!window.grecaptcha) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = `https://www.google.com/recaptcha/api.js?render=${v3Key}`;
          script.async = true;
          script.defer = true;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("script"));
          document.head.appendChild(script);
        });
      }
      if (!window.grecaptcha || !v3Key) throw new Error("captcha");
      const token = await new Promise<string>((resolve, reject) => window.grecaptcha!.ready(() => window.grecaptcha!.execute(v3Key, { action: "contribute" }).then(resolve, reject)));
      const passed = await verify(token, "v3");
      onVerified(passed);
      if (!passed) throw new Error("verify");
      setMessage("Verification complete.");
    } catch {
      onVerified(false);
      if (v2Key) { setFallback(true); setMessage("Please complete the checkbox verification below."); }
      else setMessage("Automated verification is unavailable. Contact the site owner to configure a v2 fallback key.");
    } finally { setWorking(false); }
  };

  if (localOnly) return <label className="captcha-fallback"><input type="checkbox" onChange={(event) => onVerified(event.target.checked)} /> <span>This draft is mine. I understand it stays in this browser.</span></label>;
  return <div className="captcha-panel"><p className="small">This check helps protect contribution forms.</p>{v3Key && !fallback && <button type="button" className="captcha-check" onClick={runV3} disabled={working}>{working ? "Checking…" : "Verify before saving"}</button>}{fallback && v2Key && <div ref={v2Container} className="captcha-widget" aria-label="Google reCAPTCHA checkbox" />}{message && <p className="small" role="status">{message}</p>}</div>;
}
