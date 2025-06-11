import useStudioStore from "@/features/studio/stores/useStudioStore";

export default function LightControlPanel({className}) {
    const lightColor = useStudioStore((state) => state.lightColor)
    const setLightColor = useStudioStore((state) => state.setLightColor)
    const lightIntensity = useStudioStore((state) => state.lightIntensity)
    const setLightIntensity = useStudioStore((state) => state.setLightIntensity)

    const handleRgbInputChange = (colorType, value) => {
        switch (colorType) {
            case "r":
                setLightColor({ r: value , g: lightColor.g, b: lightColor.b });
                break;
            case "g":
                setLightColor({ r: lightColor.r , g: value, b: lightColor.b });
                break;
            case "b":
                setLightColor({ r: lightColor.r , g: lightColor.g, b: value });
                break;
            default:
                console.log(`Sorry.`);
        }
    }

    return (
        <div className={`${className} absolute top-20 left-4 bg-sky-800 p-3 rounded-xl color-white`}>
            <label>R: <input type="range" min="0" max="255" value={lightColor.r} onChange={(e) => handleRgbInputChange('r', +e.target.value) } /></label><br />
            <label>G: <input type="range" min="0" max="255" value={lightColor.g} onChange={(e) => handleRgbInputChange('g', +e.target.value) } /></label><br />
            <label>B: <input type="range" min="0" max="255" value={lightColor.b} onChange={(e) => handleRgbInputChange('b', +e.target.value) } /></label><br />
            <label>Intensity: <input type="range" min="0" max="5" step="0.1" value={lightIntensity} onChange={(e) => setLightIntensity(+e.target.value) } /></label>
        </div>
    )
}