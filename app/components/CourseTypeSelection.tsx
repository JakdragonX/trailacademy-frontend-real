import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, GraduationCap } from "lucide-react"

export function CourseTypeSelection({ onSelect }) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold mb-4 text-[#2D4F1E]">Choose Your Course Type</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          className="border-2 border-[#2D4F1E] hover:shadow-lg transition-all cursor-pointer transform hover:scale-105"
          onClick={() => onSelect("traditional")}
        >
          <CardContent className="p-6 text-center">
            <BookOpen className="w-16 h-16 mx-auto text-[#2D4F1E] mb-4" />
            <h4 className="text-xl font-semibold mb-2 text-[#2D4F1E]">Traditional Course</h4>
            <p className="text-gray-600">
              Balanced learning approach with equal weight on participation, assignments, and assessments.
            </p>
          </CardContent>
        </Card>

        <Card
          className="border-2 border-[#2D4F1E] hover:shadow-lg transition-all cursor-pointer transform hover:scale-105"
          onClick={() => onSelect("college")}
        >
          <CardContent className="p-6 text-center">
            <GraduationCap className="w-16 h-16 mx-auto text-[#2D4F1E] mb-4" />
            <h4 className="text-xl font-semibold mb-2 text-[#2D4F1E]">College Course</h4>
            <p className="text-gray-600">Academic structure with emphasis on midterm and final examinations.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
