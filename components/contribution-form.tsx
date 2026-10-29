"use client";

import { useState, type FormEvent } from "react";
import CaptchaControl from "@/components/captcha-control";

const STORE = "lois-letters-my-contributions";

export default function ContributionForm() {
  const [sent, setSent] = useState(false);
  const [captcha, setCaptcha] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!captcha) return;
    const data = new FormData(event.currentTarget);
    const entry = { id: crypto.randomUUID(), name: String(data.get("name")), email: String(data.get("email")), language: String(data.get("language")), idea: String(data.get("idea")), createdAt: new Date().toISOString() };
    const existing = JSON.parse(localStorage.getItem(STORE) || "[]");
    localStorage.setItem(STORE, JSON.stringify([entry, ...existing]));
    setSent(true);
    event.currentTarget.reset();
    setCaptcha(false);
  };
  if (sent) return <div className="form-confirmation" role="status"><h2>Saved on this device</h2><p>Your idea is in your local contribution list. It has not been sent to the Lois Letters team. For now, use Contact to share it with us directly.</p><div className="form-actions"><a className="btn btn-primary btn-pill" href="/my-contributions">View my contributions</a><button className="btn btn-white btn-pill" type="button" onClick={() => setSent(false)}>Add another idea</button></div></div>;
  return <form className="contribution-form" onSubmit={submit}>
    <div className="form-group"><label htmlFor="contrib-name">Your name</label><input className="form-control" id="contrib-name" name="name" autoComplete="name" required maxLength={100} /></div>
    <div className="form-group"><label htmlFor="contrib-email">Email address</label><input className="form-control" id="contrib-email" name="email" type="email" autoComplete="email" required maxLength={200} /></div>
    <div className="form-group"><label htmlFor="contrib-language">Language or script</label><input className="form-control" id="contrib-language" name="language" required maxLength={100} placeholder="For example, Kiswahili or Ajami" /></div>
    <div className="form-group"><label htmlFor="contrib-idea">What would you like to share?</label><textarea className="form-control contribution-textarea" id="contrib-idea" name="idea" required minLength={15} maxLength={2000} placeholder="Tell us about a story, word list or teaching note that could help learners." /></div>
    <CaptchaControl onVerified={setCaptcha} />
    <p className="small form-privacy">This draft stays on your device only. It is not sent to the Lois Letters team.</p>
    <button className="btn btn-primary btn-pill" type="submit" disabled={!captcha}>Save contribution draft</button>
  </form>;
}
