"use client";

import React from "react";
import { useCanvasStore } from "@/lib/store/canvasStore";
import { Button } from "@/components/ui/button";
import {
  Undo2,
  Redo2,
  Save,
  Eye,
  UploadCloud,
  Monitor,
  Tablet,
  Smartphone,
  FileImage,
  FileText,
  FileArchive,
  Share2,
  PenTool,
  Sun,
  Moon,
  Download,
  FileCode,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEditor } from "@/contexts/EditorContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

const Topbar: React.FC = () => {
  const {
    undo,
    redo,
    save,
    preview,
    publish,
    zoomIn,
    zoomOut,
    deviceView,
    setDeviceView,
    isPreviewMode,
    togglePreview,
  } = useCanvasStore();

  const { selectedPage } = useEditor();
  const [zoom, setZoom] = React.useState(100);
  const { theme, setTheme } = useTheme();

  const devices = [
    { type: "mobile", icon: Smartphone, label: "Mobile" },
    { type: "tablet", icon: Tablet, label: "Tablet" },
    { type: "desktop", icon: Monitor, label: "Desktop" },
  ];

  const handleExport = (type: string) => {
    console.log(`Exporting as ${type}`);
  };

  return (
    <div className="h-14 border-b border-border bg-background w-full flex items-center">
      <div className="px-4 flex items-center justify-between mx-auto max-w-screen-2xl w-full">
        {/* Left section */}
        <div className="flex items-center justify-between lg:w-fit w-full gap-2">
          {/* Brand icon and app name */}
          <div className="flex items-center mr-4">
            <PenTool className="w-5 h-5 text-primary mr-1" />
            <span className="font-semibold text-lg text-foreground select-none">
              deku
            </span>
          </div>

          {/* Original buttons hidden below lg */}
          <div className="hidden lg:flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <Save className="w-4 h-4 mr-2" />
              <span className="hidden lg:inline">Save</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <Undo2 className="w-4 h-4 mr-2" />
              <span className="hidden lg:inline">Undo</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <Redo2 className="w-4 h-4 mr-2" />
              <span className="hidden lg:inline">Redo</span>
            </Button>
          </div>

          {/* Responsive menu button visible below lg */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden h-8 w-8 p-0 flex items-center justify-center"
                aria-label="Menu"
              >
                {/* Hamburger icon */}
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              sideOffset={4}
              align="start"
              className="w-56 max-h-[calc(100vh-4rem)] overflow-y-auto"
              side="bottom"
              avoidCollisions={true}
              collisionPadding={8}
            >
              {/* Left section buttons */}
              <DropdownMenuItem className="gap-2">
                <Save className="h-4 w-4" />
                <span>Save</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Undo2 className="h-4 w-4" />
                <span>Undo</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Redo2 className="h-4 w-4" />
                <span>Redo</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* Center section buttons */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Device View</DropdownMenuSubTrigger>
                <DropdownMenuSubContent
                  sideOffset={2}
                  alignOffset={-5}
                  avoidCollisions={true}
                  collisionPadding={8}
                >
                  {devices.map((device) => {
                    const Icon = device.icon;
                    return (
                      <DropdownMenuItem
                        key={device.type}
                        className="gap-2"
                        onClick={() => setDeviceView(device.type)}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{device.label}</span>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuItem
                className="gap-2"
                onClick={() => setZoom(Math.max(50, zoom - 10))}
              >
                <span>- Zoom Out</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2"
                onClick={() => setZoom(Math.min(200, zoom + 10))}
              >
                <span>+ Zoom In</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* Right section buttons */}
              <DropdownMenuItem
                className="gap-2"
                onClick={() => togglePreview()}
              >
                <Eye className="h-4 w-4" />
                <span>{isPreviewMode ? "Exit Preview" : "Preview"}</span>
              </DropdownMenuItem>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Export</DropdownMenuSubTrigger>
                <DropdownMenuSubContent
                  sideOffset={2}
                  alignOffset={-5}
                  avoidCollisions={true}
                  collisionPadding={8}
                >
                  <DropdownMenuItem
                    onClick={() => handleExport("PNG")}
                    className="gap-2"
                  >
                    <FileImage className="h-4 w-4" />
                    <span>Export as PNG</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleExport("PDF")}
                    className="gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Export as PDF</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleExport("SVG")}
                    className="gap-2"
                  >
                    <FileCode className="h-4 w-4" />
                    <span>Export as SVG</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleExport("ZIP")}
                    className="gap-2"
                  >
                    <FileArchive className="h-4 w-4" />
                    <span>Export Code (ZIP)</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2">
                    <Share2 className="h-4 w-4" />
                    <span>Export to...</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuItem className="gap-2" onClick={() => publish()}>
                <span>Publish</span>
                <UploadCloud className="h-4 w-4" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Center section */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2">
            {devices.map((device) => {
              const Icon = device.icon;
              return (
                <Button
                  key={device.type}
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8 text-muted-foreground hover:text-foreground",
                    deviceView === device.type && "bg-primary/10 text-primary"
                  )}
                  onClick={() => setDeviceView(device.type)}
                >
                  <Icon className="h-4 w-4" />
                </Button>
              );
            })}
            <span className="text-sm font-medium ml-2 text-foreground">
              {devices.find((d) => d.type === deviceView)?.label}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => setZoom(Math.max(50, zoom - 10))}
            >
              -
            </Button>
            <span className="text-sm w-12 text-center text-foreground">
              {zoom}%
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => setZoom(Math.min(200, zoom + 10))}
            >
              +
            </Button>
          </div>
        </div>

        {/* Right section */}
        <div className="hidden lg:flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground hidden lg:flex"
            onClick={() => togglePreview()}
          >
            <Eye className="w-4 h-4 mr-2" />
            <span className="hidden lg:inline">Preview</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground hidden lg:flex h-8 gap-2"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => handleExport("PNG")}
                className="gap-2"
              >
                <FileImage className="h-4 w-4" />
                <span>Export as PNG</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleExport("PDF")}
                className="gap-2"
              >
                <FileText className="h-4 w-4" />
                <span>Export as PDF</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleExport("SVG")}
                className="gap-2"
              >
                <FileCode className="h-4 w-4" />
                <span>Export as SVG</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleExport("ZIP")}
                className="gap-2"
              >
                <FileArchive className="h-4 w-4" />
                <span>Export Code (ZIP)</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Share2 className="h-4 w-4" />
                <span>Export to...</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="default"
            size="sm"
            className="h-8 gap-2 hidden lg:flex"
            onClick={() => publish()}
          >
            <span className="hidden sm:inline">Publish</span>
            <UploadCloud className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
