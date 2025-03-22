'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, TransformControls } from '@react-three/drei'
import classes from '../styles/studio.module.css'
import {Suspense, useState, useRef, useEffect} from 'react'
import { SimpleAquarium } from './models/aquariums/simple-aquarium/SimpleAquarium.jsx'
import Cube from './models/plants/Cube'
import RedCube from './models/plants/RedCube'
import useStudioStore from "@/features/studio/stores/useStudioStore";
import {EffectComposer, Outline, Selection, Select} from "@react-three/postprocessing";
import TransformControlModeSelector from "@/features/studio/components/canvas-tools/TransformControlModeSelector";
import InfoPanel from "@/features/studio/components/canvas-tools/InfoPanel";
import SavePanel from "@/features/studio/components/canvas-tools/SavePanel";
import LightControlPanel from "@/features/studio/components/canvas-tools/LightControlPanel";
import AquariumLight from "@/features/studio/components/lights/AquariumLight";

export default function MainCanvas() {
    const components = useStudioStore((state) => state.components)
    const selectedObject = useStudioStore((state) => state.selectedObject)
    const transformRef = useRef(null)
    const orbitControlRef = useRef(null)
    const transformControlMode = useStudioStore((state) => state.transformControlMode)
    const highlightedObjectId = useStudioStore((state) => state.highlightedObjectId)
    const setSelectedObjectTransform = useStudioStore((state) => state.setSelectedObjectTransform)

    const handlePositionChange = () => {
        if(highlightedObjectId && selectedObject) {
            setSelectedObjectTransform(highlightedObjectId, 'position','x', selectedObject.position.x)
            setSelectedObjectTransform(highlightedObjectId, 'position','y', selectedObject.position.y)
            setSelectedObjectTransform(highlightedObjectId, 'position','z', selectedObject.position.z)

            setSelectedObjectTransform(highlightedObjectId, 'rotation','x', selectedObject.rotation.x)
            setSelectedObjectTransform(highlightedObjectId, 'rotation','y', selectedObject.rotation.y)
            setSelectedObjectTransform(highlightedObjectId, 'rotation','z', selectedObject.rotation.z)

            setSelectedObjectTransform(highlightedObjectId, 'scale','x', selectedObject.scale.x)
            setSelectedObjectTransform(highlightedObjectId, 'scale','y', selectedObject.scale.y)
            setSelectedObjectTransform(highlightedObjectId, 'scale','z', selectedObject.scale.z)
        }
    }

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
                            onObjectChange={() => handlePositionChange()}
                        />
                    )}
                    <ambientLight intensity={0.5} />
                    <AquariumLight></AquariumLight>
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
                            components.map((component, index) => {

                                switch (component.componentId) {
                                    case 'cube':
                                        return <Cube
                                                    key={index}
                                                    position={[component.position.x, component.position.y, component.position.z]}
                                                    rotation={[component.rotation.x, component.rotation.y, component.rotation.z]}
                                                    scale={[component.scale.x, component.scale.y, component.scale.z]}
                                                    id={component.id}
                                                    locked={component.locked}
                                        />;
                                    case 'redcube':
                                        return <RedCube
                                            key={index}
                                            position={[component.position.x, component.position.y, component.position.z]}
                                            rotation={[component.rotation.x, component.rotation.y, component.rotation.z]}
                                            scale={[component.scale.x, component.scale.y, component.scale.z]}
                                            id={component.id}
                                            locked={component.locked}
                                        />;
                                    default: return null;
                                }
                            })
                        }
                    </Selection>
                </Canvas>
                <TransformControlModeSelector/>
                <InfoPanel/>
                <SavePanel/>
                <LightControlPanel/>
            </div>
        </>
    )
}