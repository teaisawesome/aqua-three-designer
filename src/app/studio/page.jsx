'use client'

import { Canvas } from '@react-three/fiber'
import classes from './page.module.css'

export default function Studio() {
    return (
        <>
            <h1 className={classes.title}>Studio Page Helloszia</h1>
            <div className={classes.scene}>
                <Canvas shadows className={classes.canvas} camera={{position: [-6, 7, 7]}}>

                </Canvas>
            </div>
        </>
    )
}