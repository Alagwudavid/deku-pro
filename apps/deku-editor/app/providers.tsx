'use client';

import * as React from 'react';
import { EditorProvider } from '../contexts/EditorContext';
import { CanvasProvider } from '../contexts/CanvasContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DndProvider backend={HTML5Backend}>
    <EditorProvider>
      <CanvasProvider>
        {children}
      </CanvasProvider>
    </EditorProvider>
    </DndProvider>
  );
} 