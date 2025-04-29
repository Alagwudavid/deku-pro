'use client'

import { useCanvasStore } from '@/lib/store/canvasStore'

export default function PageSettingsPanel() {
  const pageSettings = useCanvasStore((state) => state.pageSettings)
  const updatePageSetting = useCanvasStore((state) => state.updatePageSetting)

  return (
    <div className="space-y-6 p-4">
      {/* SEO Section */}
      <div>
        <h3 className="text-xs font-bold uppercase mb-2 text-gray-500">SEO</h3>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Page Title"
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
            value={pageSettings.seoTitle}
            onChange={(e) => updatePageSetting('seoTitle', e.target.value)}
          />
          <textarea
            placeholder="Meta Description"
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
            value={pageSettings.seoDescription}
            onChange={(e) => updatePageSetting('seoDescription', e.target.value)}
          />
        </div>
      </div>

      {/* Social Sharing */}
      <div>
        <h3 className="text-xs font-bold uppercase mb-2 text-gray-500">Social Sharing</h3>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="OpenGraph Image URL"
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
            value={pageSettings.socialImage}
            onChange={(e) => updatePageSetting('socialImage', e.target.value)}
          />
        </div>
      </div>

      {/* Page Transitions */}
      <div>
        <h3 className="text-xs font-bold uppercase mb-2 text-gray-500">Page Transitions</h3>
        <div className="space-y-2">
          <select
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
            value={pageSettings.pageTransition}
            onChange={(e) => updatePageSetting('pageTransition', e.target.value)}
          >
            <option value="none">None</option>
            <option value="fade">Fade</option>
            <option value="slide">Slide</option>
            <option value="zoom">Zoom</option>
          </select>
        </div>
      </div>

      {/* Custom Code */}
      <div>
        <h3 className="text-xs font-bold uppercase mb-2 text-gray-500">Custom Code</h3>
        <div className="space-y-2">
          <textarea
            placeholder="Custom HTML or Scripts"
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
            value={pageSettings.customCode}
            onChange={(e) => updatePageSetting('customCode', e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}