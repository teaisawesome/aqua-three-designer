const VECTOR_KEYS = ["x", "y", "z"]

function copyVector(vector, fallback) {
    return Object.fromEntries(
        VECTOR_KEYS.map((key) => [key, vector?.[key] ?? fallback])
    )
}

export function serializeComponent(component) {
    return {
        id: component.id,
        assetType: component.assetType,
        assetId: component.assetId,
        displayName: component.displayName,
        locked: component.locked ?? false,
        position: copyVector(component.position, 0),
        rotation: copyVector(component.rotation, 0),
        scale: copyVector(component.scale, 1)
    }
}

export function normalizeLegacyComponents(components) {
    return Array.isArray(components) ? components.map(serializeComponent) : []
}

export function createSavePayload({
    loadedAquariumId,
    components,
    lightColor,
    lightIntensity
}) {
    const payload = {
        loadedAquariumId,
        components: normalizeLegacyComponents(components),
        lightColor: {
            r: lightColor?.r ?? 255,
            g: lightColor?.g ?? 255,
            b: lightColor?.b ?? 255
        },
        lightIntensity: lightIntensity ?? 0.5
    }

    assertPlainSerializable(payload)
    return payload
}

export function assertPlainSerializable(value) {
    const ancestors = new Set()

    function visit(current, path) {
        if (current === null || ["string", "boolean"].includes(typeof current)) return
        if (typeof current === "number") {
            if (!Number.isFinite(current)) throw new TypeError(`${path} must be finite`)
            return
        }
        if (typeof current !== "object") {
            throw new TypeError(`${path} is not JSON-serializable`)
        }
        if (ancestors.has(current)) throw new TypeError(`${path} contains a circular reference`)

        const prototype = Object.getPrototypeOf(current)
        if (!Array.isArray(current) && prototype !== Object.prototype && prototype !== null) {
            throw new TypeError(`${path} must contain plain data only`)
        }

        ancestors.add(current)
        Object.entries(current).forEach(([key, child]) => visit(child, `${path}.${key}`))
        ancestors.delete(current)
    }

    visit(value, "project")
    JSON.stringify(value)
    return value
}
