import { create } from 'zustand'

interface State {
  isOpen: boolean
  setOpen: (isOpen: boolean) => void
  credential: Credential | null
  setCredential: (credential: Credential | null) => void
}

export const useUpsertCredentialStore = create<State>((set) => ({
  isOpen: false,
  setOpen: (isOpen) => set({ isOpen }),
  credential: null,
  setCredential: (credential) => set({ credential }),
}))
