import useStudioStore from "@/features/studio/stores/useStudioStore";
import TransformTypeInput from "@/features/studio/components/preferencebar/properties/inputs/TransformTypeInput";

export default function Properties({ isMobile = false}) {
    const components = useStudioStore((state) => state.components)
    const highlightedObjectId = useStudioStore((state) => state.highlightedObjectId)
    const selectedComponentInfo = components.find((c) => c.id === highlightedObjectId)
    const setSelectedObjectTransform = useStudioStore((state) => state.setSelectedObjectTransform)
    const transformControlMode = useStudioStore((state) => state.transformControlMode)

    const transformTypeFromMode = (mode) => {
        switch (mode) {
            case 'translate':
                return 'position';
            case 'rotate':
                return 'rotation';
            case 'scale':
                return 'scale';
            default:
                return 'position';
        }
    };

    const transformType = transformTypeFromMode(transformControlMode);

    return isMobile ? (
                <div className={"w-full"}>
                    {
                        highlightedObjectId ? (
                            <div>
                                <div className="flex flex-row items-center justify-center mb-2 mx-2 bg-yellow-200">
                                    <div className="flex flex-row space-x-3.5">
                                        <div className="w-1/3">
                                            <TransformTypeInput
                                                value={selectedComponentInfo[transformType].x}
                                                transformType
                                                coordinateType={"x"}
                                                onCommit={(val) => setSelectedObjectTransform(highlightedObjectId, transformType, 'x', val)}
                                            />
                                        </div>
                                        <div className="w-1/3">
                                            <TransformTypeInput
                                                value={selectedComponentInfo[transformType].y}
                                                transformType
                                                coordinateType={"y"}
                                                onCommit={(val) => setSelectedObjectTransform(highlightedObjectId, transformType, 'y', val)}
                                            />
                                        </div>
                                        <div className="w-1/3">
                                            <TransformTypeInput
                                                value={selectedComponentInfo[transformType].z}
                                                transformType
                                                coordinateType={"z"}
                                                onCommit={(val) => setSelectedObjectTransform(highlightedObjectId, transformType, 'x', val)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <h1>Nincs kiválasztott objektum</h1>
                        )
                    }
                </div>
            ) : (
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
                                                onChange={(e) =>
                                                    setSelectedObjectTransform(highlightedObjectId, 'position', 'x', parseFloat(e.target.value))}/>
                                        </div>
                                        <div className="w-14">
                                            <input
                                                className="bg-sky-900 appearance-none border-l-4 border-green-500 rounded w-full pl-1 leading-tight text-white text-sm"
                                                type="number"
                                                value={selectedComponentInfo.position.y}
                                                onChange={(e) =>
                                                    setSelectedObjectTransform(highlightedObjectId, 'position', 'y', parseFloat(e.target.value))}/>
                                        </div>
                                        <div className="w-14">
                                            <input
                                                className="bg-sky-900 appearance-none border-l-4 border-blue-500 rounded w-full pl-1 leading-tight text-white"
                                                type="number"
                                                value={selectedComponentInfo.position.z}
                                                onChange={(e) =>
                                                    setSelectedObjectTransform(highlightedObjectId, 'position', 'z', parseFloat(e.target.value))}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center mb-2 mx-2">
                                    <div className="w-1/3">
                                        <label className="block text-white text-left text-sm">
                                            Forgatás
                                        </label>
                                    </div>
                                    <div className="w-2/3 flex flex-row justify-around">
                                        <div className="w-14">
                                            <input
                                                className="bg-sky-900 appearance-none border-l-4 border-red-500 rounded w-full pl-1 leading-tight text-white"
                                                type="number"
                                                value={selectedComponentInfo.rotation.x}
                                                onChange={(e) =>
                                                    setSelectedObjectTransform(highlightedObjectId, 'rotation', 'x', parseFloat(e.target.value))}/>
                                        </div>
                                        <div className="w-14">
                                            <input
                                                className="bg-sky-900 appearance-none border-l-4 border-green-500 rounded w-full pl-1 leading-tight text-white text-sm"
                                                type="number"
                                                value={selectedComponentInfo.rotation.y}
                                                onChange={(e) =>
                                                    setSelectedObjectTransform(highlightedObjectId, 'rotation', 'y', parseFloat(e.target.value))}/>
                                        </div>
                                        <div className="w-14">
                                            <input
                                                className="bg-sky-900 appearance-none border-l-4 border-blue-500 rounded w-full pl-1 leading-tight text-white"
                                                type="number"
                                                value={selectedComponentInfo.rotation.z}
                                                onChange={(e) =>
                                                    setSelectedObjectTransform(highlightedObjectId, 'rotation', 'z', parseFloat(e.target.value))}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center mb-2 mx-2">
                                    <div className="w-1/3">
                                        <label className="block text-white text-left text-sm">
                                            Méretezés
                                        </label>
                                    </div>
                                    <div className="w-2/3 flex flex-row justify-around">
                                        <div className="w-14">
                                            <input
                                                className="bg-sky-900 appearance-none border-l-4 border-red-500 rounded w-full pl-1 leading-tight text-white"
                                                type="number"
                                                value={selectedComponentInfo.scale.x}
                                                onChange={(e) =>
                                                    setSelectedObjectTransform(highlightedObjectId, 'scale', 'x', parseFloat(e.target.value))}/>
                                        </div>
                                        <div className="w-14">
                                            <input
                                                className="bg-sky-900 appearance-none border-l-4 border-green-500 rounded w-full pl-1 leading-tight text-white text-sm"
                                                type="number"
                                                value={selectedComponentInfo.scale.y}
                                                onChange={(e) =>
                                                    setSelectedObjectTransform(highlightedObjectId, 'scale', 'y', parseFloat(e.target.value))}/>
                                        </div>
                                        <div className="w-14">
                                            <input
                                                className="bg-sky-900 appearance-none border-l-4 border-blue-500 rounded w-full pl-1 leading-tight text-white"
                                                type="number"
                                                value={selectedComponentInfo.scale.z}
                                                onChange={(e) =>
                                                    setSelectedObjectTransform(highlightedObjectId, 'scale', 'z', parseFloat(e.target.value))}/>
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