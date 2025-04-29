import React, { useState } from 'react';
import { useEditor } from '@/contexts/EditorContext';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight, Eye, EyeOff, GripVertical, Trash2 } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ComponentItemProps {
  component: any;
  pageId: string;
}

const ComponentItem: React.FC<ComponentItemProps> = ({ component, pageId }) => {
  const { updateComponent, toggleComponentVisibility, removeComponent } = useEditor();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(component.name);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleNameBlur = () => {
    setIsEditing(false);
    if (name !== component.name) {
      updateComponent(pageId, component.id, { name });
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-2 p-2 rounded-md hover:bg-gray-100",
        !component.visible && "opacity-50"
      )}
    >
      <div {...attributes} {...listeners} className="cursor-grab">
        <GripVertical className="h-4 w-4 text-gray-400" />
      </div>
      {isEditing ? (
        <Input
          value={name}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          onKeyDown={(e) => e.key === 'Enter' && handleNameBlur()}
          className="h-6 text-sm"
          autoFocus
        />
      ) : (
        <div
          className="flex-1 text-sm cursor-pointer"
          onClick={() => setIsEditing(true)}
        >
          {component.name}
        </div>
      )}
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        onClick={() => toggleComponentVisibility(pageId, component.id)}
      >
        {component.visible ? (
          <Eye className="h-4 w-4" />
        ) : (
          <EyeOff className="h-4 w-4" />
        )}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 text-red-500 hover:text-red-600"
        onClick={() => removeComponent(pageId, component.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

const LayersTab: React.FC = () => {
  const { pages, selectedPage, components, selectPage } = useEditor();
  const [expandedPages, setExpandedPages] = useState<Record<string, boolean>>({});

  const togglePage = (pageId: string) => {
    setExpandedPages((prev) => ({
      ...prev,
      [pageId]: !prev[pageId],
    }));
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Pages</h3>
        <div className="space-y-1">
          {pages.map((page) => (
            <div key={page.id}>
              <div
                className={cn(
                  "flex items-center gap-2 p-2 rounded-md cursor-pointer",
                  selectedPage === page.id && "bg-blue-50"
                )}
                onClick={() => selectPage(page.id)}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePage(page.id);
                  }}
                >
                  {expandedPages[page.id] ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
                <div className="flex-1 text-sm">{page.name}</div>
              </div>
              {expandedPages[page.id] && (
                <div className="ml-6 mt-1 space-y-1">
                  {(components[page.id] || []).map((component) => (
                    <ComponentItem
                      key={component.id}
                      component={component}
                      pageId={page.id}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LayersTab; 