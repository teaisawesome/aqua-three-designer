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
    setSelectedObjectTransform: (componentId, transformType, coordinateType, value) =>
        set((state) => ({
            usedComponents: state.usedComponents.map((component) => {
                if (component.id === componentId) {
                    if(!['position','rotation', 'scale'].includes(transformType)) {
                        console.error("Invalid transform type");
                        return component
                    }

                    const currentPosition = component[transformType] || { x: 0, y: 0, z: 0 }

                    return {
                        ...component,
                        [transformType]: {
                            x: coordinateType === 'x' ? value : currentPosition.x,
                            y: coordinateType === 'y' ? value : currentPosition.y,
                            z: coordinateType === 'z' ? value : currentPosition.z,
                        },
                    }
                }
                return component
            })
        }))
}));

export default useStudioStore;