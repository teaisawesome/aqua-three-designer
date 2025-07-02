import Properties from "@/features/studio/components/preferencebar/properties/Properties"

export default function FooterOnMobile() {
    return (
        <div
            className={"w-full h-48 absolute bottom-0 left-0 bg-black/40 rounded-t-xl backdrop-blur-sm"}>
            footer
            <Properties isMobile={true} />
        </div>
    )
}