import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json() as { token?: string; version?: "v2" | "v3" };
    if (!body.token || !["v2", "v3"].includes(body.version ?? "")) return NextResponse.json({ success: false }, { status: 400 });
    const secret = body.version === "v2" ? process.env.RECAPTCHA_V2_SECRET_KEY : process.env.RECAPTCHA_V3_SECRET_KEY;
    if (!secret) return NextResponse.json({ success: false, error: "Captcha verification is not configured." }, { status: 503 });
    const form = new URLSearchParams({ secret, response: body.token });
    const verification = await fetch("https://www.google.com/recaptcha/api/siteverify", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: form, cache: "no-store" });
    if (!verification.ok) return NextResponse.json({ success: false }, { status: 502 });
    const result = await verification.json() as { success?: boolean; score?: number; action?: string };
    const passed = result.success === true && (body.version === "v2" || (result.action === "contribute" && (result.score ?? 0) >= 0.5));
    return NextResponse.json({ success: passed }, { status: passed ? 200 : 400 });
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
