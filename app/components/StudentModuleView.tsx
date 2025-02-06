"use client"

import { useState } from "react"
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QuizView } from "./QuizView"
import { Book, Video } from "lucide-react"

export function StudentModuleView({ module, onClose }) {
  const [activeTab, setActiveTab] = useState("content")

  if (!module) return null

  return (
    <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">{module.title}</DialogTitle>
      </DialogHeader>

      <Tabs defaultValue="content" className="mt-6" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 gap-4">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="readings">Readings</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-6">
          <Card>
            <CardContent className="prose max-w-none p-6">
              <h3 className="text-xl font-semibold mb-4">Lecture Content</h3>
              <div className="whitespace-pre-wrap">{module.content.lecture}</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="readings" className="mt-6">
          <div className="grid gap-4">
            {module.content.readings.map((reading, index) => (
              <Card key={index}>
                <CardContent className="flex items-start gap-4 p-4">
                  <Book className="h-5 w-5 mt-1 text-[#2D4F1E]" />
                  <div>
                    <h4 className="font-medium">{reading.title}</h4>
                    <p className="text-sm text-gray-600">Pages: {reading.pages}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="videos" className="mt-6">
          <div className="grid gap-4">
            {module.content.videos.map((video, index) => (
              <Card key={index}>
                <CardContent className="flex items-start gap-4 p-4">
                  <Video className="h-5 w-5 mt-1 text-[#2D4F1E]" />
                  <div>
                    <h4 className="font-medium">{video.title}</h4>
                    <p className="text-sm text-gray-600">Duration: {video.duration}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quiz" className="mt-6">
          <QuizView
            questions={module.quiz.questions}
            onComplete={(score) => {
              console.log("Quiz completed with score:", score)
              // Handle quiz completion
            }}
          />
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end">
        <Button onClick={onClose} variant="outline">
          Close Preview
        </Button>
      </div>
    </DialogContent>
  )
}

