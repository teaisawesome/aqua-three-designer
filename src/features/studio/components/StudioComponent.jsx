'use client'

import MainCanvas from "./MainCanvas"
import ToolBar from "./toolbar/Toolbar"
import PreferenceBar from "@/features/studio/components/preferencebar/PreferenceBar";
import {useEffect, useState} from "react";
import useStudioStore from "@/features/studio/stores/useStudioStore";

export default function StudioComponent({...props}) {
    const {aquarium} = props
    const loadStudioData = useStudioStore((state) => state.loadStudioData)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log("aquarium", aquarium)
        loadStudioData(aquarium)
        setLoading(false)
    }, [aquarium, loadStudioData]);

    if(loading) return <div className="text-white">Studio Betöltés...</div>

    return (
        <div className="flex flex-row h-dvh">
                <ToolBar/>
                <MainCanvas />
                <PreferenceBar/>
        </div>
    )
}