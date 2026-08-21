'use client'

import { useGLTF } from '@react-three/drei'
import { useMemo } from 'react'

const MODEL_URL = '/models/aquariums/opti-white-aquarium.glb?v=2'

export function OptiWhiteAquarium(props) {
    const {scene} = useGLTF(MODEL_URL)
    const instance = useMemo(() => scene.clone(), [scene])

    return <primitive object={instance} {...props} dispose={null}/>
}

useGLTF.preload(MODEL_URL)
