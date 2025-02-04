import Tile from './Tile'

export default function PlantList() {
    const t = [
        {
            title: 'Plant 1'
        },
        {
            title: 'Plant 2'
        },
        {
            title: 'Plant 3'
        }
    ]

    return(
        <>
            {
                t.map((t, index) => {
                    return<Tile key={index} title={t.title} className='mb-3'/>
                })
            }
        </>
    )
}