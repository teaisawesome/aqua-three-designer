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
                })),
            toggleLockOnComponent: (componentId) =>
                set((state) => ({
                    usedComponents: state.usedComponents.map((component) =>
                        component.id === componentId
                            ? { ...component, locked: !component.locked }
                            : component
                    ),
                })),
        }),
        {
            name: 'studio-storage',
            getStorage: () => localStorage
        }
    )
)

export default useStudioStore