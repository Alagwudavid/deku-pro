'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const LeftSidebar = dynamic(() => import('../Sidebar/LeftSidebar'), { ssr: false });
const Canvas = dynamic(() => import('../Canvas/Canvas'), { ssr: false });
const RightInspector = dynamic(() => import('../Inspector/RightInspector'), { ssr: false });
const Topbar = dynamic(() => import('../Topbar/Topbar'), { ssr: false });

const Editor: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Topbar */}
      <div className="h-16 border-b border-gray-200 bg-white shadow-sm">
        <Topbar />
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <LeftSidebar />
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-gray-100 overflow-hidden">
          <Canvas />
        </div>

        {/* Right Inspector */}
        <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
          <RightInspector />
        </div>
      </div>
    </div>
  );
};

export default Editor; 