'use client'

import { useElementStore } from '@/lib/store/elementStore'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type CanvasElementProps = {
  id: string
  type: string
  content?: string
  x: number
  y: number
}

export default function CanvasElement({ id, type, content, x, y }: CanvasElementProps) {
  const { selectedElementId, selectElement, moveElement } = useElementStore()

  const [dragging, setDragging] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation()
    selectElement(id)
    setDragging(true)
    setOffset({ x: e.clientX - x, y: e.clientY - y })
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging) return
    const newX = e.clientX - offset.x
    const newY = e.clientY - offset.y
    moveElement(id, newX, newY)
  }

  const handleMouseUp = () => {
    setDragging(false)
  }

  // Add listeners on mount
  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  })

  return (
    <div
      onMouseDown={handleMouseDown}
      className={cn(
        'absolute cursor-move p-2 rounded transition-all',
        selectedElementId === id ? 'border-2 border-blue-500' : 'border border-transparent'
      )}
      style={{
        top: y,
        left: x,
      }}
    >
      {type === 'text' ? (
        <p className="text-black dark:text-white">{content || 'Text Block'}</p>
      ) : (
        <div className="w-20 h-20 bg-gray-300 flex items-center justify-center">
          {type}
        </div>
      )}
    </div>
  )
}
