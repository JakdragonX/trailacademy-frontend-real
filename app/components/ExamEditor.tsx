"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Minus } from "lucide-react"

interface ExamQuestion {
  type: "multiple-choice" | "short-answer" | "essay" | "true-false"
  question: string
  options?: Array<{
    text: string
    isCorrect: boolean
  }>
  answer?: string
  points: number
}

interface Exam {
  title: string
  description: string
  questions: ExamQuestion[]
  totalPoints: number
}

interface ExamEditorProps {
  exam: Exam
  onSave: (updatedExam: Exam) => void
  onCancel: () => void
}

export function ExamEditor({ exam, onSave, onCancel }: ExamEditorProps) {
  const [editedExam, setEditedExam] = useState<Exam>(exam)

  const handleInputChange = (field: string, value: string) => {
    setEditedExam({ ...editedExam, [field]: value })
  }

  const handleQuestionChange = (index: number, field: string, value: string | number) => {
    const updatedQuestions = [...editedExam.questions]
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value }
    setEditedExam({ ...editedExam, questions: updatedQuestions })
  }

  const handleOptionChange = (questionIndex: number, optionIndex: number, field: string, value: string | boolean) => {
    const updatedQuestions = [...editedExam.questions]
    updatedQuestions[questionIndex].options[optionIndex] = {
      ...updatedQuestions[questionIndex].options[optionIndex],
      [field]: value,
    }
    setEditedExam({ ...editedExam, questions: updatedQuestions })
  }

  const addQuestion = (type: ExamQuestion["type"]) => {
    const newQuestion: ExamQuestion = {
      type,
      question: "",
      points: 0,
    }
    if (type === "multiple-choice" || type === "true-false") {
      newQuestion.options = [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ]
    }
    setEditedExam({
      ...editedExam,
      questions: [...editedExam.questions, newQuestion],
    })
  }

  const removeQuestion = (index: number) => {
    const updatedQuestions = [...editedExam.questions]
    updatedQuestions.splice(index, 1)
    setEditedExam({ ...editedExam, questions: updatedQuestions })
  }

  const addOption = (questionIndex: number) => {
    const updatedQuestions = [...editedExam.questions]
    updatedQuestions[questionIndex].options.push({ text: "", isCorrect: false })
    setEditedExam({ ...editedExam, questions: updatedQuestions })
  }

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...editedExam.questions]
    updatedQuestions[questionIndex].options.splice(optionIndex, 1)
    setEditedExam({ ...editedExam, questions: updatedQuestions })
  }

  const calculateTotalPoints = () => {
    const totalPoints = editedExam.questions.reduce((sum, question) => sum + question.points, 0)
    setEditedExam({ ...editedExam, totalPoints })
  }

  return (
    <div className="space-y-6">
      <Input
        value={editedExam.title}
        onChange={(e) => handleInputChange("title", e.target.value)}
        placeholder="Exam Title"
      />
      <Textarea
        value={editedExam.description}
        onChange={(e) => handleInputChange("description", e.target.value)}
        placeholder="Exam Description"
      />

      <div className="space-y-4">
        {editedExam.questions.map((question, qIndex) => (
          <Card key={qIndex}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-2">
                <Select value={question.type} onValueChange={(value) => handleQuestionChange(qIndex, "type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Question Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                    <SelectItem value="short-answer">Short Answer</SelectItem>
                    <SelectItem value="essay">Essay</SelectItem>
                    <SelectItem value="true-false">True/False</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="destructive" size="sm" onClick={() => removeQuestion(qIndex)}>
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                value={question.question}
                onChange={(e) => handleQuestionChange(qIndex, "question", e.target.value)}
                placeholder="Question"
                className="mb-2"
              />
              <Input
                type="number"
                value={question.points}
                onChange={(e) => handleQuestionChange(qIndex, "points", Number.parseInt(e.target.value))}
                placeholder="Points"
                className="mb-2"
              />
              {(question.type === "multiple-choice" || question.type === "true-false") && (
                <div className="space-y-2">
                  {question.options.map((option, oIndex) => (
                    <div key={oIndex} className="flex items-center gap-2">
                      <Input
                        value={option.text}
                        onChange={(e) => handleOptionChange(qIndex, oIndex, "text", e.target.value)}
                        placeholder={`Option ${oIndex + 1}`}
                      />
                      <input
                        type="checkbox"
                        checked={option.isCorrect}
                        onChange={(e) => handleOptionChange(qIndex, oIndex, "isCorrect", e.target.checked)}
                      />
                      <Button variant="destructive" size="sm" onClick={() => removeOption(qIndex, oIndex)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button onClick={() => addOption(qIndex)}>Add Option</Button>
                </div>
              )}
              {(question.type === "short-answer" || question.type === "essay") && (
                <Textarea
                  value={question.answer}
                  onChange={(e) => handleQuestionChange(qIndex, "answer", e.target.value)}
                  placeholder="Answer"
                />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <Button onClick={() => addQuestion("multiple-choice")}>Add Multiple Choice</Button>
        <Button onClick={() => addQuestion("short-answer")}>Add Short Answer</Button>
        <Button onClick={() => addQuestion("essay")}>Add Essay</Button>
        <Button onClick={() => addQuestion("true-false")}>Add True/False</Button>
      </div>

      <div className="flex justify-between">
        <Button onClick={onCancel} variant="outline">
          Cancel
        </Button>
        <Button
          onClick={() => {
            calculateTotalPoints()
            onSave(editedExam)
          }}
        >
          Save Exam
        </Button>
      </div>
    </div>
  )
}
