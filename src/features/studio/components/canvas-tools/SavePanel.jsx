import {Save} from "lucide-react";
import useStudioStore from "@/features/studio/stores/useStudioStore";

export default function SavePanel(props) {
    const loadedAquariumId = useStudioStore((state) => state.loadedAquariumId)
    const components = useStudioStore((state) => state.components)
    const lightColor = useStudioStore((state) => state.lightColor)
    const lightIntensity = useStudioStore((state) => state.lightIntensity)

    const handleSave = () => {
        fetch("/api/aquariums/save", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                loadedAquariumId,
                components,
                lightColor,
                lightIntensity
            })
        }).then(res => res.json()).then(data => console.log(data))
    }

    return (
        <div className={'absolute top-4 left-4'}>
            <div
                className={'bg-sky-800 rounded-xl p-3 flex flex-row gap-4 text-white'}
                onClick={() => handleSave()}
            >
                <Save/>
            </div>
        </div>
    )
}