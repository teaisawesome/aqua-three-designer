import path from "node:path"
import {fileURLToPath} from "node:url"
import {formatVector, measureGlb, readGlb} from "./lib/glb-tools.mjs"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const directory = path.join(root, "public/models/aquariums")
const filenames = [
    "glass-cube_03.glb",
    "opti-white-aquarium-frame.glb",
    "opti-white-aquarium-normal.glb",
    "opti-white-aquarium.glb",
    "simple-aquarium.glb"
]

for (const filename of filenames) {
    const document = await readGlb(path.join(directory, filename))
    const bounds = measureGlb(document)
    const roots = document.json.scenes[document.json.scene ?? 0].nodes ?? []
    const transformedRoots = roots.filter((index) => {
        const node = document.json.nodes[index]
        return node.matrix || node.translation || node.rotation || node.scale
    }).length
    const metadata = document.json.asset.extras?.aquaThreeDesigner
    console.log(`${filename}\n  size: ${formatVector(bounds.size)} m\n  min:  ${formatVector(bounds.min)}\n  transformed roots: ${transformedRoots}\n  normalized: ${metadata?.unit === "meter"}`)
}
