'use client'

import { Canvas } from '@react-three/fiber'
import classes from './page.module.css'
import { Suspense } from 'react'
import { Aquarium } from '@/public/3d-objects/aquarium-test/Aquarium'

export default function Studio() {
    return (
        <>
            <h1 className={classes.title}>Studio Page Helloszia</h1>
            <div className={classes.scene}>
                <Canvas shadows className={classes.canvas} camera={{position: [-6, 7, 7]}}>
                    <ambientLight color={"yellow"} intensity={0.3} />
                    <Suspense fallback={null}>
                        <Aquarium/>
                    </Suspense>
                </Canvas>
            </div>
        </>
    )
}