import React from 'react';
import { Button } from '../ui/button';
import { Sun, Moon, Download, FileText, FileImage, FileCode, FileArchive, Share2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const TopNav = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="h-12 border-b border-border bg-background flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="gap-2">
              <FileImage className="h-4 w-4" />
              Export as PNG
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <FileText className="h-4 w-4" />
              Export as PDF
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <FileCode className="h-4 w-4" />
              Export as SVG
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <FileArchive className="h-4 w-4" />
              Export Code (ZIP)
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <Share2 className="h-4 w-4" />
              Export to...
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="default" size="sm" className="h-8">
          Publish
        </Button>
      </div>
    </div>
  );
}; 