'use client'

import { Undo2, Redo2, Save, MonitorSmartphone, TabletSmartphone, Monitor, Eye } from 'lucide-react'

export default function Topbar() {
  return (
    <div className="flex items-center justify-between px-4 h-14 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
      <div className="flex items-center gap-2">
        <Save className="w-5 h-5 cursor-pointer" />
        <Undo2 className="w-5 h-5 cursor-pointer" />
        <Redo2 className="w-5 h-5 cursor-pointer" />
      </div>
      <div className="flex items-center gap-4">
        <MonitorSmartphone className="w-5 h-5 cursor-pointer" />
        <TabletSmartphone className="w-5 h-5 cursor-pointer" />
        <Monitor className="w-5 h-5 cursor-pointer" />
        <Eye className="w-5 h-5 cursor-pointer" />
      </div>
    </div>
  )
}
