'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import classes from './page.module.css'
import { Suspense } from 'react'
import { Aquarium } from '../../../../public/3d-objects/simple-aquarium/Aquarium.jsx'

export default function Studio() {
    return (
        <>
            <div className={classes.scene}>
                <Canvas shadows className={classes.canvas} camera={{position: [0, 2, 10], fov: 50}}>
                    <OrbitControls
                        minAzimuthAngle={-Math.PI / 2}
                        maxAzimuthAngle={Math.PI / 2}
                        minPolarAngle={Math.PI / 6}
                        maxPolarAngle={Math.PI - Math.PI / 2}
                        minDistance={2}
                        maxDistance={10}
                    />
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 10, 5]} intensity={0.7} castShadow />
                    <Suspense fallback={null}>
                        <Aquarium scale={0.1} position={[0, 0, 0]}/>
                    </Suspense>
                </Canvas>
            </div>
        </>
    )
}