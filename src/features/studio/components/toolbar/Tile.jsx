import Image from 'next/image'
import {useState} from "react";
import { Plus } from 'lucide-react'
import useStudioStore from "@/features/studio/stores/useStudioStore";

export default function Tile({className, ...props}) {
    const usedComponents = useStudioStore((state) => state.usedComponents)
    const addUsedComponent = useStudioStore((state) =>
        state.addUsedComponent)
    const {title} = props
    const [showAddSign, setShowAddSign] = useState(false)
    const [xPosition, setXPosition] = useState(0)

    function addPlant(){
        console.log('X:', xPosition)
        addUsedComponent({
            componentId: 'cube',
            scale: 0.5,
            position: {
                x: xPosition,
                y: 0,
                z: 0
            }
        })
    }

    return (
        <>
        <div className={`${className} ${showAddSign ? "bg-amber-700" : "bg-sky-800"} relative rounded-md p-1 w-20 h-13 cursor-pointer`}
             onMouseEnter={() => setShowAddSign(true)}
             onMouseLeave={() => setShowAddSign(false)}
             onClick={() => addPlant()}
        >
            <div className={`absolute inset-0 flex items-center justify-center
             bg-black/30 backdrop-blur-0 transition-opacity duration-300 ${showAddSign ? "opacity-100" : "opacity-0"}`}>
                <Plus scale={20} className="text-white"/>
            </div>
            <div>
                <Image src='/img/anubias-barteli-tile-img.jpg' alt={title} width={200} height={200} style={{objectFit: "contain"}}/>
            </div>
            <div className={'text-center leading-none'}>
                <span className='text-tile-size'>{title}</span>
            </div>
        </div>
        <input className={'text-black'} type="text" value={xPosition} id='xPosition' onChange={e => setXPosition(+(e.target.value))}/>
        </>
    )
}