'use server'

import {getSignupSchema} from "@/app/_lib/validationSchema";
import connectToDatabase from "@/app/_lib/db/mongoose";
import {User} from "@/app/_lib/models/User";
import bcrypt from "bcryptjs";
import {validationMessages} from "@/app/_lib/validationMessages";

export async function signup(formData) {
    const locale = formData.get("locale") || "hu"
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
        await connectToDatabase()

        const existingUser = await User.findOne({ email: userData.email })

        if (existingUser) {
            const messages = validationMessages[locale]
            return { error: { email: { _errors: [messages.email_exists] } } }
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