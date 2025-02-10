import { Clock, Award, Beaker, User } from "lucide-react"

const courses = [
  {
    id: 1,
    title: "Introduction to Python Programming",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/python-course-image-placeholder-Uy5Ue5Ue5Ue5Ue5Ue5Ue5Ue5Ue5Ue5.jpg",
    duration: "16 hours",
    tags: ["Human Instructor", "Integrated Labs", "Certification"],
  },
  {
    id: 2,
    title: "Web Development Bootcamp",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/web-dev-course-image-placeholder-Uy5Ue5Ue5Ue5Ue5Ue5Ue5Ue5Ue5Ue5.jpg",
    duration: "40 hours",
    tags: ["Human Instructor", "Integrated Labs", "Certification"],
  },
  {
    id: 3,
    title: "Data Science Fundamentals",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/data-science-course-image-placeholder-Uy5Ue5Ue5Ue5Ue5Ue5Ue5Ue5Ue5Ue5.jpg",
    duration: "24 hours",
    tags: ["Integrated Labs", "Certification"],
  },
  {
    id: 4,
    title: "Machine Learning Essentials",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ml-course-image-placeholder-Uy5Ue5Ue5Ue5Ue5Ue5Ue5Ue5Ue5Ue5.jpg",
    duration: "32 hours",
    tags: ["Human Instructor", "Integrated Labs"],
  },
  // Add more courses as needed
]

export default function CourseGrid() {
  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Clock className="w-4 h-4 mr-1" />
                <span>{course.duration}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {course.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#2D4F1E]/10 text-[#2D4F1E]"
                  >
                    {tag === "Human Instructor" && <User className="w-3 h-3 mr-1" />}
                    {tag === "Integrated Labs" && <Beaker className="w-3 h-3 mr-1" />}
                    {tag === "Certification" && <Award className="w-3 h-3 mr-1" />}
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}












