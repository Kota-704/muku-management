import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { Provider } from "@/components/ui/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "椋の管理アプリ",
    description: "椋の管理を共有するアプリ",
    keywords: ["椋", "管理", "アプリ"],
    openGraph: {
      title: "椋の管理アプリ",
      description: "椋の管理を共有するアプリ",
      type: "website",
      url: "https://muku-management.vercel.app",
      images: [
        {
          url: "/muku_ogp.png",
          width: 1200,
          height: 630,
          alt: "椋の管理アプリ",
        },
      ],
    },
    icons: {
      apple: "/muku_ogp.png",
    },
    manifest: "/manifest.json",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="wrapper p-3 min-h-screen">
          <h1 className="text-center mt-4">椋の管理アプリ</h1>
          <button className="absolute top-6 right-3">
            <Image
              src="/settings-2-svgrepo-com.svg"
              width={32}
              height={32}
              alt="Settings Icon"
            ></Image>
          </button>
          <Provider>{children}</Provider>
        </div>
      </body>
    </html>
  );
}
