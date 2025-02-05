import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Link from "next/link"
import { DiscIcon as Discord } from "lucide-react"

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-[#FAF6F1] text-[#2D4F1E]">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Join Our Community</h1>
        <div className="max-w-3xl mx-auto space-y-8">
          <section className="bg-[#2D4F1E] text-[#FAF6F1] p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">We Need Your Expertise!</h2>
            <p className="text-lg leading-relaxed mb-4">
              Trail Academy is seeking talented frontend and backend developers to help us build the future of
              education. We're particularly interested in developers with:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Experience in developing with AI technologies</li>
              <li>Passion for education and learning platforms</li>
              <li>Skills in building user account systems and content management</li>
              <li>Expertise in creating intuitive dashboards and integrations</li>
            </ul>
            <p className="text-lg leading-relaxed">
              Help us complete our backend, implement user accounts, store AI-generated course materials, and create
              robust "guide" saving functionality. We're also developing educator, parent, and child dashboards with
              calendar integrations and grading systems.
            </p>
            <div className="mt-6">
              <Link
                href="/careers"
                className="bg-[#FAF6F1] text-[#2D4F1E] px-6 py-3 rounded-full text-lg font-semibold hover:bg-[#FAF6F1]/90 transition-colors inline-block"
              >
                Join Our Team
              </Link>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">A Diverse Learning Community</h2>
            <p className="text-lg leading-relaxed">
              Trail Academy's community is a vibrant mix of educators, learners, and parents. Whether you're an
              experienced teacher, a curious student, or a dedicated parent, you'll find a place here to share
              knowledge, seek guidance, and collaborate on educational content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Connect on Discord</h2>
            <p className="text-lg leading-relaxed mb-4">
              Join our Discord server to connect with other community members, participate in discussions, and stay
              updated on the latest developments at Trail Academy.
            </p>
            <Link
              href="https://discord.gg/ZSNpRNfwgp"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#5865F2] text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-[#5865F2]/90 transition-colors inline-flex items-center"
            >
              <Discord className="mr-2 h-5 w-5" />
              Join Our Discord
            </Link>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contribute and Grow</h2>
            <p className="text-lg leading-relaxed">
              At Trail Academy, we believe in the power of community-driven learning. Share your expertise by creating
              courses, offer support to fellow learners, or collaborate on improving our platform. Your contributions
              can make a significant impact on the future of education.
            </p>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  )
}

