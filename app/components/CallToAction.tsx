import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function CallToAction() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#2D4F1E]" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FAF6F1]">
            Ready to Transform Your Learning Journey?
          </h2>
          <p className="text-xl mb-8 text-[#FAF6F1]/90">
            Explore courses, create your own, or join our community of learners today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/courses"
              className="group bg-[#FAF6F1] text-[#2D4F1E] px-6 py-3 rounded-full text-lg font-semibold hover:transform hover:scale-105 transition-all duration-300 flex items-center"
            >
              Explore Courses
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/create-course"
              className="group bg-[#8B4513] text-[#FAF6F1] px-6 py-3 rounded-full text-lg font-semibold hover:bg-[#8B4513]/90 transition-all duration-300 flex items-center"
            >
              Create a Course
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

