import React from 'react';

const CanvasGrid: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div 
        className="w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />
    </div>
  );
};

export default CanvasGrid; 