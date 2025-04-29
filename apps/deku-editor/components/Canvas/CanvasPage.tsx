import React from 'react';
import { cn } from '@/lib/utils';
import { useEditor } from '@/contexts/EditorContext';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

interface Page {
  id: string;
  name: string;
  components: any[];
}

interface CanvasPageProps {
  page: Page;
  isSelected: boolean;
}

export const CanvasPage = ({ page, isSelected }: CanvasPageProps) => {
  const { components } = useEditor();
  const pageComponents = components[page.id] || [];

  return (
    <ResizableBox
      width={800}
      height={600}
      minConstraints={[400, 300]}
      maxConstraints={[1200, 900]}
      className={cn(
        'bg-white dark:bg-white shadow-lg p-4 border border-border',
        isSelected && 'ring-2 ring-primary'
      )}
    >
      <div className="min-h-[500px] relative">
        {pageComponents.map((component) => (
          <div
            key={component.id}
            className={cn(
              "absolute border border-border rounded-md p-2 bg-white dark:bg-white",
              "hover:border-primary transition-colors",
              !component.visible && "opacity-50"
            )}
            style={{
              left: `${component.position.x}px`,
              top: `${component.position.y}px`,
              width: `${component.size.width}px`,
              height: `${component.size.height}px`,
              transform: `rotate(${component.rotation}deg)`,
            }}
          >
            <div className="text-sm font-medium text-foreground">{component.name}</div>
            <div className="text-xs text-muted-foreground">{component.type}</div>
          </div>
        ))}
      </div>
    </ResizableBox>
  );
}; 