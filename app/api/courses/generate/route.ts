import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { kv } from '@vercel/kv'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const CHUNK_SIZE = 2 // Number of modules to generate per chunk

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    if (!body.title || !body.moduleCount || !body.courseType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const courseId = `course_${Date.now()}`
    await kv.set(courseId, { ...body, generatedModules: [], status: 'processing' })

    // Start the background job
    generateCourseContent(courseId, body)

    return NextResponse.json({ courseId, message: 'Course generation started' })
  } catch (error) {
    console.error('Course generation error:', error)
    return NextResponse.json(
      { error: 'Failed to start course generation', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

async function generateCourseContent(courseId: string, courseData: any) {
  const totalChunks = Math.ceil(courseData.moduleCount / CHUNK_SIZE)

  for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
    const startModule = chunkIndex * CHUNK_SIZE + 1
    const endModule = Math.min((chunkIndex + 1) * CHUNK_SIZE, courseData.moduleCount)

    try {
      const modules = await generateModules(courseData, startModule, endModule)
      
      const currentCourse = await kv.get(courseId)
      currentCourse.generatedModules.push(...modules)
      await kv.set(courseId, currentCourse)

      if (endModule === courseData.moduleCount) {
        await kv.set(courseId, { ...currentCourse, status: 'completed' })
      }
    } catch (error) {
      console.error(`Error generating modules ${startModule}-${endModule}:`, error)
      await kv.set(courseId, { ...await kv.get(courseId), status: 'error' })
      break
    }
  }
}

async function generateModules(courseData: any, startModule: number, endModule: number) {
  const prompt = `Create modules ${startModule} to ${endModule} for a ${courseData.courseType} course titled "${courseData.title}".
  Target audience: ${courseData.audience || 'General'}
  Course description: ${courseData.description || 'A comprehensive course'}`

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    max_tokens: 2000,
    messages: [
      {
        role: "system",
        content: "You are an expert course creator. Respond with valid JSON for the modules."
      },
      { role: "user", content: prompt }
    ],
    response_format: { type: "json_object" }
  })

  return JSON.parse(completion.choices[0].message.content).modules
}
