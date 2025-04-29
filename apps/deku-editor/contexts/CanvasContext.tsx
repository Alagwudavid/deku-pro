'use client';

import * as React from 'react';

interface CanvasContextType {
  zoom: number;
  setZoom: (zoom: number) => void;
  grid: boolean;
  setGrid: (show: boolean) => void;
  deviceType: 'desktop' | 'tablet' | 'mobile';
  setDeviceType: (type: 'desktop' | 'tablet' | 'mobile') => void;
}

const CanvasContext = React.createContext<CanvasContextType | undefined>(undefined);

export const CanvasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [zoom, setZoom] = React.useState(1);
  const [grid, setGrid] = React.useState(true);
  const [deviceType, setDeviceType] = React.useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  return (
    <CanvasContext.Provider
      value={{
        zoom,
        setZoom,
        grid,
        setGrid,
        deviceType,
        setDeviceType,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => {
  const context = React.useContext(CanvasContext);
  if (context === undefined) {
    throw new Error('useCanvas must be used within a CanvasProvider');
  }
  return context;
}; 