import React from 'react';
import { useEditor } from '../../contexts/EditorContext';

const UndoRedo: React.FC = () => {
  const { canUndo, canRedo, undo, redo } = useEditor();

  return (
    <div className="flex items-center space-x-1">
      <button
        onClick={undo}
        disabled={!canUndo}
        className={`p-2 rounded-md ${
          canUndo
            ? 'hover:bg-gray-100 text-gray-700'
            : 'text-gray-400 cursor-not-allowed'
        }`}
        title="Undo"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <button
        onClick={redo}
        disabled={!canRedo}
        className={`p-2 rounded-md ${
          canRedo
            ? 'hover:bg-gray-100 text-gray-700'
            : 'text-gray-400 cursor-not-allowed'
        }`}
        title="Redo"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 9H9a5 5 0 00-5 5v2a1 1 0 11-2 0v-2a7 7 0 017-7h5.586l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default UndoRedo; 