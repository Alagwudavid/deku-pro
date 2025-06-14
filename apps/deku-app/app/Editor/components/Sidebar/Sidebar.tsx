"use client";

import { useState, useEffect, useRef } from "react";
import {
  FiLayers,
  FiChevronDown,
  FiChevronRight,
  FiEye,
  FiEyeOff,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

interface SVGElement {
  id: string;
  type: string;
  name: string;
  visible: boolean;
  children?: SVGElement[];
}

interface LayerItemProps {
  element: SVGElement;
  depth?: number;
  onToggleVisibility: (id: string) => void;
  onSelect: (id: string) => void;
  selectedId: string | null;
}

function removeComments(node: Node): void {
  const walker = document.createTreeWalker(
    node,
    NodeFilter.SHOW_COMMENT,
    null,
    false
  );
  const comments: Comment[] = [];
  while (walker.nextNode()) {
    comments.push(walker.currentNode as Comment);
  }
  comments.forEach(comment => comment.remove());
}

function parseSVGContent(svgString: string): SVGElement[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, "image/svg+xml");
  const svg = doc.querySelector("svg");

  if (!svg) return [];
  
  // Remove comments from the SVG
  removeComments(svg);

  function parseElement(element: Element, id: string = "root"): SVGElement {
    const children = Array.from(element.children).map((child, index) =>
      parseElement(child, `${id}-${index}`)
    );

    return {
      id,
      type: element.tagName.toLowerCase(),
      name: element.id || element.tagName.toLowerCase(),
      visible: true,
        ...(children.length > 0 && { children })
    };
  }

  return [parseElement(svg)];
}

interface SidebarProps {
  svgContent: string;
  onLayerUpdate: (layers: SVGElement[]) => void;
  onLayerSelect: (id: string | null) => void;
}

export default function Sidebar({ svgContent, onLayerUpdate, onLayerSelect }: SidebarProps) {
  const [layers, setLayers] = useState<SVGElement[]>([]);
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);

  // Use a ref to track if this is the initial render
  const initialRenderRef = useRef(true);
  
  useEffect(() => {
    const parsedLayers = parseSVGContent(svgContent);
    setLayers(parsedLayers);
    
    // Only call onLayerUpdate after the initial render is complete
    if (initialRenderRef.current) {
      initialRenderRef.current = false;
    } else {
      onLayerUpdate(parsedLayers);
    }
  }, [svgContent, onLayerUpdate]);

  const handleSelect = (id: string) => {
    setSelectedLayerId(id);
    onLayerSelect(id);
  };

  const handleToggleVisibility = (id: string) => {
    setLayers((prevLayers) => {
      const updateVisibility = (elements: SVGElement[]): SVGElement[] => {
        return elements.map((element) => {
          if (element.id === id) {
            return { ...element, visible: !element.visible };
          }
          if (element.children) {
            return {
              ...element,
              children: updateVisibility(element.children),
            };
          }
          return element;
        });
      };
      const updatedLayers = updateVisibility(prevLayers);
      return updatedLayers;
    });
  };
  
  // Use a separate effect to call onLayerUpdate when layers change
  useEffect(() => {
    // Skip the initial render
    if (!initialRenderRef.current) {
      onLayerUpdate(layers);
    }
  }, [layers, onLayerUpdate]);

  const handleDelete = (id: string) => {
    setLayers((prevLayers) => {
      const deleteLayer = (elements: SVGElement[]): SVGElement[] => {
        return elements.filter((element) => {
          if (element.id === id) {
            return false;
          }
          if (element.children) {
            element.children = deleteLayer(element.children);
          }
          return true;
        });
      };
      const updatedLayers = deleteLayer(prevLayers);
      return updatedLayers;
    });
    
    // Handle selected layer update separately
    if (selectedLayerId === id) {
      setSelectedLayerId(null);
      onLayerSelect(null);
    }
  };

  return (
    <div className="w-64 border-r border-gray-200 bg-white h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 text-gray-700">
          <FiLayers className="w-5 h-5" />
          <h2 className="font-medium">Layers</h2>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {layers.map((layer) => (
          <LayerItem
            key={layer.id}
            element={layer}
            onToggleVisibility={handleToggleVisibility}
            onSelect={handleSelect}
            onDelete={handleDelete}
            selectedId={selectedLayerId}
          />
        ))}
      </div>
    </div>
  );
}

interface LayerItemProps {
  element: SVGElement;
  depth?: number;
  onToggleVisibility: (id: string) => void;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  selectedId: string | null;
}

function LayerItem({ element, depth = 0, onToggleVisibility, onSelect, onDelete, selectedId }: LayerItemProps) {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = element.children && element.children.length > 0;
  const isSelected = selectedId === element.id;

  return (
    <div className="flex flex-col">
      <div
        className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer transition group
          ${isSelected ? "bg-purple-100 text-purple-900" : "hover:bg-gray-100"}
        `}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={() => onSelect(element.id)}
      >
        <div className="flex items-center gap-2 flex-1">
          {hasChildren ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              className="p-0.5 hover:bg-gray-200 rounded transition-colors"
            >
              {isOpen ? (
                <FiChevronDown className="w-4 h-4" />
              ) : (
                <FiChevronRight className="w-4 h-4" />
              )}
            </button>
          ) : (
            <span className="w-5" />
          )}
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleVisibility(element.id);
            }}
            className="p-0.5 hover:bg-gray-200 rounded transition-colors"
          >
            {element.visible ? (
              <FiEye className="w-4 h-4" />
            ) : (
              <FiEyeOff className="w-4 h-4" />
            )}
          </button>

          <span className="flex-1 truncate text-sm">{element.name}</span>
        </div>
        
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            className="p-1 hover:bg-gray-200 rounded transition-colors text-red-600"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(element.id);
            }}
          >
            <FiTrash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {hasChildren && isOpen && (
        <div className="ml-4">
          {element.children.map((child) => (
            <LayerItem
              key={child.id}
              element={child}
              depth={depth + 1}
              onToggleVisibility={onToggleVisibility}
              onSelect={onSelect}
              onDelete={onDelete}
              selectedId={selectedId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
