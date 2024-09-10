'use client'

import React, { useTransition, onClick } from "react";
import Select from 'react-select'
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Image from "next/image";

const options = [
    { value: 'hu', label: 'Magyar', icon: '/country-flags/flag_of_hungary.svg' },
    { value: 'en', label: 'English', icon: '/country-flags/flag_of_the_united_kingdom.svg' }
];

export default function LocalSwitcher({ className, ...props}) {
    const t = useTranslations('Navbar')
    const [isPending, startTransition] = useTransition();
    const router = useRouter()
    const localActive = useLocale()

    const toggleLocale = function() {
        const nextLocale = localActive === 'hu' ? 'en' : 'hu'
        startTransition(() => {
            router.push(`/${nextLocale}`);
        })
    }

    return (
        <div className={className}>
            <button onClick={toggleLocale} className="text-cyan-500 font-semibold">
                {localActive === 'hu' ? 'en' : 'hu'}
            </button>
        </div>
    )
}