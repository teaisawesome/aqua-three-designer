'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function SimpleAquarium(props) {
    const { nodes, materials } = useGLTF('/models/aquariums/simple-aquarium.glb')
    
    const pivot = useRef()
    const group = useRef()

    const [ dragging, setDragging ] = useState(false)
    const [ position, setPosition ] = useState({x: 0, y: 0, deltaX: 0})
    
    useEffect(() => {
        if(nodes.Mesh_Mesh_head_geo001_lambert2SG001.geometry) {
            nodes.Mesh_Mesh_head_geo001_lambert2SG001.geometry.center()
        }
    }, [nodes])

    useFrame(() => {
        if(dragging && pivot.current) {
            // {isEuler: true, _x: 0, _y: 0, _z: 0, _order: 'XYZ', …}

            //pivot.current.rotation.y += 0.01
        }
    })

    const handleMouseDown = (event) => {
        setDragging(true)
        const deltaX = event.clientX - position.x
        setPosition({x: event.clientX, y: event.clientY, deltaX})
        //console.log("MOUSE DOWN")
    }

    const handleMouseUp = (event) => {
        setDragging(false)
        //console.log("MOUSE UP")
    }

    const handleMouseMove = (event) => {
        if(dragging) {
            const deltaX = event.clientX - position.x
            setPosition({x: event.clientX, y: event.clientY, deltaX})
            //console.log(position)
        }
    }

    const handleMouseOut = (event) => {
        if(dragging) {
            setDragging(false)
        }
    }

    return (
        <group ref={pivot} {...props}>
            <group
                ref={group}
                dispose={null}
                onPointerDown={handleMouseDown}
                onPointerUp={handleMouseUp}
                onPointerMove={handleMouseMove}
                onPointerOut={handleMouseOut}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Mesh_Mesh_head_geo001_lambert2SG001.geometry}
                    material={materials['lambert2SG.001']}
                    rotation={[-Math.PI / 2, 0, 0]}
                />
                <mesh position={[0, -9, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[4, 4, 4]} receiveShadow>
                    <planeGeometry args={[20, 20]} />
                    <shadowMaterial opacity={0.5} />
                </mesh>
            </group>
        </group>
    )
}

useGLTF.preload('/models/aquariums/simple-aquarium.glb')
