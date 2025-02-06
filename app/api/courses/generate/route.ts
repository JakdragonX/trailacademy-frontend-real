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
            Additional resources: ${JSON.stringify(body.resources)}
            
            Respond with a JSON object containing the following properties:
            {
              "title": "Course Title",
              "description": "Course Description",
              "audience": "Target Audience",
              "modules": [
                {
                  "title": "Module Title",
                  "description": "Module Description",
                  "content": {
                    "lecture": "Module Content",
                    "readings": [{"title": "Reading Title", "pages": "Page Range"}],
                    "videos": [{"title": "Video Title", "duration": "Duration"}]
                  },
                  "quiz": {
                    "questions": [
                      {
                        "question": "Question Text",
                        "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
                        "correct": 0,
                        "explanation": "Explanation for the correct answer"
                      }
                    ]
                  }
                }
              ]
            }`,
        },
      ],
    })

    let generatedCourse
    try {
      generatedCourse = JSON.parse(completion.choices[0].message.content)
    } catch (parseError) {
      console.error("Error parsing OpenAI response:", parseError)
      return NextResponse.json({ error: "Failed to parse generated course content" }, { status: 500 })
    }

    // Save the generated course to Redis KV store
    const courseId = `course:${Date.now()}`
    await kv.set(courseId, JSON.stringify(generatedCourse))

    return NextResponse.json({ course: generatedCourse, courseId })
  } catch (error) {
    console.error("Course generation error:", error)
    return NextResponse.json({ error: "Failed to generate course", details: error.message }, { status: 500 })
  }
}
