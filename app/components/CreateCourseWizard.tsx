"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CourseTypeSelection } from "./CourseTypeSelection"
import { CourseSpecificationForm } from "./CourseSpecificationForm"
import { CoursePreview } from "./CoursePreview"
import { LoadingState } from "./LoadingState"

export function CreateCourseWizard() {
  const [step, setStep] = useState(1)
  const [courseType, setCourseType] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [generatedCourse, setGeneratedCourse] = useState(null)

  const handleCourseTypeSelection = (type: string) => {
    setError(null)
    setCourseType(type)
    setStep(2)
  }

  const handleCourseSpecsSubmission = async (specs: any) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/courses/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...specs,
          courseType,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || data.details || "Failed to generate course")
      }

      if (!data.course) {
        throw new Error("No course data received")
      }

      setGeneratedCourse(data.course)
      setStep(3)
    } catch (err) {
      console.error("Course generation error:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <LoadingState task="Generating your course content..." />
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Create a New Course</h2>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {step === 1 && <CourseTypeSelection onSelect={handleCourseTypeSelection} />}

        {step === 2 && <CourseSpecificationForm onSubmit={handleCourseSpecsSubmission} onBack={() => setStep(1)} />}

        {step === 3 && generatedCourse && <CoursePreview course={generatedCourse} onBack={() => setStep(2)} />}
      </CardContent>
    </Card>
  )
}
