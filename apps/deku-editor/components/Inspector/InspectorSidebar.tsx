'use client'

import { useCanvasStore } from '@/lib/store/canvasStore'

export default function InspectorSidebar() {
  const selectedElement = useCanvasStore((state) => state.selectedElement)
  const updateElementStyle = useCanvasStore((state) => state.updateElementStyle)

  if (!selectedElement) {
    return (
      <div className="w-80 bg-gray-100 dark:bg-gray-900 p-4">
        <p className="text-gray-500 dark:text-gray-400">Select an element to edit</p>
      </div>
    )
  }

  return (
    <div className="w-80 bg-gray-100 dark:bg-gray-900 p-4 space-y-6 overflow-y-auto">

      {/* Typography Section */}
      <div>
        <h3 className="text-xs font-bold uppercase mb-2 text-gray-500">Typography</h3>
        <div className="space-y-2">
          <input
            type="number"
            placeholder="Font Size (px)"
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
            value={selectedElement.styles.fontSize || ''}
            onChange={(e) => updateElementStyle(selectedElement.id, { fontSize: `${e.target.value}px` })}
          />
          <select
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
            value={selectedElement.styles.fontWeight || 'normal'}
            onChange={(e) => updateElementStyle(selectedElement.id, { fontWeight: e.target.value })}
          >
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
            <option value="lighter">Light</option>
          </select>
        </div>
      </div>

      {/* Colors Section */}
      <div>
        <h3 className="text-xs font-bold uppercase mb-2 text-gray-500">Colors</h3>
        <div className="space-y-2">
          <label className="block text-xs text-gray-500">Text Color</label>
          <input
            type="color"
            className="w-full h-10 p-0 rounded"
            value={selectedElement.styles.color || '#000000'}
            onChange={(e) => updateElementStyle(selectedElement.id, { color: e.target.value })}
          />
          <label className="block text-xs text-gray-500">Background Color</label>
          <input
            type="color"
            className="w-full h-10 p-0 rounded"
            value={selectedElement.styles.backgroundColor || '#ffffff'}
            onChange={(e) => updateElementStyle(selectedElement.id, { backgroundColor: e.target.value })}
          />
        </div>
      </div>

      {/* Spacing Section */}
      <div>
        <h3 className="text-xs font-bold uppercase mb-2 text-gray-500">Spacing</h3>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Padding (px)"
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
            value={selectedElement.styles.padding || ''}
            onChange={(e) => updateElementStyle(selectedElement.id, { padding: `${e.target.value}px` })}
          />
          <input
            type="number"
            placeholder="Margin (px)"
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
            value={selectedElement.styles.margin || ''}
            onChange={(e) => updateElementStyle(selectedElement.id, { margin: `${e.target.value}px` })}
          />
        </div>
      </div>

      {/* Border Section */}
      <div>
        <h3 className="text-xs font-bold uppercase mb-2 text-gray-500">Borders</h3>
        <div className="space-y-2">
          <input
            type="number"
            placeholder="Border Radius (px)"
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
            value={selectedElement.styles.borderRadius || ''}
            onChange={(e) => updateElementStyle(selectedElement.id, { borderRadius: `${e.target.value}px` })}
          />
          <input
            type="text"
            placeholder="Shadow (e.g. 0px 2px 10px rgba(0,0,0,0.2))"
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
            value={selectedElement.styles.boxShadow || ''}
            onChange={(e) => updateElementStyle(selectedElement.id, { boxShadow: e.target.value })}
          />
        </div>
      </div>

    </div>
  )
}
