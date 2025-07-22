import { create } from 'zustand'
import type { User } from '@/types'

type State = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  user: User | null
  setUser: (user: User | null) => void
}

export const upsertUserStore = create<State>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  user: null,
  setUser: (user) => set({ user }),
}))
