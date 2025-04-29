import React from 'react';
import { useEditor } from '@/contexts/EditorContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

interface PageSettingsPanelProps {
  pageId: string;
}

export const PageSettingsPanel = ({ pageId }: PageSettingsPanelProps) => {
  const { pages, updateComponent } = useEditor();
  const page = pages.find((p) => p.id === pageId);

  return (
    <div className="p-4 space-y-6">
      {/* SEO Settings */}
      <div className="space-y-2">
        <Label>SEO Settings</Label>
        <div className="space-y-4">
          <div className="space-y-1">
            <Label>Page Title</Label>
            <Input placeholder="Enter page title" />
          </div>
          <div className="space-y-1">
            <Label>Meta Description</Label>
            <Textarea placeholder="Enter meta description" />
          </div>
          <div className="space-y-1">
            <Label>Keywords</Label>
            <Input placeholder="Enter keywords (comma separated)" />
          </div>
        </div>
      </div>

      {/* Social Sharing */}
      <div className="space-y-2">
        <Label>Social Sharing</Label>
        <div className="space-y-4">
          <div className="space-y-1">
            <Label>Open Graph Title</Label>
            <Input placeholder="Enter OG title" />
          </div>
          <div className="space-y-1">
            <Label>Open Graph Description</Label>
            <Textarea placeholder="Enter OG description" />
          </div>
          <div className="space-y-1">
            <Label>Open Graph Image URL</Label>
            <Input placeholder="Enter OG image URL" />
          </div>
        </div>
      </div>

      {/* Custom Code */}
      <div className="space-y-2">
        <Label>Custom Code</Label>
        <div className="space-y-4">
          <div className="space-y-1">
            <Label>Head Code</Label>
            <Textarea
              placeholder="Enter custom code for &lt;head&gt; section"
              className="font-mono text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label>Body Code</Label>
            <Textarea
              placeholder="Enter custom code for &lt;body&gt; section"
              className="font-mono text-sm"
            />
          </div>
        </div>
      </div>

      {/* Page Transitions */}
      <div className="space-y-2">
        <Label>Page Transitions</Label>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Enable Page Transitions</Label>
            <Switch />
          </div>
          <div className="space-y-1">
            <Label>Transition Type</Label>
            <select className="w-full p-2 border rounded-md">
              <option value="fade">Fade</option>
              <option value="slide">Slide</option>
              <option value="zoom">Zoom</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}; 