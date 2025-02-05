import { ChevronDown } from "lucide-react"

const categories = [
  { name: "Getting Started", subcategories: ["Platform Basics", "Course Creation", "Learning Tips"] },
  { name: "Course Creation", subcategories: ["Content Upload", "AI Integration", "Customization"] },
  { name: "Learning Strategies", subcategories: ["Time Management", "Note-taking", "Exam Preparation"] },
  { name: "Technical Guides", subcategories: ["API Usage", "Integration", "Troubleshooting"] },
  { name: "Community", subcategories: ["Collaboration", "Networking", "Events"] },
]

export default function GuideSidebar() {
  return (
    <aside className="w-full md:w-64 bg-white rounded-2xl p-4 shadow-md">
      <h2 className="text-xl font-semibold mb-4">Guide Categories</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.name} className="mb-2">
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer">
                <span>{category.name}</span>
                <ChevronDown className="h-5 w-5 transform group-open:rotate-180 transition-transform" />
              </summary>
              <ul className="mt-2 ml-4 space-y-1">
                {category.subcategories.map((subcategory) => (
                  <li key={subcategory}>
                    <a href="#" className="text-sm hover:text-[#8B4513] transition-colors">
                      {subcategory}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        ))}
      </ul>
    </aside>
  )
}

