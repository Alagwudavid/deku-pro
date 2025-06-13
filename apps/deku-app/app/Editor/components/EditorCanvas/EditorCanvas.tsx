"use client";
import { useState, useEffect } from "react";

export default function EditorCanvas({
  children,
}: {
  children: React.ReactNode;
}) {
  const [zoom, setZoom] = useState(100);
  const [device, setDevice] = useState("desktop");

  useEffect(() => {
    // Listen for zoom changes from EditorToolbar
    const handleZoomChange = (e: CustomEvent) => {
      setZoom(e.detail.zoom);
    };
    window.addEventListener("zoom-change", handleZoomChange as EventListener);
    return () =>
      window.removeEventListener(
        "zoom-change",
        handleZoomChange as EventListener
      );
  }, []);

  useEffect(() => {
    // Listen for device changes from EditorToolbar
    const handleDeviceChange = (e: CustomEvent) => {
      setDevice(e.detail.device);
    };
    window.addEventListener(
      "device-change",
      handleDeviceChange as EventListener
    );
    return () =>
      window.removeEventListener(
        "device-change",
        handleDeviceChange as EventListener
      );
  }, []);

  const getDeviceWidth = () => {
    switch (device) {
      case "desktop":
        return "w-[900px]";
      case "tablet":
        return "w-[768px]";
      case "mobile":
        return "w-[375px]";
      default:
        return "w-[900px]";
    }
  };

  return (
    <div className="flex-1 flex justify-center items-start overflow-auto p-8 bg-[#181A20]">
      <div className="w-[900px] min-h-[600px] bg-white dark:bg-[#23262F] shadow-2xl rounded-xl p-8 transition-all duration-200 border border-[#23262F]">
        {children}
      </div>
    </div>
  );
}
