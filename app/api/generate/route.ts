import { NextResponse } from "next/server"
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
      temperature: 0.7,
      max_tokens: 2000,
      messages: [
        {
          role: "system",
          content: "You are an expert course creator. Respond with valid JSON only.",
        },
        {
          role: "user",
          content: `Create a course with the following details:
            Title: ${body.title}
            Type: ${body.courseType}
            Target Audience: ${body.audience || "General"}
            Number of Modules: ${body.moduleCount}
            Description: ${body.description || "A comprehensive course"}
            
            Format the response as a JSON object with:
            {
              "title": string,
              "description": string,
              "audience": string,
              "modules": [{
                "title": string,
                "description": string,
                "content": {
                  "lecture": string,
                  "readings": [{"title": string, "pages": string}],
                  "videos": [{"title": string, "duration": string}]
                }
              }]
            }`,
        },
      ],
    })

    const responseContent = completion.choices[0].message.content

    try {
      const parsedCourse = JSON.parse(responseContent)
      return NextResponse.json({ course: parsedCourse })
    } catch (parseError) {
      console.error("Failed to parse OpenAI response:", responseContent)
      return NextResponse.json({ error: "Invalid course format returned" }, { status: 500 })
    }
  } catch (error) {
    console.error("Course generation error:", error)
    return NextResponse.json(
      {
        error: "Failed to generate course",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
