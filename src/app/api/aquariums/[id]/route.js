'use server'

import { NextResponse } from "next/server"
import connectToDatabase from "@/app/_lib/db/mongoose"
import { Aquarium } from "@/app/_lib/models/Aquarium";
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";
import mongoose from "mongoose";

export async function GET(req, { params }) {
    const session = await getServerSession(options)

    if (!session) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const id = params.id

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ error: "Not a valid id" }, { status: 400 });
    }

    const owner = session.user.id

    try {
        await connectToDatabase()

        const aquarium = await Aquarium.findOne({ _id: id, owner: owner })

        if(!aquarium) {
            return NextResponse.json({ error: "Not found" }, { status: 404 })
        }

        return NextResponse.json(aquarium, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Hiba történt" }, { status: 500 })
    }
}