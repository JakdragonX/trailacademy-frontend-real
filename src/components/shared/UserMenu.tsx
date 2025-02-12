'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { 
  User, 
  LogOut, 
  Settings, 
  GraduationCap, 
  LineChart,
  ChevronDown 
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/shared/ui/dropdown-menu'

export default function UserMenu() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()
  const hostname = typeof window !== 'undefined' ? window.location.hostname : ''
  const isLearnDomain = hostname === 'learn.trailacademy.net'

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user || null)
      setLoading(false)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = isLearnDomain ? '/auth' : '/'
  }

  if (loading) {
    return <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
  }

  if (!user) {
    return (
      <div className="flex items-center gap-4">
        <Link 
          href={isLearnDomain ? '/auth' : 'https://learn.trailacademy.net/auth'}
          className="text-[#FAF6F1] hover:text-[#FAF6F1]/80 transition"
        >
          Log In
        </Link>
        <Link
          href={isLearnDomain ? '/auth' : 'https://learn.trailacademy.net/auth'}
          className="bg-[#FAF6F1] text-[#2D4F1E] px-4 py-2 rounded-full hover:bg-[#FAF6F1]/90 transition"
        >
          Sign Up
        </Link>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 text-[#FAF6F1] hover:text-[#FAF6F1]/80 transition">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-[#8B4513] flex items-center justify-center">
            <User className="h-4 w-4 text-[#FAF6F1]" />
          </div>
          <span>{user.email}</span>
          <ChevronDown className="h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white">
        <DropdownMenuLabel className="text-[#2D4F1E]">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="https://learn.trailacademy.net/dashboard" className="cursor-pointer text-[#2D4F1E]">
            <GraduationCap className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="https://learn.trailacademy.net/grades" className="cursor-pointer text-[#2D4F1E]">
            <LineChart className="mr-2 h-4 w-4" />
            <span>Grade Report</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="https://learn.trailacademy.net/settings" className="cursor-pointer text-[#2D4F1E]">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}