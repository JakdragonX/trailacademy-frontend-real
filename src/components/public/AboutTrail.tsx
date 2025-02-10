import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AboutTrail() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#2D4F1E]/10 to-[#8B4513]/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Empowering Personalized Learning Journeys</h2>
          <div className="mb-12 text-lg leading-relaxed">
            <p className="mb-4">
              Trail Academy revolutionizes education by putting the power of AI-driven course creation in your hands.
              Whether you're a homeschooling parent, an independent learner, or an educator, our platform transforms
              your study materials into engaging, customized learning experiences.
            </p>
            <p className="mb-4">
              With Trail Academy, you can create dynamic courses tailored to your unique learning style and goals.
              Import your study materials, customize your learning path, and let our AI generate comprehensive study
              guides, quizzes, and more.
            </p>
            <p>Our platform adapts to your needs, allowing you to:</p>
          </div>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-[#2D4F1E] rounded-full flex items-center justify-center text-white font-bold text-xl">
                1
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold mb-2">Design Custom Courses</h3>
                <p>
                  Create courses of any length and difficulty, perfectly suited to your learning needs and pace. Adjust
                  modules, content depth, and duration with ease.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-[#2D4F1E] rounded-full flex items-center justify-center text-white font-bold text-xl">
                2
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold mb-2">Interact with AI Guides</h3>
                <p>
                  Personalize your learning experience with AI "Teachers" that adapt to your preferred teaching style.
                  Customize their tone, attitude, and approach to match your ideal learning environment.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-[#2D4F1E] rounded-full flex items-center justify-center text-white font-bold text-xl">
                3
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold mb-2">Learn Your Way</h3>
                <p>
                  Perfect for homeschoolers, self-taught professionals, and lifelong learners of all ages. Tailor your
                  educational journey to your specific goals and interests.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/mission"
              className="inline-flex items-center text-lg font-semibold text-[#2D4F1E] hover:text-[#8B4513] transition-colors"
            >
              Learn more about how Trail Academy works
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}












