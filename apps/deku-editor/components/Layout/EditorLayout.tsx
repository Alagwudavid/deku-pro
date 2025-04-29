'use client'

import React from 'react';
import Topbar from '../Topbar/Topbar';
import { LeftSidebar } from '../Sidebar/LeftSidebar';
import { RightSidebar } from '../Sidebar/RightSidebar';
import Canvas from '../Canvas/Canvas';
import { EditorProvider } from '@/contexts/EditorContext';

const EditorLayout = () => {
  return (
    <EditorProvider>
      <div className="h-screen flex flex-col bg-gray-100">
        <Topbar />
        <div className="flex-1 flex overflow-hidden">
          <LeftSidebar />
          <main className="flex-1 overflow-hidden relative">
            <Canvas />
          </main>
          <RightSidebar />
        </div>
      </div>
    </EditorProvider>
  );
};

export default EditorLayout;

