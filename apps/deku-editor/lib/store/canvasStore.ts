import { create } from 'zustand'

type ElementType = 'hero' | 'gallery' | 'about' | 'contact' | 'testimonial' | 'project' | 'storefront'

interface CanvasElement {
  id: string
  type: ElementType
  x: number
  y: number
  width: number
  height: number
  rotation: number
  styles?: Partial<CSSStyleDeclaration> // ✅ Add styles field (optional)
}

type CanvasComponent = {
  id: string
  type: string
  x: number
  y: number
  width?: number
  height?: number
}

interface CanvasState {
  elements: CanvasElement[]
  addElement: (type: ElementType, position: { x: number; y: number }) => void
  moveElement: (id: string, position: { x: number; y: number }) => void
  updateElementStyle: (id: string, style: Partial<CSSStyleDeclaration>) => void
  pageSettings: {
    seoTitle: string
    seoDescription: string
    socialImage: string
    pageTransition: string
    customCode: string
  }
  updatePageSetting: (key: keyof CanvasState['pageSettings'], value: any) => void
  zoom: number
  deviceView: 'desktop' | 'tablet' | 'mobile'

  components: CanvasComponent[]
  selectedId: string | null
    addComponent: (component: CanvasComponent) => void
    updateComponent: (id: string, updates: Partial<CanvasComponent>) => void
    removeComponent: (id: string) => void
    selectComponent: (id: string | null) => void
}
  

export const useCanvasStore = create<CanvasState>((set) => ({
    elements: [],
    addElement: (type, position) =>
    set((state) => ({
      elements: [
        ...state.elements,
        {
          id: crypto.randomUUID(),
          type,
          x: position.x,
          y: position.y,
          width: 300,
          height: 200,
          rotation: 0,
          styles: {}, // ✅ Initialize empty styles
        },
      ],
      })),
    moveElement: (id, position) =>
    set((state) => ({
      elements: state.elements.map((el) =>
        el.id === id ? { ...el, x: position.x, y: position.y } : el
      ),
      })),
    updateElementStyle: (id, style) =>
    set((state) => ({
      elements: state.elements.map((el) =>
        el.id === id
          ? { ...el, styles: { ...el.styles, ...style } }
          : el
      ),
      })),
    pageSettings: {
    seoTitle: '',
    seoDescription: '',
    socialImage: '',
    pageTransition: 'none',
    customCode: '',
    },
    updatePageSetting: (key, value) =>
    set((state) => ({
      pageSettings: {
        ...state.pageSettings,
        [key]: value
      }
      })),
    // 🛠 State
    zoom: 1,

    // 🛠 Actions
    undo: () => {
        console.log('Undo action')
      },
    redo: () => {
      console.log('Redo action')
    },
    save: () => {
      console.log('Save project')
    },
    preview: () => {
      console.log('Preview mode')
    },
    publish: () => {
      console.log('Publish to live')
    },
    zoomIn: () => {
      set((state) => ({
        zoom: Math.min(state.zoom + 0.1, 2)
      }))
    },
    zoomOut: () => {
      set((state) => ({
        zoom: Math.max(state.zoom - 0.1, 0.5)
      }))
    },
    deviceView: 'desktop',
    setDeviceView: (view) => {
      set({ deviceView: view })
    },
    components: [],
    selectedId: null,
    addComponent: (component) => set(state => ({ components: [...state.components, component] })),
    updateComponent: (id, updates) => set(state => ({
        components: state.components.map(comp => comp.id === id ? { ...comp, ...updates } : comp)
    })),
    removeComponent: (id) => set(state => ({
        components: state.components.filter(comp => comp.id !== id)
    })),
    selectComponent: (id) => set(() => ({
      selectedId: id,
    })),
}))