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
            loadedAquariumId,
            components,
            lightColor,
            lightIntensity,
        } = body

        await connectToDatabase()

        // PLANTS
        const _components = components.reduce((acc, component) => {
            acc.push({
                id: component.id,
                assetType: component.assetType,
                assetId: component.assetId,
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

        const filter = { _id: loadedAquariumId, owner }

        const aquariumData = {
            owner,
            components: _components,
            light
        }

        await Aquarium.updateOne(
            filter,
            { $set : aquariumData },
            { new: true, upsert: true }
        )

        return NextResponse.json('sikeres mentés', { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Hiba történt" }, { status: 500 })
    }
}