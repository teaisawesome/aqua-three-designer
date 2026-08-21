import {useEffect} from "react"
import {resolveAssetDefinition} from "@/domain/assets/catalog.mjs"
import Cube from "@/features/studio/components/models/plants/Cube"
import RedCube from "@/features/studio/components/models/plants/RedCube"
import MissingAsset from "@/features/studio/components/scene/MissingAsset"

const assetRenderers = {
    cube: Cube,
    redcube: RedCube
}

export default function AssetInstance({instance}) {
    const definition = resolveAssetDefinition(instance.assetId, instance.assetVersion)
    const Renderer = definition ? assetRenderers[definition.id] : null

    useEffect(() => {
        if (!definition) {
            console.warn(`Unknown asset ${instance.assetId}@${instance.assetVersion}; rendering placeholder.`)
        } else if (!Renderer) {
            console.warn(`Asset ${definition.id} has no scene renderer; rendering placeholder.`)
        }
    }, [definition, Renderer, instance.assetId, instance.assetVersion])

    const props = {
        id: instance.id,
        position: [instance.position.x, instance.position.y, instance.position.z],
        rotation: [instance.rotation.x, instance.rotation.y, instance.rotation.z],
        scale: [instance.scale.x, instance.scale.y, instance.scale.z],
        locked: instance.locked
    }

    return Renderer ? <Renderer {...props}/> : <MissingAsset {...props}/>
}
