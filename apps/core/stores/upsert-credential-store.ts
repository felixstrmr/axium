import { Credential } from '@axium/database/types'
import { create } from 'zustand'

interface State {
  isOpen: boolean
  setIsOpen: (setIsOpen: boolean) => void
  credential: Credential | null
  setCredential: (credential: Credential | null) => void
}

export const upsertCredentialStore = create<State>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  credential: null,
  setCredential: (credential) => set({ credential }),
}))
