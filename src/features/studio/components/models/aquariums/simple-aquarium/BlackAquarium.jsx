'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function BlackAquarium(props) {
    const { nodes, materials } = useGLTF('/models/aquariums/glass-cube_03.glb')
    
    const pivot = useRef()
    const group = useRef()

    const [ dragging, setDragging ] = useState(false)
    const [ position, setPosition ] = useState({x: 0, y: 0, deltaX: 0})
    
    /*useEffect(() => {
        if(nodes.Mesh_Mesh_head_geo001_lambert2SG001.geometry) {
            nodes.Mesh_Mesh_head_geo001_lambert2SG001.geometry.center()
        }
    }, [nodes])*/

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
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube.geometry}
                material={materials.Glass}
                scale={[20, 10, 10]}
            />
        </group>
    )
}

useGLTF.preload('/models/aquariums/glass-cube_03.glb')
