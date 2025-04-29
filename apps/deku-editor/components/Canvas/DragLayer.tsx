import React from 'react';
import { useDragLayer } from 'react-dnd';

const DragLayer: React.FC = () => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging || !currentOffset) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 100,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: currentOffset.x,
          top: currentOffset.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="bg-white shadow-lg rounded-lg p-4 border-2 border-blue-500">
          {item.type}
        </div>
      </div>
    </div>
  );
};

export default DragLayer; 