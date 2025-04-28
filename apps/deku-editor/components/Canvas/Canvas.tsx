'use client'

export default function Canvas() {
  return (
    <div className="flex-1 relative bg-gray-50 dark:bg-gray-800 overflow-hidden">
      {/* Canvas Area (Drag Drop Zone) */}
      <div className="h-full w-full flex items-center justify-center">
        <p className="text-gray-400">Drop components here...</p>
      </div>
    </div>
  )
}
