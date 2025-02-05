import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function MissionPage() {
  return (
    <div className="min-h-screen bg-[#FAF6F1] text-[#2D4F1E]">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Mission</h1>
        <div className="max-w-3xl mx-auto space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Empowering Personalized Learning</h2>
            <p className="text-lg leading-relaxed">
              At Trail Academy, we're revolutionizing education by putting the power of course creation in your hands.
              Our platform enables users to import their study materials, describe their learning goals, and create
              custom courses tailored to their specific needs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Flexible and Comprehensive Learning</h2>
            <p className="text-lg leading-relaxed">
              Users can specify the layout and length of their courses, which are then enriched with study notes,
              curated videos, dynamic quizzes, exams, essays, and even practical labs. The platform also allows for the
              integration of user-created content, providing a perfect blend of technology-assisted and human-curated
              educational materials.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Customizable Teaching Styles</h2>
            <p className="text-lg leading-relaxed">
              Our unique feature allows users or parents to create their own "teacher" profiles, capable of generating
              alternative content based on preferred teaching styles. This ensures that the learning experience is not
              only comprehensive but also aligns with individual learning preferences.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Who We Serve</h2>
            <p className="text-lg leading-relaxed">
              Trail Academy is designed for independent educators, students, and homeschooling parents. Our platform
              caters to those who seek to create custom courses, specifying content depth and duration. Whether you're
              looking to study a technology-enhanced course or an educator-supplemented program, Trail Academy provides
              the tools and flexibility you need.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Community-Driven Learning</h2>
            <p className="text-lg leading-relaxed">
              We're building more than just a learning platform; we're cultivating a community. Our "creators" - be they
              educators, experts, or enthusiastic learners - can develop and share custom courses using their own
              content or technology-enhanced materials. This collaborative approach ensures a rich, diverse, and
              constantly evolving library of courses.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Join Us in Shaping the Future of Education</h2>
            <p className="text-lg leading-relaxed">
              We're calling on developers, educators, and visionaries to help us grow this community. By joining Trail
              Academy, you're not just using a platform - you're becoming part of a movement that's redefining how we
              approach learning and education in the digital age.
            </p>
          </section>

          <div className="text-center mt-12">
            <a
              href="/join-us"
              className="bg-[#2D4F1E] text-[#FAF6F1] px-6 py-3 rounded-full text-lg font-semibold hover:bg-[#2D4F1E]/90 transition-colors"
            >
              Join Our Community
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

