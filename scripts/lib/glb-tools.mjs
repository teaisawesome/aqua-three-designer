import fs from "node:fs/promises"
import {Matrix3, Matrix4, Quaternion, Vector3} from "three"

const JSON_CHUNK = 0x4e4f534a
const BIN_CHUNK = 0x004e4942

export async function readGlb(path) {
    const file = await fs.readFile(path)
    if (file.readUInt32LE(0) !== 0x46546c67) throw new Error(`${path} is not a GLB file`)

    let offset = 12
    let json
    let binary
    while (offset < file.length) {
        const length = file.readUInt32LE(offset)
        const type = file.readUInt32LE(offset + 4)
        const data = file.subarray(offset + 8, offset + 8 + length)
        if (type === JSON_CHUNK) json = JSON.parse(data.toString("utf8").trim())
        if (type === BIN_CHUNK) binary = Buffer.from(data)
        offset += 8 + length
    }
    if (!json || !binary) throw new Error(`${path} must contain JSON and BIN chunks`)
    return {json, binary}
}

export async function writeGlb(path, {json, binary}) {
    const jsonBody = Buffer.from(JSON.stringify(json))
    const jsonPadding = Buffer.alloc((4 - jsonBody.length % 4) % 4, 0x20)
    const binPadding = Buffer.alloc((4 - binary.length % 4) % 4)
    const jsonChunk = Buffer.concat([jsonBody, jsonPadding])
    const binChunk = Buffer.concat([binary, binPadding])
    const output = Buffer.alloc(12 + 8 + jsonChunk.length + 8 + binChunk.length)

    output.writeUInt32LE(0x46546c67, 0)
    output.writeUInt32LE(2, 4)
    output.writeUInt32LE(output.length, 8)
    output.writeUInt32LE(jsonChunk.length, 12)
    output.writeUInt32LE(JSON_CHUNK, 16)
    jsonChunk.copy(output, 20)
    const binHeader = 20 + jsonChunk.length
    output.writeUInt32LE(binChunk.length, binHeader)
    output.writeUInt32LE(BIN_CHUNK, binHeader + 4)
    binChunk.copy(output, binHeader + 8)
    await fs.writeFile(path, output)
}

function nodeMatrix(node) {
    if (node.matrix) return new Matrix4().fromArray(node.matrix)
    return new Matrix4().compose(
        new Vector3().fromArray(node.translation ?? [0, 0, 0]),
        new Quaternion().fromArray(node.rotation ?? [0, 0, 0, 1]),
        new Vector3().fromArray(node.scale ?? [1, 1, 1])
    )
}

function accessorView(document, accessorIndex) {
    const accessor = document.json.accessors[accessorIndex]
    if (accessor.componentType !== 5126 || accessor.type !== "VEC3") {
        throw new Error(`Accessor ${accessorIndex} must be a float VEC3`)
    }
    const view = document.json.bufferViews[accessor.bufferView]
    const start = (view.byteOffset ?? 0) + (accessor.byteOffset ?? 0)
    const stride = view.byteStride ?? 12
    return {accessor, start, stride}
}

function eachVector(document, accessorIndex, callback) {
    const {accessor, start, stride} = accessorView(document, accessorIndex)
    for (let index = 0; index < accessor.count; index += 1) {
        const offset = start + index * stride
        const vector = new Vector3(
            document.binary.readFloatLE(offset),
            document.binary.readFloatLE(offset + 4),
            document.binary.readFloatLE(offset + 8)
        )
        callback(vector, (next) => {
            document.binary.writeFloatLE(next.x, offset)
            document.binary.writeFloatLE(next.y, offset + 4)
            document.binary.writeFloatLE(next.z, offset + 8)
        })
    }
}

function meshNodes(document) {
    const result = []
    const roots = document.json.scenes[document.json.scene ?? 0].nodes ?? []

    function visit(index, parentMatrix) {
        const node = document.json.nodes[index]
        const worldMatrix = parentMatrix.clone().multiply(nodeMatrix(node))
        if (node.mesh !== undefined) result.push({node, mesh: document.json.meshes[node.mesh], worldMatrix})
        for (const child of node.children ?? []) visit(child, worldMatrix)
    }

    for (const root of roots) visit(root, new Matrix4())
    return result
}

export function measureGlb(document) {
    const min = new Vector3(Infinity, Infinity, Infinity)
    const max = new Vector3(-Infinity, -Infinity, -Infinity)
    for (const {mesh, worldMatrix} of meshNodes(document)) {
        for (const primitive of mesh.primitives) {
            eachVector(document, primitive.attributes.POSITION, (position) => {
                position.applyMatrix4(worldMatrix)
                min.min(position)
                max.max(position)
            })
        }
    }
    return {min, max, size: max.clone().sub(min)}
}

export function normalizeGlb(document, {unitScale, rotateY = 0}) {
    const correction = new Matrix4()
        .makeRotationY(rotateY)
        .scale(new Vector3(unitScale, unitScale, unitScale))
    const transformed = []
    const min = new Vector3(Infinity, Infinity, Infinity)
    const max = new Vector3(-Infinity, -Infinity, -Infinity)

    for (const {node, mesh, worldMatrix} of meshNodes(document)) {
        const matrix = correction.clone().multiply(worldMatrix)
        const normalMatrix = new Matrix3().getNormalMatrix(matrix)
        for (const primitive of mesh.primitives) {
            eachVector(document, primitive.attributes.POSITION, (position, write) => {
                const next = position.applyMatrix4(matrix)
                min.min(next)
                max.max(next)
                transformed.push({next, write})
            })
            if (primitive.attributes.NORMAL !== undefined) {
                eachVector(document, primitive.attributes.NORMAL, (normal, write) => {
                    write(normal.applyMatrix3(normalMatrix).normalize())
                })
            }
        }
    }

    const pivotOffset = new Vector3(-(min.x + max.x) / 2, -min.y, -(min.z + max.z) / 2)
    for (const {next, write} of transformed) write(next.add(pivotOffset))

    for (const node of document.json.nodes) {
        delete node.matrix
        delete node.translation
        delete node.rotation
        delete node.scale
    }

    for (const accessor of document.json.accessors) {
        if (accessor.type === "VEC3" && accessor.componentType === 5126) {
            delete accessor.min
            delete accessor.max
        }
    }

    // Recalculate POSITION accessor bounds after baking and pivot correction.
    for (const {mesh} of meshNodes(document)) {
        for (const primitive of mesh.primitives) {
            const accessor = document.json.accessors[primitive.attributes.POSITION]
            const accessorMin = new Vector3(Infinity, Infinity, Infinity)
            const accessorMax = new Vector3(-Infinity, -Infinity, -Infinity)
            eachVector(document, primitive.attributes.POSITION, (position) => {
                accessorMin.min(position)
                accessorMax.max(position)
            })
            accessor.min = accessorMin.toArray()
            accessor.max = accessorMax.toArray()
        }
    }
}

export function formatVector(vector) {
    return vector.toArray().map((value) => value.toFixed(4)).join(" × ")
}
