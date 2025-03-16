'use server'

import {getSignupSchema} from "@/app/_lib/validationSchema";
import connectToDatabase from "@/app/_lib/db/mongoose";
import {User} from "@/app/_lib/models/User";
import bcrypt from "bcryptjs";

export async function signup(formData) {
    const locale = formData.get("locale") || "en"
    const schema = getSignupSchema(locale)

    // Convert FormData to an object
    const userData = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    }

    const validationResult = schema.safeParse(userData)
    if (!validationResult.success) {
        return { error: validationResult.error.format() }
    }

    try {
        // 🔹 Mentsd el az adatokat az adatbázisba (példa Prisma-val)
        await connectToDatabase()

        const existingUser = await User.findOne({ email: userData.email })

        if (existingUser) {
            console.log("User already exists")
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10)

        const newUser = new User({
            name: userData.name,
            email: userData.email,
            password: hashedPassword
        });

        await newUser.save()

        console.log("MENTÉS!")

        return { success: true };
    } catch (error) {
        console.error("Database error:", error);
        return { error: "Database error" };
    }
}