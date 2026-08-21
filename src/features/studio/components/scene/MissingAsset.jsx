import {useEffect, useRef} from "react"
import {Select} from "@react-three/postprocessing"
import useStudioStore from "@/features/studio/stores/useStudioStore"
import {removeComponentRef, setComponentRef} from "@/lib/registry/componentRefRegistry"

export default function MissingAsset({id, position, rotation, scale, locked}) {
    const groupRef = useRef(null)
    const highlightedObjectId = useStudioStore((state) => state.highlightedObjectId)
    const addHighlightedObjectId = useStudioStore((state) => state.addHighlightedObjectId)

    useEffect(() => {
        if (groupRef.current) setComponentRef(id, groupRef.current)
        return () => removeComponentRef(id)
    }, [id])

    return (
        <Select enabled={highlightedObjectId === id}>
            <group
                ref={groupRef}
                position={position}
                rotation={rotation}
                scale={scale}
                onClick={(event) => {
                    event.stopPropagation()
                    if (!locked) addHighlightedObjectId(highlightedObjectId === id ? null : id)
                }}
            >
                <mesh castShadow receiveShadow>
                    <boxGeometry args={[1, 1, 1]}/>
                    <meshStandardMaterial color="magenta" wireframe/>
                </mesh>
            </group>
        </Select>
    )
}
