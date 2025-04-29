'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface Component {
  id: string;
  type: string;
  name: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  rotation: number;
  visible: boolean;
}

interface Page {
  id: string;
  name: string;
  components: Component[];
}

interface EditorContextType {
  pages: Page[];
  selectedPage: string;
  components: Record<string, Component[]>;
  addPage: (page: Page, afterPageId?: string) => void;
  updatePage: (pageId: string, page: Page) => void;
  removePage: (pageId: string) => void;
  selectPage: (pageId: string) => void;
  addComponent: (pageId: string, component: Component) => void;
  updateComponent: (pageId: string, componentId: string, updates: Partial<Component>) => void;
  removeComponent: (pageId: string, componentId: string) => void;
  toggleComponentVisibility: (pageId: string, componentId: string) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pages, setPages] = useState<Page[]>([
    {
      id: '1',
      name: 'Home',
      components: [],
    },
  ]);
  const [selectedPage, setSelectedPage] = useState<string>('1');
  const [components, setComponents] = useState<Record<string, Component[]>>({});

  const addPage = useCallback((page: Page, afterPageId?: string) => {
    setPages((prev) => {
      if (afterPageId) {
        const index = prev.findIndex(p => p.id === afterPageId);
        if (index === -1) return [...prev, page];
        return [...prev.slice(0, index + 1), page, ...prev.slice(index + 1)];
      }
      return [...prev, page];
    });
    setSelectedPage(page.id);
  }, []);

  const updatePage = useCallback((pageId: string, page: Page) => {
    setPages((prev) => prev.map((p) => (p.id === pageId ? page : p)));
  }, []);

  const removePage = useCallback((pageId: string) => {
    setPages((prev) => {
      const newPages = prev.filter((page) => page.id !== pageId);
      if (selectedPage === pageId && newPages.length > 0) {
        setSelectedPage(newPages[0].id);
      }
      return newPages;
    });
  }, [selectedPage]);

  const selectPage = useCallback((id: string) => {
    setSelectedPage(id);
  }, []);

  const addComponent = useCallback((pageId: string, component: Component) => {
    setPages((prev) =>
      prev.map((page) =>
        page.id === pageId
          ? {
              ...page,
              components: [
                ...page.components,
                {
                  ...component,
                  id: Date.now().toString(),
                  visible: true,
                },
              ],
            }
          : page
      )
    );
  }, []);

  const removeComponent = useCallback((pageId: string, componentId: string) => {
    setPages((prev) =>
      prev.map((page) =>
        page.id === pageId
          ? {
              ...page,
              components: page.components.filter((comp) => comp.id !== componentId),
            }
          : page
      )
    );
  }, []);

  const updateComponent = useCallback(
    (pageId: string, componentId: string, updates: Partial<Component>) => {
      setPages((prev) =>
        prev.map((page) =>
          page.id === pageId
            ? {
                ...page,
                components: page.components.map((comp) =>
                  comp.id === componentId ? { ...comp, ...updates } : comp
                ),
              }
            : page
        )
      );
    },
    []
  );

  const toggleComponentVisibility = (pageId: string, componentId: string) => {
    setComponents((prev) => ({
      ...prev,
      [pageId]: prev[pageId].map((component) =>
        component.id === componentId
          ? { ...component, visible: !component.visible }
          : component
      ),
    }));
  };

  return (
    <EditorContext.Provider
      value={{
        pages,
        selectedPage,
        components,
        addPage,
        updatePage,
        removePage,
        selectPage,
        addComponent,
        updateComponent,
        removeComponent,
        toggleComponentVisibility,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
}; 