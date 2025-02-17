import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStudioStore = create(
    persist(
        (set) => ({
            usedComponents: [],
            highlightedObjectId: 0,
            addUsedComponent: (title) =>
                set((state) => ({
                    usedComponents: [...state.usedComponents, title],
                })),
            addHighlightedObjectId: (id) =>
                set((state) => ({
                    highlightedObjectId: id
                }))
        }),
        {
            name: 'studio-storage',
            getStorage: () => localStorage
        }
    )
)

export default useStudioStore