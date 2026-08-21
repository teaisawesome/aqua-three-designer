import Tile from './Tile'
import {listAssetDefinitions} from "@/domain/assets/catalog.mjs"

export default function PlantList() {
    const plants = listAssetDefinitions("plant")

    return(
        <div className={'grid grid-cols-2 gap-2 m-1'}>
            {
                plants.map((asset) => {
                    return (
                        <Tile
                            key={asset.id}
                            asset={asset}
                            className='w-full'/>
                    )
                })
            }
        </div>
    )
}
