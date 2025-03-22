import SceneItem from "@/features/studio/components/preferencebar/scenehierarchy/SceneItem";
import useStudioStore from "@/features/studio/stores/useStudioStore";

export default function SceneHierarchy(props) {
    const components = useStudioStore((state) => state.components)

    return (
        <div className={'flex flex-col h-full text-white'}>
            <h1 className={"font-bold my-1"}>Scene Hierarchy</h1>
            <div className={"flex flex-col p-1 scrollbar scrollbar-thumb-sky-50  scrollbar-track-sky-800 h-full overflow-y-auto"}>
                {components.map((compItem, i) =>
                    <SceneItem key={i} item={compItem}/>
                )}
            </div>
        </div>
    )
}