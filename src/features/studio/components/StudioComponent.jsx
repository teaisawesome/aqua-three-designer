'use client'

import MainCanvas from "./MainCanvas"
import ToolBar from "./toolbar/Toolbar"

export default function StudioComponent(props) {
    return (
        <div>
            <div className="flex flex-col min-h-screen">
                <header className={"bg-blue-500 text-white"}>Menüsáv</header>
                <div className={"flex flex-1"}>
                    <ToolBar></ToolBar>
                    <MainCanvas />
                    <ToolBar></ToolBar>
                </div>
            </div>
        </div>
    )
}