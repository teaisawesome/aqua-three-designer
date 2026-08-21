import assert from "node:assert/strict"
import test from "node:test"
import {
    assetCatalog,
    listAssetDefinitions,
    resolveAssetDefinition
} from "../src/domain/assets/catalog.mjs"
import {normalizeLegacyComponents} from "../src/domain/project/serialization.mjs"

test("catalog contains stable versioned placeholder and aquarium definitions", () => {
    assert.deepEqual(listAssetDefinitions("plant").map(({id}) => id), ["cube", "redcube"])
    assert.equal(assetCatalog["opti-white-aquarium"].modelUrl, "/models/aquariums/opti-white-aquarium.glb")
})

test("asset resolution requires a known id and matching version", () => {
    assert.equal(resolveAssetDefinition("cube", 1), assetCatalog.cube)
    assert.equal(resolveAssetDefinition("cube", 2), null)
    assert.equal(resolveAssetDefinition("missing", 1), null)
})

test("legacy component metadata migrates to versioned instance data", () => {
    const [instance] = normalizeLegacyComponents([{
        id: "instance-1",
        assetId: "cube",
        assetType: "plant",
        displayName: "001_cube",
        position: {x: 0, y: 0, z: 0},
        rotation: {x: 0, y: 0, z: 0},
        scale: {x: 1, y: 1, z: 1}
    }])

    assert.equal(instance.assetVersion, 1)
    assert.equal(instance.kind, "plant")
    assert.equal(instance.name, "001_cube")
    assert.equal("assetType" in instance, false)
    assert.equal("displayName" in instance, false)
    assert.equal("modelUrl" in instance, false)
})
