"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, Save } from "lucide-react"
import { Label } from "@/components/ui/label"

interface Reading {
  title: string
  pages: string
}

interface Video {
  title: string
  duration: string
}

interface Question {
  question: string
  options: string[]
  correct: number
  explanation: string
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
        readings: [...editedModule.content.readings, { title: "", pages: "" }],
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
        videos: [...editedModule.content.videos, { title: "", duration: "" }],
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
            options: ["", "", "", ""],
            correct: 0,
            explanation: "",
          },
        ],
      },
    })
  }

  const updateQuestion = (
    index: number,
    field: keyof Question | "option",
    value: string | number,
    optionIndex?: number,
  ) => {
    const newQuestions = [...editedModule.quiz.questions]
    if (field === "option" && typeof optionIndex === "number") {
      const newOptions = [...newQuestions[index].options]
      newOptions[optionIndex] = value as string
      newQuestions[index] = { ...newQuestions[index], options: newOptions }
    } else {
      newQuestions[index] = { ...newQuestions[index], [field]: value }
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
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-1 space-y-2">
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
                  </div>
                  <Button variant="destructive" size="icon" onClick={() => removeReading(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
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
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-1 space-y-2">
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
                  </div>
                  <Button variant="destructive" size="icon" onClick={() => removeVideo(index)}>
                    <Trash2 className="h-4 w-4" />
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
              {editedModule.quiz.questions.map((question, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 space-y-2">
                      <Input
                        placeholder="Question"
                        value={question.question}
                        onChange={(e) => updateQuestion(index, "question", e.target.value)}
                      />
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`correct-${index}`}
                            checked={question.correct === optionIndex}
                            onChange={() => updateQuestion(index, "correct", optionIndex)}
                          />
                          <Input
                            placeholder={`Option ${optionIndex + 1}`}
                            value={option}
                            onChange={(e) => updateQuestion(index, "option", e.target.value, optionIndex)}
                          />
                        </div>
                      ))}
                      <Textarea
                        placeholder="Explanation for the correct answer"
                        value={question.explanation}
                        onChange={(e) => updateQuestion(index, "explanation", e.target.value)}
                      />
                    </div>
                    <Button variant="destructive" size="icon" onClick={() => removeQuestion(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
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
