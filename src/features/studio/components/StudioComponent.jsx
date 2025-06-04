'use client'

import MainCanvas from "./MainCanvas"
import ToolBar from "./toolbar/Toolbar"
import PreferenceBar from "@/features/studio/components/preferencebar/PreferenceBar";
import {useEffect, useState} from "react";
import useStudioStore from "@/features/studio/stores/useStudioStore";
import dynamic from "next/dynamic";

const ResponsiveLayout = dynamic(() => import('../components/layouts/ResponsiveLayout'), {
    ssr: false,
    loading: () => <div className="h-screen flex items-center justify-center">Loading…</div>,
});

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
        <ResponsiveLayout/>
    )
}