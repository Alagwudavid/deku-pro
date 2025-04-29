import React from 'react';
import { useEditor } from '@/contexts/EditorContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const SettingsPanel = () => {
  const { selectedPage } = useEditor();

  return (
    <div className="p-4 space-y-6">
      {/* Element ID and Classes */}
      <div className="space-y-2">
        <Label>Element Identification</Label>
        <div className="space-y-4">
          <div className="space-y-1">
            <Label>ID</Label>
            <Input placeholder="element-id" />
          </div>
          <div className="space-y-1">
            <Label>Classes</Label>
            <Input placeholder="class1 class2 class3" />
          </div>
        </div>
      </div>

      {/* Visibility */}
      <div className="space-y-2">
        <Label>Visibility</Label>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Hide on Mobile</Label>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <Label>Hide on Tablet</Label>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <Label>Hide on Desktop</Label>
            <Switch />
          </div>
        </div>
      </div>

      {/* Animation */}
      <div className="space-y-2">
        <Label>Animation</Label>
        <div className="space-y-4">
          <div className="space-y-1">
            <Label>Animation Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select animation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="fade">Fade</SelectItem>
                <SelectItem value="slide">Slide</SelectItem>
                <SelectItem value="bounce">Bounce</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label>Animation Duration</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fast">Fast (300ms)</SelectItem>
                <SelectItem value="normal">Normal (500ms)</SelectItem>
                <SelectItem value="slow">Slow (700ms)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Interaction */}
      <div className="space-y-2">
        <Label>Interaction</Label>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Clickable</Label>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <Label>Draggable</Label>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <Label>Resizable</Label>
            <Switch />
          </div>
        </div>
      </div>
    </div>
  );
}; 