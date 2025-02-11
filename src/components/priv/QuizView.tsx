"use client"

import { useState } from 'react'
import { Card, CardContent } from "@/src/components/shared/ui/card"
import { CheckCircle2, XCircle, AlertCircle, ChevronRight, ChevronLeft, Award } from 'lucide-react'

interface Question {
  question: string
  options: string[]
  correct: number
  explanation: string
}

interface QuizViewProps {
  questions: Question[]
  onComplete?: (score: number) => void
  onBack?: () => void
}

export function QuizView({ questions, onComplete, onBack }: QuizViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1))
  const [showExplanation, setShowExplanation] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const currentQuestion = questions[currentIndex]

  const handleAnswer = (optionIndex: number) => {
    if (showExplanation) return
    
    const newAnswers = [...answers]
    newAnswers[currentIndex] = optionIndex
    setAnswers(newAnswers)
    setShowExplanation(true)
  }

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setShowExplanation(false)
    } else if (!isComplete) {
      const score = answers.reduce((acc, answer, idx) => 
        acc + (answer === questions[idx].correct ? 1 : 0), 0
      )
      setIsComplete(true)
      onComplete?.(score)
    }
  }

  const getScore = () => {
    return (answers.filter((answer, idx) => answer === questions[idx].correct).length / questions.length) * 100
  }

  if (isComplete) {
    const score = getScore()
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <Award className="w-16 h-16 mx-auto mb-4 text-[#2D4F1E]" />
          <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
          <div className="text-6xl font-bold text-[#2D4F1E] mb-4">
            {score.toFixed(0)}%
          </div>
          <p className="text-gray-600 mb-6">
            {answers.filter((a, i) => a === questions[i].correct).length} out of {questions.length} correct
          </p>
          <div className="space-x-4">
            <button
              onClick={() => {
                setIsComplete(false)
                setCurrentIndex(0)
                setAnswers(Array(questions.length).fill(-1))
                setShowExplanation(false)
              }}
              className="bg-[#2D4F1E] text-white px-6 py-2 rounded hover:bg-[#1F3614]"
            >
              Try Again
            </button>
            <button
              onClick={onBack}
              className="border-2 border-[#2D4F1E] px-6 py-2 rounded hover:bg-[#FAF6F1]"
            >
              Back to Module
            </button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-[#2D4F1E]">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-6">{currentQuestion.question}</h3>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={showExplanation}
                className={`w-full text-left p-4 rounded transition-all ${
                  showExplanation
                    ? idx === currentQuestion.correct
                      ? 'bg-green-100'
                      : answers[currentIndex] === idx
                        ? 'bg-red-100'
                        : 'bg-gray-50'
                    : answers[currentIndex] === idx
                      ? 'bg-[#2D4F1E] text-white'
                      : 'bg-[#FAF6F1] hover:bg-[#2D4F1E]/10'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className="mt-6 p-4 rounded bg-[#FAF6F1]">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 mt-0.5 text-[#2D4F1E]" />
                <p className="text-gray-600">{currentQuestion.explanation}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        {currentIndex > 0 && (
          <button
            onClick={() => {
              setCurrentIndex(currentIndex - 1)
              setShowExplanation(answers[currentIndex - 1] !== -1)
            }}
            className="flex items-center gap-2"
          >
            <ChevronLeft /> Previous
          </button>
        )}
        
        {showExplanation && (
          <button
            onClick={nextQuestion}
            className="bg-[#2D4F1E] text-white px-6 py-2 rounded hover:bg-[#1F3614] ml-auto flex items-center gap-2"
          >
            {currentIndex === questions.length - 1 ? 'Complete Quiz' : 'Next Question'}
            <ChevronRight />
          </button>
        )}
      </div>
    </div>
  )
}










