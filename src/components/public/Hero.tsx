'use client'
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { X } from "lucide-react"

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false)

  const toggleVideo = () => setShowVideo(!showVideo)

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Forest background with overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/forest.jpg-F1VHSiQQvCHKGAM9bym948Are3NLRK.jpeg"
          alt="Forest trail background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#2D4F1E]/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2D4F1E]/30 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-[#2D4F1E]/30 backdrop-blur-sm p-8 rounded-[3rem] shadow-lg">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#FAF6F1] leading-tight drop-shadow-lg">
              Transform Any Study Material into an AI-Powered Learning Experience
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-[#FAF6F1] drop-shadow">
              Upload textbooks, PDFs, or notes and generate a fully structured course with AI-powered study guides,
              quizzes, and videos.
            </p>
            <div className="space-x-4">
              <Link
                href="/community"
                className="inline-block bg-[#FAF6F1] text-[#2D4F1E] px-8 py-4 rounded-full text-xl font-bold hover:transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Join Our Community
              </Link>
              <button
                onClick={toggleVideo}
                className="inline-block bg-[#2D4F1E]/40 backdrop-blur-sm border-2 border-[#FAF6F1] text-[#FAF6F1] px-8 py-4 rounded-full text-xl font-bold hover:bg-[#2D4F1E]/60 transition-all duration-300"
              >
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#FAF6F1] to-transparent" />

      {showVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl shadow-2xl">
            <div className="flex justify-end p-4">
              <button onClick={toggleVideo} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="px-8 pb-8">
              <div className="relative pb-[56.25%] h-0">
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}












