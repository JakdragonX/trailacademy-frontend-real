'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/src/lib/context/auth'

export default function LearnPortalPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth')
    } else if (!loading && user) {
      router.push('/learn/dashboard')
    }
  }, [user, loading, router])

  // Show loading state while checking auth or redirecting
  return (
    <div className="min-h-screen bg-[#FAF6F1] flex items-center justify-center">
      <div className="text-lg">Redirecting to your dashboard...</div>
    </div>
  )
}