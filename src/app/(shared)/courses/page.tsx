import Navbar from "@/src/components/shared/Navbar"
import Footer from "@/src/components/shared/Footer"
import CoursesSidebar from "@/src/components/shared/CoursesSidebar"
import CourseGrid from "@/src/components/shared/CourseGrid"
import CreateCourseButton from "@/src/components/auth/CreateCourseButton"

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












