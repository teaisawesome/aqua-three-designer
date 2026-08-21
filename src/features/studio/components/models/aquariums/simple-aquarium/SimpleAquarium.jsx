'use client'

import {useMemo} from 'react'
import {useGLTF} from '@react-three/drei'

const MODEL_URL = '/models/aquariums/simple-aquarium.glb?v=2'

export function SimpleAquarium(props) {
    const {scene} = useGLTF(MODEL_URL)
    const instance = useMemo(() => scene.clone(), [scene])

    return <primitive object={instance} {...props} dispose={null}/>
}

useGLTF.preload(MODEL_URL)
