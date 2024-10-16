export default function MainHero({...params}) {
    return (
        <>
            <div className="flex justify-center items-center h-screen bg-[url('/img/main-hero-img.jpg')] bg-cover">
                <div className="w-1/2 text-center">
                    <h1 className="text-5xl">Section Title</h1>
                    <p className="text-lg mt-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, porro totam! Alias incidunt, doloribus a est vitae non sed reiciendis error, sit dignissimos in consequatur porro dolorum ullam amet tempore.</p>
                    <div className="flex justify-center space-x-4 mt-5">
                        <button className="bg-blue-900 hover:bg-blue-700 text-slate-100 px-5 py-2 rounded-md">Get Started</button>
                        <button className="bg-blue-900 hover:bg-blue-700 text-slate-100 px-5 py-2 rounded-md">Learn More</button>
                    </div>
                </div>
            </div>
        </>
    )
}