'use client'

import React from "react"
import { extend } from '@react-three/fiber'
import { BoxGeometry } from 'three'
extend({ BoxGeometry })

export default function Floor(props) {
    return (
        <mesh {...props} recieveShadow>
            <boxGeometry args={[5, 5, 5]} />
            <meshStandardMaterial color={"blue"} />
        </mesh>
      )
}