import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Layout, Rows } from 'lucide-react';

const pageTemplates = [
  { name: 'Portfolio Homepage', category: 'Portfolio' },
  { name: 'Agency Landing', category: 'Business' },
  { name: 'Personal Blog', category: 'Blog' },
  { name: 'Online Store', category: 'E-commerce' },
  { name: 'Service Showcase', category: 'Business' },
];

const sectionTemplates = [
  { name: 'Hero Section', category: 'Hero' },
  { name: 'Feature Grid', category: 'Features' },
  { name: 'Testimonial Slider', category: 'Social Proof' },
  { name: 'Contact Form', category: 'Forms' },
  { name: 'Pricing Table', category: 'Pricing' },
];

export const TemplatesTab = () => {
  return (
    <div className="p-4">
      <div className="mb-4">
        <Input type="search" placeholder="Search templates..." />
      </div>

      <Tabs defaultValue="pages">
        <TabsList className="w-full">
          <TabsTrigger value="pages" className="flex-1">
            <Layout className="w-4 h-4 mr-2" />
            Page Templates
          </TabsTrigger>
          <TabsTrigger value="sections" className="flex-1">
            <Rows className="w-4 h-4 mr-2" />
            Section Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pages" className="mt-4">
          <div className="grid gap-4">
            {pageTemplates.map((template, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg hover:border-blue-500 cursor-pointer transition-colors"
              >
                <div className="aspect-video bg-gray-100 rounded-md mb-2" />
                <div className="text-sm font-medium">{template.name}</div>
                <div className="text-xs text-gray-500">{template.category}</div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sections" className="mt-4">
          <div className="grid gap-4">
            {sectionTemplates.map((template, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg hover:border-blue-500 cursor-pointer transition-colors"
              >
                <div className="aspect-[2/1] bg-gray-100 rounded-md mb-2" />
                <div className="text-sm font-medium">{template.name}</div>
                <div className="text-xs text-gray-500">{template.category}</div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}; 