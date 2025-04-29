import React from 'react';
import { useDrag, ConnectDragSource } from 'react-dnd';
import { cn } from '@/lib/utils';

interface ComponentItemProps {
  name: string;
  type: string;
}

export const ComponentItem = ({ name, type }: ComponentItemProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'COMPONENT',
    item: { name, type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag as unknown as React.RefObject<HTMLDivElement>}
      className={cn(
        'p-2 border rounded-md cursor-move hover:bg-gray-50 transition-colors',
        isDragging && 'opacity-50'
      )}
    >
      <div className="text-sm font-medium">{name}</div>
      <div className="text-xs text-gray-500">{type}</div>
    </div>
  );
}; 