'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        if (error || !user) {
          throw error || new Error('No user found')
        }
        setUser(user)
      } catch (error) {
        console.error('Error fetching user:', error)
        router.push('/auth')
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [supabase, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h1 className="text-3xl font-bold mb-4">Welcome back!</h1>
        <p className="text-lg text-gray-600 mb-4">
          {user?.email}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">My Courses</h2>
          <p className="text-gray-600">No courses enrolled yet.</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Progress</h2>
          <p className="text-gray-600">Start a course to track your progress.</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <ul className="space-y-2">
            <li>
              <button className="text-[#2D4F1E] hover:underline">Browse Courses</button>
            </li>
            <li>
              <button className="text-[#2D4F1E] hover:underline">Create Course</button>
            </li>
            <li>
              <button className="text-[#2D4F1E] hover:underline">View Profile</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}