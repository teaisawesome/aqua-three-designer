import {Box} from "lucide-react";
import useStudioStore from "@/features/studio/stores/useStudioStore";

export default function NewObjectButton() {
    const setIsMobileToolbarActive = useStudioStore((state) => state.setIsMobileToolbarActive)

    return (
        <div className={'absolute bottom-55 right-4'}>
            <button
                className={"flex flex-row rounded-full border shadow-lg p-5 bg-sky-900/50 backdrop-blur-sm active:scale-95 transition duration-150 ease-in-out" }
                onClick={() => setIsMobileToolbarActive(true)}
            >
                <Box className={"size-10"}></Box>
            </button>
        </div>
    )
}