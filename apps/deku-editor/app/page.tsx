import Sidebar from '@/components/Sidebar/Sidebar'
import Topbar from '@/components/Topbar/Topbar'
import Canvas from '@/components/Canvas/Canvas'
import Inspector from '@/components/Inspector/Inspector'

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Topbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <Canvas />
        <Inspector />
      </div>
    </div>
  )
}
