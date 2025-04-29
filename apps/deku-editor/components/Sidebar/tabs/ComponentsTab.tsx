import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ComponentItem } from './ComponentItem';

const sections = [
  {
    title: 'Header Blocks',
    items: ['Standard Header', 'Transparent Header', 'Sticky Header', 'Minimal Header']
  },
  {
    title: 'Hero Layouts',
    items: ['Full-width Hero', 'Split Hero', 'Centered Hero', 'Video Hero']
  },
  {
    title: 'Gallery Layouts',
    items: ['Grid Gallery', 'Masonry Gallery', 'Carousel Gallery', 'Lightbox Gallery']
  },
  {
    title: 'About Me Sections',
    items: ['Profile Card', 'Timeline', 'Skills Grid', 'Bio Section']
  },
  {
    title: 'Contact Forms',
    items: ['Basic Contact', 'Multi-step Form', 'Map Integration', 'Social Links']
  },
  {
    title: 'Testimonial Blocks',
    items: ['Carousel Testimonials', 'Grid Testimonials', 'Quote Cards', 'Client Logos']
  },
  {
    title: 'Project Showcases',
    items: ['Grid Portfolio', 'Masonry Portfolio', 'Carousel Portfolio', 'Filterable Portfolio']
  },
  {
    title: 'Storefront Items',
    items: ['Product Grid', 'Product Carousel', 'Featured Products', 'Category Showcase']
  }
];

export const ComponentsTab = () => {
  return (
    <div className="p-4">
      <Accordion type="multiple" className="w-full">
        {sections.map((section, index) => (
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