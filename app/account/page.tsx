import { auth, signIn, signOut } from "@/auth";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Account", description: "Account access for saved Lois Letters resources." };

export default async function AccountPage() {
  const configured = Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);
  const session = configured ? await auth() : null;
  return <section className="site-section account-section"><div className="container"><div className="account-card"><span className="section-sub-title">Lois Letters account</span><h1>Keep your learning resources close</h1>
    {!configured ? <><p>Account sign-in is not enabled yet. Add Google OAuth credentials and an Auth secret to the deployment environment to enable it.</p><p>Until then, saved packs and contribution drafts stay only in this browser. They are not sent to a server.</p></> : session?.user ? <><p>You are signed in as {session.user.name ?? session.user.email}. Saved packs and contribution drafts remain stored on this device.</p><form action={async () => { "use server"; await signOut({ redirectTo: "/account" }); }}><button className="btn btn-primary btn-pill" type="submit">Sign out</button></form></> : <><p>Sign in to identify your account on this device. Your drafts are still stored locally in this browser.</p><form action={async () => { "use server"; await signIn("google", { redirectTo: "/saved" }); }}><button className="btn btn-primary btn-pill" type="submit">Continue with Google</button></form></>}
  </div></div></section>;
}
