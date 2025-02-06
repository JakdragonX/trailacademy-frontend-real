"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ModuleList } from "./ModuleList"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { StudentModuleView } from "./StudentModuleView"
import { ModuleEditor } from "./ModuleEditor"

export function CoursePreview({ course, onBack, onSave }) {
  const [selectedModule, setSelectedModule] = useState(null)
  const [selectedExam, setSelectedExam] = useState(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isEditingModule, setIsEditingModule] = useState(false)
  const [editedCourse, setEditedCourse] = useState(course)

  if (!editedCourse || !editedCourse.modules) {
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
    const updatedModules = editedCourse.modules.map((m) => (m.id === updatedModule.id ? updatedModule : m))
    setEditedCourse({ ...editedCourse, modules: updatedModules })
    setIsEditingModule(false)
  }

  const handlePreview = (item) => {
    if (item.id.startsWith("module")) {
      setSelectedModule(item)
      setSelectedExam(null)
    } else {
      setSelectedExam(item)
      setSelectedModule(null)
    }
    setIsPreviewOpen(true)
  }

  const handleSaveCourse = () => {
    onSave(editedCourse)
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Course Preview</h3>
      <Card>
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold mb-2">{editedCourse.title || "Untitled Course"}</h4>
          <p className="text-gray-600 mb-4">{editedCourse.description || "No description available."}</p>
          <div className="mb-4">
            <strong>Target Audience:</strong> {editedCourse.audience || "Not specified"}
          </div>
          <div className="mb-4">
            <strong>Number of Modules:</strong> {editedCourse.modules.length}
          </div>
          {editedCourse.exams && (
            <div className="mb-4">
              <strong>Number of Exams:</strong> {editedCourse.exams.length}
            </div>
          )}
        </CardContent>
      </Card>

      <ModuleList
        initialModules={editedCourse.modules}
        exams={editedCourse.exams}
        onPreview={handlePreview}
        onEdit={handleModuleEdit}
        onReorder={(newModules) => setEditedCourse({ ...editedCourse, modules: newModules })}
      />

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl">
          <StudentModuleView module={selectedModule} exam={selectedExam} onClose={() => setIsPreviewOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditingModule} onOpenChange={setIsEditingModule}>
        <DialogContent className="max-w-4xl">
          <ModuleEditor module={selectedModule} onSave={handleModuleSave} onCancel={() => setIsEditingModule(false)} />
        </DialogContent>
      </Dialog>

      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline">
          Back
        </Button>
        <Button onClick={handleSaveCourse}>Save Course</Button>
      </div>
    </div>
  )
}
