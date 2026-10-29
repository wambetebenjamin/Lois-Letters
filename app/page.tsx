import Image from "next/image";
import Link from "next/link";
import PackCard from "@/components/pack-card";
import HomeCopy from "@/components/home-copy";
import { packs, photos } from "@/lib/content";

export default function HomePage() {
  return <>
    <section className="intro-section home-hero" id="home-section">
      <div className="slide-1">
        <Image src={photos.hero} alt="A teacher and children learning together outdoors at a rural school" fill priority sizes="100vw" className="hero-photo" />
        <div className="hero-shade" />
        <div className="container hero-container"><div className="row align-items-center"><div className="col-12"><div className="row align-items-center">
          <HomeCopy />
        </div></div></div></div>
      </div>
    </section>

    <section className="site-section intro-value" data-aos="fade-up"><div className="container"><div className="row align-items-center"><div className="col-lg-5 mb-4 mb-lg-0"><span className="section-sub-title">A strong start</span><h2 className="section-title">Why mother-tongue first?</h2></div><div className="col-lg-6 ml-auto"><p className="lead">Children bring language, stories and knowledge with them. Literacy grows when learning can connect to what they already understand.</p><p>Lois Letters offers respectful, printable practice that supports local teaching. Use the materials alongside your own classroom plans, family stories and community languages.</p><Link href="/method" className="text-primary link-underlined">Read our approach <span aria-hidden="true">→</span></Link></div></div></div></section>

    <section className="site-section courses-title featured-section" id="courses-section"><div className="container"><div className="row mb-4 justify-content-between align-items-end"><div className="col-lg-7"><span className="section-sub-title">Start small, practise often</span><h2 className="section-title">Featured learning packs</h2></div><div className="col-lg-4 text-lg-right"><Link href="/packs" className="text-primary link-underlined">Browse all packs <span aria-hidden="true">→</span></Link></div></div><div className="row resource-grid">{packs.slice(0, 3).map((pack) => <div className="col-lg-4 col-md-6 mb-4" key={pack.id}><PackCard pack={pack} /></div>)}</div></div></section>

    <section className="site-section bg-light how-section" data-aos="fade-up"><div className="container"><div className="row mb-5 justify-content-center"><div className="col-lg-7 text-center"><span className="section-sub-title">Clear and flexible</span><h2 className="section-title">How packs work</h2><p>Every pack gives a learner, family member or teacher a manageable next step.</p></div></div><div className="row">{[{ n: "01", title: "Choose a language", body: "Begin with a language and script familiar to your learners. More community-led resources can be added over time." }, { n: "02", title: "Print and practise", body: "Use a short page for shared reading, sound play or a quick classroom routine. No special equipment is needed." }, { n: "03", title: "Read together", body: "Repeat, talk about the story and adapt examples with a qualified local teacher or language speaker." }].map((step) => <div className="col-md-4 mb-4" key={step.n}><div className="step-card"><span className="step-number">{step.n}</span><h3>{step.title}</h3><p>{step.body}</p></div></div>)}</div></div></section>

    <section className="site-section language-section" data-aos="fade-up"><div className="container"><div className="row align-items-center"><div className="col-lg-6 mb-4 mb-lg-0"><div className="language-photo"><Image src={photos.reading} alt="Children and elders gathered for outdoor learning in a rural setting" width={820} height={580} sizes="(max-width: 767px) 100vw, 50vw" /></div></div><div className="col-lg-5 ml-auto"><span className="section-sub-title">Built for many voices</span><h2 className="section-title">Languages grow with community</h2><p>Explore starting materials in Kiswahili, English and French, with room to contribute stories and learning notes for other languages.</p><div className="language-tags"><span>Kiswahili</span><span>English</span><span>Français</span><span>Community contributions</span></div><Link href="/contribute" className="btn btn-primary btn-pill">Share a language resource</Link></div></div></div></section>

    <section className="site-section cta-section" data-aos="fade-up"><div className="container"><div className="cta-panel"><div><span className="section-sub-title">Take the next small step</span><h2>Make room for every learner's first words.</h2><p>Find a printable resource or help us shape one for your community.</p></div><div className="cta-actions"><Link href="/packs" className="btn btn-primary btn-pill">Explore packs</Link><Link href="/contribute" className="btn btn-white btn-outline-white btn-pill">Contribute a story</Link></div></div></div></section>
  </>;
}
