'use client'

import {useEffect} from "react";
import useStudioStore from "@/features/studio/stores/useStudioStore";
import dynamic from "next/dynamic";

const ResponsiveLayout = dynamic(() => import('../components/layouts/ResponsiveLayout'), {
    ssr: false,
    loading: () => <div className="h-screen flex items-center justify-center">Loading…</div>,
});

export default function StudioComponent({...props}) {
    const {aquarium} = props
    const loadStudioData = useStudioStore((state) => state.loadStudioData)

    useEffect(() => {
        loadStudioData(aquarium)
    }, [aquarium, loadStudioData]);

    return (
        <ResponsiveLayout/>
    )
}
