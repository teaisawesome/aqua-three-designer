'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import classes from '../styles/studio.module.css'
import { Suspense } from 'react'
import { SimpleAquarium } from './models/aquariums/simple-aquarium/SimpleAquarium.jsx'
import Cube from './models/plants/Cube'

export default function MainCanvas() {
    return (
        <>
            <div className="flex-1 w-2/4">
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
                        <SimpleAquarium scale={0.1} position={[0, 0, 0]}/>
                    </Suspense>
                    {
                        // <Cube/>   ha az alkalmazásnál van egy click, akkor renderelődjön, adódjon hozzá a kocka
                    }
                </Canvas>
            </div>
        </>
    )
}