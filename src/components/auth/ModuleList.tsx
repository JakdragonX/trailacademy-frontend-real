"use client"

import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { DraggableModule } from './DraggableModule'

export function ModuleList({ initialModules, onViewContent }) {
  const [modules, setModules] = useState(initialModules)

  const handleDragEnd = (result) => {
    if (!result.destination) return

    const items = Array.from(modules)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setModules(items)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="modules">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-6"
          >
            {modules.map((module, index) => (
              <Draggable 
                key={module.id || index} 
                draggableId={String(module.id || index)} 
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`transition-shadow ${snapshot.isDragging ? 'shadow-2xl' : ''}`}
                  >
                    <DraggableModule
                      module={module}
                      index={index}
                      onViewContent={() => onViewContent(module)}
                    />
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










