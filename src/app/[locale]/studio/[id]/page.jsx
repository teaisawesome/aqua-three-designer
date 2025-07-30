'use server'

import StudioComponent  from '@/features/studio/components/StudioComponent.jsx'
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { options } from "@/app/api/auth/[...nextauth]/options";
import {getAquariumById} from "@/app/_lib/db/getAquariumById";

export default async function StudioPage({ params }) {
    const {id, locale} = await params
    const session = await getServerSession(options)

    if (!session) {
        redirect(`/api/auth/signin?callbackUrl=/${locale}/studio/${id}`)
    }

    let aquarium
    try {
        const data = await getAquariumById(id, session.user.id)
        aquarium = JSON.parse(JSON.stringify(data))
    } catch (error) {
        return <div className="text-red-500">Hiba: {error.message}</div>
    }

    return (
        <div className="h-screen">
            <StudioComponent aquarium={aquarium} />
        </div>
    )
}
