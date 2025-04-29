'use client'

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ElementsTab } from './tabs/ElementsTab';
import { ComponentsTab } from './tabs/ComponentsTab';
import { LayersTab } from './tabs/LayersTab';

export const Sidebar = () => {
  return (
    <div className="w-80 h-full border-r bg-white">
      <Tabs defaultValue="elements" className="h-full">
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger value="elements" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
            Elements
          </TabsTrigger>
          <TabsTrigger value="components" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
            Components
          </TabsTrigger>
          <TabsTrigger value="layers" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
            Layers
          </TabsTrigger>
        </TabsList>
        <TabsContent value="elements" className="h-[calc(100%-40px)] overflow-auto">
          <ElementsTab />
        </TabsContent>
        <TabsContent value="components" className="h-[calc(100%-40px)] overflow-auto">
          <ComponentsTab />
        </TabsContent>
        <TabsContent value="layers" className="h-[calc(100%-40px)] overflow-auto">
          <LayersTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};
