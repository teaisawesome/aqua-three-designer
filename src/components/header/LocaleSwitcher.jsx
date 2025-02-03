'use client'

import React, { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

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
                {localActive}
            </button>
        </div>
    )
}