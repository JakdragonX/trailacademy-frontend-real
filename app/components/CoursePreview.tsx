import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

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

  const sortedContent = [...course.modules, ...(course.exams || [])].sort((a, b) => {
    const aIndex = a.id.startsWith("module") ? Number.parseInt(a.id.split("-")[1]) : Number.POSITIVE_INFINITY
    const bIndex = b.id.startsWith("module") ? Number.parseInt(b.id.split("-")[1]) : Number.POSITIVE_INFINITY
    return aIndex - bIndex
  })

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
          {course.exams && (
            <div className="mb-4">
              <strong>Number of Exams:</strong> {course.exams.length}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-4">
        {sortedContent.map((item, index) => (
          <Card key={item.id}>
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
              <p className="text-gray-600 mb-4">{item.description}</p>
              {item.id.startsWith("module") ? (
                <Button onClick={() => console.log("View module", item.id)}>View Module</Button>
              ) : (
                <Button onClick={() => console.log("View exam", item.id)}>View Exam</Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline">
          Back
        </Button>
        <Button>Save Course</Button>
      </div>
    </div>
  )
}
