"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, Save } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface Reading {
  title: string
  pages: string
  content: string
}

interface Video {
  title: string
  duration: string
  url: string
}

interface QuizOption {
  text: string
  isCorrect: boolean
  explanation: string
}

interface Question {
  question: string
  options: Array<{
    text: string
    isCorrect: boolean
    explanation: string
  }>
}

interface ModuleContent {
  title: string
  description: string
  content: {
    lecture: string
    readings: Reading[]
    videos: Video[]
  }
  quiz: {
    questions: Question[]
  }
}

export function ModuleEditor({
  module,
  onSave,
  onCancel,
}: {
  module: ModuleContent
  onSave: (module: ModuleContent) => void
  onCancel: () => void
}) {
  const [editedModule, setEditedModule] = useState<ModuleContent>(module)

  const addReading = () => {
    setEditedModule({
      ...editedModule,
      content: {
        ...editedModule.content,
        readings: [...editedModule.content.readings, { title: "", pages: "", content: "" }],
      },
    })
  }

  const updateReading = (index: number, field: keyof Reading, value: string) => {
    const newReadings = [...editedModule.content.readings]
    newReadings[index] = { ...newReadings[index], [field]: value }
    setEditedModule({
      ...editedModule,
      content: {
        ...editedModule.content,
        readings: newReadings,
      },
    })
  }

  const removeReading = (index: number) => {
    setEditedModule({
      ...editedModule,
      content: {
        ...editedModule.content,
        readings: editedModule.content.readings.filter((_, i) => i !== index),
      },
    })
  }

  const addVideo = () => {
    setEditedModule({
      ...editedModule,
      content: {
        ...editedModule.content,
        videos: [...editedModule.content.videos, { title: "", duration: "", url: "" }],
      },
    })
  }

  const updateVideo = (index: number, field: keyof Video, value: string) => {
    const newVideos = [...editedModule.content.videos]
    newVideos[index] = { ...newVideos[index], [field]: value }
    setEditedModule({
      ...editedModule,
      content: {
        ...editedModule.content,
        videos: newVideos,
      },
    })
  }

  const removeVideo = (index: number) => {
    setEditedModule({
      ...editedModule,
      content: {
        ...editedModule.content,
        videos: editedModule.content.videos.filter((_, i) => i !== index),
      },
    })
  }

  const addQuestion = () => {
    setEditedModule({
      ...editedModule,
      quiz: {
        questions: [
          ...editedModule.quiz.questions,
          {
            question: "",
            options: [
              { text: "", isCorrect: false, explanation: "" },
              { text: "", isCorrect: false, explanation: "" },
              { text: "", isCorrect: false, explanation: "" },
              { text: "", isCorrect: false, explanation: "" },
            ],
          },
        ],
      },
    })
  }

  const updateQuestion = (
    questionIndex: number,
    field: keyof Question | "option",
    value: string | boolean,
    optionIndex?: number,
  ) => {
    const newQuestions = [...editedModule.quiz.questions]
    if (field === "option" && typeof optionIndex === "number") {
      const newOptions = [...newQuestions[questionIndex].options]
      newOptions[optionIndex] = { ...newOptions[optionIndex], text: value as string }
      newQuestions[questionIndex] = { ...newQuestions[questionIndex], options: newOptions }
    } else if (field === "isCorrect" && typeof optionIndex === "number") {
      const newOptions = [...newQuestions[questionIndex].options]
      newOptions[optionIndex] = { ...newOptions[optionIndex], isCorrect: value as boolean }
      newQuestions[questionIndex] = { ...newQuestions[questionIndex], options: newOptions }
    } else if (field === "explanation" && typeof optionIndex === "number") {
      const newOptions = [...newQuestions[questionIndex].options]
      newOptions[optionIndex] = { ...newOptions[optionIndex], explanation: value as string }
      newQuestions[questionIndex] = { ...newQuestions[questionIndex], options: newOptions }
    } else {
      newQuestions[questionIndex] = { ...newQuestions[questionIndex], [field]: value }
    }
    setEditedModule({
      ...editedModule,
      quiz: {
        questions: newQuestions,
      },
    })
  }

  const removeQuestion = (index: number) => {
    setEditedModule({
      ...editedModule,
      quiz: {
        questions: editedModule.quiz.questions.filter((_, i) => i !== index),
      },
    })
  }

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Module Title</Label>
          <Input
            id="title"
            value={editedModule.title}
            onChange={(e) => setEditedModule({ ...editedModule, title: e.target.value })}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="description">Module Description</Label>
          <Textarea
            id="description"
            value={editedModule.description}
            onChange={(e) => setEditedModule({ ...editedModule, description: e.target.value })}
            className="mt-1"
          />
        </div>
      </div>

      <Tabs defaultValue="content" className="mt-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="readings">Readings</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <Label htmlFor="lecture">Lecture Content</Label>
              <Textarea
                id="lecture"
                value={editedModule.content.lecture}
                onChange={(e) =>
                  setEditedModule({
                    ...editedModule,
                    content: { ...editedModule.content, lecture: e.target.value },
                  })
                }
                className="mt-1"
                rows={10}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="readings" className="mt-4">
          <Card>
            <CardContent className="p-4 space-y-4">
              {editedModule.content.readings.map((reading, index) => (
                <Accordion key={index} type="single" collapsible className="w-full">
                  <AccordionItem value={`reading-${index}`}>
                    <AccordionTrigger className="text-left">{reading.title || `Reading ${index + 1}`}</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <Input
                          placeholder="Reading Title"
                          value={reading.title}
                          onChange={(e) => updateReading(index, "title", e.target.value)}
                        />
                        <Input
                          placeholder="Pages (e.g., 1-10)"
                          value={reading.pages}
                          onChange={(e) => updateReading(index, "pages", e.target.value)}
                        />
                        <Textarea
                          placeholder="Reading content or notes"
                          value={reading.content}
                          onChange={(e) => updateReading(index, "content", e.target.value)}
                          rows={5}
                        />
                        <Button variant="destructive" size="sm" onClick={() => removeReading(index)}>
                          <Trash2 className="h-4 w-4 mr-2" /> Remove Reading
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
              <Button onClick={addReading} className="w-full">
                <Plus className="h-4 w-4 mr-2" /> Add Reading
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videos" className="mt-4">
          <Card>
            <CardContent className="p-4 space-y-4">
              {editedModule.content.videos.map((video, index) => (
                <div key={index} className="space-y-2 p-4 border rounded">
                  <Input
                    placeholder="Video Title"
                    value={video.title}
                    onChange={(e) => updateVideo(index, "title", e.target.value)}
                  />
                  <Input
                    placeholder="Duration (e.g., 10:00)"
                    value={video.duration}
                    onChange={(e) => updateVideo(index, "duration", e.target.value)}
                  />
                  <Input
                    placeholder="Video URL"
                    value={video.url}
                    onChange={(e) => updateVideo(index, "url", e.target.value)}
                  />
                  <Button variant="destructive" size="sm" onClick={() => removeVideo(index)}>
                    <Trash2 className="h-4 w-4 mr-2" /> Remove Video
                  </Button>
                </div>
              ))}
              <Button onClick={addVideo} className="w-full">
                <Plus className="h-4 w-4 mr-2" /> Add Video
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quiz" className="mt-4">
          <Card>
            <CardContent className="p-4 space-y-6">
              {editedModule.quiz.questions.map((question, questionIndex) => (
                <div key={questionIndex} className="space-y-4 p-4 border rounded-lg">
                  <Input
                    placeholder="Question"
                    value={question.question}
                    onChange={(e) => updateQuestion(questionIndex, "question", e.target.value)}
                  />
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={option.isCorrect}
                        onChange={(e) => updateQuestion(questionIndex, "isCorrect", e.target.checked, optionIndex)}
                      />
                      <Input
                        placeholder={`Option ${optionIndex + 1}`}
                        value={option.text}
                        onChange={(e) => updateQuestion(questionIndex, "option", e.target.value, optionIndex)}
                      />
                      <Textarea
                        placeholder="Explanation for this option"
                        value={option.explanation}
                        onChange={(e) => updateQuestion(questionIndex, "explanation", e.target.value, optionIndex)}
                      />
                    </div>
                  ))}
                  <Button variant="destructive" size="sm" onClick={() => removeQuestion(questionIndex)}>
                    <Trash2 className="h-4 w-4 mr-2" /> Remove Question
                  </Button>
                </div>
              ))}
              <Button onClick={addQuestion} className="w-full">
                <Plus className="h-4 w-4 mr-2" /> Add Question
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4 mt-6">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => onSave(editedModule)}>
          <Save className="h-4 w-4 mr-2" /> Save Changes
        </Button>
      </div>
    </div>
  )
}
