import { Loader2 } from "lucide-react"

interface LoadingStateProps {
  task: string
  progress?: {
    current: number
    total: number
  }
}

export function LoadingState({ task, progress }: LoadingStateProps) {
  return (
    <div className="min-h-screen bg-[#FAF6F1] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full space-y-4">
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
