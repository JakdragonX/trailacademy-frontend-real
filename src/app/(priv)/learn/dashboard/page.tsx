'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import AuthTest from '@/src/components/auth/AuthTest' // Add this component for testing

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        if (error) throw error
        setUser(user)
      } catch (error) {
        console.error('Error fetching user:', error)
        window.location.href = '/auth'
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [supabase])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF6F1] flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null // Middleware should handle redirect
  }

  return (
    <div className="min-h-screen bg-[#FAF6F1] text-[#2D4F1E] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold mb-2">Welcome to Trail Academy</h1>
          <p className="text-lg text-gray-600">
            Hello {user.email}! Let's start your learning journey.
          </p>
          <div className="mt-4">
            <AuthTest />
          </div>
        </div>
      </div>
    </div>
  )
}