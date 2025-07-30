import MainCanvas from "@/features/studio/components/MainCanvas";
import FooterOnMobile from "@/features/studio/components/FooterOnMobile";
import MobileToolbar from "@/features/studio/components/toolbar/mobile/MobileToolbar";
import useStudioStore from "@/features/studio/stores/useStudioStore";
import { AnimatePresence } from "framer-motion";

export default function MobileLayout(props) {
    const isMobileToolbarActive = useStudioStore((state) => state.isMobileToolbarActive)

    return (
        <div className={"h-screen w-full overflow-hidden"}>
            <MainCanvas isMobile={true}/>
            <AnimatePresence>
                {isMobileToolbarActive && <MobileToolbar/>}
            </AnimatePresence>
            <FooterOnMobile/>
        </div>
    )
}