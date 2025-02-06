import { NextResponse } from "next/server"
import { kv } from "@vercel/kv"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const courseId = searchParams.get("courseId")

  if (!courseId) {
    return NextResponse.json({ error: "Missing courseId" }, { status: 400 })
  }

  const courseData = await kv.get(courseId)

  if (!courseData) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 })
  }

  return NextResponse.json(courseData)
}
