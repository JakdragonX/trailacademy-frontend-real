'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/src/lib/context/auth'
import Navbar from "@/src/components/shared/Navbar"
import { getMainUrl } from '@/src/lib/config/domains'

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Check if we're on the learn domain
    const isLearnDomain = window.location.hostname.startsWith('learn.')
    
    if (!isLearnDomain) {
      window.location.href = getMainUrl()
      return
    }

    // If not loading and no user, redirect to auth
    if (!loading && !user) {
      window.location.href = getMainUrl('/auth')
    }
  }, [user, loading])

  // Show loading state while checking auth
  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#FAF6F1] flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF6F1]">
      <Navbar />
      <main>{children}</main>
    </div>
  )
}