import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Features from "./components/Features"
import AboutTrail from "./components/AboutTrail"
import Testimonials from "./components/Testimonials"
import CallToAction from "./components/CallToAction"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF6F1] text-[#2D4F1E]">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <AboutTrail />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}