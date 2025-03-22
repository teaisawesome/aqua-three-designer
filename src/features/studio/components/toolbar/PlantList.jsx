import Tile from './Tile'

export default function PlantList() {
    const t = [
        {
            title: 'Micranthemum sp. Monte Carlo',
            type: 'cube'
        },
        {
            title: 'Rotala Vietnam Hra',
            type: 'redcube'
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
                            componentType={t.type}
                            className='w-full'/>
                    )
                })
            }
        </div>
    )
}