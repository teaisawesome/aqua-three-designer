const componentRefRegistry = new Map()

export const setComponentRef = (id, ref) => {
    if (componentRefRegistry.has(id)) {
        console.warn(`Component with id ${id} already exists. Updating reference.`);
    }
    componentRefRegistry.set(id, ref);
}

export const getComponentRef = (id) => {
    if (!componentRefRegistry.has(id)) {
        console.warn(`Component with id ${id} does not exist.`);
        return null;
    }
    return componentRefRegistry.get(id);
}

export const removeComponentRef = (id) => {
    if (!componentRefRegistry.has(id)) {
        console.warn(`Component with id ${id} does not exist.`);
        return;
    }
    componentRefRegistry.delete(id);
}