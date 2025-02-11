'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function LearnPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [url, setUrl] = useState<string>('Loading...')
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session) {
          router.push('/auth')
          return
        }
        
        setUrl(window.location.href)
        setIsLoading(false)
      } catch (error) {
        console.error('Auth check error:', error)
        router.push('/auth')
      }
    }

    checkAuth()
  }, [router, supabase.auth])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF6F1] text-[#2D4F1E] p-8 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF6F1] text-[#2D4F1E] p-8">
      <h1 className="text-4xl font-bold">Learn Dashboard</h1>
      <p className="mt-4">You have successfully logged in!</p>
      <div className="mt-8 p-4 bg-white rounded-lg shadow">
        <pre>{url}</pre>
      </div>
    </div>
  )
}