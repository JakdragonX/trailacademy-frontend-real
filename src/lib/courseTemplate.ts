export interface Module {
    id: number
    title: string
    description: string
    content: {
      lecture: string
      readings: Array<{
        title: string
        pages?: string
        url?: string
      }>
      videos: Array<{
        title: string
        duration: string
        url?: string
      }>
      exercises: string[]
    }
    quiz: {
      questions: Array<{
        question: string
        options: string[]
        correct: number
        explanation: string
      }>
    }
  }
  
  export interface Course {
    title: string
    description: string
    audience: string
    moduleCount: number
    modules: Module[]
    resources: Array<{
      type: 'link' | 'book' | 'note'
      title: string
      url?: string
    }>
  }