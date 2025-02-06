'use client';

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ModuleList } from "./ModuleList"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { StudentModuleView } from "./StudentModuleView"
import { ModuleEditor } from "./ModuleEditor"

export function CoursePreview({ course, onBack }) {
  const [selectedModule, setSelectedModule] = useState(null)
  const [selectedExam, setSelectedExam] = useState(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isEditingModule, setIsEditingModule] = useState(false)

  if (!course || !course.modules) {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold mb-4">Course Preview</h3>
        <p>No course data available.</p>
        <Button onClick={onBack} variant="outline">
          Back
        </Button>
      </div>
    )
  }

  const handleModuleEdit = (module) => {
    setSelectedModule(module)
    setIsEditingModule(true)
  }

  const handleModuleSave = (updatedModule) => {
    // Here you would typically update the course data
    console.log("Updated module:", updatedModule)
    setIsEditingModule(false)
  }

  const handlePreview = (item) => {
    if (item.id.startsWith('module')) {
      setSelectedModule(item)
      setSelectedExam(null)
    } else {
      setSelectedExam(item)
      setSelectedModule(null)
    }
    setIsPreviewOpen(true)
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Course Preview</h3>
      <Card>
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold mb-2">{course.title || "Untitled Course"}</h4>
          <p className="text-gray-600 mb-4">{course.description || "No description available."}</p>
          <div className="mb-4">
            <strong>Target Audience:</strong> {course.audience || "Not specified"}
          </div>
          <div className="mb-4">
            <strong>Number of Modules:</strong> {course.modules.length}
          </div>
          {course.exams && (
            <div className="mb-4">
              <strong>Number of Exams:</strong> {course.exams.length}
            </div>
          )}
        </CardContent>
      </Card>

      <ModuleList
        initialModules={course.modules}
        exams={course.exams}
        onPreview={handlePreview}
        onEdit={handleModuleEdit}
      />

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl">
          <StudentModuleView
            module={selectedModule}
            exam={selectedExam}
            onClose={() => setIsPreviewOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditingModule} onOpenChange={setIsEditingModule}>
        <DialogContent className="max-w-4xl">
          <ModuleEditor
            module={selectedModule}
            onSave={handleModuleSave}
            onCancel={() => setIsEditingModule(false)}
          />
        </DialogContent>
      </Dialog>

      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline">
          Back
        </Button>
        <Button>Save Course</Button>
      </div>
    </div>
  )
}
