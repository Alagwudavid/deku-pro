'use client'

export default function Inspector() {
  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-l dark:border-gray-700 overflow-y-auto">
      <div className="p-4">
        <h2 className="font-bold text-lg text-gray-700 dark:text-gray-300">Inspector</h2>
        <p className="text-gray-400 text-sm">Select an element to edit its properties</p>
      </div>
    </div>
  )
}
