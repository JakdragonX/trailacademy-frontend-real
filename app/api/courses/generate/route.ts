import { NextResponse } from "next/server"
import { kv } from "@vercel/kv"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.moduleCount || !body.courseType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate course content using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert course creator.",
        },
        {
          role: "user",
          content: `Create a ${body.courseType} course about: ${body.title}. 
            Target audience: ${body.audience}.
            Include ${body.moduleCount} modules.
            Course description: ${body.description}
            Additional resources: ${JSON.stringify(body.resources)}`,
        },
      ],
    })

    const generatedCourse = JSON.parse(completion.choices[0].message.content)

    // Save the generated course to Redis KV store
    const courseId = `course:${Date.now()}`
    await kv.set(courseId, JSON.stringify(generatedCourse))

    return NextResponse.json({ course: generatedCourse, courseId })
  } catch (error) {
    console.error("Course generation error:", error)
    return NextResponse.json({ error: "Failed to generate course" }, { status: 500 })
  }
}
