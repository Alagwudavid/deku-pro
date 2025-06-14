"use client";

import {
  FiMove,
  FiCrop,
  FiZoomIn,
  FiZoomOut,
  FiRotateCw,
  FiSquare,
  FiCircle,
  FiType,
  FiImage,
  FiSave,
  FiDownload,
  FiTrash,
  FiCode,
} from "react-icons/fi";

interface ToolbarButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  isActive?: boolean;
}

function ToolbarButton({ icon, label, onClick, isActive = false }: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center p-2 rounded-lg transition-colors
        ${isActive ? 'bg-purple-100 text-purple-900' : 'hover:bg-gray-100 text-gray-700'}
      `}
      title={label}
    >
      <div className="w-5 h-5">{icon}</div>
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
}

interface EditorToolbarProps {
  onClearComments?: () => void;
}

export default function EditorToolbar({ onClearComments }: EditorToolbarProps) {
  const tools = [
    { icon: <FiMove />, label: "Move", action: () => {} },
    { icon: <FiCrop />, label: "Crop", action: () => {} },
    { icon: <FiZoomIn />, label: "Zoom In", action: () => {} },
    { icon: <FiZoomOut />, label: "Zoom Out", action: () => {} },
    { icon: <FiRotateCw />, label: "Rotate", action: () => {} },
    { icon: <FiSquare />, label: "Rectangle", action: () => {} },
    { icon: <FiCircle />, label: "Circle", action: () => {} },
    { icon: <FiType />, label: "Text", action: () => {} },
    { icon: <FiImage />, label: "Image", action: () => {} },
  ];

  return (
    <div className="flex flex-col items-center gap-2 p-2 border-r border-gray-200 bg-white">
      {tools.map((tool) => (
        <ToolbarButton
          key={tool.label}
          icon={tool.icon}
          label={tool.label}
          onClick={tool.action}
        />
      ))}
      
      <div className="w-full h-px bg-gray-200 my-2" />
      
      <ToolbarButton
        icon={<FiCode />}
        label="Clear Comments"
        onClick={onClearComments || (() => {})}
      />
      <ToolbarButton
        icon={<FiSave />}
        label="Save"
        onClick={() => {}}
      />
      <ToolbarButton
        icon={<FiDownload />}
        label="Export"
        onClick={() => {}}
      />
    </div>
  );
}