'use client'

import MainCanvas from "./MainCanvas"
import ToolBar from "./toolbar/Toolbar"

export default function StudioComponent(props) {
    return (
        <>
            <div className="flex flex-row">
                <div className="basis-1/6 bg-red-300">
                    <h1>Toolbar</h1>
                    <ToolBar></ToolBar>
                </div>
                <div className="basis-4/6 bg-blue-300 h-screen">
                    <MainCanvas />
                </div>
                <div className="basis-1/6 bg-green-300">Properties</div>
            </div>
        </>
    )
}