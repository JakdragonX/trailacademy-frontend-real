"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { CoursePreview } from "@/components/CoursePreview"
import { LoadingState } from "@/components/LoadingState"

export default function CoursePage() {
  const params = useParams()
  const courseId = Array.isArray(params.courseId) ? params.courseId[0] : params.courseId
  const [course, setCourse] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        console.log("Fetching course with ID:", courseId)
        const response = await fetch(`/api/courses/status?courseId=${courseId}`)
        const data = await response.json()
        console.log("Fetched course data:", data)

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch course")
        }

        setCourse(data)
        setIsLoading(false)
      } catch (err) {
        console.error("Error fetching course:", err)
        setError(err.message)
        setIsLoading(false)
      }
    }

    if (courseId) {
      fetchCourse()
    }
  }, [courseId])

  if (isLoading) {
    return <LoadingState task="Loading course..." courseId={courseId} />
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">Error: {error}</div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="container mx-auto py-8">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">Course not found</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <CoursePreview
        course={course}
        onBack={() => window.history.back()}
        onSave={async (updatedCourse) => {
          // Implement save functionality here
          console.log("Saving course:", updatedCourse)
        }}
      />
    </div>
  )
}
