import SceneHierarchy from "@/features/studio/components/preferencebar/scenehierarchy/SceneHierarchy";
import Properties from "@/features/studio/components/preferencebar/properties/Properties"

export default function PreferenceBar({...props}) {
    return (
        <aside className={"flex flex-col w-1/6 rounded-2xl shadow-lg m-3 md:block border border-white/30 text-center"}>
            <div className={"h-1/2 w-full bg-sky-800 backdrop-blur-md rounded-t-2xl"}>
                <SceneHierarchy />
            </div>
            <div className={"h-1/2 w-full bg-sky-700 backdrop-blur-md rounded-b-2xl"}>
                <Properties />
            </div>
        </aside>
    )
}