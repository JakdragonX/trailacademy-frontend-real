import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import Navbar from "./components/Navbar"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Trail - AI-Powered Learning Platform",
  description: "Transform any study material into an AI-powered learning experience",
  icons: {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Airbrush-Image-Enhancer-sF5FhWIUq2tRqLX5OQ3ZvXE5cWPkMS.jpeg",
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
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
