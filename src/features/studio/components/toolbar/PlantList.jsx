import Tile from './Tile'

export default function PlantList() {
    const t = [
        {
            title: 'Micranthemum sp. Monte Carlo',
            assetType: 'plant',
            assetId: 'cube'
        },
        {
            title: 'Rotala Vietnam Hra',
            assetType: 'plant',
            assetId: 'redcube'
        },
    ]

    return(
        <div className={'grid grid-cols-2 gap-2 m-1'}>
            {
                t.map((t, index) => {
                    return (
                        <Tile
                            key={index}
                            title={t.title}
                            assetType={t.assetType}
                            assetId={t.assetId}
                            className='w-full'/>
                    )
                })
            }
        </div>
    )
}