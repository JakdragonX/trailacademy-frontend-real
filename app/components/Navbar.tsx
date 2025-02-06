"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Logo from "./Logo"
import { LoadingState } from "./LoadingState"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingTask, setLoadingTask] = useState("")
  const [loadingProgress, setLoadingProgress] = useState(null)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isLoading) {
      router.push("/courses")
    }
  }, [isLoading, router])

  if (!isClient) return null

  return (
    <nav className="bg-[#2D4F1E] text-[#FAF6F1] p-4 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Logo />
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/courses" className="hover:text-[#FAF6F1]/80 transition">
            Courses
          </Link>
          <Link href="/guides" className="hover:text-[#FAF6F1]/80 transition">
            Guides
          </Link>
          <Link href="/mission" className="hover:text-[#FAF6F1]/80 transition">
            Mission
          </Link>
          <Link href="/community" className="hover:text-[#FAF6F1]/80 transition">
            Community
          </Link>
          <div className="flex items-center space-x-2">
            <Link
              href="/login"
              className="bg-[#FAF6F1] text-[#2D4F1E] px-4 py-2 rounded-full hover:bg-[#FAF6F1]/90 transition"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-[#FAF6F1] text-[#2D4F1E] px-4 py-2 rounded-full hover:bg-[#FAF6F1]/90 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
        {isLoading && (
          <LoadingState
            task={loadingTask}
            progress={loadingProgress}
            isMinimized={true}
            onMaximize={() => setIsLoading(false)}
          />
        )}
      </div>
    </nav>
  )
}
