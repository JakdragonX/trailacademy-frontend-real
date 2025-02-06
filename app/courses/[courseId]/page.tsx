"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { CoursePreview } from "../../components/CoursePreview"
import { LoadingState } from "../../components/LoadingState"

export default function CoursePage() {
  const { courseId } = useParams()
  const [course, setCourse] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/status?courseId=${courseId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch course")
        }
        const data = await response.json()
        setCourse(data)
        setIsLoading(false)
      } catch (err) {
        setError(err.message)
        setIsLoading(false)
      }
    }

    fetchCourse()
  }, [courseId])

  if (isLoading) {
    return <LoadingState task="Loading course..." courseId={courseId as string} />
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!course) {
    return <div>Course not found</div>
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
