import { NextResponse } from "next/server"

export async function GET() {
    try {
        return NextResponse.json('hello user', { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Hiba történt" }, { status: 500 })
    }
}