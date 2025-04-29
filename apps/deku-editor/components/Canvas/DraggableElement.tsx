'use client'

import { useDraggable } from '@dnd-kit/core'
import { useCanvasStore } from '@/lib/store/canvasStore'
import { useState } from 'react'

interface DraggableElementProps {
  id: string
  type: string
  x: number
  y: number
  width: number
  height: number
  rotation: number
}

export default function DraggableElement(props: DraggableElementProps) {
  const { id, type, x, y, width, height, rotation } = props
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  })

  const [localWidth, setLocalWidth] = useState(width)
  const [localHeight, setLocalHeight] = useState(height)
  const [localRotation, setLocalRotation] = useState(rotation)

  const style = {
    transform: `translate(${x}px, ${y}px) rotate(${localRotation}deg)`,
    width: `${localWidth}px`,
    height: `${localHeight}px`,
  }

  const handleResize = (e: React.MouseEvent<HTMLDivElement>, direction: string) => {
    e.preventDefault()
    e.stopPropagation()

    const startX = e.clientX
    const startY = e.clientY
    const startWidth = localWidth
    const startHeight = localHeight

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX
      const deltaY = moveEvent.clientY - startY

      if (direction.includes('right')) {
        setLocalWidth(Math.max(50, startWidth + deltaX))
      }
      if (direction.includes('bottom')) {
        setLocalHeight(Math.max(50, startHeight + deltaY))
      }
    }

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  const handleRotate = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const rect = (e.target as HTMLDivElement).parentElement!.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const onMouseMove = (moveEvent: MouseEvent) => {
      const angle = Math.atan2(moveEvent.clientY - centerY, moveEvent.clientX - centerX) * (180 / Math.PI)
      setLocalRotation(angle)
    }

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="absolute border border-blue-500 bg-white dark:bg-gray-800 shadow-md cursor-move"
    >
      <div className="flex items-center justify-center w-full h-full text-sm text-gray-700 dark:text-gray-300">
        {type.toUpperCase()}
      </div>

      {/* Resize Handles */}
      <div
        onMouseDown={(e) => handleResize(e, 'right-bottom')}
        className="absolute bottom-0 right-0 w-4 h-4 bg-blue-600 rounded-full cursor-se-resize"
      />

      {/* Rotate Handle */}
      <div
        onMouseDown={handleRotate}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-500 rounded-full cursor-pointer"
      />
    </div>
  )
}
