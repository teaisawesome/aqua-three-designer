import PlantList from "./PlantList";
import { Leaf, Mountain, Sun, Waves } from 'lucide-react'

export default function Toolbar() {
    return (
        <aside className={"bg-cyan-800 text-black w-1/6 md:block h-full overflow-hidden"}>
            <div className={"flex flex-row justify-around p-1 m-1 bg-sky-950 text-white rounded-lg"}>
                <Waves scale={20} className={"hover:text-green-400 cursor-pointer"}/>
                <Mountain scale={20} className={"hover:text-green-400 cursor-pointer"}/>
                <Leaf scale={20} className={"hover:text-green-400 cursor-pointer"}/>
                <Sun scale={20} className={"hover:text-green-400 cursor-pointer"}/>
            </div>
            <div className={"flex flex-row justify-around p-1 m-1 bg-sky-950 text-white rounded-lg"}>
                <PlantList></PlantList>
            </div>
        </aside>
    )
}