'use client';

import React, { useState } from 'react';
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors, DragStartEvent, DragEndEvent } from '@dnd-kit/core';

interface DndProviderProps {
  children: React.ReactNode;
  onDrop: (pageId: string, component: any) => void;
}

export const DndProvider: React.FC<DndProviderProps> = ({ children, onDrop }) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeData, setActiveData] = useState<any>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    setActiveData(event.active.data.current);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over, activatorEvent } = event;
    
    if (over && activeData) {
      // Check if dropping on a page
      if (over.id.toString().startsWith('page-')) {
        const pageId = over.id.toString().replace('page-', '');
        const dropTarget = over.rect;
        const mouseEvent = activatorEvent as MouseEvent;
        
        // Calculate position relative to the drop target
        const x = mouseEvent.clientX - dropTarget.left;
        const y = mouseEvent.clientY - dropTarget.top;

        onDrop(pageId, {
          id: Date.now().toString(),
          type: activeData.type,
          name: activeData.name,
          position: { 
            x: Math.max(0, x),
            y: Math.max(0, y)
          },
          size: { width: 300, height: 200 },
          rotation: 0,
          visible: true,
        });
      }
    }

    setActiveId(null);
    setActiveData(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}
      <DragOverlay>
        {activeId && activeData ? (
          <div className="p-2 border rounded-md bg-white shadow-lg">
            <div className="text-sm font-medium">
              {activeData.name}
            </div>
            <div className="text-xs text-gray-500">
              {activeData.type}
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}; 