import Tile from './Tile'

export default function PlantList() {
    const t = [
        {
            title: 'Micranthemum sp. Monte Carlo'
        },
        {
            title: 'Rotala Vietnam Hra'
        },
        {
            title: 'Anubias Nana Petite'
        }
    ]

    return(
        <div className={'grid grid-cols-2 gap-2 m-1'}>
            {
                t.map((t, index) => {
                    return (
                        <Tile key={index} title={t.title} className='w-full'/>
                    )
                })
            }
        </div>
    )
}