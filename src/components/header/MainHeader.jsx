'use client'

import {Link} from '@/i18n/routing'
import LocalSwitcher from './LocaleSwitcher'
import { useState } from 'react'
import { useTranslations } from "next-intl";


const MainHeader = (props) => {
    const t = useTranslations('Navbar')
    const {locale} = props
    const [menuVisible, setMenuVisible] = useState(false)
    
    return (
        <header>
            <nav>
                { 
                    // * medium-large device header
                }
                <div className="md:fixed md:top-5 md:left-1/3 flex md:items-center md:justify-center bg-sky-800 md:w-max md:mx-auto md:py-4 md:px-5 md:rounded-full drop-shadow-lg">
                    <div className="hidden md:flex space-x-4">
                        <div className="flex items-center md:mr-3 md:justify-center font-semibold self-center">
                            <span>Aqua<b className="text-cyan-500">3D</b>esigner</span>
                        </div>
                        <Link className="self-center" href="/studio">{t('nav-create-new-layout')}</Link>
                        <Link className="self-center" href="/studio">link 2</Link>
                        <LocalSwitcher className="self-center"/>
                    </div>
                </div>
                { 
                    // * small device header
                }
                <div className="md:hidden p-5">
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex items-center self-center">
                            <span>Aqua<b className="text-cyan-500">3D</b>esigner</span>
                        </div>
                        <div className="flex flex-row items-center space-x-3">
                            <LocalSwitcher/>
                            <button
                                onClick={() => setMenuVisible(!menuVisible)}
                                className="text-white focus:outline-none"
                            >
                                <svg
                                className="w-6 h-6"
                                fill="none" stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d={menuVisible ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    {menuVisible && (
                        <div className="md:hidden mt-4 space-y-2 flex flex-col">
                            <Link href="/studio">Új akvárium létrehozása</Link>
                            <Link href="/studio">link 2</Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default MainHeader