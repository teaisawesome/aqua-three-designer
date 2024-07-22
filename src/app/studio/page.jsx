'use client'

import { Canvas } from '@react-three/fiber'
import classes from './page.module.css'
import Floor from '@/components/three-test/Floor'
import LightBulb from '@/components/three-test/LightBulb'
import Draggable from '@/components/three-test/Draggable'
import { Suspense } from 'react'
import Scene from '../../../public/3d-objects/air_plant_v1.0/Scene'

export default function Studio() {
    return (
        <>
            <h1 className={classes.title}>Studio Page Helloszia</h1>
            <div className={classes.scene}>
                <Canvas shadows className={classes.canvas} camera={{position: [-6, 7, 7]}}>
                    <ambientLight color={"white"} intensity={0.3} />
                    <Suspense fallback={null}>
                        <Scene/>
                    </Suspense>
                </Canvas>
            </div>
        </>
    )
}