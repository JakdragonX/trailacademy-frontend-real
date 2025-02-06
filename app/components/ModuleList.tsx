"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, GripVertical, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ModuleList({ initialModules, exams, onPreview, onEdit, onReorder }) {
  const [modules, setModules] = useState(initialModules || [])
  const allItems = [...modules, ...(exams || [])]

  const handleDragEnd = (result) => {
    if (!result.destination) return

    const items = Array.from(allItems)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    const newModules = items.filter((item) => item.id.startsWith("module"))
    setModules(newModules)
    onReorder(newModules)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="modules">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
            {allItems.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
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
                              <h3 className="text-xl font-semibold text-[#2D4F1E]">
                                {item.title || `${item.id.startsWith("module") ? "Module" : "Exam"} ${index + 1}`}
                              </h3>
                              <p className="text-gray-600 mt-1">{item.description || "No description available."}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onPreview(item)}
                              className="flex items-center gap-2"
                            >
                              <Eye className="h-4 w-4" />
                              Preview
                            </Button>
                            {item.id.startsWith("module") && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onEdit(item)}
                                className="flex items-center gap-2"
                              >
                                <Edit2 className="h-4 w-4" />
                                Edit
                              </Button>
                            )}
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
  )
}
