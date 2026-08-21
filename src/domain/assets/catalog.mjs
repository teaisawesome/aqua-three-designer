const definitions = [
    {
        id: "cube",
        version: 1,
        kind: "plant",
        displayName: "Green cube",
        modelUrl: null,
        nominalSizeM: { width: 1, height: 1, depth: 1 },
        pivot: "base-center",
        placement: "substrate",
        placeholder: true
    },
    {
        id: "redcube",
        version: 1,
        kind: "plant",
        displayName: "Red cube",
        modelUrl: null,
        nominalSizeM: { width: 1, height: 1, depth: 1 },
        pivot: "base-center",
        placement: "substrate",
        placeholder: true
    },
    ...[
        "glass-cube_03",
        "opti-white-aquarium-frame",
        "opti-white-aquarium-normal",
        "opti-white-aquarium",
        "simple-aquarium"
    ].map((id) => ({
        id,
        version: 1,
        kind: "aquarium",
        displayName: id.split("-").map((part) => `${part[0].toUpperCase()}${part.slice(1)}`).join(" "),
        modelUrl: `/models/aquariums/${id}.glb`,
        nominalSizeM: null,
        pivot: "pending-audit",
        placement: "fixed",
        auditStatus: "pending-package-4"
    }))
]

export const assetCatalog = Object.freeze(
    Object.fromEntries(definitions.map((definition) => [definition.id, Object.freeze(definition)]))
)

export function resolveAssetDefinition(assetId, assetVersion) {
    const definition = assetCatalog[assetId]
    return definition?.version === assetVersion ? definition : null
}

export function listAssetDefinitions(kind) {
    return definitions.filter((definition) => !kind || definition.kind === kind)
}
