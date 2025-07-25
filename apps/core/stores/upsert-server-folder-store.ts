import { create } from 'zustand'
import type { ServerFolder } from '@/types'

type State = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  serverFolder: ServerFolder | null
  setServerFolder: (serverFolder: ServerFolder | null) => void
  parentId: string | null
  setParentId: (parentId: string | null) => void
}

export const upsertServerFolderStore = create<State>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  serverFolder: null,
  setServerFolder: (serverFolder) => set({ serverFolder }),
  parentId: null,
  setParentId: (parentId) => set({ parentId }),
}))
