import React from 'react';

interface DraggableComponentProps {
  type: string;
  title: string;
  icon: string;
  defaultProps?: Record<string, any>;
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({
  type,
  title,
  icon,
  defaultProps = {},
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    const componentData = {
      type,
      ...defaultProps,
    };

    e.dataTransfer.setData('application/json', JSON.stringify(componentData));
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors"
    >
      <div className="flex items-center space-x-3">
        <span className="text-xl">{icon}</span>
        <span className="text-sm font-medium text-gray-700">{title}</span>
      </div>
    </div>
  );
};

export default DraggableComponent; 