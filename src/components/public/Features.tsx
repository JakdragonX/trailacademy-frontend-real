import { Leaf, Wind, Compass, Mountain } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: <Leaf className="w-12 h-12 mb-4" />,
      title: "Upload & Generate",
      description: "Import study material and let AI create structured courses.",
    },
    {
      icon: <Wind className="w-12 h-12 mb-4" />,
      title: "Customizable Learning Paths",
      description: "Adjust course length, difficulty, and content.",
    },
    {
      icon: <Compass className="w-12 h-12 mb-4" />,
      title: "AI-Powered Study Tools",
      description: "Automated notes, quizzes, video recommendations, and more.",
    },
    {
      icon: <Mountain className="w-12 h-12 mb-4" />,
      title: "Homeschool & Self-Paced Learning",
      description: "Designed for independent learners and parents.",
    },
  ]

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#2D4F1E]/5 backdrop-blur-sm" />
      <div className="container mx-auto relative">
        <h2 className="text-3xl font-bold text-center mb-12">Feature Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-white/80 backdrop-blur-sm p-6 rounded-[2rem] shadow-lg hover:transform hover:scale-105 transition-all duration-300 border-t-4 border-[#8B4513] border-opacity-50"
            >
              <div className="text-[#2D4F1E]">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}












