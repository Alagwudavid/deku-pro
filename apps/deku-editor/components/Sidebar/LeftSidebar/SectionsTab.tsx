import React from 'react';
import DraggableComponent from '../DraggableComponent';

const sections = [
  {
    id: 'header',
    type: 'header',
    title: 'Header Blocks',
    icon: '🎯',
    defaultProps: {
      style: {
        height: '80px',
        padding: '1rem',
      },
    },
  },
  {
    id: 'hero',
    type: 'hero',
    title: 'Hero Layouts',
    icon: '🦸',
    defaultProps: {
      style: {
        minHeight: '500px',
        padding: '2rem',
      },
    },
  },
  {
    id: 'gallery',
    type: 'gallery',
    title: 'Gallery Layouts',
    icon: '🖼️',
    defaultProps: {
      style: {
        padding: '2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
      },
    },
  },
  { id: 'about', title: 'About Sections', icon: 'ℹ️' },
  { id: 'contact', title: 'Contact Forms', icon: '📝' },
  { id: 'testimonial', title: 'Testimonial Blocks', icon: '💬' },
  { id: 'projects', title: 'Project Showcase', icon: '🎨' },
];

const SectionsTab: React.FC = () => {
  return (
    <div className="p-4">
      <div className="space-y-4">
        {sections.map((section) => (
          <DraggableComponent
            key={section.id}
            type={section.type}
            title={section.title}
            icon={section.icon}
            defaultProps={section.defaultProps}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionsTab; 