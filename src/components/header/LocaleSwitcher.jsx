'use client'

import React, { useTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

export default function LocalSwitcher({ className }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter()
    const pathname = usePathname()
    const localActive = useLocale()

    const toggleLocale = function() {
        const nextLocale = localActive === 'hu' ? 'en' : 'hu'
        startTransition(() => {
            router.replace(pathname, {locale: nextLocale});
        })
    }

    return (
        <div className={className}>
            <button onClick={toggleLocale} disabled={isPending} className="text-cyan-500 font-semibold">
                {localActive}
            </button>
        </div>
    )
}
