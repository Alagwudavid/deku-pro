'use client'

import React from 'react';
import { useCanvasStore } from '@/lib/store/canvasStore'
import { Button } from '@/components/ui/button'
import { Undo2, Redo2, Save, Eye, EyeOff, UploadCloud, Monitor, Tablet, Smartphone, ZoomIn, ZoomOut, Download, FileImage, FileText, Code, FileArchive, Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'
import DeviceToggle from './DeviceToggle'
import ZoomControls from './ZoomControls'
import UndoRedo from './UndoRedo'
import { useEditor } from '@/contexts/EditorContext'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Laptop } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from 'next-themes'
import { Share2 } from 'lucide-react'

const Topbar: React.FC = () => {
  const {
    undo,
    redo,
    save,
    preview,
    publish,
    zoomIn,
    zoomOut,
    deviceView,
    setDeviceView,
    isPreviewMode,
    togglePreview,
  } = useCanvasStore()

  const { selectedPage } = useEditor()
  const [zoom, setZoom] = React.useState(100)
  const { theme, setTheme } = useTheme()

  const devices = [
    { type: 'mobile', icon: Smartphone, label: 'Mobile' },
    { type: 'tablet', icon: Tablet, label: 'Tablet' },
    { type: 'desktop', icon: Monitor, label: 'Desktop' },
  ];

  const handleExport = (type: string) => {
    // TODO: Implement export functionality
    console.log(`Exporting as ${type}`);
  };

  return (
    <div className="h-14 border-b border-border bg-background px-4 flex items-center justify-between">
      {/* Left section */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <Undo2 className="w-4 h-4 mr-2" />
          Undo
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <Redo2 className="w-4 h-4 mr-2" />
          Redo
        </Button>
      </div>

      {/* Center section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {devices.map((device) => {
            const Icon = device.icon;
            return (
              <Button
                key={device.type}
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8 text-muted-foreground hover:text-foreground",
                  deviceView === device.type && "bg-primary/10 text-primary"
                )}
                onClick={() => setDeviceView(device.type)}
              >
                <Icon className="h-4 w-4" />
              </Button>
            );
          })}
          <span className="text-sm font-medium ml-2 text-foreground">
            {devices.find(d => d.type === deviceView)?.label}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => setZoom(Math.max(50, zoom - 10))}
          >
            -
          </Button>
          <span className="text-sm w-12 text-center text-foreground">{zoom}%</span>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => setZoom(Math.min(200, zoom + 10))}
          >
            +
          </Button>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <Eye className="w-4 h-4 mr-2" />
          Preview
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 gap-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="gap-2">
              <FileImage className="h-4 w-4" />
              <span>Export as PNG</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <FileText className="h-4 w-4" />
              <span>Export as PDF</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <FileText className="h-4 w-4" />
              <span>Export as SVG</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <FileArchive className="h-4 w-4" />
              <span>Export Code (ZIP)</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <Share2 className="h-4 w-4" />
              <span>Export to...</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="default" size="sm" className="h-8 gap-2">
          <span className="hidden sm:inline">Publish</span>
          <UploadCloud className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default Topbar