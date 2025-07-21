import { create } from 'zustand'

type State = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  environmentId: string | null
  setEnvironmentId: (environmentId: string) => void
}

export const deleteEnvironmentStore = create<State>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  environmentId: null,
  setEnvironmentId: (environmentId) => set({ environmentId }),
}))
