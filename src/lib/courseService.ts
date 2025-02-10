// lib/courseService.ts
export async function createCourse(data: any) {
    try {
      // First, generate the course content
      const generateResponse = await fetch('/api/courses/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
  
      if (!generateResponse.ok) {
        throw new Error('Failed to generate course')
      }
  
      const { course } = await generateResponse.json()
  
      // Then save the generated course
      const saveResponse = await fetch('/api/courses/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(course)
      })
  
      if (!saveResponse.ok) {
        throw new Error('Failed to save course')
      }
  
      const { courseId } = await saveResponse.json()
      return { course, courseId }
    } catch (error) {
      console.error('Course creation error:', error)
      throw error
    }
  }
  
  export async function getCourse(id: string) {
    const response = await fetch(`/api/courses/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch course')
    }
    return response.json()
  }