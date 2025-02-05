"use client"

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { BookOpen, GraduationCap, Eye } from 'lucide-react'
import { ContentSpecificationForm } from './ContentSpecificationForm'
import { LoadingState } from './LoadingState'
import { StudentModuleView } from './StudentModuleView'
import { Button } from '@/components/ui/button'
import { createCourse } from '@/lib/courseService'
import { ModuleList } from './ModuleList'

export function CreateCourseWizard() {
  const [step, setStep] = useState('type')
  const [isGenerating, setIsGenerating] = useState(false)
  const [courseData, setCourseData] = useState(null)
  const [courseType, setCourseType] = useState(null)
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  const handleGenerate = async (specs) => {
    setIsGenerating(true)
    try {
      const { course } = await createCourse({
        ...specs,
        courseType
      })
      setCourseData(course)
      setStep('preview')
    } catch (error) {
      console.error('Course creation error:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  if (isGenerating) {
    return <LoadingState task="Generating course content..." />
  }

  return (
    <div className="max-w-4xl mx-auto">
      {step === 'type' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center mb-8">Choose Your Course Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card 
              className="border-2 border-[#2D4F1E] hover:shadow-lg transition-all cursor-pointer"
              onClick={() => {
                setCourseType('traditional')
                setStep('specs')
              }}
            >
              <CardContent className="p-6 text-center">
                <BookOpen className="w-16 h-16 mx-auto text-[#2D4F1E] mb-4" />
                <h3 className="text-xl font-semibold mb-2">Traditional Course</h3>
                <p className="text-gray-600">
                  Balanced learning approach with equal weight on participation, assignments, and assessments.
                </p>
              </CardContent>
            </Card>

            <Card 
              className="border-2 border-[#2D4F1E] hover:shadow-lg transition-all cursor-pointer"
              onClick={() => {
                setCourseType('college')
                setStep('specs')
              }}
            >
              <CardContent className="p-6 text-center">
                <GraduationCap className="w-16 h-16 mx-auto text-[#2D4F1E] mb-4" />
                <h3 className="text-xl font-semibold mb-2">College Course</h3>
                <p className="text-gray-600">
                  Academic structure with emphasis on midterm and final examinations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {step === 'preview' && courseData && (
        <StudentModuleView 
          modules={courseData.modules}
          onBack={() => setStep('specs')}
        />
      )}

      {step === 'specs' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={() => setStep('type')}
              className="text-[#2D4F1E] hover:underline"
            >
              ← Back to Course Type
            </button>
            <span className="text-gray-600">
              {courseType === 'traditional' ? 'Traditional Course' : 'College Course'}
            </span>
          </div>
          <Card className="border-2 border-[#2D4F1E]">
            <CardContent className="p-6">
              <ContentSpecificationForm onSubmit={handleGenerate} />
            </CardContent>
          </Card>
        </div>
      )}

{step === 'preview' && courseData && (
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={() => setStep('specs')}
              className="text-[#2D4F1E] hover:underline"
            >
              ← Back to Specifications
            </button>
            <h2 className="text-2xl font-semibold">Course Preview</h2>
          </div>
          
          <ModuleList 
            initialModules={courseData.modules} 
            onViewContent={setPreviewModule}
          />
          
          {previewModule && (
            <ModuleContentPreview
              module={previewModule}
              isOpen={true}
              onClose={() => setPreviewModule(null)}
            />
          )}
        </div>
      )}
    </div>
  )
}
