'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, TransformControls } from '@react-three/drei'
import classes from '../styles/studio.module.css'
import {Suspense, useState, useRef, useEffect} from 'react'
import { SimpleAquarium } from './models/aquariums/simple-aquarium/SimpleAquarium.jsx'
import Cube from './models/plants/Cube'
import useStudioStore from "@/features/studio/stores/useStudioStore";
import {EffectComposer, Outline, Selection, Select} from "@react-three/postprocessing";

export default function MainCanvas() {
    const usedComponents = useStudioStore((state) => state.usedComponents)
    const selectedObject = useStudioStore((state) => state.selectedObject)
    const transformRef = useRef(null)
    const orbitControlRef = useRef(null)

    return (
        <>
            <div className="flex-1 w-2/4">
                <Canvas shadows dpr={[1, 2]} className={classes.canvas} camera={{position: [0, 2, 10], fov: 50}}>
                    <OrbitControls
                        ref={orbitControlRef}
                        enableDamping={true}
                        dampingFactor={0.05}
                        minAzimuthAngle={-Math.PI / 2}
                        maxAzimuthAngle={Math.PI / 2}
                        minPolarAngle={Math.PI / 6}
                        maxPolarAngle={Math.PI - Math.PI / 2}
                        minDistance={2}
                        maxDistance={10}
                    />
                    {selectedObject && (
                        <TransformControls
                            ref={transformRef}
                            object={selectedObject}
                            mode="translate"
                            onMouseDown={() => orbitControlRef.current.enableRotate = false}
                            onMouseUp={() => orbitControlRef.current.enableRotate = true}
                        />
                    )}
                    <ambientLight intensity={0.5} />
                    <directionalLight
                        position={[5, 10, 5]}
                        intensity={0.7}
                        castShadow
                        shadow-mapSize-width={1024}
                        shadow-mapSize-height={1024}
                    />
                    <Suspense fallback={<div>Loading...</div>}>
                        <SimpleAquarium scale={0.1} position={[0, 0, 0]}/>
                    </Suspense>
                    <Selection>
                        <EffectComposer autoClear={false}>
                            <Outline
                                visibleEdgeColor='white'
                                hiddenEdgeColor='black'
                                edgeStrength={5}
                                blur={false}
                            />
                        </EffectComposer>
                        {
                            usedComponents.map((component, index) => {

                                switch (component.componentId) {
                                    case 'cube':
                                        return <Cube
                                                    key={index}
                                                    scale={component.scale}
                                                    position={[component.position.x, component.position.y, component.position.z]}
                                                    id={component.id}
                                                    locked={component.locked}
                                        />;
                                    default: return null;
                                }
                            })
                        }
                    </Selection>
                </Canvas>
            </div>
        </>
    )
}