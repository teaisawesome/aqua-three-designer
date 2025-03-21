'use server'

import { NextResponse } from "next/server"
import connectToDatabase from "@/app/_lib/db/mongoose"
import { Aquarium } from "@/app/_lib/models/Aquarium";
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";

export async function POST(req) {
    const session = await getServerSession(options)

    if (!session) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const owner = session.user.id

    try {
        const body = await req.json()
        const {
            usedComponents,
            lightColor,
            lightIntensity,
        } = body

        await connectToDatabase()

        // PLANTS
        const plants = usedComponents.reduce((acc, component) => {
            acc.push({
                id: component.id,
                componentId: component.componentId,
                displayName: component.displayName,
                locked: component.locked,
                position: component.position,
                rotation: component.rotation,
                scale: component.scale,
                objectReference: component.objectReference
            })
            return acc
        }, [])

        // LIGHT
        const light = {
            lightColor,
            lightIntensity
        }

        const aquariumData = {
            owner,
            plants,
            light
        }

        await Aquarium.updateOne(
            {owner},
            { $set : aquariumData },
            { new: true, upsert: true }
        )

        return NextResponse.json('sikeres mentés', { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Hiba történt" }, { status: 500 })
    }
}