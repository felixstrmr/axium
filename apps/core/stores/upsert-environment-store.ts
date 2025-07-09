import { Environment } from '@axium/database/types'
import { create } from 'zustand'

interface State {
  isOpen: boolean
  setIsOpen: (setIsOpen: boolean) => void
  environment: Environment | null
  setEnvironment: (environment: Environment | null) => void
}

export const upsertEnvironmentStore = create<State>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  environment: null,
  setEnvironment: (environment) => set({ environment }),
}))
