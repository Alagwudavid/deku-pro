'use client'

import { create } from 'zustand'

type Element = {
  id: string
  type: string
  x: number
  y: number
  content?: string
}

type ElementStore = {
  elements: Element[]
  selectedElementId: string | null
  addElement: (element: Element) => void
  moveElement: (id: string, x: number, y: number) => void
  selectElement: (id: string | null) => void
}

export const useElementStore = create<ElementStore>((set) => ({
  elements: [],
  selectedElementId: null,

  addElement: (element) =>
    set((state) => ({
      elements: [...state.elements, element],
    })),

  moveElement: (id, x, y) =>
    set((state) => ({
      elements: state.elements.map((el) =>
        el.id === id ? { ...el, x, y } : el
      ),
    })),

  selectElement: (id) =>
    set(() => ({
      selectedElementId: id,
    })),
}))
