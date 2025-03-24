'use server'

import StudioComponent  from '@/features/studio/components/StudioComponent.jsx'
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { options } from "@/app/api/auth/[...nextauth]/options";

export default async function StudioPage() {
    const session = await getServerSession(options)

    console.log("session", session)

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/hu/studio')
    }

    return (
        <>
            <header className={"bg-blue-500 text-white"}>Menüsáv
                logged in: {session.user.name}
            </header>
            <StudioComponent></StudioComponent>
        </>
    )
}