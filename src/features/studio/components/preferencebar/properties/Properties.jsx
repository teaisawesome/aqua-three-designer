import useStudioStore from "@/features/studio/stores/useStudioStore";

export default function Properties() {
    const usedComponents = useStudioStore((state) => state.usedComponents)
    const highlightedObjectId = useStudioStore((state) => state.highlightedObjectId)
    const selectedComponentInfo = usedComponents.find((c) => c.id === highlightedObjectId)
    const setSelectedObjectPosition = useStudioStore((state) => state.setSelectedObjectPosition)

    return (
        <div className={'flex flex-col h-full text-white'}>
            <h1 className={"font-bold mb-3 mt-1"}>Properties</h1>
            {
                highlightedObjectId ? (
                    <form action="">
                        <div className="flex flex-row items-center mb-5 mx-2">
                            <div className="w-1/3">
                                <label className="block text-white text-left text-sm">
                                    Azonosító
                                </label>
                            </div>
                            <div className="w-2/3 flex flex-row justify-around">
                                <div className="w-full">
                                    <input
                                        className="bg-sky-900 appearance-none rounded w-full pl-1 leading-tight text-white"
                                        id="inline-full-name" type="text" value={selectedComponentInfo.displayName} disabled={true} readOnly />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row items-center mb-2 mx-2">
                            <div className="w-1/3">
                                <label className="block text-white text-left text-sm">
                                    Pozíció
                                </label>
                            </div>
                            <div className="w-2/3 flex flex-row justify-around">
                                <div className="w-14">
                                    <input
                                        className="bg-sky-900 appearance-none border-l-4 border-red-500 rounded w-full pl-1 leading-tight text-white"
                                        type="number"
                                        value={selectedComponentInfo.position.x}
                                        onChange={(e) => setSelectedObjectPosition(highlightedObjectId, 'x', parseFloat(e.target.value))}/>
                                </div>
                                <div className="w-14">
                                    <input
                                        className="bg-sky-900 appearance-none border-l-4 border-green-500 rounded w-full pl-1 leading-tight text-white"
                                        type="number"
                                        value={selectedComponentInfo.position.y}
                                        onChange={(e) => setSelectedObjectPosition(highlightedObjectId, 'y', parseFloat(e.target.value))}/>
                                </div>
                                <div className="w-14">
                                    <input
                                        className="bg-sky-900 appearance-none border-l-4 border-blue-500 rounded w-full pl-1 leading-tight text-white"
                                        type="number"
                                        value={selectedComponentInfo.position.z}
                                        onChange={(e) => setSelectedObjectPosition(highlightedObjectId, 'z', parseFloat(e.target.value))}/>
                                </div>
                            </div>
                        </div>
                    </form>
                ) : (
                    <h1>Nincs kiválasztott objektum</h1>
                )
            }
        </div>
    )
}