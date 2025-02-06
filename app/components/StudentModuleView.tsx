"use client"

import { useState } from "react"
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QuizView } from "./QuizView"
import { Book, Video, Clock } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export function StudentModuleView({ module, exam, onClose }) {
  const [activeTab, setActiveTab] = useState("content")

  if (!module && !exam) return null

  const content = module || exam

  return (
    <DialogContent className="max-w-4xl h-[90vh]">
      <DialogHeader className="border-b pb-4">
        <DialogTitle className="text-2xl font-bold text-[#2D4F1E]">{content.title}</DialogTitle>
        <p className="text-gray-600 mt-2">{content.description}</p>
      </DialogHeader>

      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="content" className="h-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 bg-[#FAF6F1]">
            <TabsTrigger value="content" className="data-[state=active]:bg-[#2D4F1E] data-[state=active]:text-white">
              Content
            </TabsTrigger>
            {module && (
              <>
                <TabsTrigger
                  value="readings"
                  className="data-[state=active]:bg-[#2D4F1E] data-[state=active]:text-white"
                >
                  Readings
                </TabsTrigger>
                <TabsTrigger value="videos" className="data-[state=active]:bg-[#2D4F1E] data-[state=active]:text-white">
                  Videos
                </TabsTrigger>
                <TabsTrigger value="quiz" className="data-[state=active]:bg-[#2D4F1E] data-[state=active]:text-white">
                  Quiz
                </TabsTrigger>
              </>
            )}
            {exam && (
              <TabsTrigger value="exam" className="data-[state=active]:bg-[#2D4F1E] data-[state=active]:text-white">
                Exam
              </TabsTrigger>
            )}
          </TabsList>

          <ScrollArea className="h-[calc(90vh-12rem)] mt-4">
            <TabsContent value="content" className="p-4">
              <Card className="border-2 border-[#2D4F1E]">
                <CardContent className="prose max-w-none p-6">
                  <h3 className="text-xl font-semibold text-[#2D4F1E] mb-4">
                    {module ? "Lecture Content" : "Exam Instructions"}
                  </h3>
                  <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                    {module ? module.content.lecture : exam.description}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {module && (
              <>
                <TabsContent value="readings" className="p-4">
                  <div className="grid gap-4">
                    {module.content.readings.map((reading, index) => (
                      <Card key={index} className="border-2 border-[#2D4F1E] hover:border-[#4A7A30] transition-colors">
                        <CardContent className="flex items-start gap-4 p-4">
                          <div className="p-2 bg-[#2D4F1E]/5 rounded-lg">
                            <Book className="h-5 w-5 text-[#2D4F1E]" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-[#2D4F1E]">{reading.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">Pages: {reading.pages}</p>
                            {reading.content && (
                              <details className="mt-2">
                                <summary className="cursor-pointer text-sm text-[#2D4F1E]">View Content</summary>
                                <div className="mt-2 p-2 bg-[#FAF6F1] rounded text-sm">{reading.content}</div>
                              </details>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="videos" className="p-4">
                  <div className="grid gap-4">
                    {module.content.videos.map((video, index) => (
                      <Card key={index} className="border-2 border-[#2D4F1E] hover:border-[#4A7A30] transition-colors">
                        <CardContent className="flex items-start gap-4 p-4">
                          <div className="p-2 bg-[#2D4F1E]/5 rounded-lg">
                            <Video className="h-5 w-5 text-[#2D4F1E]" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-[#2D4F1E]">{video.title}</h4>
                            <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                              <Clock className="h-4 w-4" />
                              <span>{video.duration}</span>
                            </div>
                            {video.url && (
                              <a
                                href={video.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 inline-block text-sm text-[#2D4F1E] hover:underline"
                              >
                                Watch Video
                              </a>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="quiz" className="p-4">
                  <QuizView
                    questions={module.quiz.questions}
                    onComplete={(score) => {
                      console.log("Quiz completed with score:", score)
                    }}
                  />
                </TabsContent>
              </>
            )}

            {exam && (
              <TabsContent value="exam" className="p-4">
                <div className="space-y-6">
                  {exam.questions.map((question, index) => (
                    <Card key={index} className="border-2 border-[#2D4F1E]">
                      <CardContent className="p-6">
                        <h4 className="text-lg font-semibold text-[#2D4F1E] mb-2">Question {index + 1}</h4>
                        <p className="mb-4">{question.question}</p>
                        {question.type === "multiple-choice" && (
                          <div className="space-y-2">
                            {question.options.map((option, optionIndex) => (
                              <div key={optionIndex} className="flex items-center">
                                <input
                                  type="radio"
                                  id={`q${index}-o${optionIndex}`}
                                  name={`question-${index}`}
                                  className="mr-2"
                                />
                                <label htmlFor={`q${index}-o${optionIndex}`}>{option.text}</label>
                              </div>
                            ))}
                          </div>
                        )}
                        {question.type === "essay" && (
                          <textarea
                            className="w-full p-2 border rounded"
                            rows={6}
                            placeholder="Enter your answer here..."
                          ></textarea>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                  <Button className="w-full bg-[#2D4F1E] text-white hover:bg-[#4A7A30]">Submit Exam</Button>
                </div>
              </TabsContent>
            )}
          </ScrollArea>
        </Tabs>
      </div>

      <div className="border-t pt-4 mt-auto">
        <Button onClick={onClose} variant="outline" className="w-full border-[#2D4F1E] text-[#2D4F1E]">
          Close Preview
        </Button>
      </div>
    </DialogContent>
  )
}
