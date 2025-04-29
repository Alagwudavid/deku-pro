// components/editor/Topbar.tsx
'use client'

import { useCanvasStore } from '@/lib/store/canvasStore'
import { Button } from '@/components/ui/button'
import { Undo2, Redo2, Save, Eye, UploadCloud, Monitor, Tablet, Smartphone, ZoomIn, ZoomOut } from 'lucide-react'

export default function Topbar() {
  const { undo, redo, save, preview, publish, zoomIn, zoomOut, deviceView, setDeviceView } = useCanvasStore()

  return (
    <div className="flex items-center justify-between px-4 h-14 bg-white dark:bg-gray-950 border-b dark:border-gray-800 shadow-sm sticky top-0 z-50">
      {/* Left side: Save/Undo/Redo */}
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={undo}>
          <Undo2 size={16} />
        </Button>
        <Button variant="outline" size="sm" onClick={redo}>
          <Redo2 size={16} />
        </Button>
        <Button variant="default" size="sm" onClick={save}>
          <Save size={16} className="mr-1" /> Save
        </Button>
      </div>

      {/* Center: Zoom controls */}
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={zoomOut}>
          <ZoomOut size={16} />
        </Button>
        <Button variant="outline" size="sm" onClick={zoomIn}>
          <ZoomIn size={16} />
        </Button>
      </div>

      {/* Right side: Preview / Publish / Device View */}
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => setDeviceView('desktop')}>
          <Monitor size={16} />
        </Button>
        <Button variant="outline" size="sm" onClick={() => setDeviceView('tablet')}>
          <Tablet size={16} />
        </Button>
        <Button variant="outline" size="sm" onClick={() => setDeviceView('mobile')}>
          <Smartphone size={16} />
        </Button>

        <Button variant="outline" size="sm" onClick={preview}>
          <Eye size={16} /> 
        </Button>

        <Button variant="default" size="sm" onClick={publish}>
          <UploadCloud size={16} className="mr-1" /> Publish
        </Button>
      </div>
    </div>
  )
}
