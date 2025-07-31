import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ReduxProvider } from "@/lib/redux/provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer" // Import the new Footer component
import { Toaster } from "react-hot-toast" // Changed from sonner

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "E-commerce Product Showcase",
    template: "%s | E-commerce",
  },
  description:
    "A minimal e-commerce frontend built with Next.js, Redux Toolkit, and Tailwind CSS, following SEO best practices.",
  keywords: ["e-commerce", "nextjs", "redux", "tailwind", "typescript", "seo", "products"],
  openGraph: {
    title: "E-commerce Product Showcase",
    description:
      "A minimal e-commerce frontend built with Next.js, Redux Toolkit, and Tailwind CSS, following SEO best practices.",
    url: "https://your-ecommerce-site.com", // Replace with actual URL
    siteName: "E-commerce Showcase",
    images: [
      {
        url: "/placeholder.svg?height=630&width=1200", // Placeholder image for Open Graph
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
    images: ["/placeholder.svg?height=630&width=1200"], // Placeholder image for Twitter Card
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <div className="flex flex-col min-h-screen">
            {" "}
            {/* Added flex column for sticky footer */}
            <Navbar />
            <main className="container mx-auto px-4 py-8 flex-grow">{children}</main>{" "}
            {/* flex-grow to push footer down */}
            <Footer /> {/* Add the Footer component here */}
          </div>
        </ReduxProvider>
        <Toaster position="top-right" /> {/* Toaster component for react-hot-toast */}
      </body>
    </html>
  )
}
