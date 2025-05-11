'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, TransformControls } from '@react-three/drei'
import classes from '../styles/studio.module.css'
import {Suspense, useRef} from 'react'
import Cube from './models/plants/Cube'
import RedCube from './models/plants/RedCube'
import useStudioStore from "@/features/studio/stores/useStudioStore";
import {EffectComposer, Outline, Selection} from "@react-three/postprocessing";
import TransformControlModeSelector from "@/features/studio/components/canvas-tools/TransformControlModeSelector";
import InfoPanel from "@/features/studio/components/canvas-tools/InfoPanel";
import SavePanel from "@/features/studio/components/canvas-tools/SavePanel";
import LightControlPanel from "@/features/studio/components/canvas-tools/LightControlPanel";
import AquariumLight from "@/features/studio/components/lights/AquariumLight";
import {OptiWhiteAquarium} from "@/features/studio/components/models/aquariums/simple-aquarium/OptiWhiteAquarium";
import {getComponentRef} from "@/lib/registry/componentRefRegistry";

export default function MainCanvas() {
    const components = useStudioStore((state) => state.components)
    // const selectedObject = useStudioStore((state) => state.selectedObject)
    const transformRef = useRef(null)
    const orbitControlRef = useRef(null)
    const transformControlMode = useStudioStore((state) => state.transformControlMode)
    const highlightedObjectId = useStudioStore((state) => state.highlightedObjectId)
    const setSelectedObjectTransform = useStudioStore((state) => state.setSelectedObjectTransform)

    const selectedComponentRef = highlightedObjectId ? getComponentRef(highlightedObjectId) : null

    const handlePositionChange = () => {
        const obj = transformRef.current?.object

        if(highlightedObjectId && obj) {
            setSelectedObjectTransform(highlightedObjectId, 'position','x', obj.position.x)
            setSelectedObjectTransform(highlightedObjectId, 'position','y', obj.position.y)
            setSelectedObjectTransform(highlightedObjectId, 'position','z', obj.position.z)

            setSelectedObjectTransform(highlightedObjectId, 'rotation','x', obj.rotation.x)
            setSelectedObjectTransform(highlightedObjectId, 'rotation','y', obj.rotation.y)
            setSelectedObjectTransform(highlightedObjectId, 'rotation','z', obj.rotation.z)

            setSelectedObjectTransform(highlightedObjectId, 'scale','x', obj.scale.x)
            setSelectedObjectTransform(highlightedObjectId, 'scale','y', obj.scale.y)
            setSelectedObjectTransform(highlightedObjectId, 'scale','z', obj.scale.z)
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
                    {selectedComponentRef && (
                        <TransformControls
                            ref={transformRef}
                            object={selectedComponentRef}
                            mode={transformControlMode}
                            onMouseDown={() => orbitControlRef.current.enableRotate = false}
                            onMouseUp={() => orbitControlRef.current.enableRotate = true}
                            onObjectChange={() => handlePositionChange()}
                        />
                    )}
                    <ambientLight intensity={0.5} />
                    <AquariumLight></AquariumLight>
                    <Suspense fallback={<div>Loading...</div>}>
                        <OptiWhiteAquarium scale={0.1} position={[0, 0, 0]}/>
                    </Suspense>
                    <Selection>
                        <EffectComposer autoClear={false}>
                            <Outline
                                visibleEdgeColor='white'
                                hiddenEdgeColor='white'
                                edgeStrength={10}
                                blur={false}
                            />
                        </EffectComposer>
                        {
                            components.map((component, index) => {

                                switch (component.assetId) {
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