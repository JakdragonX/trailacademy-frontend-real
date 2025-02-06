import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const generateModuleContent = async (
  moduleNumber: number,
  courseTitle: string,
  courseType: string,
  audience: string,
) => {
  const prompt = `Create content for module ${moduleNumber} of a ${courseType} course titled "${courseTitle}" for ${audience} audience. Respond with plain text for each section.

Title:
Description:
Lecture:
Reading 1 Title:
Reading 1 Pages:
Video 1 Title:
Video 1 Duration:
Quiz Question:
Quiz Option 1:
Quiz Option 2:
Quiz Option 3:
Quiz Option 4:
Correct Answer (1-4):
Quiz Explanation:
`

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    max_tokens: 1000,
    messages: [
      {
        role: "system",
        content: "You are an expert course creator. Provide concise, relevant content for each section.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  })

  const content = completion.choices[0].message.content.split("\n")

  return {
    id: `module-${moduleNumber}`,
    title: content[1].replace("Title:", "").trim(),
    description: content[2].replace("Description:", "").trim(),
    content: {
      lecture: content[3].replace("Lecture:", "").trim(),
      readings: [
        {
          title: content[4].replace("Reading 1 Title:", "").trim(),
          pages: content[5].replace("Reading 1 Pages:", "").trim(),
        },
      ],
      videos: [
        {
          title: content[6].replace("Video 1 Title:", "").trim(),
          duration: content[7].replace("Video 1 Duration:", "").trim(),
        },
      ],
    },
    quiz: {
      questions: [
        {
          question: content[8].replace("Quiz Question:", "").trim(),
          options: [
            content[9].replace("Quiz Option 1:", "").trim(),
            content[10].replace("Quiz Option 2:", "").trim(),
            content[11].replace("Quiz Option 3:", "").trim(),
            content[12].replace("Quiz Option 4:", "").trim(),
          ],
          correct: Number.parseInt(content[13].replace("Correct Answer (1-4):", "").trim()) - 1,
          explanation: content[14].replace("Quiz Explanation:", "").trim(),
        },
      ],
    },
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.title || !body.moduleCount || !body.courseType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const modules = []
    for (let i = 1; i <= body.moduleCount; i++) {
      try {
        const module = await generateModuleContent(i, body.title, body.courseType, body.audience)
        modules.push(module)
      } catch (moduleError) {
        console.error(`Error generating module ${i}:`, moduleError)
        // If a module fails, we'll add a placeholder instead of failing the entire course
        modules.push({
          id: `module-${i}`,
          title: `Module ${i}`,
          description: "Content generation failed for this module.",
          content: {
            lecture: "Lecture content unavailable.",
            readings: [],
            videos: [],
          },
          quiz: {
            questions: [],
          },
        })
      }
    }

    const course = {
      title: body.title,
      description: body.description,
      audience: body.audience,
      modules: modules,
    }

    return NextResponse.json({ course })
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

