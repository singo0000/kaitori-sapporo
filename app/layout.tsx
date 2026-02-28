import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { SITE_INFO } from "@/app/data/config";
import ChatWidget from "./components/ChatWidget";
import PurchaseTicker from "./components/PurchaseTicker";

const notoSansJP = Noto_Sans_JP({
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-sans-jp",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: `${SITE_INFO.name} | 北海道札幌近郊の車買取・廃車買取`,
  description:
    "北海道札幌近郊で車の買取・廃車買取なら出張買取サポート札幌。海外輸出直販だからできる高価買取。トラック・ハイエース・事故車・農機具など何でもOK。LINEで簡単査定。",
  applicationName: SITE_INFO.name,
  appleWebApp: {
    title: SITE_INFO.name,
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: `${SITE_INFO.name} | 北海道札幌近郊の車買取・廃車買取`,
    description: "北海道札幌近郊で車の買取・廃車買取なら出張買取サポート札幌。海外輸出直販だからできる高価買取。トラック・ハイエース・事故車・農機具など何でもOK。LINEで簡単査定。",
    siteName: SITE_INFO.name,
    url: "https://kaitori-sapporo.vercel.app", // Adjust if using custom domain
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_INFO.name,
    description: "北海道札幌近郊で車の買取・廃車買取なら出張買取サポート札幌。",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "pBfjLw478YOe0JgCVsDr4Ur4ZzTMwFcqhD9ezdYdwyI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${notoSansJP.variable} font-sans antialiased pt-9 sm:pt-10`}
      >
        <PurchaseTicker />
        <div className="safe-bottom">
          {children}
        </div>
        <ChatWidget />
      </body>
    </html>
  );
}
