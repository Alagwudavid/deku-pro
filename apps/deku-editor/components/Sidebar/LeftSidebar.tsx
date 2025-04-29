import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight, Layout, Layers, Image, FileText } from 'lucide-react';
import { ComponentsTab } from './tabs/ComponentsTab';
import { MediaTab } from './tabs/MediaTab';
import { TemplatesTab } from './tabs/TemplatesTab';
import LayersTab from './tabs/LayersTab';

const tabs = [
  { id: 'components', label: 'Components', icon: 'Layout' },
  { id: 'media', label: 'Media', icon: 'Image' },
  { id: 'templates', label: 'Templates', icon: 'FileText' },
  { id: 'layers', label: 'Layers', icon: 'Layers' },
];

const getActiveTabContent = (activeTab: string) => {
  switch (activeTab) {
    case 'components':
      return <ComponentsTab />;
    case 'media':
      return <MediaTab />;
    case 'templates':
      return <TemplatesTab />;
    case 'layers':
      return <LayersTab />;
    default:
      return null;
  }
};

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'Layout':
      return <Layout className="h-5 w-5" />;
    case 'Image':
      return <Image className="h-5 w-5" />;
    case 'FileText':
      return <FileText className="h-5 w-5" />;
    case 'Layers':
      return <Layers className="h-5 w-5" />;
    default:
      return null;
  }
};

export const LeftSidebar = () => {
  const [activeTab, setActiveTab] = useState('components');
  const [isExpanded, setIsExpanded] = useState(true);

  const activeTabLabel = tabs.find(tab => tab.id === activeTab)?.label;

  return (
    <div className={cn(
      "h-full border-r border-border bg-background flex transition-all duration-300 ease-in-out",
      isExpanded ? "w-80" : "w-12"
    )}>
      {/* Icons sidebar */}
      <div className="w-12 h-full border-r border-border flex flex-col">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              if (activeTab === tab.id) {
                setIsExpanded(!isExpanded);
              } else {
                setActiveTab(tab.id);
                if (!isExpanded) setIsExpanded(true);
              }
            }}
            className={cn(
              "w-12 h-12 flex items-center justify-center transition-colors relative group",
              activeTab === tab.id
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            {getIconComponent(tab.icon)}
            {activeTab === tab.id && isExpanded && (
              <ChevronLeft className="h-4 w-4 absolute right-1 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
            )}
          </button>
        ))}
        <div className="flex-1" />
      </div>

      {/* Content sidebar */}
      {isExpanded && (
        <div className="flex-1 flex flex-col">
          <div className="h-12 border-b border-border flex items-center px-4">
            <h2 className="text-sm font-medium text-foreground">{activeTabLabel}</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {getActiveTabContent(activeTab)}
          </div>
        </div>
      )}
    </div>
  );
}; 