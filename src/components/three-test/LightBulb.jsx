import React from "react"
import { extend } from '@react-three/fiber'
import { pointLight, sphereGeometry, meshPhongMaterial } from 'three'
extend({ pointLight, sphereGeometry, meshPhongMaterial })

export default function LightBulb(props) {
    return(
        <mesh {...props}>
            <pointLight castShadow />
            <sphereGeometry args={[0.2, 30, 10]} />
            <meshPhongMaterial emissive={"yellow"}  />
        </mesh>
    )
}