'use client'

import { DirectionalLightHelper } from "three";
import {useRef} from "react";
import {useHelper} from "@react-three/drei";
import useStudioStore from "@/features/studio/stores/useStudioStore";

export default function AquariumLight() {
    const lightColor = useStudioStore((state) => state.lightColor)
    const lightIntensity = useStudioStore((state) => state.lightIntensity)
    const color = `rgb(${lightColor.r}, ${lightColor.g}, ${lightColor.b})`

    return (
        <directionalLight
            position={[0, 10, 0]}
            intensity={lightIntensity}
            color={color}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-near={1}
            shadow-camera-far={100}
            shadow-camera-left={-30}
            shadow-camera-right={30}
            shadow-camera-top={30}
            shadow-camera-bottom={-30}
            shadow-bias={-0.002}
            shadow-normalBias={0.02}
        />
    )
}