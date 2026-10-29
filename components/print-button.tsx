"use client";

export default function PrintButton({ children = "Print this page" }: { children?: React.ReactNode }) {
  return <button type="button" className="btn btn-primary btn-pill" onClick={() => window.print()}>{children}</button>;
}
