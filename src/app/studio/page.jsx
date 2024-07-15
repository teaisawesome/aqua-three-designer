'use client'

import { Canvas } from '@react-three/fiber'
import classes from './page.module.css'
import Floor from '@/components/three-test/Floor'
import LightBulb from '@/components/three-test/LightBulb'
import Draggable from '@/components/three-test/Draggable'

export default function Studio() {
    return (
        <>
            <h1 className={classes.title}>Studio Page Helloszia</h1>
            <div className={classes.scene}>
                <Canvas shadows className={classes.canvas} camera={{position: [-6, 7, 7]}}>
                    <ambientLight color={"white"} intensity={0.3} />
                    <LightBulb position={[0, 3, 0]}/>
                    <Draggable>
                        <Floor position={[0, -1, 0]}></Floor>
                    </Draggable>
                </Canvas>
            </div>
        </>
    )
}