import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import CoursesSidebar from "../components/CoursesSidebar"
import CourseGrid from "../components/CourseGrid"
import CreateCourseButton from "../components/CreateCourseButton"

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-[#FAF6F1] text-[#2D4F1E]">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Explore Courses</h1>
          <CreateCourseButton />
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <CoursesSidebar />
          <CourseGrid />
        </div>
      </main>
      <Footer />
    </div>
  )
}

