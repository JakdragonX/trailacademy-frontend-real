import { NextResponse } from 'next/server'

// This will be replaced with actual database logic later
const courses = new Map()

export async function POST(request: Request) {
  try {
    const course = await request.json()
    const courseId = Date.now().toString() // Temporary ID generation
    
    courses.set(courseId, {
      ...course,
      id: courseId,
      createdAt: new Date().toISOString()
    })

    return NextResponse.json({ 
      success: true, 
      courseId 
    })
  } catch (error) {
    console.error('Error saving course:', error)
    return NextResponse.json(
      { error: 'Failed to save course' },
      { status: 500 }
    )
  }
}










