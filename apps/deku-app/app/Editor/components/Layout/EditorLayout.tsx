import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
import PropertiesPanel from "../PropertiesPanel/PropertiesPanel";
import EditorToolbar from "../EditorToolbar/EditorToolbar";
import EditorCanvas from "../EditorCanvas/EditorCanvas";

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <Topbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <EditorToolbar />
          <EditorCanvas>{children}</EditorCanvas>
        </main>
        <PropertiesPanel />
      </div>
    </div>
  );
}
