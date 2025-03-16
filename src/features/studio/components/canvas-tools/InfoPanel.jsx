import {Info} from "lucide-react"

export default function InfoPanel(props) {
    return (
        <div className={'absolute bottom-4 left-4'}>
            <div className={'bg-sky-800 rounded-xl p-3 flex flex-row gap-4 text-white'}>
                <Info/> Még nem csinál semmit
            </div>
        </div>
    )
}