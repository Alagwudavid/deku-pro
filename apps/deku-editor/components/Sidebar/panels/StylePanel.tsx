import React from 'react';
import { useEditor } from '@/contexts/EditorContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ColorPicker } from '@/components/ui/color-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

export const StylePanel = () => {
  const { selectedPage, updateComponent } = useEditor();

  return (
    <div className="p-4 space-y-6">
      {/* Typography */}
      <div className="space-y-2">
        <Label>Typography</Label>
        <div className="grid grid-cols-2 gap-2">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Font Family" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sans">Sans Serif</SelectItem>
              <SelectItem value="serif">Serif</SelectItem>
              <SelectItem value="mono">Monospace</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Font Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sm">Small</SelectItem>
              <SelectItem value="base">Base</SelectItem>
              <SelectItem value="lg">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-2">
        <Label>Colors</Label>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label>Text Color</Label>
            <ColorPicker color="#000000" onChange={() => {}} />
          </div>
          <div className="space-y-1">
            <Label>Background Color</Label>
            <ColorPicker color="#FFFFFF" onChange={() => {}} />
          </div>
        </div>
      </div>

      {/* Spacing */}
      <div className="space-y-2">
        <Label>Spacing</Label>
        <div className="space-y-4">
          <div className="space-y-1">
            <Label>Padding</Label>
            <Slider defaultValue={[0]} max={100} step={1} />
          </div>
          <div className="space-y-1">
            <Label>Margin</Label>
            <Slider defaultValue={[0]} max={100} step={1} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <Label>Content</Label>
        <Textarea placeholder="Enter text content..." />
      </div>

      {/* Visibility */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Visibility</Label>
          <Switch />
        </div>
      </div>
    </div>
  );
}; 