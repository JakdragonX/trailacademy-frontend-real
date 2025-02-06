"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface Question {
  question: string
  options: Array<{
    text: string
    isCorrect: boolean
    explanation: string
  }>
}

export function QuizView({ questions, onComplete }) {
  const [answers, setAnswers] = useState(questions.map(() => null))
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const handleSubmit = () => {
    let correctAnswers = 0
    questions.forEach((question, index) => {
      if (answers[index] !== null && question.options[answers[index]].isCorrect) {
        correctAnswers++
      }
    })
    setScore(correctAnswers)
    setSubmitted(true)
    onComplete(correctAnswers)
  }

  return (
    <div>
      {questions.map((question, index) => (
        <div key={index} className="space-y-2 mb-4">
          <p className="font-medium text-[#2D4F1E]">{question.question}</p>
          {!submitted && (
            <div>
              {question.options.map((option, optionIndex) => (
                <label key={optionIndex} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={optionIndex}
                    checked={answers[index] === optionIndex}
                    onChange={() => setAnswers(answers.map((a, i) => (i === index ? optionIndex : a)))}
                  />
                  {option.text}
                </label>
              ))}
            </div>
          )}
          {submitted && (
            <div>
              <p className="text-gray-600">
                {question.options[answers[index] || 0].isCorrect ? "Correct" : "Incorrect"}
              </p>
              <p className="text-gray-600">{question.options[answers[index] || 0].explanation}</p>
            </div>
          )}
        </div>
      ))}
      {!submitted && <Button onClick={handleSubmit}>Submit</Button>}
      {submitted && (
        <p>
          You scored {score} out of {questions.length}
        </p>
      )}
    </div>
  )
}
