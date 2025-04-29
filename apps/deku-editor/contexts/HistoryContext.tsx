'use client'

import { createContext, useContext, useState, useCallback } from 'react'

type HistoryState = {
  snapshots: any[]
  current: number
}

interface HistoryContextType {
  state: HistoryState
  addSnapshot: (snapshot: any) => void
  undo: () => void
  redo: () => void
  reset: () => void
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined)

export function HistoryProvider({ children }: { children: React.ReactNode }) {
  const [snapshots, setSnapshots] = useState<any[]>([])
  const [current, setCurrent] = useState<number>(-1)

  const addSnapshot = useCallback((snapshot: any) => {
    setSnapshots(prev => [...prev.slice(0, current + 1), snapshot])
    setCurrent(prev => prev + 1)
  }, [current])

  const undo = useCallback(() => {
    setCurrent(prev => Math.max(prev - 1, 0))
  }, [])

  const redo = useCallback(() => {
    setCurrent(prev => Math.min(prev + 1, snapshots.length - 1))
  }, [snapshots.length])

  const reset = useCallback(() => {
    setSnapshots([])
    setCurrent(-1)
  }, [])

  return (
    <HistoryContext.Provider value={{ state: { snapshots, current }, addSnapshot, undo, redo, reset }}>
      {children}
    </HistoryContext.Provider>
  )
}

export function useHistory() {
  const context = useContext(HistoryContext)
  if (!context) {
    throw new Error('useHistory must be used within a HistoryProvider')
  }
  return context
}
