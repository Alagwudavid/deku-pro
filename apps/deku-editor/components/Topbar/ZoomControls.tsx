import React from 'react';
import { useCanvas } from '../../contexts/CanvasContext';

const ZoomControls: React.FC = () => {
  const { zoom, setZoom } = useCanvas();

  const handleZoomIn = () => {
    setZoom(Math.min(zoom * 1.25, 4));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom * 0.8, 0.1));
  };

  const handleZoomReset = () => {
    setZoom(1);
  };

  const zoomPercentage = Math.round(zoom * 100);

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleZoomOut}
        className="p-2 hover:bg-gray-100 rounded-md"
        title="Zoom Out"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <button
        onClick={handleZoomReset}
        className="px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
      >
        {zoomPercentage}%
      </button>

      <button
        onClick={handleZoomIn}
        className="p-2 hover:bg-gray-100 rounded-md"
        title="Zoom In"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default ZoomControls; 