import Image from 'next/image'

export default function Tile({className, ...props}) {
    const {title} = props

    return(
        <div className={`${className} border-2 border-indigo-600 w-12 h-13`}>
            <div>
                <Image src='/img/anubias-barteli-tile-img.jpg' alt={title} width={200} height={200} style={{objectFit: "contain"}}/>
            </div>
            <span className='text-tile-size'>
                {title}
            </span>
        </div>
    )
}