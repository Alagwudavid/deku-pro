import React, { useRef, useState } from 'react';
import { useEditor } from '../../contexts/EditorContext';

interface Props {
  id: string;
  children: React.ReactNode;
}

const ComponentWrapper: React.FC<Props> = ({ id, children }) => {
  const { selectedElement, setSelectedElement } = useEditor();
  const [isResizing, setIsResizing] = useState(false);
  const [rotation, setRotation] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    setIsResizing(true);
    // Add resize logic here
  };

  const handleRotateStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Add rotation logic here
  };

  return (
    <div
      ref={elementRef}
      className={`relative group ${
        selectedElement === id ? 'outline outline-2 outline-blue-500' : ''
      }`}
      onClick={() => setSelectedElement(id)}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {children}
      
      {selectedElement === id && (
        <>
          {/* Resize handles */}
          <div className="absolute top-0 left-0 w-2 h-2 bg-blue-500 cursor-nw-resize" />
          <div className="absolute top-0 right-0 w-2 h-2 bg-blue-500 cursor-ne-resize" />
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-blue-500 cursor-sw-resize" />
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-blue-500 cursor-se-resize" />
          
          {/* Rotation handle */}
          <div
            className="absolute -top-6 left-1/2 w-4 h-4 bg-blue-500 rounded-full cursor-move"
            onMouseDown={handleRotateStart}
          />
        </>
      )}
    </div>
  );
};

export default ComponentWrapper; 