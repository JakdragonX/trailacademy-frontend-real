"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } @/components/shared/shared/shared/shared/shared/shared/shared/shared/shared/shared/shared/shared/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } @/components/shared/shared/shared/shared/shared/shared/shared/shared/shared/shared/shared/shared/ui/tabs'
import { QuizView } from './QuizView'

export function ModuleContentPreview({ module, isOpen, onClose }) {
  if (!module) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{module.title}</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="content" className="mt-4">
          <TabsList>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="readings">Readings</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="prose max-w-none">
            <p className="whitespace-pre-wrap">{module.content.lecture}</p>
          </TabsContent>

          <TabsContent value="readings">
            <div className="space-y-4">
              {module.content.readings.map((reading, index) => (
                <div key={index} className="p-4 bg-[#FAF6F1] rounded-lg">
                  <h4 className="font-medium">{reading.title}</h4>
                  <p className="text-sm text-gray-600">Pages: {reading.pages}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos">
            <div className="space-y-4">
              {module.content.videos.map((video, index) => (
                <div key={index} className="p-4 bg-[#FAF6F1] rounded-lg">
                  <h4 className="font-medium">{video.title}</h4>
                  <p className="text-sm text-gray-600">Duration: {video.duration}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quiz">
            <QuizView questions={module.quiz.questions} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}










