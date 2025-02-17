'use client'

import MainCanvas from "./MainCanvas"
import ToolBar from "./toolbar/Toolbar"
import PreferenceBar from "@/features/studio/components/preferencebar/PreferenceBar";

export default function StudioComponent(props) {
    return (
        <div>
            <div className="flex flex-col min-h-screen">
                <header className={"bg-blue-500 text-white"}>Menüsáv</header>
                <div className={"flex flex-1"}>
                    <ToolBar></ToolBar>
                    <MainCanvas />
                    <PreferenceBar />
                </div>
            </div>
        </div>
    )
}