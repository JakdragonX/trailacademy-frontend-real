"use client"

import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import { CreateCourseWizard } from "@/app/components/CreateCourseWizard"

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-[#FAF6F1] text-[#2D4F1E]">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Create a New Course</h1>
        <CreateCourseWizard />
      </main>
      <Footer />
    </div>
  )
}

