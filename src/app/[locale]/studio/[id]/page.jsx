'use server'

import StudioComponent  from '@/features/studio/components/StudioComponent.jsx'
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { options } from "@/app/api/auth/[...nextauth]/options";
import {getAquariumById} from "@/app/_lib/db/getAquariumById";

export default async function StudioPage({ params }) {
    const session = await getServerSession(options)

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/hu/studio')
    }

    try {
        const data = await getAquariumById(params.id, session.user.id)
        const aquarium = JSON.parse(JSON.stringify(data))

        return (
            <div className={"h-screen"}>
                <StudioComponent aquarium={aquarium}></StudioComponent>
            </div>
        )
    } catch (error) {
        return <div className="text-red-500">Hiba: {error.message}</div>
    }
}