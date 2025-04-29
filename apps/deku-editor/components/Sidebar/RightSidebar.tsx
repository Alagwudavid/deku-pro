import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StylePanel } from './panels/StylePanel';
import { SettingsPanel } from './panels/SettingsPanel';
import { PageSettingsPanel } from './panels/PageSettingsPanel';
import { useEditor } from '@/contexts/EditorContext';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const RightSidebar = () => {
  const { selectedPage } = useEditor();
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className={cn(
      "h-full border-l border-border bg-background flex transition-all duration-300 ease-in-out",
      isExpanded ? "w-80" : "w-12"
    )}>
      {/* Content sidebar */}
      {isExpanded && (
        <div className="flex-1 flex flex-col">
          <Tabs defaultValue="style" className="h-full">
            <TabsList className="w-full justify-start px-4 py-2 border-b border-border">
              <TabsTrigger value="style" className="text-muted-foreground data-[state=active]:text-foreground">
                Style
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-muted-foreground data-[state=active]:text-foreground">
                Settings
              </TabsTrigger>
              <TabsTrigger value="page" className="text-muted-foreground data-[state=active]:text-foreground">
                Page
              </TabsTrigger>
            </TabsList>

            <TabsContent value="style" className="h-[calc(100%-48px)] overflow-y-auto">
              <StylePanel />
            </TabsContent>

            <TabsContent value="settings" className="h-[calc(100%-48px)] overflow-y-auto">
              <SettingsPanel />
            </TabsContent>

            <TabsContent value="page" className="h-[calc(100%-48px)] overflow-y-auto">
              <PageSettingsPanel pageId={selectedPage} />
            </TabsContent>
          </Tabs>
        </div>
      )}

      {/* Collapse button */}
      <div className="w-12 h-full border-l border-border flex flex-col items-center py-4">
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-md flex items-center justify-center transition-colors text-muted-foreground hover:text-foreground hover:bg-muted"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}; 