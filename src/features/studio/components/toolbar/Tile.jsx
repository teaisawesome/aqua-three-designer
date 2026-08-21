import Image from 'next/image'
import {useState} from "react";
import { Plus } from 'lucide-react'
import useStudioStore from "@/features/studio/stores/useStudioStore";
import {MathUtils} from "three";

export default function Tile({className, ...props}) {
    const components = useStudioStore((state) => state.components)
    const index = useStudioStore((state) => state.index)
    const addComponent = useStudioStore((state) =>
        state.addComponent)
    const incrementIndex = useStudioStore((state) => state.incrementIndex)

    const {asset} = props
    const [showAddSign, setShowAddSign] = useState(false)
    const [xPosition, setXPosition] = useState(0)

    function addPlant(){
        const currentIndexString = index.toString()
        const uniqueId = MathUtils.generateUUID()

        addComponent({
            id: uniqueId,
            assetId: asset.id,
            assetVersion: asset.version,
            kind: asset.kind,
            name: `${currentIndexString.padStart(3, '0')}_${asset.displayName}`,
            locked: false,
            position: { x: xPosition, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 0.1, y: 0.1, z: 0.1 }
        })

        incrementIndex()
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
            {
                //<div>
                //<Image src='/img/anubias-barteli-tile-img.jpg' alt={title} width={200} height={200} style={{objectFit: "contain"}}/>
                //</div>
            }
            <div className={'text-center leading-none'}>
                <span className='text-tile-size'>{asset.displayName}</span>
            </div>
        </div>
        <input className={'text-yellow-400 bg-sky-800 p-3 rounded-lg'} type="number" step="0.1" value={xPosition} id='xPosition' onChange={e => setXPosition(parseFloat(e.target.value))}/>
        </>
    )
}
