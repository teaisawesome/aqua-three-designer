'use server'

import { NextResponse } from "next/server"
import connectToDatabase from "@/app/_lib/db/mongoose"
import { Aquarium } from "@/app/_lib/models/Aquarium";
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";

export async function GET(req) {
    const session = await getServerSession(options)

    if (!session) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const owner = session.user.id

    try {
        await connectToDatabase()

        const aquariums = await Aquarium.find({ owner: owner })

        if(Array.isArray(aquariums) && aquariums.length === 0) {
            return NextResponse.json({ message: "Aquariums data not found" }, { status: 404 })
        }

        return NextResponse.json(aquariums, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Hiba történt" }, { status: 500 })
    }
}