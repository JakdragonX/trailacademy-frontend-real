import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const systemPrompt = `You are an expert course creator. You MUST respond with ONLY valid JSON in the following format:
{
  "modules": [
    {
      "id": "module-1",
      "title": "Module Title",
      "description": "Module Description",
      "content": {
        "lecture": "Lecture content here",
        "readings": [
          {
            "title": "Reading Title",
            "pages": "1-10"
          }
        ],
        "videos": [
          {
            "title": "Video Title",
            "duration": "10:00"
          }
        ]
      },
      "quiz": {
        "questions": [
          {
            "question": "Question text",
            "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
            "correct": 0,
            "explanation": "Explanation for the correct answer"
          }
        ]
      }
    }
  ]
}`

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.title || !body.moduleCount || !body.courseType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 2000,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: `Create ${body.moduleCount} modules for a ${body.courseType} course titled "${body.title}".
    Target audience: ${body.audience || "General"}
    Course description: ${body.description || "A comprehensive course"}
    
    Remember to:
    1. ONLY return valid JSON
    2. Include exactly ${body.moduleCount} modules
    3. Follow the exact format specified in the system prompt
    4. Ensure each module has unique content
    5. Make sure all JSON is properly formatted with no trailing commas`,
        },
      ],
      response_format: { type: "json_object" },
    })

    const responseContent = completion.choices[0].message.content

    try {
      // First, validate that we have valid JSON
      const parsedResponse = JSON.parse(responseContent)

      // Then validate that it has the modules array
      if (!parsedResponse.modules || !Array.isArray(parsedResponse.modules)) {
        throw new Error("Invalid response format: missing modules array")
      }

      // Create the final course object
      const course = {
        title: body.title,
        description: body.description,
        audience: body.audience,
        modules: parsedResponse.modules.map((module, index) => ({
          ...module,
          id: module.id || `module-${index + 1}`,
        })),
      }

      return NextResponse.json({ course })
    } catch (parseError) {
      console.error("Failed to parse OpenAI response:", responseContent)
      return NextResponse.json(
        {
          error: "Invalid course format returned",
          details: parseError.message,
          response: responseContent,
        },
        { status: 500 },
      )
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
