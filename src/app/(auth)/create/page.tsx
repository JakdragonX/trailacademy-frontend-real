"use client"

import Navbar from "@/src/components/shared/Navbar"
import Footer from "@/src/components/shared/Footer"
import { CreateCourseWizard } from "@/src/components/auth/CreateCourseWizard"

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












