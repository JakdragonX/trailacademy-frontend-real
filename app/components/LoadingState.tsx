"use client"

import { useState, useEffect } from "react"
import { Loader2, Minimize2, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LoadingStateProps {
  task: string
  progress?: {
    current: number
    total: number
  }
  courseId: string
}

export function LoadingState({ task, progress, courseId }: LoadingStateProps) {
  const [isMinimized, setIsMinimized] = useState(false)

  useEffect(() => {
    // Get minimized state from localStorage using a global key
    const storedState = localStorage.getItem("loadingStateMinimized")
    if (storedState) {
      setIsMinimized(JSON.parse(storedState))
    }
  }, [])

  useEffect(() => {
    // Store minimized state globally
    localStorage.setItem("loadingStateMinimized", JSON.stringify(isMinimized))
  }, [isMinimized])

  if (isMinimized) {
    return (
      <Button
        className="fixed bottom-4 right-4 z-40 bg-[#2D4F1E] text-white border border-white hover:bg-[#4A7A30] transition-colors"
        onClick={() => setIsMinimized(false)}
      >
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
        {progress ? `${progress.current}/${progress.total}` : "Loading"}
        <Maximize2 className="h-4 w-4 ml-2" />
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full space-y-4 relative">
        <Button className="absolute top-2 right-2" variant="ghost" size="sm" onClick={() => setIsMinimized(true)}>
          <Minimize2 className="h-4 w-4" />
        </Button>
        <div className="flex flex-col items-center justify-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-[#2D4F1E]" />
          <h3 className="text-xl font-semibold text-[#2D4F1E]">{task}</h3>
          {progress && (
            <div className="w-full space-y-2">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#2D4F1E] transition-all duration-500"
                  style={{ width: `${(progress.current / progress.total) * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 text-center">
                Generating module {progress.current} of {progress.total}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
