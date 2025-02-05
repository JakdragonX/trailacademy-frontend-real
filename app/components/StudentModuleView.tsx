"use client"

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ModuleList } from './ModuleList'
import { Book, Video, Calendar, ArrowLeft, ArrowRight } from 'lucide-react'
import { QuizView } from './QuizView'
import type { Module } from '@/lib/courseTemplate'

interface StudentModuleViewProps {
  modules: Module[]
  onBack: () => void
}

export function StudentModuleView({ modules, onBack }: StudentModuleViewProps) {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0)
  const [activeTab, setActiveTab] = useState('content')
  
  const currentModule = modules[currentModuleIndex]

  const tabs = [
    { id: 'content', label: 'Content' },
    { id: 'readings', label: 'Readings' },
    { id: 'videos', label: 'Videos' },
    { id: 'quiz', label: 'Quiz' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="text-[#2D4F1E] hover:underline"
        >
          ← Back to Overview
        </button>
      </div>

      <ModuleList initialModules={modules} />
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[#2D4F1E] hover:underline"
        >
          <ArrowLeft size={20} />
          Back to Overview
        </button>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentModuleIndex(prev => Math.max(0, prev - 1))}
            disabled={currentModuleIndex === 0}
            className="disabled:opacity-50"
          >
            <ArrowLeft size={20} />
          </button>
          <span className="font-medium">
            Module {currentModuleIndex + 1} of {modules.length}
          </span>
          <button
            onClick={() => setCurrentModuleIndex(prev => Math.min(modules.length - 1, prev + 1))}
            disabled={currentModuleIndex === modules.length - 1}
            className="disabled:opacity-50"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <Card className="border-2 border-[#2D4F1E]">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-2">{currentModule.title}</h2>
          <p className="text-gray-600 mb-6">{currentModule.description}</p>

          <div className="flex gap-2 mb-6 border-b">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 capitalize ${
                  activeTab === tab.id 
                    ? 'border-b-2 border-[#2D4F1E] font-medium' 
                    : 'text-gray-600 hover:text-[#2D4F1E]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'content' && (
            <div className="prose max-w-none">
              <p className="whitespace-pre-wrap">{currentModule.content.lecture}</p>
            </div>
          )}

          {activeTab === 'readings' && (
            <div className="space-y-4">
              {currentModule.content.readings.map((reading, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Book className="h-5 w-5 text-[#2D4F1E]" />
                      <h3 className="font-medium">{reading.title}</h3>
                    </div>
                    {reading.pages && <p className="text-sm text-gray-600 mt-2">Pages: {reading.pages}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'videos' && (
            <div className="space-y-4">
              {currentModule.content.videos.map((video, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Video className="h-5 w-5 text-[#2D4F1E]" />
                      <h3 className="font-medium">{video.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Duration: {video.duration}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === 'quiz' && (
            <QuizView 
              questions={currentModule.quiz.questions}
              onComplete={(score) => {
                console.log('Quiz completed with score:', score)
                // Handle quiz completion
              }}
              onBack={() => setActiveTab('content')}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

