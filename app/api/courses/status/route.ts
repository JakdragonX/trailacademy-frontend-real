import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get('courseId')

    if (!courseId) {
      return NextResponse.json({ error: 'Missing courseId' }, { status: 400 })
    }

    const courseData = await kv.get(courseId)

    if (!courseData) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    // Add debugging information
    console.log('Retrieved course data:', JSON.stringify(courseData, null, 2))

    return NextResponse.json(courseData)
  } catch (error) {
    console.error('Error fetching course status:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch course status',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
