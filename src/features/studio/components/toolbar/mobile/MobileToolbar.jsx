import {Leaf, Mountain, Sun, Waves, ChevronDown} from "lucide-react";
import useStudioStore from "@/features/studio/stores/useStudioStore";
import {motion} from "framer-motion";
import PlantList from "@/features/studio/components/toolbar/PlantList";

export default function MobileToolbar() {
    const setIsMobileToolbarActive = useStudioStore((state) => state.setIsMobileToolbarActive)

    return (
        <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={
                "fixed bottom-0 left-0 w-full h-1/2 z-10 " +
                "rounded-t-2xl bg-sky-900/50 backdrop-blur-sm overflow-hidden"
            }
        >
            <div className={"flex flex-row justify-around mx-auto mt-3 w-1/2 p-3 bg-sky-950 text-white rounded-xl"}>
                <Waves scale={20} className={"hover:text-green-400 cursor-pointer"}/>
                <Mountain scale={20} className={"hover:text-green-400 cursor-pointer"}/>
                <Leaf scale={20} className={"hover:text-green-400 cursor-pointer"}/>
                <Sun scale={20} className={"hover:text-green-400 cursor-pointer"}/>
            </div>
            <ChevronDown
                className={"absolute top-5 right-5 w-8 h-8  text-white hover:text-sky-950  cursor-pointer"}
                onClick={() => setIsMobileToolbarActive(false)}
            />
            <div className={"flex flex-row justify-around p-1 m-1 bg-sky-950 text-white rounded-lg"}>
                <PlantList></PlantList>
            </div>
        </motion.div>
    )
}