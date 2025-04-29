import React, { useState } from 'react';
import SectionsTab from './SectionsTab';
import ElementsTab from './ElementsTab';
import MediaTab from './MediaTab';
import TemplatesTab from './TemplatesTab';

type Tab = 'sections' | 'elements' | 'media' | 'templates';

const LeftSidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('sections');

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="flex border-b border-gray-200">
        {(['sections', 'elements', 'media', 'templates'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 p-3 text-sm font-medium ${
              activeTab === tab
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'sections' && <SectionsTab />}
        {activeTab === 'elements' && <ElementsTab />}
        {activeTab === 'media' && <MediaTab />}
        {activeTab === 'templates' && <TemplatesTab />}
      </div>
    </div>
  );
};

export default LeftSidebar; 