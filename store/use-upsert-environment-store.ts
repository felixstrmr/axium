import { Environment } from '@/types'
import { create } from 'zustand'

interface State {
  isOpen: boolean
  setOpen: (isOpen: boolean) => void
  environment: Environment | null
  setEnvironment: (environment: Environment | null) => void
}

export const useUpsertEnvironmentStore = create<State>((set) => ({
  isOpen: false,
  setOpen: (isOpen) => set({ isOpen }),
  environment: null,
  setEnvironment: (environment) => set({ environment }),
}))
