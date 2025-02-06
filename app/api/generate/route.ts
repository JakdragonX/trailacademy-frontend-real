import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    if (!body.title || !body.moduleCount || !body.courseType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 2000,
      messages: [
        {
          role: "system",
          content: "You are an expert course creator. Respond with valid JSON only."
        },
        {
          role: "user",
          content: `Generate content for a course with these specifications:
            Title: ${body.title}
            Type: ${body.courseType}
            Target Audience: ${body.audience || 'General'}
            Number of Modules: ${body.moduleCount}
            Description: ${body.description || 'A comprehensive course'}
            
            Generate ONLY the modules array in this format:
            {
              "modules": [{
                "id": string (unique identifier),
                "title": string,
                "description": string,
                "content": {
                  "lecture": string,
                  "readings": [{"title": string, "pages": string}],
                  "videos": [{"title": string, "duration": string}]
                },
                "quiz": {
                  "questions": [
                    {
                      "question": string,
                      "options": string[],
                      "correct": number,
                      "explanation": string
                    }
                  ]
                }
              }]
            }`
        }
      ]
    })

    const responseContent = completion.choices[0].message.content
    
    try {
      const { modules } = JSON.parse(responseContent)
      // Combine AI-generated modules with user-provided course details
      const course = {
        title: body.title,
        description: body.description,
        audience: body.audience,
        modules
      }
      return NextResponse.json({ course })
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', responseContent)
      return NextResponse.json(
        { error: 'Invalid course format returned' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Course generation error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to generate course',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
