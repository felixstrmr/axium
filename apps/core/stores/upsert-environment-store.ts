import { create } from 'zustand'
import type { Environment } from '@/types'

type State = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  environment: Environment | null
  setEnvironment: (environment: Environment | null) => void
}

export const upsertEnvironmentStore = create<State>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  environment: null,
  setEnvironment: (environment) => set({ environment }),
}))
