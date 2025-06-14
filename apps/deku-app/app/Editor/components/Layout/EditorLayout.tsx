"use client";

import { useState, useEffect, useRef } from 'react';
import { HistoryProvider } from "../../contexts/HistoryContext";
import Sidebar from '../Sidebar/Sidebar';
import EditorToolbar from '../Toolbar/EditorToolbar';

interface SVGElement {
  id: string;
  type: string;
  name: string;
  visible: boolean;
  children?: SVGElement[];
}

export default function EditorLayout() {
  const [svgCode, setSvgCode] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
  const [layers, setLayers] = useState<SVGElement[]>([]);
  const [displaySvgCode, setDisplaySvgCode] = useState<string>('');
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const selectedElementRef = useRef<Element | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        // Process SVG content to resize it to 120x120 if needed
        const processedContent = resizeSvgDimensions(content, 120, 120);
        setSvgCode(processedContent);
      };
      reader.readAsText(file);
    }
  };
  
  // Function to remove comments from SVG
  const handleClearComments = () => {
    if (!svgCode) return;
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgCode, 'image/svg+xml');
    
    // Remove comments
    const removeComments = (node: Node) => {
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
    };
    
    removeComments(doc);
    
    // Update SVG code
    const cleanedSvgCode = new XMLSerializer().serializeToString(doc);
    setSvgCode(cleanedSvgCode);
  };
  
  // Function to resize SVG dimensions
  const resizeSvgDimensions = (svgContent: string, width: number, height: number): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgContent, 'image/svg+xml');
    const svgElement = doc.querySelector('svg');
    
    if (svgElement) {
      svgElement.setAttribute('width', `${width}`);
      svgElement.setAttribute('height', `${height}`);
      return new XMLSerializer().serializeToString(doc);
    }
    
    return svgContent;
  };
  
  useEffect(() => {
    // Update the display SVG based on layer visibility and selection
    if (layers.length > 0) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgCode, 'image/svg+xml');
      const svgRoot = doc.querySelector('svg');
      
      // Remove any existing selection handles
      const existingHandles = doc.querySelectorAll('.selection-handle');
      existingHandles.forEach(handle => handle.remove());
      
      const updateElementVisibility = (elements: SVGElement[], parentElement: Element | Document) => {
        elements.forEach(element => {
          if (element.id !== 'root') {
            // Extract the index from the id (format: root-0-1-2)
            const parts = element.id.split('-');
            const indices = parts.slice(1).map(Number);
            
            // Navigate to the corresponding element in the DOM
            let currentElement: Element | null = svgRoot;
            if (currentElement) {
              for (let i = 0; i < indices.length && currentElement; i++) {
                const children = Array.from(currentElement.children);
                currentElement = indices[i] < children.length ? children[indices[i]] : null;
              }
              
              // Apply visibility
              if (currentElement) {
                if (element.visible) {
                  currentElement.removeAttribute('style');
                } else {
                  currentElement.setAttribute('style', 'display: none');
                }
                
                // Add data-id attribute for selection
                currentElement.setAttribute('data-id', element.id);
                
                // Add selection handles if this element is selected
                if (selectedLayerId === element.id && element.visible) {
                  try {
                    console.log('Adding selection handles for element:', element.id);
                    
                    // Make sure we're working with an SVGGraphicsElement
                    if (!(currentElement instanceof SVGGraphicsElement)) {
                      console.error('Element is not an SVGGraphicsElement, cannot get bbox');
                      return;
                    }
                    
                    // Get bounding box of the element
                    const bbox = currentElement.getBBox();
                    console.log('Element bbox:', bbox);
                    
                    // Create selection handles at the corners with larger size for better visibility
                    const handlePositions = [
                      { x: bbox.x, y: bbox.y }, // Top-left
                      { x: bbox.x + bbox.width, y: bbox.y }, // Top-right
                      { x: bbox.x, y: bbox.y + bbox.height }, // Bottom-left
                      { x: bbox.x + bbox.width, y: bbox.y + bbox.height } // Bottom-right
                    ];
                    
                    // Create a group for all selection elements
                    const selectionGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                    selectionGroup.setAttribute('class', 'selection-handle');
                    selectionGroup.setAttribute('data-handle-id', `${element.id}-selection-group`);
                    
                    // Add handles to the group
                    handlePositions.forEach((pos, index) => {
                      const handle = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                      handle.setAttribute('x', `${pos.x - 4}`);
                      handle.setAttribute('y', `${pos.y - 4}`);
                      handle.setAttribute('width', '8'); // Larger handles
                      handle.setAttribute('height', '8'); // Larger handles
                      handle.setAttribute('fill', '#4f46e5');
                      handle.setAttribute('stroke', 'white');
                      handle.setAttribute('stroke-width', '1');
                      handle.setAttribute('class', 'selection-handle');
                      handle.setAttribute('data-handle-id', `${element.id}-handle-${index}`);
                      handle.setAttribute('pointer-events', 'none'); // Prevent handles from intercepting clicks
                      selectionGroup.appendChild(handle);
                    });
                    
                    // Add selection outline to the group
                    const outline = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                    outline.setAttribute('x', `${bbox.x}`);
                    outline.setAttribute('y', `${bbox.y}`);
                    outline.setAttribute('width', `${bbox.width}`);
                    outline.setAttribute('height', `${bbox.height}`);
                    outline.setAttribute('fill', 'none');
                    outline.setAttribute('stroke', '#4f46e5');
                    outline.setAttribute('stroke-width', '2'); // Thicker outline
                    outline.setAttribute('stroke-dasharray', '3,3');
                    outline.setAttribute('class', 'selection-handle');
                    outline.setAttribute('data-handle-id', `${element.id}-outline`);
                    outline.setAttribute('pointer-events', 'none'); // Prevent outline from intercepting clicks
                    selectionGroup.insertBefore(outline, selectionGroup.firstChild);
                    
                    // Add the selection group to the SVG root
                    if (svgRoot) {
                      svgRoot.appendChild(selectionGroup);
                    } else {
                      console.error('SVG root element not found');
                    }
                  } catch (error) {
                    console.error('Error adding selection handles:', error);
                  }
                }
              }
            }
          }
          
          // Process children recursively
          if (element.children && element.children.length > 0) {
            updateElementVisibility(element.children, parentElement);
          }
        });
      };
      
      updateElementVisibility(layers, doc);
      setDisplaySvgCode(new XMLSerializer().serializeToString(doc));
    } else {
      setDisplaySvgCode(svgCode);
    }
  }, [layers, svgCode, selectedLayerId]);

  return (
    <HistoryProvider>
      <div className="flex flex-col h-screen bg-background text-foreground">
        <header className="flex items-center justify-between px-4 py-2 h-13 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold">SVG Editor</h1>
            <input
              type="file"
              accept=".svg"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="px-4 py-2 bg-purple-600 text-white rounded-md cursor-pointer hover:bg-purple-700 transition-colors"
            >
              Upload SVG
            </label>
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
              Export
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
              Convert
            </button>
          </div>
        </header>
        <div className="flex flex-1 overflow-hidden">
          <Sidebar 
            svgContent={svgCode} 
            onLayerUpdate={setLayers} 
            onLayerSelect={setSelectedLayerId} 
          />
          <div className=" flex h-[calc(100svh-52px)] w-full pb-4">
            <div className="flex-1 p-4">
              <div className="h-full flex flex-col">
                <div className="mb-2 flex justify-between items-center">
                  <h2 className="text-sm font-medium">SVG Code</h2>
                  {fileName && <span className="text-sm text-gray-500">{fileName}</span>}
                </div>
                <textarea
                  value={svgCode}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    // Check if this is likely a new SVG being pasted
                    if (newValue.trim().startsWith('<svg') && (!svgCode || !svgCode.trim().startsWith('<svg'))) {
                      // Resize the SVG if it's a new paste
                      const resized = resizeSvgDimensions(newValue, 120, 120);
                      setSvgCode(resized);
                    } else {
                      setSvgCode(newValue);
                    }
                  }}
                  onBlur={() => {
                    // When the textarea loses focus, update the SVG display
                    // This ensures any manual edits to the SVG code are reflected in the preview
                    if (svgContainerRef.current) {
                      // Update the display code which will trigger the useEffect to update the preview
                      setDisplaySvgCode(svgCode);
                    }
                  }}
                  className="flex-1 w-full p-4 font-mono text-sm bg-gray-50 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter or paste SVG code here..."
                />
              </div>
            </div>
            <div className="flex-1 p-4">
              <div className="h-full flex flex-col">
                <h2 className="text-sm font-medium mb-2">Preview</h2>
                <div className="flex-1 bg-white rounded-md border border-gray-200 p-4 flex items-center justify-center">
                  {svgCode ? (
                    <div 
                      ref={svgContainerRef}
                      className="svg-editor-canvas w-full h-full overflow-auto flex items-center justify-center relative" 
                      dangerouslySetInnerHTML={{ __html: displaySvgCode || svgCode }}
                      onClick={(e) => {
                        // Handle element selection from preview
                        if (e.target !== e.currentTarget) {
                          const element = e.target as SVGElement;
                          const id = element.id || element.getAttribute('data-id');
                          // Don't select selection handles
                          if (id && !id.includes('-handle-') && !id.includes('-outline')) {
                            console.log('Selected element with id:', id);
                            setSelectedLayerId(id);
                            
                            // Force update to ensure selection handles are rendered
                            setTimeout(() => {
                              if (svgCode) {
                                setDisplaySvgCode(prev => prev); // Trigger re-render
                              }
                            }, 50);
                          }
                        } else {
                          // Clear selection when clicking on the background
                          setSelectedLayerId(null);
                        }
                      }}
                    />
                  ) : (
                    <div className="text-gray-400">Upload or paste an SVG to see preview</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <EditorToolbar onClearComments={handleClearComments} />
        </div>
      </div>
    </HistoryProvider>
  );
}
