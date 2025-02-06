import { NextResponse } from "next/server"
import OpenAI from "openai"
import { kv } from "@vercel/kv"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const CHUNK_SIZE = 2 // Number of modules to generate per chunk

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
            "pages": "1-10",
            "content": "Reading content here"
          }
        ],
        "videos": [
          {
            "title": "Video Title",
            "duration": "10:00",
            "url": ""
          }
        ]
      },
      "quiz": {
        "questions": [
          {
            "question": "Question text",
            "options": [
              {
                "text": "Option 1",
                "isCorrect": false,
                "explanation": "Why this option is correct/incorrect"
              },
              {
                "text": "Option 2",
                "isCorrect": true,
                "explanation": "Why this option is correct/incorrect"
              }
            ]
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

    const courseId = `course_${Date.now()}`

    // Store initial course data
    const initialCourseData = {
      id: courseId,
      title: body.title,
      description: body.description,
      audience: body.audience,
      courseType: body.courseType,
      moduleCount: body.moduleCount,
      status: "processing",
      modules: [],
      currentModule: 0,
      totalModules: body.moduleCount,
      createdAt: new Date().toISOString(),
    }

    await kv.set(courseId, initialCourseData)

    // Start the background job
    generateCourseContent(courseId, body).catch((error) => {
      console.error("Background job error:", error)
      kv.set(courseId, { ...initialCourseData, status: "error", error: error.message })
    })

    return NextResponse.json({
      courseId,
      message: "Course generation started",
      course: initialCourseData,
    })
  } catch (error) {
    console.error("Course generation error:", error)
    return NextResponse.json(
      { error: "Failed to start course generation", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

async function generateCourseContent(courseId: string, courseData: any) {
  const totalChunks = Math.ceil(courseData.moduleCount / CHUNK_SIZE)
  let allModules: any[] = []

  for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
    const startModule = chunkIndex * CHUNK_SIZE + 1
    const endModule = Math.min((chunkIndex + 1) * CHUNK_SIZE, courseData.moduleCount)

    try {
      console.log(`Generating modules ${startModule}-${endModule} for course ${courseId}`)

      const newModules = await generateModules(courseData, startModule, endModule)
      allModules = [...allModules, ...newModules]

      // Update course with all modules generated so far
      const updatedCourse = {
        ...(await kv.get(courseId)),
        modules: allModules,
        currentModule: endModule,
        lastUpdated: new Date().toISOString(),
      }

      // If this is the last chunk, mark as completed
      if (endModule === courseData.moduleCount) {
        updatedCourse.status = "completed"
      }

      await kv.set(courseId, updatedCourse)
      console.log(`Updated course ${courseId} with modules ${startModule}-${endModule}`)
    } catch (error) {
      console.error(`Error generating modules ${startModule}-${endModule}:`, error)
      const currentCourse = await kv.get(courseId)
      await kv.set(courseId, {
        ...currentCourse,
        status: "error",
        error: error instanceof Error ? error.message : "Unknown error",
        lastUpdated: new Date().toISOString(),
      })
      throw error
    }
  }
}

async function generateModules(courseData: any, startModule: number, endModule: number) {
  const prompt = `Create modules ${startModule} to ${endModule} for a ${courseData.courseType} course titled "${courseData.title}".
Target audience: ${courseData.audience || "General"}
Course description: ${courseData.description || "A comprehensive course"}

Remember to:
1. Create detailed, engaging content for each module
2. Include practical examples and real-world applications
3. Create challenging but fair quiz questions
4. Provide thorough explanations for quiz answers`

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    max_tokens: 2000,
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      { role: "user", content: prompt },
    ],
    response_format: { type: "json_object" },
  })

  const responseContent = completion.choices[0].message.content
  console.log("OpenAI response:", responseContent)

  try {
    const parsedResponse = JSON.parse(responseContent)
    if (!parsedResponse.modules || !Array.isArray(parsedResponse.modules)) {
      throw new Error("Invalid response format: missing modules array")
    }
    return parsedResponse.modules.map((module: any, index: number) => ({
      ...module,
      id: module.id || `module-${startModule + index}`,
    }))
  } catch (error) {
    console.error("Failed to parse OpenAI response:", responseContent)
    throw new Error("Failed to parse course content")
  }
}
