import assert from "node:assert/strict"
import path from "node:path"
import test from "node:test"
import {fileURLToPath} from "node:url"
import {assetCatalog} from "../src/domain/assets/catalog.mjs"
import {measureGlb, readGlb} from "../scripts/lib/glb-tools.mjs"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const aquariumAssets = Object.values(assetCatalog).filter(({kind, modelUrl}) => kind === "aquarium" && modelUrl)

for (const asset of aquariumAssets) {
    test(`${asset.id} has meter dimensions, identity roots, and a base-center pivot`, async () => {
        const document = await readGlb(path.join(root, "public", asset.modelUrl))
        const bounds = measureGlb(document)
        const tolerance = 0.00001

        assert.ok(Math.abs(bounds.size.x - asset.nominalSizeM.width) < tolerance)
        assert.ok(Math.abs(bounds.size.y - asset.nominalSizeM.height) < tolerance)
        assert.ok(Math.abs(bounds.size.z - asset.nominalSizeM.depth) < tolerance)
        assert.ok(Math.abs(bounds.min.x + bounds.max.x) < tolerance)
        assert.ok(Math.abs(bounds.min.y) < tolerance)
        assert.ok(Math.abs(bounds.min.z + bounds.max.z) < tolerance)

        for (const node of document.json.nodes) {
            assert.equal(node.matrix, undefined)
            assert.equal(node.translation, undefined)
            assert.equal(node.rotation, undefined)
            assert.equal(node.scale, undefined)
        }
        assert.equal(document.json.asset.extras?.aquaThreeDesigner?.unit, "meter")
        assert.equal(document.json.asset.extras?.aquaThreeDesigner?.pivot, "base-center")
    })
}
