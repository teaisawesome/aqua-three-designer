import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStudioStore = create(
    persist(
        (set) => ({
            usedComponents: [],
            highlightedObjectId: 0,
            selectedObject: null,
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
            setSelectedObject: (object) =>
                set((state) => ({
                    selectedObject: object
                })),
            setSelectedObjectInUsedComponent: (componentId, objectRef) =>
                set((state) => ({
                    usedComponents: state.usedComponents.map((component) =>
                        component.id === componentId
                            ? { ...component, objectReference: objectRef}
                            : component
                    )
                })),
        }),
        {
            name: 'studio-storage',
            getStorage: () => localStorage
        }
    )
)

export default useStudioStore