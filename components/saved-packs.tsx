"use client";

import { useEffect, useState } from "react";
import PackCard from "@/components/pack-card";
import { packs } from "@/lib/content";

export default function SavedPacks() {
  const [saved, setSaved] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => { setSaved(JSON.parse(localStorage.getItem("lois-letters-saved-packs") || "[]")); setReady(true); }, []);
  const selected = packs.filter((pack) => saved.includes(pack.id));
  if (!ready) return <p>Loading saved packs…</p>;
  return selected.length ? <div className="row resource-grid">{selected.map((pack) => <div className="col-lg-4 col-md-6 mb-4" key={pack.id}><PackCard pack={pack} /></div>)}</div> : <div className="empty-state"><h2>No saved packs yet</h2><p>Save a pack to keep it close on this device. No account is required.</p><a className="btn btn-primary btn-pill" href="/packs">Browse literacy packs</a></div>;
}
