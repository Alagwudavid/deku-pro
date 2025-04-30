"use client";
import { useState } from "react";
import {
  FiLayers,
  FiHome,
  FiCode,
  FiChevronDown,
  FiChevronRight,
  FiSettings,
  FiFolder,
  FiVideo,
} from "react-icons/fi";

const layers = [
  {
    name: "Scootric - Homepage",
    children: [
      {
        name: "Hero Section",
        children: [
          { name: "Heading 1" },
          { name: "Subheading" },
          { name: "Button" },
          { name: "Image-1" },
          { name: "Right Button" },
        ],
      },
      { name: "Navbar" },
      { name: "Section" },
      { name: "Gallery Section" },
      { name: "Features Section" },
    ],
  },
];

function LayerItem({ layer, depth = 0, selected, onSelect }: any) {
  const [open, setOpen] = useState(true);
  const hasChildren = layer.children && layer.children.length > 0;
  const isSelected = selected === layer.name;
  return (
    <div>
      <div
        className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer transition
          ${isSelected ? "bg-[#23262F] text-white" : "hover:bg-[#23262F]/80 text-[#E5E7EB]"}
          ${depth === 0 ? "font-semibold" : ""}
        `}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={() => {
          if (hasChildren) setOpen((o) => !o);
          onSelect(layer.name);
        }}
      >
        {hasChildren && (
          <span className="text-xs">
            {open ? <FiChevronDown /> : <FiChevronRight />}
          </span>
        )}
        <span>{layer.name}</span>
      </div>
      {open && hasChildren && (
        <div>
          {layer.children.map((child: any, i: number) => (
            <LayerItem
              key={i}
              layer={child}
              depth={depth + 1}
              selected={selected}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar() {
  const [selected, setSelected] = useState("Hero Section");
  const [showPanel, setShowPanel] = useState(false);

  // Show panel on hover or when toggled open
  const handleMouseEnter = () => setShowPanel(true);
  const handleMouseLeave = () => setShowPanel(false);
  const handleToggle = () => setShowPanel((v) => !v);

  return (
    <>
      {/* Vertical Icon Bar */}
      <div className="fixed top-14 left-0 h-[calc(100vh-3.5rem)] flex flex-col items-center py-4 px-2 bg-[#181A20] shadow-lg gap-4 z-30 border-r border-[#23262F]">
        <button
          className={`p-2 rounded-lg hover:bg-[#23262F] text-[#377DFF] text-xl transition`}
          onClick={handleToggle}
          aria-label="Show Layers"
        >
          <FiLayers />
        </button>
        <button className="p-2 rounded-lg hover:bg-[#23262F] text-[#6B7280] text-xl">
          <FiCode />
        </button>
        <button className="p-2 rounded-lg hover:bg-[#23262F] text-[#6B7280] text-xl">
          <FiVideo />
        </button>
        <button className="p-2 rounded-lg hover:bg-[#23262F] text-[#6B7280] text-xl">
          <FiFolder />
        </button>
        <div className="flex-1" />
        <button className="p-2 rounded-lg hover:bg-[#23262F] text-[#6B7280] text-xl">
          <FiSettings />
        </button>
      </div>

      {/* Floating Main Panel */}
      <div
        className={`
          fixed top-16 left-16 h-[calc(100vh-5rem)] w-80
          z-40
          transition-all duration-300
          ${showPanel ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none -translate-x-4"}
        `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ boxShadow: "0 8px 32px 0 rgba(0,0,0,0.25)" }}
      >
        <div className="bg-[#181A20] rounded-2xl flex flex-col h-full border border-[#23262F]">
          {/* Layers Card */}
          <div className="p-4 pb-2 border-b border-[#23262F] flex items-center justify-between">
            <span className="text-white font-semibold text-base">Layers</span>
            <button className="text-[#6B7280] hover:text-[#377DFF] text-xl">
              +
            </button>
          </div>
          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto p-2">
            {layers.map((layer, i) => (
              <LayerItem
                key={i}
                layer={layer}
                selected={selected}
                onSelect={setSelected}
              />
            ))}
            <div className="mt-6 text-xs uppercase text-[#6B7280] mb-2">
              Components
            </div>
            <div className="flex flex-col gap-2">
              <button className="bg-[#23262F] hover:bg-[#23262F]/80 text-white rounded px-3 py-2 text-left shadow">
                Button
              </button>
              <button className="bg-[#23262F] hover:bg-[#23262F]/80 text-white rounded px-3 py-2 text-left shadow">
                Card
              </button>
            </div>
          </div>
          {/* Bottom Card */}
          <div className="p-4 border-t border-[#23262F]">
            <button className="flex items-center gap-2 text-[#6B7280] hover:text-white w-full">
              <FiLayers /> Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
