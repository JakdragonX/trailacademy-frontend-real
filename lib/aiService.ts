// lib/aiService.ts
import OpenAI from 'openai'
import type { Course } from './courseTemplate'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function generateCourse(config: {
  title: string
  description: string
  audience: string
  moduleCount: number
  resources: any[]
}): Promise<Course> {
  const prompt = `Create a structured course following this exact JSON format:
  {
    "title": "Course Title",
    "description": "Course description",
    "audience": "Target audience",
    "moduleCount": 5,
    "modules": [
      {
        "title": "Module Title",
        "description": "Module description",
        "content": {
          "lecture": "Lecture content",
          "readings": [
            {
              "title": "Reading title",
              "pages": "1-10"
            }
          ],
          "videos": [
            {
              "title": "Video title",
              "duration": "10:00"
            }
          ],
          "exercises": [
            "Exercise description"
          ]
        },
        "quiz": {
          "questions": [
            {
              "question": "Question text",
              "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
              "correct": 0,
              "explanation": "Why this answer is correct"
            }
          ]
        }
      }
    ]
  }

  Use these specific details:
  Title: ${config.title}
  Description: ${config.description}
  Target Audience: ${config.audience}
  Number of Modules: ${config.moduleCount}
  
  Return only valid JSON following the exact structure above.`

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a course creation expert. You will return all responses in JSON format."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    })

    const response = JSON.parse(completion.choices[0].message.content || '{}')
    return response as Course
  } catch (error) {
    console.error('AI generation error:', error)
    throw new Error('Failed to generate course content')
  }
}

// Add more API/AI's later.