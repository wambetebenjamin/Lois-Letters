"use client";

import { useEffect, useState } from "react";

type Contribution = { id: string; name: string; email: string; language: string; idea: string; createdAt: string };
export default function MyContributions() {
  const [items, setItems] = useState<Contribution[]>([]);
  useEffect(() => { setItems(JSON.parse(localStorage.getItem("lois-letters-my-contributions") || "[]")); }, []);
  const remove = (id: string) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    localStorage.setItem("lois-letters-my-contributions", JSON.stringify(updated));
  };
  if (items.length === 0) return <div className="empty-state"><h2>No contribution drafts yet</h2><p>Ideas you save from this device will appear here.</p><a className="btn btn-primary btn-pill" href="/contribute">Share an idea</a></div>;
  return <div className="contribution-list">{items.map((item) => <article className="contribution-item" key={item.id}><div><span className="meta">{item.language} · Draft saved {new Date(item.createdAt).toLocaleDateString()}</span><h2>{item.name}</h2><p>{item.idea}</p><p className="small">Contact: {item.email}</p></div><button type="button" className="save-button" onClick={() => remove(item.id)}>Remove draft</button></article>)}</div>;
}
