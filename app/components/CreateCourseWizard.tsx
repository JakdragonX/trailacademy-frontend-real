"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { CourseTypeSelection } from "./CourseTypeSelection"
import { CourseSpecificationForm } from "./CourseSpecificationForm"
import { CoursePreview } from "./CoursePreview"
import { LoadingState } from "./LoadingState"

export function CreateCourseWizard() {
  const [step, setStep] = useState(1)
  const [courseType, setCourseType] = useState("")
  const [courseSpecs, setCourseSpecs] = useState(null)
  const [generatedCourse, setGeneratedCourse] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleCourseTypeSelection = (type) => {
    setCourseType(type)
    setStep(2)
  }

  const handleCourseSpecsSubmission = async (specs) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/courses/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...specs, courseType }),
      })
      if (!response.ok) {
        throw new Error("Failed to generate course")
      }
      const data = await response.json()
      setGeneratedCourse(data.course)
      setStep(3)
    } catch (error) {
      console.error("Course generation error:", error)
      // Handle error (e.g., show error message to user)
    } finally {
      setIsLoading(false)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <CourseTypeSelection onSelect={handleCourseTypeSelection} />
      case 2:
        return <CourseSpecificationForm onSubmit={handleCourseSpecsSubmission} onBack={() => setStep(1)} />
      case 3:
        return <CoursePreview course={generatedCourse} onBack={() => setStep(2)} />
      default:
        return null
    }
  }

  if (isLoading) {
    return <LoadingState task="Generating course content..." />
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Create a New Course</h2>
        {renderStep()}
      </CardContent>
    </Card>
  )
}
