import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStudioStore = create(
    persist(
        (set) => ({
            usedComponents: [],
            highlightedObjectId: 0,
            index: 1,
            addUsedComponent: (title) =>
                set((state) => ({
                    usedComponents: [...state.usedComponents, title],
                })),
            addHighlightedObjectId: (id) =>
                set((state) => ({
                    highlightedObjectId: id
                })),
            incrementIndex: () =>
                set((state) => ({
                    index: state.index + 1
                }))

        }),
        {
            name: 'studio-storage',
            getStorage: () => localStorage
        }
    )
)

export default useStudioStore