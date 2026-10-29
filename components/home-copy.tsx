"use client";

import Link from "next/link";
import { useLocale } from "@/components/site-shell";

const copy = {
  en: { eyebrow: "Learning starts with the language we know", title: <>First words.<br />Strong roots.</>, description: "Mother-tongue and multi-script literacy tools, printable decodables and audio supports for schools, churches and families.", action: "Explore literacy packs", method: "Why mother-tongue first", noteLabel: "A practical place to begin", noteTitle: "Read, speak, and grow in the language you know best.", noteText: "Small steps for confident reading, shaped with local voices.", noteLink: "See how the packs work" },
  sw: { eyebrow: "Kujifunza huanza kwa lugha tunayoijua", title: <>Maneno ya kwanza.<br />Mizizi imara.</>, description: "Zana za kusoma na kuandika kwa lugha za nyumbani na hati mbalimbali, pamoja na hadithi za kuchapisha na msaada wa sauti kwa shule, makanisa na familia.", action: "Tazama vifurushi", method: "Kwa nini lugha ya nyumbani kwanza", noteLabel: "Mahali pazuri pa kuanzia", noteTitle: "Soma, zungumza na ukue kwa lugha unayoijua zaidi.", noteText: "Hatua ndogo za kujenga usomaji kwa msaada wa jamii.", noteLink: "Jinsi vifurushi vinavyotumika" },
  fr: { eyebrow: "L’apprentissage commence dans une langue familière", title: <>Les premiers mots.<br />Des racines fortes.</>, description: "Des outils de littératie en langue maternelle et en plusieurs écritures, des textes à imprimer et des aides audio pour les écoles, les églises et les familles.", action: "Voir les ressources", method: "Pourquoi commencer par la langue maternelle", noteLabel: "Un point de départ concret", noteTitle: "Lire, parler et grandir dans la langue que l’on connaît le mieux.", noteText: "De petits pas pour gagner en confiance, avec les voix locales.", noteLink: "Comment utiliser les ressources" },
};
export default function HomeCopy() {
  const { locale } = useLocale();
  const text = copy[locale];
  return <>
    <div className="col-lg-7 mb-4 hero-copy" data-aos="fade-up" data-aos-delay="100"><span className="hero-eyebrow">{text.eyebrow}</span><h1>{text.title}</h1><p className="mb-4">{text.description}</p><div className="hero-actions"><Link href="/packs" className="btn btn-primary py-3 px-5 btn-pill">{text.action}</Link><Link href="/method" className="hero-secondary">{text.method} <span aria-hidden="true">→</span></Link></div></div>
    <div className="col-lg-4 ml-auto hero-note" data-aos="fade-up" data-aos-delay="300"><div className="hero-note-inner"><span className="note-label">{text.noteLabel}</span><h2>{text.noteTitle}</h2><p>{text.noteText}</p><Link href="/teachers">{text.noteLink} <span aria-hidden="true">→</span></Link></div></div>
  </>;
}
