// app/api/courses/generate/route.ts
import { NextResponse } from 'next/server'
import { generateCourse } from '@/lib/aiService'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.title || !body.moduleCount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const course = await generateCourse({
      title: body.title,
      description: body.description,
      audience: body.audience,
      moduleCount: body.moduleCount,
      resources: body.resources
    })

    return NextResponse.json({ course })
  } catch (error) {
    console.error('Course generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate course' },
      { status: 500 }
    )
  }
}
