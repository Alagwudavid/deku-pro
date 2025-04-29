'use client'

import { useDraggable } from '@dnd-kit/core'

function DraggableItem({ type }: { type: string }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `sidebar-${type}`,
    data: { type },
  })

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="p-2 mb-2 bg-white dark:bg-gray-800 border rounded cursor-grab active:cursor-grabbing"
    >
      {type}
    </div>
  )
}

export default function Sidebar() {
  return (
    <div className="w-60 bg-gray-200 dark:bg-gray-800 p-4 h-[calc(100vh-3.5rem)] overflow-y-auto">
      <h3 className="font-bold mb-4">Components</h3>
      <DraggableItem type="Text Block" />
      <DraggableItem type="Image" />
      <DraggableItem type="Button" />
      <DraggableItem type="Gallery" />
      <DraggableItem type="Hero Section" />
      <DraggableItem type="Testimonial" />
      {/* Add more items */}
    </div>
  )
}
