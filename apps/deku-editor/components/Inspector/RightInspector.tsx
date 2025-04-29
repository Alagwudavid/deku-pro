import React from 'react';
import StylePanel from './StylePanel';
import SettingsPanel from './SettingsPanel';
import PageSettings from './PageSettings';
import { useEditor } from '../../contexts/EditorContext';

const RightInspector: React.FC = () => {
  const { selectedElement } = useEditor();
  const [activeTab, setActiveTab] = React.useState<'style' | 'settings' | 'page'>('style');

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      <div className="flex border-b border-gray-200">
        {(['style', 'settings', 'page'] as const).map((tab) => (
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
        {!selectedElement && (
          <div className="p-4 text-center text-gray-500">
            Select an element to edit its properties
          </div>
        )}
        {selectedElement && (
          <>
            {activeTab === 'style' && <StylePanel />}
            {activeTab === 'settings' && <SettingsPanel />}
            {activeTab === 'page' && <PageSettings />}
          </>
        )}
      </div>
    </div>
  );
};

export default RightInspector; 