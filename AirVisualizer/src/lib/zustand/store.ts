import { create } from 'zustand'

interface AppState {
  bears: number
  increase: (by: number) => void
}

const useAppState = create<AppState>()((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}))

export default useAppState;
