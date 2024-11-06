import MainCanvas from "./MainCanvas"

export default function StudioComponent(props) {
    return (
        <>
            <div className="flex flex-row">
                <div className="basis-1/6 bg-red-300">Toolbar</div>
                <div className="basis-4/6 bg-blue-300 h-screen">
                    <MainCanvas />
                </div>
                <div className="basis-1/6 bg-green-300">Properties</div>
            </div>
        </>
    )
}