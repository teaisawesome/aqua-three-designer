import {useRef, useState} from "react";
import {Select} from "@react-three/postprocessing";
import useStudioStore from "@/features/studio/stores/useStudioStore";

export default function Cube({ scale, position, id, locked }) {
    const highlightedObjectId = useStudioStore((state) => state.highlightedObjectId)
    const addHighlightedObjectId = useStudioStore((state) => state.addHighlightedObjectId)

    const handleHighlight = (id) => {
        if(locked) return

        if(highlightedObjectId === id) {
            addHighlightedObjectId(null)
            return
        }
        addHighlightedObjectId(id)
    }

    const isEnabled = () => {
        return highlightedObjectId === id
    }

    return (
        <Select enabled={isEnabled()}>
            <mesh
                position={position}
                scale={scale}
                rotation={[0, 10, 0]}
                onClick={() => handleHighlight(id)}
            >
                <boxGeometry attach="geometry" args={[1, 1, 1]} />
                <meshStandardMaterial attach="material" color="#6be092" />
            </mesh>
        </Select>
    )
}