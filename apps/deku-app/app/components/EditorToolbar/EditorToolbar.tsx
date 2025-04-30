"use client";
import { useState } from "react";
import { FiMonitor, FiTablet, FiSmartphone, FiChevronDown } from "react-icons/fi";

export default function EditorToolbar() {
  const [selectedDevice, setSelectedDevice] = useState("desktop");
  const [zoom, setZoom] = useState(100);

  const deviceIcons = {
    desktop: <FiMonitor />,
    tablet: <FiTablet />,
    mobile: <FiSmartphone />,
  };

  return (
    <div className="h-12 ml-13 bg-[#181A20] border-b border-[#23262F] flex items-center px-6 text-white justify-between">
      {/* Left: Device selector */}
      <div className="flex items-center gap-2">
        {Object.entries(deviceIcons).map(([device, icon]) => (
          <button
            key={device}
            className={`p-2 rounded hover:bg-[#23262F] ${selectedDevice === device ? "bg-[#23262F] text-[#377DFF]" : ""}`}
            onClick={() => setSelectedDevice(device)}
            title={device.charAt(0).toUpperCase() + device.slice(1)}
          >
            {icon}
          </button>
        ))}
        <span className="ml-4 text-sm font-medium">
          {selectedDevice.charAt(0).toUpperCase() + selectedDevice.slice(1)}
        </span>
      </div>
      {/* Center: File name and badge */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
        <span className="text-white font-medium text-base px-3 py-1 rounded flex items-center gap-1 cursor-pointer">
          Untitled file <FiChevronDown className="ml-1 text-[#6B7280]" />
        </span>
        <span className="bg-[#23262F] text-[#E5E7EB] text-xs p-2 rounded-lg ml-2">
          Free
        </span>
      </div>
      {/* Right: Zoom controls */}
      <div className="flex items-center gap-2">
        <button
          className="p-2 rounded hover:bg-[#23262F]"
          onClick={() => setZoom(Math.max(50, zoom - 10))}
          title="Zoom out"
        >
          -
        </button>
        <span className="text-sm">{zoom}%</span>
        <button
          className="p-2 rounded hover:bg-[#23262F]"
          onClick={() => setZoom(Math.min(200, zoom + 10))}
          title="Zoom in"
        >
          +
        </button>
      </div>
    </div>
  );
}
