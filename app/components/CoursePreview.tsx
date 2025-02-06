import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ModuleList } from "./ModuleList"

export function CoursePreview({ course, onBack }) {
  if (!course || !course.modules) {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold mb-4">Course Preview</h3>
        <p>No course data available.</p>
        <Button onClick={onBack} variant="outline">
          Back
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Course Preview</h3>
      <Card>
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold mb-2">{course.title || "Untitled Course"}</h4>
          <p className="text-gray-600 mb-4">{course.description || "No description available."}</p>
          <div className="mb-4">
            <strong>Target Audience:</strong> {course.audience || "Not specified"}
          </div>
          <div className="mb-4">
            <strong>Number of Modules:</strong> {course.modules.length}
          </div>
          {course.exam && (
            <div className="mb-4">
              <strong>Exam:</strong> {course.exam.title} ({course.exam.questions.length} questions,{" "}
              {course.exam.totalPoints} points)
            </div>
          )}
        </CardContent>
      </Card>

      <ModuleList initialModules={course.modules} />

      {course.exam && (
        <Card>
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold mb-2">Exam Preview</h4>
            <p className="text-gray-600 mb-4">{course.exam.description}</p>
            <div className="space-y-4">
              {course.exam.questions.map((question, index) => (
                <div key={index} className="border-b pb-4">
                  <p className="font-medium">{question.question}</p>
                  <p className="text-sm text-gray-500">
                    Type: {question.type}, Points: {question.points}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline">
          Back
        </Button>
        <Button>Save Course</Button>
      </div>
    </div>
  )
}
