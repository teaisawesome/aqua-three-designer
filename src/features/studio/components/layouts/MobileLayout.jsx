import MainCanvas from "@/features/studio/components/MainCanvas";
import FooterOnMobile from "@/features/studio/components/FooterOnMobile";

export default function MobileLayout(props) {
    return (
        <div className={"h-screen w-full"}>
            <MainCanvas isMobile={true}/>
            <FooterOnMobile/>
        </div>
    )
}