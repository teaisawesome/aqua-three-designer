import {Info} from "lucide-react";

export default function InfoPanel(props) {
    return (
        <div className={'absolute top-4 left-4'}>
            <div className={'bg-sky-800 rounded-xl p-3 flex flex-row gap-4'}>
                <Info/> Még nem csinál semmit
            </div>
        </div>
    )
}