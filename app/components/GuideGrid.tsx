import { Clock, User, ThumbsUp, BookOpen } from "lucide-react"

const guides = [
  {
    id: 1,
    title: "Getting Started with Trail Academy",
    description: "Learn how to navigate the platform and create your first course.",
    author: "Trail Team",
    readTime: "5 min read",
    likes: 120,
    category: "Getting Started",
  },
  {
    id: 2,
    title: "Best Practices for Course Creation",
    description: "Tips and tricks for creating engaging and effective courses.",
    author: "Education Expert",
    readTime: "10 min read",
    likes: 85,
    category: "Course Creation",
  },
  {
    id: 3,
    title: "Leveraging AI in Your Courses",
    description: "How to use AI-generated content to enhance your teaching materials.",
    author: "AI Specialist",
    readTime: "8 min read",
    likes: 150,
    category: "Course Creation",
  },
  {
    id: 4,
    title: "Customizing Your Learning Experience",
    description: "Tailor Trail Academy to fit your unique learning style and goals.",
    author: "Learning Strategist",
    readTime: "7 min read",
    likes: 95,
    category: "Learning Strategies",
  },
  {
    id: 5,
    title: "Effective Note-taking Strategies",
    description: "Improve your learning with these proven note-taking techniques.",
    author: "Study Skills Coach",
    readTime: "6 min read",
    likes: 110,
    category: "Learning Strategies",
  },
  {
    id: 6,
    title: "Integrating Trail Academy with LMS",
    description: "Step-by-step guide to integrate Trail Academy with your Learning Management System.",
    author: "Tech Integration Specialist",
    readTime: "12 min read",
    likes: 75,
    category: "Technical Guides",
  },
]

export default function GuideGrid() {
  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide) => (
          <div
            key={guide.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-2">{guide.title}</h3>
              <p className="text-gray-600 mb-4">{guide.description}</p>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <User className="w-4 h-4 mr-1" />
                <span>{guide.author}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Clock className="w-4 h-4 mr-1" />
                <span>{guide.readTime}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <ThumbsUp className="w-4 h-4 mr-1" />
                <span>{guide.likes} likes</span>
              </div>
              <div className="flex items-center text-sm text-[#2D4F1E]">
                <BookOpen className="w-4 h-4 mr-1" />
                <span>{guide.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

