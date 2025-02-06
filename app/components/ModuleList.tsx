"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Dialog } from "@/components/ui/dialog"
import { StudentModuleView } from "./StudentModuleView"
import { ModuleEditor } from "./ModuleEditor"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, GripVertical, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ModuleList({ initialModules, onViewContent }) {
  const [modules, setModules] = useState(initialModules)
  const [selectedModule, setSelectedModule] = useState(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [editingModule, setEditingModule] = useState(null)

  const handleDragEnd = (result) => {
    if (!result.destination) return

    const items = Array.from(modules)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setModules(items)
  }

  const handlePreview = (module) => {
    setSelectedModule(module)
    setIsPreviewOpen(true)
  }

  const handleEdit = (module) => {
    setEditingModule(module)
  }

  const handleSaveEdit = (updatedModule) => {
    setModules(modules.map((m) => (m.id === updatedModule.id ? updatedModule : m)))
    setEditingModule(null)
  }

  if (editingModule) {
    return <ModuleEditor module={editingModule} onSave={handleSaveEdit} onCancel={() => setEditingModule(null)} />
  }

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="modules">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {modules.map((module, index) => (
                <Draggable key={module.id || index} draggableId={String(module.id || index)} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`transition-all ${
                        snapshot.isDragging ? "shadow-2xl ring-2 ring-[#2D4F1E] bg-white rounded-lg" : ""
                      }`}
                    >
                      <Card className="border-2 border-[#2D4F1E]/10 hover:border-[#2D4F1E]/20 transition-colors">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div
                                {...provided.dragHandleProps}
                                className="cursor-grab active:cursor-grabbing p-2 hover:bg-gray-100 rounded"
                              >
                                <GripVertical className="h-6 w-6 text-gray-400" />
                              </div>
                              <div>
                                <h3 className="text-xl font-semibold text-[#2D4F1E]">{module.title}</h3>
                                <p className="text-gray-600 mt-1">{module.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePreview(module)}
                                className="flex items-center gap-2"
                              >
                                <Eye className="h-4 w-4" />
                                Preview
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(module)}
                                className="flex items-center gap-2"
                              >
                                <Edit2 className="h-4 w-4" />
                                Edit
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <StudentModuleView module={selectedModule} onClose={() => setIsPreviewOpen(false)} />
      </Dialog>
    </>
  )
}
