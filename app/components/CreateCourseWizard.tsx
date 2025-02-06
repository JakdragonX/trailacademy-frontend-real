"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CourseTypeSelection } from "./CourseTypeSelection"
import { CourseSpecificationForm } from "./CourseSpecificationForm"
import { CoursePreview } from "./CoursePreview"
import { LoadingState } from "./LoadingState"
import { AlertCircle } from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function CreateCourseWizard() {
  const [step, setStep] = useState(1)
  const [courseType, setCourseType] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [generatedCourse, setGeneratedCourse] = useState<any>(null)
  const [courseId, setCourseId] = useState<string | null>(null)
  const [progress, setProgress] = useState<{ current: number; total: number } | null>(null)
  const [includeExams, setIncludeExams] = useState(false)
  const [examCount, setExamCount] = useState(1)

  const handleCourseTypeSelection = (type: string) => {
    setError(null)
    setCourseType(type)
    setStep(2)
  }

  const handleCourseSpecsSubmission = async (specs: any) => {
    setIsLoading(true)
    setError(null)
    setProgress({ current: 0, total: specs.moduleCount })

    try {
      const response = await fetch("/api/courses/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...specs,
          courseType,
          includeExams,
          examCount,
        }),
      })

      const data = await response.json()
      console.log("Generate API response:", data)

      if (!response.ok) {
        throw new Error(data.error || data.details || "Failed to start course generation")
      }

      setCourseId(data.courseId)
      setGeneratedCourse(data.course)
    } catch (err) {
      console.error("Course generation error:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
      setIsLoading(false)
      setProgress(null)
    }
  }

  useEffect(() => {
    let pollInterval: NodeJS.Timeout

    const pollCourseStatus = async () => {
      if (!courseId) return

      try {
        const response = await fetch(`/api/courses/status?courseId=${courseId}`)
        const data = await response.json()
        console.log("Status API response:", data)

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch course status")
        }

        setGeneratedCourse(data)
        if (data.currentModule && data.totalModules) {
          setProgress({
            current: data.currentModule,
            total: data.totalModules,
          })
        }

        if (data.status === "completed") {
          setStep(3) // Move to course preview after generation
          setIsLoading(false)
          setProgress(null)
          clearInterval(pollInterval)
        } else if (data.status === "error") {
          throw new Error(data.error || "Course generation failed")
        }
      } catch (err) {
        console.error("Error polling course status:", err)
        setError(err instanceof Error ? err.message : "An unexpected error occurred")
        setIsLoading(false)
        setProgress(null)
        clearInterval(pollInterval)
      }
    }

    if (courseId && isLoading) {
      // Poll every 3 seconds
      pollInterval = setInterval(pollCourseStatus, 3000)
      // Initial poll
      pollCourseStatus()
    }

    return () => {
      if (pollInterval) {
        clearInterval(pollInterval)
      }
    }
  }, [courseId, isLoading])

  if (isLoading) {
    return <LoadingState task="Generating your course content..." progress={progress} />
  }

  return (
    <div className="min-h-screen bg-[#FAF6F1] py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <CardContent className="p-6 sm:p-10">
          <h2 className="text-3xl font-bold text-[#2D4F1E] mb-6">Create a New Course</h2>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-8">
            {step === 1 && <CourseTypeSelection onSelect={handleCourseTypeSelection} />}

            {step === 2 && (
              <>
                <div className="flex items-center space-x-2 mb-4">
                  <Switch
                    id="include-exams"
                    checked={includeExams}
                    onCheckedChange={setIncludeExams}
                  />
                  <Label htmlFor="include-exams" className="text-sm font-medium text-gray-700">Include Exams</Label>
                </div>
                {includeExams && (
                  <div className="mb-4">
                    <Label htmlFor="exam-count">Number of Exams</Label>
                    <Input
                      id="exam-count"
                      type="number"
                      min="1"
                      max="5"
                      value={examCount}
                      onChange={(e) => setExamCount(Number.parseInt(e.target.value))}
                    />
                  </div>
                )}
                <CourseSpecificationForm
                  onSubmit={handleCourseSpecsSubmission}
                  onBack={() => setStep(1)}
                  includeExams={includeExams}
                  examCount={examCount}
                />
              </>
            )}

            {step === 3 && generatedCourse && <CoursePreview course={generatedCourse} onBack={() => setStep(2)} />}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
