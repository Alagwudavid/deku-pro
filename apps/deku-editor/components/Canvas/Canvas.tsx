'use client'

import React, { useRef } from 'react';
import { useEditor } from '../../contexts/EditorContext';
import { useCanvas } from '../../contexts/CanvasContext';
import { useDrop } from 'react-dnd';
import { CanvasPage } from './CanvasPage';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { ZoomIn, ZoomOut, Plus, Trash2 } from 'lucide-react';

const CanvasContent: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { pages, addComponent, selectedPage, addPage, selectPage, removePage } = useEditor();
  const { zoom, setZoom, deviceType } = useCanvas();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'COMPONENT',
    drop: (item: any, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset && canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = (offset.x - rect.left) / zoom;
        const y = (offset.y - rect.top) / zoom;
        
        addComponent(selectedPage, {
          id: Date.now().toString(),
          type: item.type,
          name: item.name,
          position: { x, y },
          size: { width: 300, height: 200 },
          rotation: 0,
          visible: true,
        });
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleZoom = (delta: number) => {
    const newZoom = Math.max(0.1, Math.min(2, zoom + delta));
    setZoom(newZoom);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault();
      handleZoom(e.deltaY > 0 ? -0.1 : 0.1);
    }
  };

  const handleAddPage = (afterPageId: string) => {
    const newPage = {
      id: Date.now().toString(),
      name: `Page ${pages.length + 1}`,
      components: [],
    };
    addPage(newPage, afterPageId);
  };

  const getDeviceWidth = () => {
    switch (deviceType) {
      case 'mobile':
        return '375px';
      case 'tablet':
        return '768px';
      default:
        return '100%';
    }
  };

  return (
    <div
      ref={drop as any}
      className={cn(
        "relative w-full h-full overflow-auto bg-gray-200 dark:bg-gray-800",
        isOver && "ring-2 ring-primary"
      )}
      onWheel={handleWheel}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-muted" />

      <div
        ref={canvasRef}
        className="absolute inset-0 flex flex-row items-start justify-start gap-8 p-8 overflow-x-auto"
        style={{ 
          width: 'fit-content',
        }}
      >
        {pages.map((page, index) => (
          <div 
            key={page.id} 
            className={cn(
              "flex-shrink-0 flex flex-col gap-2 relative group",
              "transition-all duration-200"
            )}
            style={{
              transform: page.id === selectedPage ? `scale(${zoom})` : 'scale(1)',
              transformOrigin: 'top left',
            }}
          >
            {/* Page name and add button */}
            <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-lg shadow-lg p-2 w-fit">
              <div
                className={cn(
                  "text-sm font-medium px-3 py-1 rounded-md cursor-pointer",
                  selectedPage === page.id
                    ? "bg-blue-100 text-blue-600"
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => selectPage(page.id)}
              >
                {page.name}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={() => handleAddPage(page.id)}
              >
                <Plus className="h-4 w-4" />
              </Button>
              {pages.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => removePage(page.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className={cn(
              "relative",
              "before:absolute before:inset-0 before:rounded-lg",
              "before:transition-all before:duration-200",
              "group-hover:before:ring-2 group-hover:before:ring-blue-500/50",
              selectedPage === page.id && "before:ring-2 before:ring-blue-500 before:ring-offset-2"
            )}>
              <CanvasPage
                page={page}
                isSelected={page.id === selectedPage}
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-lg shadow-lg p-2 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleZoom(-0.1)}
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <span className="text-sm font-medium min-w-[40px] text-center text-foreground">
          {Math.round(zoom * 100)}%
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleZoom(0.1)}
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const Canvas: React.FC = () => {
  return <CanvasContent />;
};

export default Canvas;
