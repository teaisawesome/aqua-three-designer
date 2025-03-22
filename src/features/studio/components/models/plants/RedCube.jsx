import {useEffect, useRef} from "react";
import {Select} from "@react-three/postprocessing";
import useStudioStore from "@/features/studio/stores/useStudioStore";

export default function RedCube(props) {
    const { id, position, rotation, scale, locked } = props

    const meshRef = useRef(null)
    const highlightedObjectId = useStudioStore((state) => state.highlightedObjectId)
    const addHighlightedObjectId = useStudioStore((state) => state.addHighlightedObjectId)
    const setSelectedObjectInUsedComponent = useStudioStore((state) => state.setSelectedObjectInUsedComponent)
    const setSelectedObject = useStudioStore((state) => state.setSelectedObject)

    useEffect(() => {
        if(meshRef.current) {
            setSelectedObjectInUsedComponent(id, meshRef.current)
        }
    })

    const handleHighlight = (id, e) => {
        if(locked) return

        if(highlightedObjectId === id) {
            addHighlightedObjectId(null)
            setSelectedObject(null)
            return
        }

        addHighlightedObjectId(id)
        setSelectedObject(meshRef.current)
    }

    const isEnabled = () => {
        return highlightedObjectId === id
    }

    return (
        <Select enabled={isEnabled()}>
            <mesh
                ref={meshRef}
                position={position}
                rotation={rotation}
                scale={scale}
                onClick={(e) => handleHighlight(id)}
                castShadow
                receiveShadow
            >
                <boxGeometry attach="geometry" args={[1, 1, 1]} />
                <meshStandardMaterial attach="material" color="red" />
            </mesh>
        </Select>
    )
}