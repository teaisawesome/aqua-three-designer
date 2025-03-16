'use client'

import MainCanvas from "./MainCanvas"
import ToolBar from "./toolbar/Toolbar"
import PreferenceBar from "@/features/studio/components/preferencebar/PreferenceBar";

export default function StudioComponent(props) {
    return (
        <div>
            <div className="flex flex-col h-screen">
                <div className={"flex flex-1"}>
                    <ToolBar></ToolBar>
                    <MainCanvas />
                    <PreferenceBar></PreferenceBar>
                </div>
            </div>
        </div>
    )
}