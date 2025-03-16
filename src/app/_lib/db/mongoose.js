'use server'

import mongoose from "mongoose"

const DATABASE_URL = process.env.MONGODB_URI

if (!DATABASE_URL) {
    throw new Error("No database connection provided in .env file")
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: process.env.MONGODB_DATABASE,
        }).then((mongoose) => {
            return mongoose
        }).catch(err => {
            console.error("Mongo database connection error:", err)
        })
    }
    cached.conn = await cached.promise
    return cached.conn
}

export default connectToDatabase