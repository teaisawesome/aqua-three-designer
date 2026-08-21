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
        ["glass-cube_03", {width: 0.1, height: 0.08, depth: 0.06}],
        ["opti-white-aquarium-frame", {width: 0.405773, height: 0.324619, depth: 0.284041}],
        ["opti-white-aquarium-normal", {width: 0.4, height: 0.3, depth: 0.24}],
        ["opti-white-aquarium", {width: 0.41, height: 0.30375, depth: 0.246}],
        ["simple-aquarium", {width: 0.47, height: 0.2, depth: 0.3}]
    ].map(([id, nominalSizeM]) => ({
        id,
        version: 2,
        kind: "aquarium",
        displayName: id.split("-").map((part) => `${part[0].toUpperCase()}${part.slice(1)}`).join(" "),
        modelUrl: `/models/aquariums/${id}.glb`,
        nominalSizeM,
        pivot: "base-center",
        placement: "fixed",
        auditStatus: "normalized-meter-units"
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
