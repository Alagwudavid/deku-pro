import React, { useState } from 'react';
import { useEditor } from '../../contexts/EditorContext';

interface DropZoneProps {
  className?: string;
}

const DropZone: React.FC<DropZoneProps> = ({ className = '' }) => {
  const { addComponent } = useEditor();
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);

    // Get the dragged component data
    const componentData = e.dataTransfer.getData('application/json');
    if (!componentData) return;

    try {
      const parsedData = JSON.parse(componentData);
      const dropPosition = {
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
      };

      // Add the component to the canvas
      addComponent({
        ...parsedData,
        id: `component-${Date.now()}`,
        position: dropPosition,
      });
    } catch (error) {
      console.error('Error parsing dropped component data:', error);
    }
  };

  return (
    <div
      className={`min-h-[calc(100vh-4rem)] w-full relative ${
        isOver ? 'bg-blue-50' : 'bg-white'
      } ${className}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isOver && (
        <div className="absolute inset-0 border-2 border-dashed border-blue-400 pointer-events-none" />
      )}
    </div>
  );
};

export default DropZone; 