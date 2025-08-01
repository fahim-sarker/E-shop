import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/lib/redux/provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "E-commerce Product Showcase",
    template: "%s | E-commerce",
  },
  description:
    "A minimal e-commerce frontend built with Next.js, Redux Toolkit, and Tailwind CSS, following SEO best practices.",
  keywords: [
    "e-commerce",
    "nextjs",
    "redux",
    "tailwind",
    "typescript",
    "seo",
    "products",
  ],
  openGraph: {
    title: "E-commerce Product Showcase",
    description:
      "A minimal e-commerce frontend built with Next.js, Redux Toolkit, and Tailwind CSS, following SEO best practices.",
    url: "https://e-shop-gold-pi.vercel.app",
    siteName: "E-commerce Showcase",
    images: [
      {
        url: "https://via.placeholder.com/1200x630.png?text=E-commerce+Showcase",
        width: 1200,
        height: 630,
        alt: "E-commerce Product Showcase Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "E-commerce Product Showcase",
    description:
      "A minimal e-commerce frontend built with Next.js, Redux Toolkit, and Tailwind CSS, following SEO best practices.",
    images: [
      "https://via.placeholder.com/1200x630.png?text=E-commerce+Showcase",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="container mx-auto px-4 py-8 flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ReduxProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
