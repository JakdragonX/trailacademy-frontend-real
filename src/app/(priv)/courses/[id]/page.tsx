'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function CourseViewPage({ params }: { params: { id: string } }) {
  const [course, setCourse] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const loadCourse = async () => {
      try {
        // TODO: Replace with actual course fetching logic
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .eq('id', params.id)
          .single()

        if (error) throw error
        setCourse(data)
      } catch (error) {
        console.error('Error loading course:', error)
        router.push('/dashboard')
      } finally {
        setLoading(false)
      }
    }

    loadCourse()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading course...</div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Course not found</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        {/* Add course content here */}
      </div>
    </div>
  )
}