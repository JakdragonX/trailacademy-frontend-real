"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Minus, RefreshCw } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ExamEditor } from "./ExamEditor"

interface Question {
  question: string
  options: Array<{
    text: string
    isCorrect: boolean
    explanation: string
  }>
}

interface Module {
  id: string
  title: string
  description: string
  content: {
    lecture: string
    readings: Array<{
      title: string
      pages: string
      content: string
    }>
    videos: Array<{
      title: string
      duration: string
      url: string
    }>
  }
  quiz: {
    questions: Question[]
  }
  exam?: {
    title: string
    description: string
    questions: any[]
  }
}

interface ModuleEditorProps {
  module: Module
  onSave: (updatedModule: Module) => void
  onCancel: () => void
}

export function ModuleEditor({ module, onSave, onCancel }: ModuleEditorProps) {
  const [editedModule, setEditedModule] = useState<Module>(module)
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false)
  const [aiPrompt, setAIPrompt] = useState("")
  const [isExamEditorOpen, setIsExamEditorOpen] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setEditedModule({ ...editedModule, [field]: value })
  }

  const handleContentChange = (field: string, value: string) => {
    setEditedModule({
      ...editedModule,
      content: { ...editedModule.content, [field]: value },
    })
  }

  const handleReadingChange = (index: number, field: string, value: string) => {
    const updatedReadings = [...editedModule.content.readings]
    updatedReadings[index] = { ...updatedReadings[index], [field]: value }
    setEditedModule({
      ...editedModule,
      content: { ...editedModule.content, readings: updatedReadings },
    })
  }

  const handleVideoChange = (index: number, field: string, value: string) => {
    const updatedVideos = [...editedModule.content.videos]
    updatedVideos[index] = { ...updatedVideos[index], [field]: value }
    setEditedModule({
      ...editedModule,
      content: { ...editedModule.content, videos: updatedVideos },
    })
  }

  const handleQuestionChange = (index: number, field: string, value: string) => {
    const updatedQuestions = [...editedModule.quiz.questions]
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value }
    setEditedModule({
      ...editedModule,
      quiz: { ...editedModule.quiz, questions: updatedQuestions },
    })
  }

  const handleOptionChange = (questionIndex: number, optionIndex: number, field: string, value: string | boolean) => {
    const updatedQuestions = [...editedModule.quiz.questions]
    updatedQuestions[questionIndex].options[optionIndex] = {
      ...updatedQuestions[questionIndex].options[optionIndex],
      [field]: value,
    }
    setEditedModule({
      ...editedModule,
      quiz: { ...editedModule.quiz, questions: updatedQuestions },
    })
  }

  const addQuestion = () => {
    const newQuestion: Question = {
      question: "",
      options: [
        { text: "", isCorrect: false, explanation: "" },
        { text: "", isCorrect: false, explanation: "" },
      ],
    }
    setEditedModule({
      ...editedModule,
      quiz: { ...editedModule.quiz, questions: [...editedModule.quiz.questions, newQuestion] },
    })
  }

  const removeQuestion = (index: number) => {
    const updatedQuestions = [...editedModule.quiz.questions]
    updatedQuestions.splice(index, 1)
    setEditedModule({
      ...editedModule,
      quiz: { ...editedModule.quiz, questions: updatedQuestions },
    })
  }

  const addOption = (questionIndex: number) => {
    const updatedQuestions = [...editedModule.quiz.questions]
    updatedQuestions[questionIndex].options.push({ text: "", isCorrect: false, explanation: "" })
    setEditedModule({
      ...editedModule,
      quiz: { ...editedModule.quiz, questions: updatedQuestions },
    })
  }

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...editedModule.quiz.questions]
    updatedQuestions[questionIndex].options.splice(optionIndex, 1)
    setEditedModule({
      ...editedModule,
      quiz: { ...editedModule.quiz, questions: updatedQuestions },
    })
  }

  const handleAIPrompt = async () => {
    // Implement AI content generation here
    console.log("AI Prompt:", aiPrompt)
    // Here you would make an API call to generate content based on the prompt
    // Then update the editedModule with the generated content
    setIsAIDialogOpen(false)
  }

  const handleExamSave = (updatedExam) => {
    setEditedModule({
      ...editedModule,
      exam: updatedExam,
    })
    setIsExamEditorOpen(false)
  }

  return (
    <div className="space-y-6">
      <Input
        value={editedModule.title}
        onChange={(e) => handleInputChange("title", e.target.value)}
        placeholder="Module Title"
      />
      <Textarea
        value={editedModule.description}
        onChange={(e) => handleInputChange("description", e.target.value)}
        placeholder="Module Description"
      />

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="lecture">
          <AccordionTrigger>Lecture Content</AccordionTrigger>
          <AccordionContent>
            <Textarea
              value={editedModule.content.lecture}
              onChange={(e) => handleContentChange("lecture", e.target.value)}
              placeholder="Lecture content"
              rows={10}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="readings">
          <AccordionTrigger>Readings</AccordionTrigger>
          <AccordionContent>
            {editedModule.content.readings.map((reading, index) => (
              <Card key={index} className="mb-4">
                <CardContent className="pt-6">
                  <Input
                    value={reading.title}
                    onChange={(e) => handleReadingChange(index, "title", e.target.value)}
                    placeholder="Reading Title"
                    className="mb-2"
                  />
                  <Input
                    value={reading.pages}
                    onChange={(e) => handleReadingChange(index, "pages", e.target.value)}
                    placeholder="Pages"
                    className="mb-2"
                  />
                  <Textarea
                    value={reading.content}
                    onChange={(e) => handleReadingChange(index, "content", e.target.value)}
                    placeholder="Reading content"
                    rows={5}
                  />
                </CardContent>
              </Card>
            ))}
            <Button
              onClick={() =>
                setEditedModule({
                  ...editedModule,
                  content: {
                    ...editedModule.content,
                    readings: [...editedModule.content.readings, { title: "", pages: "", content: "" }],
                  },
                })
              }
            >
              Add Reading
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="videos">
          <AccordionTrigger>Videos</AccordionTrigger>
          <AccordionContent>
            {editedModule.content.videos.map((video, index) => (
              <Card key={index} className="mb-4">
                <CardContent className="pt-6">
                  <Input
                    value={video.title}
                    onChange={(e) => handleVideoChange(index, "title", e.target.value)}
                    placeholder="Video Title"
                    className="mb-2"
                  />
                  <Input
                    value={video.duration}
                    onChange={(e) => handleVideoChange(index, "duration", e.target.value)}
                    placeholder="Duration"
                    className="mb-2"
                  />
                  <Input
                    value={video.url}
                    onChange={(e) => handleVideoChange(index, "url", e.target.value)}
                    placeholder="Video URL"
                  />
                </CardContent>
              </Card>
            ))}
            <Button
              onClick={() =>
                setEditedModule({
                  ...editedModule,
                  content: {
                    ...editedModule.content,
                    videos: [...editedModule.content.videos, { title: "", duration: "", url: "" }],
                  },
                })
              }
            >
              Add Video
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="quiz">
          <AccordionTrigger>Quiz</AccordionTrigger>
          <AccordionContent>
            {editedModule.quiz.questions.map((question, qIndex) => (
              <Card key={qIndex} className="mb-4">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-lg font-semibold">Question {qIndex + 1}</h4>
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
                  {question.options.map((option, oIndex) => (
                    <div key={oIndex} className="mb-2">
                      <div className="flex items-center gap-2">
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
                      <Textarea
                        value={option.explanation}
                        onChange={(e) => handleOptionChange(qIndex, oIndex, "explanation", e.target.value)}
                        placeholder="Explanation"
                        className="mt-1"
                      />
                    </div>
                  ))}
                  <Button onClick={() => addOption(qIndex)}>Add Option</Button>
                </CardContent>
              </Card>
            ))}
            <Button onClick={addQuestion}>Add Question</Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="exam">
          <AccordionTrigger>Exam</AccordionTrigger>
          <AccordionContent>
            <Button onClick={() => setIsExamEditorOpen(true)}>{editedModule.exam ? "Edit Exam" : "Add Exam"}</Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex justify-between">
        <Button onClick={onCancel} variant="outline">
          Cancel
        </Button>
        <div className="space-x-2">
          <Dialog open={isAIDialogOpen} onOpenChange={setIsAIDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                AI Assist
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>AI Content Generation</DialogTitle>
              </DialogHeader>
              <Textarea
                value={aiPrompt}
                onChange={(e) => setAIPrompt(e.target.value)}
                placeholder="Enter your prompt for AI content generation"
                rows={5}
              />
              <Button onClick={handleAIPrompt}>Generate Content</Button>
            </DialogContent>
          </Dialog>
          <Button onClick={() => onSave(editedModule)}>Save Changes</Button>
        </div>
      </div>

      <Dialog open={isExamEditorOpen} onOpenChange={setIsExamEditorOpen}>
        <DialogContent className="max-w-4xl">
          <ExamEditor
            exam={editedModule.exam || { title: "", description: "", questions: [] }}
            onSave={handleExamSave}
            onCancel={() => setIsExamEditorOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
