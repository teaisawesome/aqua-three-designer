import StudioComponent  from '@/features/studio/components/StudioComponent.jsx'
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { options } from "@/app/api/auth/[...nextauth]/options";

export default async function Studio() {
    const session = await getServerSession(options)
    console.log("SESSION ON SERVER:", session); // 🔹 Debug

    if (!session) {
        console.log("🔴 No session found, redirecting...");
        //redirect('/api/auth/signin?callbackUrl=/hu/studio')
    }

    return (
        <>
            <StudioComponent></StudioComponent>
        </>
    )
}