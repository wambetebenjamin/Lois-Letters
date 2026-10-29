import type { Metadata, Viewport } from "next";
import Script from "next/script";
import SiteShell from "@/components/site-shell";
import ClientEnhancements from "@/components/client-enhancements";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Lois Letters | First words. Strong roots.", template: "%s | Lois Letters" },
  description: "Mother-tongue and multi-script literacy tools, printable decodables and audio supports for schools, churches and families.",
  openGraph: { title: "Lois Letters", description: "First words. Strong roots.", type: "website" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, maximumScale: 5, userScalable: true, viewportFit: "cover" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en">
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css?family=Muli:300,400,700,900" rel="stylesheet" />
      <link rel="stylesheet" href="/template/css/bootstrap.min.css" />
      <link rel="stylesheet" href="/template/fonts/icomoon/style.css" />
      <link rel="stylesheet" href="/template/css/style.css" />
      <link rel="stylesheet" href="/template/css/aos.css" />
    </head>
    <body>
      <ClientEnhancements />
      <SiteShell>{children}</SiteShell>
      <Script src="/template/js/aos.js" strategy="afterInteractive" />
    </body>
  </html>;
}
