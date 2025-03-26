import connectToDatabase from "@/app/_lib/db/mongoose";
import {Aquarium} from "@/app/_lib/models/Aquarium";
import mongoose from "mongoose";

export async function getAquariumById(id, owner) {
    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(owner)) {
        throw new Error('Invalid id')
    }

    await connectToDatabase()

    const aquarium = await Aquarium.findOne({ _id: id, owner })

    if(!aquarium) {
        throw new Error('Not found aquarium')
    }

    return aquarium
}