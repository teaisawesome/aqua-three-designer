'use server'

import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";
import {redirect} from "next/navigation";
import Projects from "@/features/projects-page/Projects";

export default async function ProjectPage(props) {
    const session = await getServerSession(options)

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/hu/projects')
    }

    return (
        <div className={"flex items-center justify-center h-screen"}>
            <Projects/>
        </div>
    )
}