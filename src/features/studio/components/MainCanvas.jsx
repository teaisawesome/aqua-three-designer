'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, TransformControls } from '@react-three/drei'
import classes from '../styles/studio.module.css'
import {Suspense, useState, useRef, useEffect} from 'react'
import { SimpleAquarium } from './models/aquariums/simple-aquarium/SimpleAquarium.jsx'
import Cube from './models/plants/Cube'
import useStudioStore from "@/features/studio/stores/useStudioStore";
import {EffectComposer, Outline, Selection, Select} from "@react-three/postprocessing";
import { Move3d, Rotate3d, Scale3d, Info } from 'lucide-react'

export default function MainCanvas() {
    const usedComponents = useStudioStore((state) => state.usedComponents)
    const selectedObject = useStudioStore((state) => state.selectedObject)
    const transformRef = useRef(null)
    const orbitControlRef = useRef(null)
    const transformControlMode = useStudioStore((state) => state.transformControlMode)
    const setTransformControlMode = useStudioStore((state) => state.setTransformControlMode)

    return (
        <>
            <div className="flex-1 w-2/4 relative">
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
                            mode={transformControlMode}
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
                {{
                    // ! SHOULD BE REFACTORED INTO A SEPARATE JSX COMPONENT
                }}
                <div className={'absolute top-4 right-4'}>
                    <div className={'bg-sky-800 rounded-xl p-3.5 flex flex-col gap-4'}>
                        <Move3d className={`${transformControlMode === 'translate' ? 'text-yellow-500 scale-125' : 'hover:text-green-500'} transition duration-300 hover:ease-in-out hover:scale-125 cursor-pointer`}
                                onClick={() => setTransformControlMode('translate')}/>
                        <Rotate3d className={`${transformControlMode === 'rotate' ? 'text-yellow-500 scale-125' : 'hover:text-green-500'} transition duration-300 hover:ease-in-out hover:scale-125 cursor-pointer`}
                                  onClick={() => setTransformControlMode('rotate')}/>
                        <Scale3d className={`${transformControlMode === 'scale' ? 'text-yellow-500 scale-125' : 'hover:text-green-500'} transition duration-300 hover:ease-in-out hover:scale-125 cursor-pointer`}
                                 onClick={() => setTransformControlMode('scale')}/>
                    </div>
                </div>
                {{
                    // ! SHOULD BE REFACTORED INTO A SEPARATE JSX COMPONENT
                }}
                <div className={'absolute top-4 left-4'}>
                    <div className={'bg-sky-800 rounded-xl p-3 flex flex-row gap-4'}>
                        <Info/> Még nem csinál semmit
                    </div>
                </div>
            </div>
        </>
    )
}