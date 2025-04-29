// import Sidebar from '@/components/Sidebar/Sidebar'
// import Topbar from '@/components/Topbar/Topbar'
// import Canvas from '@/components/Canvas/Canvas'
// import Inspector from '@/components/Inspector/Inspector'

// export default function Home() {
//   return (
//     <div className="flex flex-col h-screen">
//       <Topbar />
//       <div className="flex flex-1 overflow-hidden">
//         <Sidebar />
//         <Canvas />
//         <Inspector />
//       </div>
//     </div>
//   )
// }

// import EditorLayout from '@/components/Layout/EditorLayout'

// export default function EditorPage() {
//   return <EditorLayout />
// }
import { HistoryProvider } from '@/contexts/HistoryContext'
import EditorLayout from '@/components/Layout/EditorLayout'

export default function EditorPage() {
  return (
    <HistoryProvider>
      <EditorLayout />
    </HistoryProvider>
  )
}
