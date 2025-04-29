import React from 'react';
import { useEditor } from '../../../contexts/EditorContext';

const fontFamilies = [
  'Inter',
  'Roboto',
  'Poppins',
  'Montserrat',
  'Open Sans',
];

const fontSizes = [
  '12px', '14px', '16px', '18px', '20px', '24px', '32px', '48px'
];

const Typography: React.FC = () => {
  const { selectedElement } = useEditor();
  const [styles, setStyles] = React.useState({
    fontFamily: 'Inter',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '1.5',
    textAlign: 'left',
  });

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-gray-900">Typography</h3>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Font Family</label>
          <select 
            value={styles.fontFamily}
            onChange={(e) => setStyles(prev => ({ ...prev, fontFamily: e.target.value }))}
            className="w-full rounded-md border border-gray-300 p-2"
          >
            {fontFamilies.map(font => (
              <option key={font} value={font}>{font}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Size</label>
            <select 
              value={styles.fontSize}
              onChange={(e) => setStyles(prev => ({ ...prev, fontSize: e.target.value }))}
              className="w-full rounded-md border border-gray-300 p-2"
            >
              {fontSizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Weight</label>
            <select 
              value={styles.fontWeight}
              onChange={(e) => setStyles(prev => ({ ...prev, fontWeight: e.target.value }))}
              className="w-full rounded-md border border-gray-300 p-2"
            >
              <option value="400">Regular</option>
              <option value="500">Medium</option>
              <option value="600">Semi Bold</option>
              <option value="700">Bold</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Alignment</label>
          <div className="flex border border-gray-300 rounded-md">
            {['left', 'center', 'right', 'justify'].map((align) => (
              <button
                key={align}
                onClick={() => setStyles(prev => ({ ...prev, textAlign: align }))}
                className={`flex-1 p-2 ${
                  styles.textAlign === align
                    ? 'bg-gray-100 text-blue-600'
                    : 'text-gray-600'
                }`}
              >
                <i className={`fas fa-align-${align}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Typography; 