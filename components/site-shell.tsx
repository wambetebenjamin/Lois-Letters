"use client";

import Link from "next/link";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export type Locale = "en" | "sw" | "fr";
const LocaleContext = createContext<{ locale: Locale; setLocale: (locale: Locale) => void }>({ locale: "en", setLocale: () => {} });
export const useLocale = () => useContext(LocaleContext);

const navCopy: Record<Locale, { packs: string; decodables: string; audio: string; scripts: string; teachers: string; families: string; contribute: string; saved: string; contact: string; menu: string }> = {
  en: { packs: "Packs", decodables: "Decodables", audio: "Audio", scripts: "Scripts", teachers: "For teachers", families: "For families", contribute: "Contribute", saved: "Saved packs", contact: "Get in touch", menu: "Open menu" },
  sw: { packs: "Vifurushi", decodables: "Hadithi rahisi", audio: "Sauti", scripts: "Hati", teachers: "Walimu", families: "Familia", contribute: "Changia", saved: "Vilivyohifadhiwa", contact: "Wasiliana nasi", menu: "Fungua menyu" },
  fr: { packs: "Ressources", decodables: "Textes à décoder", audio: "Audio", scripts: "Écritures", teachers: "Enseignants", families: "Familles", contribute: "Contribuer", saved: "Ressources enregistrées", contact: "Nous contacter", menu: "Ouvrir le menu" },
};
const routes = [["/packs", "packs"], ["/decodables", "decodables"], ["/audio", "audio"], ["/scripts", "scripts"], ["/teachers", "teachers"], ["/families", "families"], ["/contribute", "contribute"]] as const;

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cookieVisible, setCookieVisible] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const pathname = usePathname();
  const labels = navCopy[locale];

  useEffect(() => {
    setSpeechSupported("speechSynthesis" in window);
    const stored = localStorage.getItem("lois-letters-locale");
    if (stored === "sw" || stored === "fr" || stored === "en") setLocaleState(stored);
    if (!document.cookie.split(";").some((cookie) => cookie.trim().startsWith("lois-letters-cookie-consent="))) setCookieVisible(true);
  }, []);
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    localStorage.setItem("lois-letters-locale", nextLocale);
    document.documentElement.lang = nextLocale;
  };
  const acceptCookies = () => {
    document.cookie = "lois-letters-cookie-consent=accepted; max-age=31536000; path=/; SameSite=Lax";
    setCookieVisible(false);
  };
  const speakTour = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) { setTourOpen(true); return; }
    if (tourOpen) { window.speechSynthesis.cancel(); setTourOpen(false); return; }
    window.speechSynthesis.cancel();
    const message = new SpeechSynthesisUtterance("Welcome to Lois Letters. Explore printable literacy packs, simple decodable stories, and audio supports for learning in the language you know best.");
    message.lang = "en-KE";
    message.rate = 0.95;
    message.pitch = 1.1;
    window.speechSynthesis.speak(message);
    setTourOpen(true);
  };

  return <LocaleContext.Provider value={{ locale, setLocale }}>
    <div className="site-wrap">
      <header className="site-navbar py-3 js-sticky-header site-navbar-target" role="banner">
        <div className="container-fluid"><div className="d-flex align-items-center">
          <div className="site-logo mr-auto"><Link href="/" aria-label="Lois Letters home"><span className="wordmark">Lois <b>Letters</b></span></Link></div>
          <nav className="site-navigation position-relative text-center d-none d-lg-block" aria-label="Main navigation">
            <ul className="site-menu main-menu m-0 p-0">
              {routes.slice(0, 5).map(([href, key]) => <li key={href}><Link href={href} className={`nav-link ${pathname === href ? "active" : ""}`}>{labels[key]}</Link></li>)}
              <li className="has-children"><Link href="/families" className="nav-link">More</Link><ul className="dropdown arrow-top"><li><Link href="/families">{labels.families}</Link></li><li><Link href="/about">About</Link></li><li><Link href="/method">Our method</Link></li></ul></li>
            </ul>
          </nav>
          <div className="ml-auto header-actions">
            <label className="sr-only" htmlFor="locale-switch">Choose language</label>
            <select id="locale-switch" value={locale} onChange={(event) => setLocale(event.target.value as Locale)} aria-label="Choose language">
              <option value="en">EN</option><option value="sw">SW</option><option value="fr">FR</option>
            </select>
            <Link href="/saved" className="saved-link d-none d-lg-inline">{labels.saved}</Link>
            <Link href="/account" className="saved-link d-none d-lg-inline">Account</Link>
            <Link href="/contact" className="nav-contact d-none d-lg-inline">{labels.contact}</Link>
            <button type="button" className="mobile-menu-button d-lg-none" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? "Close menu" : labels.menu} onClick={() => setMenuOpen((open) => !open)}><span className="icon-menu" aria-hidden="true" /></button>
          </div>
        </div>
        {menuOpen && <nav className="mobile-sheet" id="mobile-navigation" aria-label="Mobile navigation">
          {[...routes.map(([href, key]) => [href, labels[key]] as const), ["/saved", labels.saved] as const, ["/account", "Account"] as const, ["/about", "About"] as const, ["/contact", labels.contact] as const].map(([href, text]) => <Link key={href} href={href}>{text}</Link>)}
        </nav>}
        </div>
      </header>
      <main id="main-content">{children}</main>
      <footer className="site-footer">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-5 mb-4"><h2 className="footer-heading">Lois Letters</h2><p className="text-white-opacity-05">First words. Strong roots.</p><p className="footer-about">Mother-tongue and multi-script literacy tools, printable decodables and audio supports for schools, churches and families.</p></div>
            <div className="col-6 col-md-3 mb-4"><h2 className="footer-heading">Explore</h2><ul className="list-unstyled"><li><Link href="/packs">Packs</Link></li><li><Link href="/decodables">Decodables</Link></li><li><Link href="/audio">Audio helpers</Link></li><li><Link href="/scripts">Scripts</Link></li></ul></div>
            <div className="col-6 col-md-4 mb-4"><h2 className="footer-heading">Learn with us</h2><ul className="list-unstyled"><li><Link href="/teachers">Teacher guides</Link></li><li><Link href="/families">Family tips</Link></li><li><Link href="/contribute">Contribute a story</Link></li><li><Link href="/about">About Lois Letters</Link></li></ul></div>
          </div>
          <div className="border-top pt-4 d-flex flex-wrap justify-content-between align-items-start footer-bottom"><p className="small">Educational support materials only. Not a full curriculum replacement or official ministry product. Adapt to local standards and test with qualified teachers.</p><div className="footer-legal"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/contact">Contact</Link></div></div>
          <p className="copyright">© {new Date().getFullYear()} Lois Letters</p>
        </div>
      </footer>
      <a className="floating-whatsapp" href="https://wa.me/254112272061" aria-label="Chat with Lois Letters on WhatsApp" target="_blank" rel="noreferrer"><span aria-hidden="true">✆</span></a>
      <button className="floating-tour" type="button" onClick={speakTour} aria-expanded={tourOpen} aria-label={tourOpen ? "Stop voice tour" : "Play voice tour"}><span aria-hidden="true">◖))</span><span className="tour-label">{tourOpen ? "Stop tour" : "Voice tour"}</span></button>
      {tourOpen && <div className="tour-note" role="status"><span>{speechSupported ? "Voice tour is playing. Select the Voice tour button to stop it." : "Voice playback is not supported in this browser."}</span><button type="button" onClick={() => { window.speechSynthesis?.cancel(); setTourOpen(false); }} aria-label="Close voice tour">×</button></div>}
      {cookieVisible && <aside className="cookie-banner" role="dialog" aria-label="Cookie preferences"><div><strong>Your privacy matters.</strong><p>We use an essential preference cookie to remember your language and cookie choice. No advertising trackers.</p></div><button className="btn btn-primary btn-pill" onClick={acceptCookies}>Accept and continue</button></aside>}
    </div>
  </LocaleContext.Provider>;
}
