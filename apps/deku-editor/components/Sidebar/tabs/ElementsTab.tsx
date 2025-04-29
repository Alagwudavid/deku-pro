import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ComponentItem } from './ComponentItem';

const elements = [
  {
    title: 'Text Elements',
    items: ['Heading', 'Paragraph', 'List', 'Quote', 'Code Block']
  },
  {
    title: 'Media Elements',
    items: ['Image', 'Video', 'Icon', 'SVG', 'Audio']
  },
  {
    title: 'Interactive Elements',
    items: ['Button', 'Link', 'Input', 'Form', 'Dropdown']
  },
  {
    title: 'Layout Elements',
    items: ['Container', 'Grid', 'Flexbox', 'Divider', 'Spacer']
  },
  {
    title: 'Social Elements',
    items: ['Social Links', 'Share Buttons', 'Follow Button', 'Like Button', 'Comment Section']
  }
];

export const ElementsTab = () => {
  return (
    <div className="p-4">
      <Accordion type="multiple" className="w-full">
        {elements.map((section, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-sm font-medium">
              {section.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-2 p-2">
                {section.items.map((item, itemIndex) => (
                  <ComponentItem
                    key={itemIndex}
                    name={item}
                    type={section.title.toLowerCase().replace(' ', '-')}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}; 