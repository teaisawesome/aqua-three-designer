import { create } from 'zustand'

const useStudioStore = create((set) => ({
    loadedAquariumId: null,
    components: [],
    highlightedObjectId: 0,
    selectedObject: null,
    index: 1,
    transformControlMode: 'translate',
    lightColor: { r: 255, g: 255, b: 255 },
    lightIntensity: 0.5,
    addComponent: (title) =>
        set((state) => ({
            components: [...state.components, title],
        })),
    removeComponent: (id) =>
        set((state) => {
            const isTargetHighlighted = state.highlightedObjectId === id

            return {
                components: state.components.filter((c) => c.id !== id),
                ...(isTargetHighlighted && {
                    highlightedObjectId: 0,
                    selectedObject: null
                })
            }
        }),
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
            components: state.components.map((component) =>
                component.id === componentId
                    ? { ...component, locked: !component.locked }
                    : component
            ),
        })),
    setTransformControlMode: (mode) =>
        set((state) => ({
            transformControlMode: mode
        })),
    setSelectedObjectTransform: (componentId, transformType, coordinateType, value) =>
        set((state) => ({
            components: state.components.map((component) => {
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
        })),
    setLightColor: (rgbColor) =>
        set((state) => ({
            lightColor: {
                r: rgbColor.r,
                g: rgbColor.g,
                b: rgbColor.b,
            }
        })),
    setLightIntensity: (intensityValue) =>
        set((state) => ({
            lightIntensity: intensityValue
        })),
    loadStudioData: (data) =>
        set(() => ({
            loadedAquariumId: data._id.toString(),
            components: data.components || [],
            highlightedObjectId: 0,
            selectedObject: null,
            index: data.components.length + 1 || 1,
            transformControlMode: 'translate',
            lightColor: data.light.lightColor || { r: 255, g: 255, b: 255 },
            lightIntensity: data.light.lightIntensity || 0.5
        }))
}));

export default useStudioStore;