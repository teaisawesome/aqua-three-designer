'use client'

import { useGLTF } from '@react-three/drei'

export function OptiWhiteAquarium(props) {
    const { nodes, materials } = useGLTF('/models/aquariums/opti-white-aquarium.glb')

    return (
        <group {...props} dispose={null}>
            <mesh
                receiveShadow
                geometry={nodes.Cube.geometry}
                material={materials.Glass}
                scale={[10, 10, 10]}
                depthWrite={false}
            />
        </group>
    )
}

useGLTF.preload('/models/aquariums/opti-white-aquarium.glb')
