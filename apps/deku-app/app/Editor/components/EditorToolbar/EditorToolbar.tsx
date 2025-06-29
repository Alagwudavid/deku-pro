"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  FiFile,
  FiClock,
  FiUpload,
  FiMonitor,
  FiTablet,
  FiSmartphone,
  FiPlay,
  FiHelpCircle,
  FiMinus,
  FiPlus,
  FiSettings,
  FiChevronDown,
  FiChevronRight,
  FiFolder,
  FiSave,
  FiDownload,
  FiGithub,
  FiImage,
  FiPrinter,
  FiPackage,
  FiTrash2,
  FiCornerUpLeft,
  FiCornerUpRight,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useStore } from "../../store/store";
import { useHistory } from "../../contexts/HistoryContext";

interface Device {
  id: string;
  name: string;
  type: "laptop" | "tablet" | "mobile";
  width: number;
  height: number;
}

interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  submenu?: MenuItem[];
  onClick?: () => void;
}

interface NestedMenuItem extends MenuItem {
  submenu?: NestedMenuItem[];
}

const devices: Record<string, Device[]> = {
  laptop: [
    {
      id: "macbook",
      name: "MacBook Pro",
      type: "laptop",
      width: 1440,
      height: 900,
    },
    {
      id: "desktop",
      name: "Desktop",
      type: "laptop",
      width: 1920,
      height: 1080,
    },
  ],
  tablet: [
    {
      id: "ipad-pro",
      name: "iPad Pro",
      type: "tablet",
      width: 1024,
      height: 1366,
    },
    { id: "ipad", name: "iPad", type: "tablet", width: 768, height: 1024 },
  ],
  mobile: [
    {
      id: "iphone-14",
      name: "iPhone 14",
      type: "mobile",
      width: 390,
      height: 844,
    },
    {
      id: "iphone-13",
      name: "iPhone 13",
      type: "mobile",
      width: 390,
      height: 844,
    },
    {
      id: "samsung-s22",
      name: "Samsung S22",
      type: "mobile",
      width: 360,
      height: 780,
    },
  ],
};

const fileMenuItems: NestedMenuItem[] = [
  {
    id: "new",
    label: "New",
    icon: <FiFile />,
    submenu: [
      { id: "new-portfolio", label: "Portfolio Page", shortcut: "Ctrl+N" },
      {
        id: "new-storefront",
        label: "Storefront Page",
        shortcut: "Ctrl+Shift+N",
      },
    ],
  },
  {
    id: "open",
    label: "Open",
    icon: <FiFolder />,
    submenu: [
      { id: "open-file", label: "Open File...", shortcut: "Ctrl+O" },
      { id: "open-folder", label: "Open Folder...", shortcut: "Ctrl+K Ctrl+O" },
      { id: "open-workspace", label: "Open Workspace from File..." },
    ],
  },
  {
    id: "save",
    label: "Save",
    icon: <FiSave />,
    submenu: [
      { id: "save", label: "Save", shortcut: "Ctrl+S" },
      { id: "save-as", label: "Save As...", shortcut: "Ctrl+Shift+S" },
      { id: "save-all", label: "Save All", shortcut: "Ctrl+K S" },
    ],
  },
  {
    id: "export",
    label: "Export",
    icon: <FiDownload />,
    submenu: [
      { id: "export-png", label: "As PNG Image", icon: <FiImage /> },
      { id: "export-pdf", label: "As PDF Document", icon: <FiPrinter /> },
      { id: "export-zip", label: "As ZIP Archive", icon: <FiPackage /> },
      { id: "export-github", label: "To GitHub", icon: <FiGithub /> },
    ],
  },
];

export default function EditorToolbar() {
  const [selectedDevice, setSelectedDevice] = useState<string>("desktop");
  const [showDevices, setShowDevices] = useState(false);
  const [showFileMenu, setShowFileMenu] = useState(false);
  const [expandedSubmenu, setExpandedSubmenu] = useState<string | null>(null);
  const [expandedDeviceType, setExpandedDeviceType] = useState<string | null>(
    null
  );
  const [zoom, setZoom] = useState<number>(100);
  const [lastSaved, setLastSaved] = useState<string>("2m ago");
  const [isUnsaved, setIsUnsaved] = useState(false);
  const [fileHistory, setFileHistory] = useState([
    { name: "LandingPage.deku", time: "2m ago" },
    { name: "Scootric.deku", time: "10m ago" },
    { name: "Gallery.deku", time: "1h ago" },
  ]);
  const {
    showPropertiesPanel,
    setShowPropertiesPanel,
    showHistoryPanel,
    setShowHistoryPanel,
  } = useStore();
  const {
    state: { snapshots, current },
    undo,
    redo,
  } = useHistory();
  const devicesRef = useRef<HTMLDivElement>(null);
  const fileMenuRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const clearHistory = () => setFileHistory([]);

  const handleDeviceClick = (device: Device) => {
    setSelectedDevice(device.id);
    setShowDevices(false);
    // Here you would handle the viewport resize
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      devicesRef.current &&
      !devicesRef.current.contains(event.target as Node)
    ) {
      setShowDevices(false);
    }
    if (
      fileMenuRef.current &&
      !fileMenuRef.current.contains(event.target as Node)
    ) {
      setShowFileMenu(false);
      setExpandedSubmenu(null);
    }
    if (
      historyRef.current &&
      !historyRef.current.contains(event.target as Node)
    ) {
      setShowHistoryPanel(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderSubmenu = (items: NestedMenuItem[], parentId: string) => {
    return (
      <div className="absolute left-full top-0 mt-0 w-64 bg-[#181A20] border border-[#23262F] rounded-lg shadow-lg">
        {items.map((item) => (
          <div key={item.id} className="relative">
            <button
              className="w-full cursor-pointer flex items-center justify-between px-4 py-2 text-sm text-[#A1A1AA] hover:text-white hover:bg-[#23262F]"
              onClick={() => {
                if (item.submenu) {
                  setExpandedSubmenu(
                    expandedSubmenu === item.id ? null : item.id
                  );
                } else if (item.onClick) {
                  item.onClick();
                  setShowFileMenu(false);
                  setExpandedSubmenu(null);
                }
              }}
            >
              <div className="flex items-center gap-2">
                {item.icon}
                <span>{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.shortcut && (
                  <span className="text-xs text-[#6B7280]">
                    {item.shortcut}
                  </span>
                )}
                {item.submenu && (
                  <FiChevronRight
                    className={`transition-transform ${
                      expandedSubmenu === item.id ? "rotate-90" : ""
                    }`}
                  />
                )}
              </div>
            </button>
            {item.submenu &&
              expandedSubmenu === item.id &&
              renderSubmenu(item.submenu, item.id)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="h-12 bg-[#181A20] border-b border-[#23262F] flex items-center justify-between px-4 ml-13">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="relative" ref={fileMenuRef}>
            <button
              className={`flex cursor-pointer items-center gap-2 text-sm text-[#A1A1AA] hover:text-white ${
                showFileMenu ? "text-white" : ""
              }`}
              onClick={() => setShowFileMenu(!showFileMenu)}
            >
              <FiFile /> File
            </button>
            {showFileMenu && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-[#181A20] border border-[#23262F] rounded-lg shadow-lg overflow-hidden">
                {fileMenuItems.map((item) => (
                  <div key={item.id} className="relative">
                    <button
                      className="w-full cursor-pointer flex items-center justify-between px-4 py-2 text-sm text-[#A1A1AA] hover:text-white hover:bg-[#23262F] first:rounded-t-lg last:rounded-b-lg"
                      onClick={() => {
                        if (item.submenu) {
                          setExpandedSubmenu(
                            expandedSubmenu === item.id ? null : item.id
                          );
                        } else if (item.onClick) {
                          item.onClick();
                          setShowFileMenu(false);
                        }
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      {item.submenu && (
                        <FiChevronRight
                          className={`transition-transform ${
                            expandedSubmenu === item.id ? "rotate-90" : ""
                          }`}
                        />
                      )}
                    </button>
                    {item.submenu && expandedSubmenu === item.id && (
                      <div className="bg-[#23262F] rounded-b-lg shadow-lg overflow-hidden">
                        {item.submenu.map((subItem) => (
                          <div key={subItem.id} className="relative">
                            <button
                              className="w-full cursor-pointer flex items-center justify-between px-4 py-2 text-sm text-[#A1A1AA] hover:text-white hover:bg-[#23262F]/50 first:rounded-t-lg last:rounded-b-lg"
                              onClick={() => {
                                if (subItem.submenu) {
                                  setExpandedSubmenu(
                                    expandedSubmenu === subItem.id
                                      ? null
                                      : subItem.id
                                  );
                                } else if (subItem.onClick) {
                                  subItem.onClick();
                                  setShowFileMenu(false);
                                  setExpandedSubmenu(null);
                                }
                              }}
                            >
                              <div className="flex items-center gap-2">
                                {subItem.icon}
                                <span>{subItem.label}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {subItem.shortcut && (
                                  <span className="text-xs text-[#6B7280]">
                                    {subItem.shortcut}
                                  </span>
                                )}
                                {subItem.submenu && (
                                  <FiChevronRight
                                    className={`transition-transform ${
                                      expandedSubmenu === subItem.id
                                        ? "rotate-90"
                                        : ""
                                    }`}
                                  />
                                )}
                              </div>
                            </button>
                            {subItem.submenu &&
                              expandedSubmenu === subItem.id &&
                              renderSubmenu(subItem.submenu, subItem.id)}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative" ref={historyRef}>
            <button
              className={`cursor-pointer flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-white ${
                showHistoryPanel ? "text-white" : ""
              }`}
              onClick={() => setShowHistoryPanel(!showHistoryPanel)}
            >
              <FiClock /> History
            </button>
            {showHistoryPanel && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-[#181A20] border border-[#23262F] rounded-lg shadow-lg overflow-hidden">
                <div className="flex items-center justify-between p-3 border-b border-[#23262F]">
                  <span className="text-xs text-[#A1A1AA] font-semibold flex items-center gap-1">
                    <FiClock className="text-[#377DFF]" /> File History
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={undo}
                      disabled={current <= 0}
                      className="text-[#6B7280] hover:text-white disabled:opacity-50 disabled:hover:text-[#6B7280]"
                      title="Undo"
                    >
                      <FiCornerUpLeft />
                    </button>
                    <button
                      onClick={redo}
                      disabled={current >= snapshots.length - 1}
                      className="text-[#6B7280] hover:text-white disabled:opacity-50 disabled:hover:text-[#6B7280]"
                      title="Redo"
                    >
                      <FiCornerUpRight />
                    </button>
                    <button
                      onClick={clearHistory}
                      className="text-[#6B7280] hover:text-red-500 text-xs flex items-center gap-1"
                    >
                      <FiTrash2 /> Clear
                    </button>
                  </div>
                </div>
                <div className="max-h-48 overflow-y-auto">
                  {fileHistory.length === 0 ? (
                    <div className="text-xs text-[#6B7280] text-center py-4">
                      No recent files
                    </div>
                  ) : (
                    fileHistory.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between px-3 py-2 hover:bg-[#23262F] cursor-pointer"
                      >
                        <span className="text-sm text-white truncate">
                          {file.name}
                        </span>
                        <span className="text-xs text-[#6B7280] ml-2">
                          {file.time}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="relative" ref={devicesRef}>
            <button
              className="cursor-pointer flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-white"
              onClick={() => setShowDevices(!showDevices)}
            >
              <FiMonitor /> Devices
              <FiChevronDown
                className={`transition-transform ${showDevices ? "rotate-180" : ""}`}
              />
            </button>

            {showDevices && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-[#181A20] border border-[#23262F] rounded-lg shadow-lg">
                <div className="max-h-[60vh] overflow-y-auto">
                  {Object.entries(devices).map(([type, deviceList]) => (
                    <div
                      key={type}
                      className="border-b border-[#23262F] last:border-b-0"
                    >
                      <button
                        className="w-full cursor-pointer flex items-center justify-between px-4 py-2 text-sm text-[#A1A1AA] hover:text-white hover:bg-[#23262F]"
                        onClick={() =>
                          setExpandedDeviceType(
                            expandedDeviceType === type ? null : type
                          )
                        }
                      >
                        <div className="flex items-center gap-2">
                          {type === "laptop" && <FiMonitor />}
                          {type === "tablet" && <FiTablet />}
                          {type === "mobile" && <FiSmartphone />}
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </div>
                        <FiChevronRight
                          className={`transition-transform ${expandedDeviceType === type ? "rotate-90" : ""}`}
                        />
                      </button>

                      {expandedDeviceType === type && (
                        <div className="bg-[#23262F]">
                          {deviceList.map((device) => (
                            <button
                              key={device.id}
                              className="w-full cursor-pointer flex items-center justify-between px-4 py-2 text-sm text-[#A1A1AA] hover:text-white hover:bg-[#23262F]/50"
                              onClick={() => handleDeviceClick(device)}
                            >
                              {device.name}
                              <span className="text-xs text-[#6B7280]">
                                {device.width}x{device.height}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button className="cursor-pointer flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-white">
            <FiUpload /> Publish
          </button>

          <button className="cursor-pointer flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-white">
            <FiPlay /> Run
          </button>

          <button className="cursor-pointer flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-white">
            <FiHelpCircle /> Help
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden relative">
          <button
            className="cursor-pointer flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <FiMenu /> Menu
            <FiChevronDown
              className={`transition-transform ${isMobileMenuOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-[#181A20] border border-[#23262F] rounded-lg shadow-lg overflow-hidden z-50">
              {/* File Menu Item */}
              <div className="relative">
                <button
                  className="w-full cursor-pointer flex items-center justify-between px-4 py-2 text-sm text-[#A1A1AA] hover:text-white hover:bg-[#23262F] first:rounded-t-lg"
                  onClick={() => setShowFileMenu(!showFileMenu)}
                >
                  <div className="flex items-center gap-2">
                    <FiFile /> File
                  </div>
                  <FiChevronRight
                    className={`transition-transform ${showFileMenu ? "rotate-90" : ""}`}
                  />
                </button>
                {showFileMenu && (
                  <div className="absolute left-full top-0 w-64 bg-[#181A20] border border-[#23262F] rounded-lg shadow-lg">
                    {fileMenuItems.map((item) => (
                      <div key={item.id} className="relative">
                        <button
                          className="w-full cursor-pointer flex items-center justify-between px-4 py-2 text-sm text-[#A1A1AA] hover:text-white hover:bg-[#23262F] first:rounded-t-lg last:rounded-b-lg"
                          onClick={() => {
                            if (item.submenu) {
                              setExpandedSubmenu(
                                expandedSubmenu === item.id ? null : item.id
                              );
                            }
                          }}
                        >
                          <div className="flex items-center gap-2">
                            {item.icon}
                            <span>{item.label}</span>
                          </div>
                          {item.submenu && (
                            <FiChevronRight
                              className={`transition-transform ${expandedSubmenu === item.id ? "rotate-90" : ""}`}
                            />
                          )}
                        </button>
                        {item.submenu &&
                          expandedSubmenu === item.id &&
                          renderSubmenu(item.submenu, item.id)}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* History Menu Item */}
              <div className="relative">
                <button
                  className="w-full cursor-pointer flex items-center justify-between px-4 py-2 text-sm text-[#A1A1AA] hover:text-white hover:bg-[#23262F]"
                  onClick={() => setShowHistoryPanel(!showHistoryPanel)}
                >
                  <div className="flex items-center gap-2">
                    <FiClock /> History
                  </div>
                  <FiChevronRight
                    className={`transition-transform ${showHistoryPanel ? "rotate-90" : ""}`}
                  />
                </button>
                {showHistoryPanel && (
                  <div className="absolute left-full top-0 w-64 bg-[#181A20] border border-[#23262F] rounded-lg shadow-lg">
                    <div className="p-3 border-b border-[#23262F]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={undo}
                            disabled={current <= 0}
                            className="text-[#6B7280] hover:text-white disabled:opacity-50"
                          >
                            <FiCornerUpLeft />
                          </button>
                          <button
                            onClick={redo}
                            disabled={current >= snapshots.length - 1}
                            className="text-[#6B7280] hover:text-white disabled:opacity-50"
                          >
                            <FiCornerUpRight />
                          </button>
                        </div>
                        <button
                          onClick={clearHistory}
                          className="text-[#6B7280] hover:text-red-500 text-xs flex items-center gap-1"
                        >
                          <FiTrash2 /> Clear
                        </button>
                      </div>
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                      {fileHistory.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between px-4 py-2 text-sm text-[#A1A1AA] hover:text-white hover:bg-[#23262F]"
                        >
                          <span>{file.name}</span>
                          <span className="text-xs text-[#6B7280]">
                            {file.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Devices Menu Item */}
              <div className="relative">
                <button
                  className="w-full cursor-pointer flex items-center justify-between px-4 py-2 text-sm text-[#A1A1AA] hover:text-white hover:bg-[#23262F]"
                  onClick={() => setShowDevices(!showDevices)}
                >
                  <div className="flex items-center gap-2">
                    <FiMonitor /> Devices
                  </div>
                  <FiChevronRight
                    className={`transition-transform ${showDevices ? "rotate-90" : ""}`}
                  />
                </button>
                {showDevices && (
                  <div className="absolute left-full top-0 w-64 bg-[#181A20] border border-[#23262F] rounded-lg shadow-lg">
                    {Object.entries(devices).map(([type, deviceList]) => (
                      <div key={type} className="relative">
                        <button
                          className="w-full cursor-pointer flex items-center justify-between px-4 py-2 text-sm text-[#A1A1AA] hover:text-white hover:bg-[#23262F]"
                          onClick={() =>
                            setExpandedDeviceType(
                              expandedDeviceType === type ? null : type
                            )
                          }
                        >
                          <div className="flex items-center gap-2">
                            {type === "laptop" && <FiMonitor />}
                            {type === "tablet" && <FiTablet />}
                            {type === "mobile" && <FiSmartphone />}
                            <span>
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </span>
                          </div>
                          <FiChevronRight
                            className={`transition-transform ${expandedDeviceType === type ? "rotate-90" : ""}`}
                          />
                        </button>
                        {expandedDeviceType === type && (
                          <div className="absolute left-full top-0 w-64 bg-[#181A20] border border-[#23262F] rounded-lg shadow-lg">
                            {deviceList.map((device) => (
                              <button
                                key={device.id}
                                className="w-full cursor-pointer flex items-center justify-between px-4 py-2 text-sm text-[#A1A1AA] hover:text-white hover:bg-[#23262F]"
                                onClick={() => handleDeviceClick(device)}
                              >
                                <span>{device.name}</span>
                                <span className="text-xs text-[#6B7280]">
                                  {device.width}x{device.height}
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Other Actions */}
              <button className="w-full cursor-pointer flex items-center gap-2 px-4 py-2 text-sm text-[#A1A1AA] hover:text-white hover:bg-[#23262F]">
                <FiUpload /> Publish
              </button>
              <button className="w-full cursor-pointer flex items-center gap-2 px-4 py-2 text-sm text-[#A1A1AA] hover:text-white hover:bg-[#23262F]">
                <FiPlay /> Run
              </button>
              <button className="w-full cursor-pointer flex items-center gap-2 px-4 py-2 text-sm text-[#A1A1AA] hover:text-white hover:bg-[#23262F] last:rounded-b-lg">
                <FiHelpCircle /> Help
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Center Section */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-white">Project Name</span>
        <span className="text-xs text-[#6B7280]">
          {isUnsaved ? "• Unsaved" : `• Saved ${lastSaved}`}
        </span>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            className="cursor-pointer p-1 text-[#A1A1AA] hover:text-white"
            onClick={() => setZoom((prev) => Math.max(prev - 10, 50))}
          >
            <FiMinus />
          </button>
          <span className="text-sm text-[#A1A1AA]">{zoom}%</span>
          <button
            className="cursor-pointer p-1 text-[#A1A1AA] hover:text-white"
            onClick={() => setZoom((prev) => Math.min(prev + 10, 200))}
          >
            <FiPlus />
          </button>
        </div>

        <button
          className={`cursor-pointer p-1 text-[#A1A1AA] hover:text-white transition-all duration-300 transform ${
            showPropertiesPanel ? "text-white" : ""
          }`}
          onClick={() => setShowPropertiesPanel(!showPropertiesPanel)}
        >
          <FiSettings />
        </button>
      </div>
    </div>
  );
}
