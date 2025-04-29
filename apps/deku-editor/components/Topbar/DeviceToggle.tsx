import React from 'react';
import { useCanvas } from '../../contexts/CanvasContext';

const DeviceToggle: React.FC = () => {
  const { deviceType, setDeviceType } = useCanvas();

  return (
    <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-md">
      {[
        { type: 'desktop', icon: '🖥️', width: '1920px' },
        { type: 'tablet', icon: '📱', width: '768px' },
        { type: 'mobile', icon: '📱', width: '375px' },
      ].map(({ type, icon }) => (
        <button
          key={type}
          onClick={() => setDeviceType(type as any)}
          className={`p-2 rounded ${
            deviceType === type
              ? 'bg-white shadow-sm'
              : 'hover:bg-gray-200'
          }`}
        >
          <span className="text-lg">{icon}</span>
        </button>
      ))}
    </div>
  );
};

export default DeviceToggle; 