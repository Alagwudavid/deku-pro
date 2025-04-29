'use client'

import { useCanvasStore } from '@/lib/store/canvasStore'
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core'
import { v4 as uuidv4 } from 'uuid'

export default function Canvas() {
  const { components, addComponent, updateComponent } = useCanvasStore()

  function handleDragEnd(event: any) {
    const { over, active } = event
    if (over?.id === 'canvas-dropzone') {
      addComponent({
        id: uuidv4(),
        type: active.data.current?.type || 'text', 
        x: 100, 
        y: 100,
      })
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <DropZone />

      {components.map((comp) => (
        <DraggableComponent key={comp.id} id={comp.id} type={comp.type} x={comp.x} y={comp.y} />
      ))}
    </DndContext>
  )
}

function DropZone() {
  const { setNodeRef } = useDroppable({
    id: 'canvas-dropzone',
  })

  return (
    <div
      ref={setNodeRef}
      className="relative w-full h-[calc(100vh-3.5rem)] bg-gray-100 dark:bg-gray-900 overflow-hidden"
    >
      {/* Drop here */}
    </div>
  )
}

function DraggableComponent({ id, type, x, y }: { id: string, type: string, x: number, y: number }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  })

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : `translate3d(${x}px, ${y}px, 0)`,
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '150px',
    height: '50px',
    backgroundColor: '#ffffff',
    border: '1px solid #ccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'move',
  }

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {type}
    </div>
  )
}
