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
} from "react-icons/fi";
import { useStore } from "../../store/store";

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

const fileMenuItems: MenuItem[] = [
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
  const {
    showPropertiesPanel,
    setShowPropertiesPanel,
    showHistoryPanel,
    setShowHistoryPanel,
  } = useStore();
  const devicesRef = useRef<HTMLDivElement>(null);
  const fileMenuRef = useRef<HTMLDivElement>(null);

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
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderSubmenu = (items: MenuItem[], parentId: string) => {
    return (
      <div className="absolute left-full top-0 mt-0 w-64 bg-[#181A20] border border-[#23262F] rounded-lg shadow-lg">
        {items.map((item) => (
          <div key={item.id} className="relative">
            <button
              className="w-full flex items-center justify-between px-4 py-2 text-sm text-[#A1A1AA] hover:text-white hover:bg-[#23262F]"
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
            {item.submenu && expandedSubmenu === item.id && (
              <div className="bg-[#23262F]">
                {item.submenu.map((subItem) => (
                  <div key={subItem.id} className="relative">
                    <button
                      className="w-full flex items-center justify-between px-4 py-2 text-sm text-[#A1A1AA] hover:text-white hover:bg-[#23262F]/50"
                      onClick={() => {
                        if (subItem.submenu) {
                          setExpandedSubmenu(
                            expandedSubmenu === subItem.id ? null : subItem.id
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
                              expandedSubmenu === subItem.id ? "rotate-90" : ""
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
    );
  };

  return (
    <div className="h-12 bg-[#181A20] border-b border-[#23262F] flex items-center justify-between px-4 ml-13">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <div className="relative" ref={fileMenuRef}>
          <button
            className={`flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-white ${
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
                    className="w-full flex items-center justify-between px-4 py-2 text-sm text-[#A1A1AA] hover:text-white hover:bg-[#23262F] first:rounded-t-lg last:rounded-b-lg"
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
                            className="w-full flex items-center justify-between px-4 py-2 text-sm text-[#A1A1AA] hover:text-white hover:bg-[#23262F]/50 first:rounded-t-lg last:rounded-b-lg"
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
                            expandedSubmenu === subItem.id && (
                              <div className="absolute left-full top-0 mt-0 w-64 bg-[#181A20] border border-[#23262F] rounded-lg shadow-lg overflow-hidden">
                                {subItem.submenu.map((nestedItem) => (
                                  <button
                                    key={nestedItem.id}
                                    className="w-full flex items-center justify-between px-4 py-2 text-sm text-[#A1A1AA] hover:text-white hover:bg-[#23262F] first:rounded-t-lg last:rounded-b-lg"
                                    onClick={() => {
                                      if (nestedItem.onClick) {
                                        nestedItem.onClick();
                                        setShowFileMenu(false);
                                        setExpandedSubmenu(null);
                                      }
                                    }}
                                  >
                                    <div className="flex items-center gap-2">
                                      {nestedItem.icon}
                                      <span>{nestedItem.label}</span>
                                    </div>
                                    {nestedItem.shortcut && (
                                      <span className="text-xs text-[#6B7280]">
                                        {nestedItem.shortcut}
                                      </span>
                                    )}
                                  </button>
                                ))}
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          className={`flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-white ${
            showHistoryPanel ? "text-white" : ""
          }`}
          onClick={() => setShowHistoryPanel(!showHistoryPanel)}
        >
          <FiClock /> History
        </button>

        <div className="relative" ref={devicesRef}>
          <button
            className="flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-white"
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
                      className="w-full flex items-center justify-between px-4 py-2 text-sm text-[#A1A1AA] hover:text-white hover:bg-[#23262F]"
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
                            className="w-full flex items-center justify-between px-4 py-2 text-sm text-[#A1A1AA] hover:text-white hover:bg-[#23262F]/50"
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

        <button className="flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-white">
          <FiUpload /> Publish
        </button>

        <button className="flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-white">
          <FiPlay /> Run
        </button>
        <button className="flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-white">
          <FiHelpCircle /> Help
        </button>
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
            className="p-1 text-[#A1A1AA] hover:text-white"
            onClick={() => setZoom((prev) => Math.max(prev - 10, 50))}
          >
            <FiMinus />
          </button>
          <span className="text-sm text-[#A1A1AA]">{zoom}%</span>
          <button
            className="p-1 text-[#A1A1AA] hover:text-white"
            onClick={() => setZoom((prev) => Math.min(prev + 10, 200))}
          >
            <FiPlus />
          </button>
        </div>

        <button
          className={`p-1 text-[#A1A1AA] hover:text-white transition-all duration-300 transform ${
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
