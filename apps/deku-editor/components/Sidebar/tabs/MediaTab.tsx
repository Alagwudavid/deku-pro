import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Image, Film, FileText } from 'lucide-react';

export const MediaTab = () => {
  return (
    <div className="p-4">
      <div className="mb-4">
        <Button className="w-full">
          <Upload className="w-4 h-4 mr-2" />
          Upload Media
        </Button>
      </div>

      <Tabs defaultValue="images">
        <TabsList className="w-full">
          <TabsTrigger value="images" className="flex-1">
            <Image className="w-4 h-4 mr-2" />
            Images
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex-1">
            <Film className="w-4 h-4 mr-2" />
            Videos
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex-1">
            <FileText className="w-4 h-4 mr-2" />
            Documents
          </TabsTrigger>
        </TabsList>

        <div className="my-4">
          <Input type="search" placeholder="Search media..." />
        </div>

        <TabsContent value="images">
          <div className="grid grid-cols-2 gap-2">
            {/* Placeholder for images */}
            <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center">
              <Image className="w-6 h-6 text-gray-400" />
            </div>
            {/* Add more image placeholders as needed */}
          </div>
        </TabsContent>

        <TabsContent value="videos">
          <div className="grid grid-cols-2 gap-2">
            {/* Placeholder for videos */}
            <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
              <Film className="w-6 h-6 text-gray-400" />
            </div>
            {/* Add more video placeholders as needed */}
          </div>
        </TabsContent>

        <TabsContent value="documents">
          <div className="space-y-2">
            {/* Placeholder for documents */}
            <div className="p-4 bg-gray-100 rounded-md flex items-center">
              <FileText className="w-6 h-6 text-gray-400 mr-2" />
              <div className="flex-1">
                <div className="text-sm font-medium">Document.pdf</div>
                <div className="text-xs text-gray-500">PDF • 2.5MB</div>
              </div>
            </div>
            {/* Add more document placeholders as needed */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}; 