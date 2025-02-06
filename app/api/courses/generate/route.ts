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
  ],
  "exams": [
    {
      "id": "exam-1",
      "title": "Exam Title",
      "description": "Exam Description",
      "questions": [
        {
          "type": "multiple-choice",
          "question": "Question text",
          "options": [
            {
              "text": "Option 1",
              "isCorrect": false
            },
            {
              "text": "Option 2",
              "isCorrect": true
            }
          ],
          "explanation": "Explanation for the correct answer"
        },
        {
          "type": "essay",
          "question": "Essay question text",
          "sampleAnswer": "Sample answer or outline for the essay question"
        }
      ]
    }
  ]
}`

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("Received request body:", body)

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
      includeExams: body.includeExams,
      examCount: body.examCount,
      status: "processing",
      modules: [],
      exams: [],
      currentModule: 0,
      totalModules: body.moduleCount,
      createdAt: new Date().toISOString(),
    }

    console.log("Storing initial course data:", initialCourseData)
    await kv.set(courseId, initialCourseData)

    // Start the background job
    generateCourseContent(courseId, body).catch((error) => {
      console.error("Background job error:", error)
      kv.set(courseId, { ...initialCourseData, status: "error", error: error.message })
    })

    console.log("Course generation started for courseId:", courseId)
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
  let allExams: any[] = []

  for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
    const startModule = chunkIndex * CHUNK_SIZE + 1
    const endModule = Math.min((chunkIndex + 1) * CHUNK_SIZE, courseData.moduleCount)

    try {
      console.log(`Generating modules ${startModule}-${endModule} for course ${courseId}`)

      const { modules, exams } = await generateModulesAndExams(courseData, startModule, endModule, allModules, allExams)
      allModules = [...allModules, ...modules]
      allExams = [...allExams, ...exams]

      // Update course with all modules and exams generated so far
      const updatedCourse = {
        ...(await kv.get(courseId)),
        modules: allModules,
        exams: allExams,
        currentModule: endModule,
        lastUpdated: new Date().toISOString(),
      }

      // If this is the last chunk, mark as completed
      if (endModule === courseData.moduleCount) {
        updatedCourse.status = "completed"
      }

      console.log(`Updating course ${courseId} with modules ${startModule}-${endModule} and exams`)
      await kv.set(courseId, updatedCourse)
      console.log(`Updated course ${courseId}`)
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

async function generateModulesAndExams(
  courseData: any,
  startModule: number,
  endModule: number,
  existingModules: any[],
  existingExams: any[],
) {
  const moduleSummaries = existingModules.map((module) => ({
    id: module.id,
    title: module.title,
    description: module.description,
    keyTerms: extractKeyTerms(module.content.lecture),
  }))

  const examSummaries = existingExams.map((exam) => ({
    id: exam.id,
    title: exam.title,
    description: exam.description,
  }))

  const prompt = `Create modules ${startModule} to ${endModule} for a ${courseData.courseType} course titled "${courseData.title}".
Target audience: ${courseData.audience || "General"}
Course description: ${courseData.description || "A comprehensive course"}
${courseData.includeExams ? `Include ${courseData.examCount} exam(s) throughout the course.` : ""}

Existing modules:
${JSON.stringify(moduleSummaries, null, 2)}

${
  courseData.includeExams
    ? `Existing exams:
${JSON.stringify(examSummaries, null, 2)}`
    : ""
}

Remember to:
1. Create detailed, engaging content for each module
2. Include practical examples and real-world applications
3. Create challenging but fair quiz questions
4. Provide thorough explanations for quiz answers
5. Ensure new content builds upon and doesn't duplicate existing modules
${courseData.includeExams ? "6. Create comprehensive exams that cover multiple modules" : ""}`

  console.log("Sending prompt to OpenAI:", prompt)

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
    const modules = parsedResponse.modules.map((module: any, index: number) => ({
      ...module,
      id: module.id || `module-${startModule + index}`,
    }))
    const exams = parsedResponse.exams
      ? parsedResponse.exams.map((exam: any, index: number) => ({
          ...exam,
          id: exam.id || `exam-${existingExams.length + index + 1}`,
        }))
      : []
    return { modules, exams }
  } catch (error) {
    console.error("Failed to parse OpenAI response:", responseContent)
    throw new Error("Failed to parse course content")
  }
}

function extractKeyTerms(text: string): string[] {
  // This is a simple implementation. You might want to use a more sophisticated method
  // or even another AI call to extract key terms.
  const words = text.split(/\s+/)
  const keyTerms = words.filter((word) => word.length > 5 && word[0] === word[0].toUpperCase())
  return [...new Set(keyTerms)].slice(0, 5) // Return up to 5 unique key terms
}
