import { create } from 'zustand'

const useStudioStore = create((set) => ({
    usedComponents: [],
    highlightedObjectId: 0,
    selectedObject: null,
    index: 1,
    transformControlMode: 'translate',
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
    setTransformControlMode: (mode) =>
        set((state) => ({
            transformControlMode: mode
        })),
    setSelectedObjectPosition: (componentId, position, value) =>
        set((state) => ({
            usedComponents: state.usedComponents.map((component) => {
                if (component.id === componentId) {
                    const currentPosition = component.position || { x: 0, y: 0, z: 0 };
                    return {
                        ...component,
                        position: {
                            x: position === 'x' ? value : currentPosition.x,
                            y: position === 'y' ? value : currentPosition.y,
                            z: position === 'z' ? value : currentPosition.z,
                        },
                    };
                }
                return component;
            })
        }))
}));

export default useStudioStore;