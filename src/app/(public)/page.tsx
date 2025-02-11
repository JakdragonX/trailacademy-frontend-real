"use client"

import Navbar from "@/src/components/shared/Navbar"
import Hero from "@/src/components/public/Hero"
import Features from "@/src/components/public/Features"
import AboutTrail from "@/src/components/public/AboutTrail"
import CallToAction from "@/src/components/public/CallToAction"
import Footer from "@/src/components/shared/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF6F1] text-[#2D4F1E]">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <AboutTrail />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}