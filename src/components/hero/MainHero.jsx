export default function MainHero({...params}) {
    return (
        <>
            <div className="flex justify-center items-center h-screen bg-[url('/img/main-hero-img.jpg')] bg-cover">
                <div className="w-4/5 md:w-1/2 text-center">
                    <h1 className="text-3xl md:text-5xl">Section Title</h1>
                    <p className="text-base md:text-lg mt-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, porro totam!</p>
                    <div className="flex justify-center space-x-4 mt-5">
                        <button className="text-base bg-blue-900 hover:bg-blue-700 text-slate-100 px-5 py-2 rounded-md">Get Started</button>
                        <button className="text-base bg-blue-900 hover:bg-blue-700 text-slate-100 px-5 py-2 rounded-md">Learn More</button>
                    </div>
                </div>
            </div>
        </>
    )
}