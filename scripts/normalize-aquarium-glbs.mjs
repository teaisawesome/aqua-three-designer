import path from "node:path"
import {fileURLToPath} from "node:url"
import {formatVector, measureGlb, normalizeGlb, readGlb, writeGlb} from "./lib/glb-tools.mjs"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const assets = {
    "glass-cube_03.glb": {unitScale: 0.01, expected: [0.1, 0.08, 0.06]},
    "opti-white-aquarium-frame.glb": {unitScale: 0.01, rotateY: Math.PI / 2, expected: [0.405773, 0.324619, 0.284041]},
    "opti-white-aquarium-normal.glb": {unitScale: 0.01, rotateY: Math.PI / 2, expected: [0.4, 0.3, 0.24]},
    "opti-white-aquarium.glb": {unitScale: 0.01, rotateY: Math.PI / 2, expected: [0.41, 0.30375, 0.246]},
    "simple-aquarium.glb": {unitScale: 0.01, expected: [0.47, 0.2, 0.3]}
}

for (const [filename, correction] of Object.entries(assets)) {
    const assetPath = path.join(root, "public/models/aquariums", filename)
    const document = await readGlb(assetPath)
    const before = measureGlb(document)
    const alreadyNormalized = before.size.toArray().every((value, index) => (
        Math.abs(value - correction.expected[index]) < 0.00001
    ))

    if (!alreadyNormalized) normalizeGlb(document, correction)
    document.json.asset.extras = {
        ...document.json.asset.extras,
        aquaThreeDesigner: {
            unit: "meter",
            pivot: "base-center",
            rootTransform: "identity",
            sourceUnitAssumption: "centimeter",
            normalizedBy: "scripts/normalize-aquarium-glbs.mjs"
        }
    }
    await writeGlb(assetPath, document)
    const after = measureGlb(await readGlb(assetPath))
    console.log(`${filename}: ${alreadyNormalized ? "already normalized" : `${formatVector(before.size)} -> ${formatVector(after.size)} m`}`)
}
