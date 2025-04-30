import { create } from "zustand";

interface StoreState {
  showPropertiesPanel: boolean;
  setShowPropertiesPanel: (show: boolean) => void;
  showHistoryPanel: boolean;
  setShowHistoryPanel: (show: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  showPropertiesPanel: true,
  setShowPropertiesPanel: (show) => set({ showPropertiesPanel: show }),
  showHistoryPanel: false,
  setShowHistoryPanel: (show) => set({ showHistoryPanel: show }),
}));
 