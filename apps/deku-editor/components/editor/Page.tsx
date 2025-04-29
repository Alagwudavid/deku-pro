import Topbar from '@/components/editor/Topbar'
import Sidebar from '@/components/editor/Sidebar'
import Canvas from '@/components/editor/Canvas'

export default function EditorPage() {
  return (
    <div className="flex flex-col h-screen">
      <Topbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <Canvas />
      </div>
    </div>
  )
}
