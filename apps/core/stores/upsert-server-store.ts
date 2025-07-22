import { create } from 'zustand'
import type { Server } from '@/types'

type State = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  server: Server | null
  setServer: (server: Server | null) => void
}

export const upsertServerStore = create<State>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  server: null,
  setServer: (server) => set({ server }),
}))
