"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { LiteracyPack } from "@/lib/content";

const STORE_KEY = "lois-letters-saved-packs";
export default function PackCard({ pack }: { pack: LiteracyPack }) {
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    const existing: string[] = JSON.parse(localStorage.getItem(STORE_KEY) || "[]");
    setSaved(existing.includes(pack.id));
  }, [pack.id]);
  const toggleSave = () => {
    const existing: string[] = JSON.parse(localStorage.getItem(STORE_KEY) || "[]");
    const updated = saved ? existing.filter((id) => id !== pack.id) : [...new Set([...existing, pack.id])];
    localStorage.setItem(STORE_KEY, JSON.stringify(updated));
    setSaved(!saved);
  };
  return <article className="course bg-white h-100 align-self-stretch resource-card">
    <figure className="m-0 resource-image"><Link href={`/packs/${pack.id}`} aria-label={`View ${pack.title}`}><Image src={pack.image} alt="Children learning together with a teacher" width={720} height={480} sizes="(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 33vw" /></Link></figure>
    <div className="course-inner-text py-4 px-4 resource-copy"><div className="meta">{pack.language} <span aria-hidden="true">·</span> {pack.level}</div><h3><Link href={`/packs/${pack.id}`}>{pack.title}</Link></h3><p>{pack.description}</p><p className="resource-focus"><strong>Focus:</strong> {pack.focus}</p><div className="resource-actions"><Link className="resource-link" href={`/packs/${pack.id}`}>View pack <span aria-hidden="true">→</span></Link><button className="save-button" type="button" onClick={toggleSave} aria-pressed={saved}>{saved ? "Saved" : "Save pack"}</button></div></div>
    <div className="d-flex border-top stats resource-stats"><span>{pack.format}</span><Link href="/audio">Listen and practise</Link></div>
  </article>;
}
