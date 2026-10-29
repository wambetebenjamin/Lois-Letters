"use client";

import { useMemo, useState } from "react";
import PackCard from "@/components/pack-card";
import { packs } from "@/lib/content";

export default function PackExplorer() {
  const [language, setLanguage] = useState("All languages");
  const [level, setLevel] = useState("All levels");
  const visible = useMemo(() => packs.filter((pack) => (language === "All languages" || pack.language === language) && (level === "All levels" || pack.level === level)), [language, level]);
  return <>
    <div className="pack-filters" aria-label="Filter literacy packs"><label>Language<select value={language} onChange={(event) => setLanguage(event.target.value)}><option>All languages</option>{Array.from(new Set(packs.map((pack) => pack.language))).map((item) => <option key={item}>{item}</option>)}</select></label><label>Level<select value={level} onChange={(event) => setLevel(event.target.value)}><option>All levels</option>{Array.from(new Set(packs.map((pack) => pack.level))).map((item) => <option key={item}>{item}</option>)}</select></label><p role="status">Showing {visible.length} {visible.length === 1 ? "pack" : "packs"}</p></div>
    <div className="row resource-grid">{visible.map((pack) => <div className="col-lg-4 col-md-6 mb-4" key={pack.id}><PackCard pack={pack} /></div>)}</div>
  </>;
}
