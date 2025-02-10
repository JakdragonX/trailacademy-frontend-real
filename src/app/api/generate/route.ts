// app/api/generate/route.ts
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert course creator."
        },
        {
          role: "user",
          content: `Create a course about: ${body.title}. 
            Target audience: ${body.audience}.
            Include ${body.moduleCount} modules.`
        }
      ]
    })

    return NextResponse.json(completion.choices[0].message)
  } catch (error) {
    console.error('Generation error:', error)
    return NextResponse.json({ error: 'Failed to generate course' }, { status: 500 })
  }
}










