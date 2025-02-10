import { ChevronDown } from "lucide-react"

const categories = [
  { name: "Computer Science", subcategories: ["Programming", "Web Development", "Data Science"] },
  { name: "Business", subcategories: ["Marketing", "Finance", "Entrepreneurship"] },
  { name: "Arts & Humanities", subcategories: ["History", "Philosophy", "Literature"] },
  { name: "Science", subcategories: ["Physics", "Biology", "Chemistry"] },
  { name: "Mathematics", subcategories: ["Algebra", "Calculus", "Statistics"] },
]

export default function CoursesSidebar() {
  return (
    <aside className="w-full md:w-64 bg-white rounded-2xl p-4 shadow-md">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
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












