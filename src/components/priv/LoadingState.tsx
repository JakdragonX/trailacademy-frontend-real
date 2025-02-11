"use client"

import { Layout, BookOpen, FileText, Video, Brain } from 'lucide-react'

export function LoadingState({ task }) {
  const steps = [
    { icon: Layout, text: "Structuring course outline..." },
    { icon: BookOpen, text: "Generating learning materials..." },
    { icon: FileText, text: "Creating assessments..." },
    { icon: Video, text: "Curating video content..." },
    { icon: Brain, text: "Finalizing course content..." }
  ]

  const currentStepIndex = steps.findIndex(step => 
    step.text.toLowerCase().includes(task?.toLowerCase())
  ) || 0

  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md space-y-8">
        <h2 className="text-2xl font-bold text-center mb-8">Generating Your Course</h2>
        
        <div className="space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isCurrentStep = index === currentStepIndex
            const isCompleted = index < currentStepIndex

            return (
              <div 
                key={index}
                className={`flex items-center space-x-4 transition-all duration-500 ${
                  isCurrentStep ? 'scale-105' : ''
                }`}
              >
                <div className={`
                  p-2 rounded-full
                  ${isCompleted ? 'bg-green-100 text-green-600' : 
                    isCurrentStep ? 'bg-[#FAF6F1] text-[#2D4F1E] animate-pulse' : 
                    'bg-gray-100 text-gray-400'}
                `}>
                  <Icon size={24} />
                </div>
                <span className={`
                  ${isCompleted ? 'text-green-600' : 
                    isCurrentStep ? 'text-[#2D4F1E]' : 
                    'text-gray-400'}
                `}>
                  {step.text}
                </span>
                {isCompleted && (
                  <span className="text-green-600">✓</span>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-8 text-center text-gray-600">
          This might take a minute...
        </div>
      </div>
    </div>
  )
}











