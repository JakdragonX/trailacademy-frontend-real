import { NextResponse } from "next/server"
import { generateCourse } from "@/lib/aiService"
import { saveCourse } from "@/lib/courseService"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.moduleCount || !body.courseType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const course = await generateCourse({
      title: body.title,
      description: body.description,
      audience: body.audience,
      moduleCount: body.moduleCount,
      resources: body.resources,
      courseType: body.courseType,
    })

    // Save the generated course
    const savedCourse = await saveCourse(course)

    return NextResponse.json({ course: savedCourse })
  } catch (error) {
    console.error("Course generation error:", error)
    return NextResponse.json({ error: "Failed to generate course" }, { status: 500 })
  }
}

