import CredentialsProvider from 'next-auth/providers/credentials'
import connectToDatabase from "@/app/_lib/db/mongoose";
import {User} from "@/app/_lib/models/User";
import bcrypt from "bcryptjs";

export const options = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email:",
                    type: "email",
                    placeholder: "your-cool-email"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "your-awesome-password"
                }
            },
            async authorize(credentials) {
                try {
                    await connectToDatabase()

                    const user = await User.findOne({ email: credentials.email })

                    if(!user) return null

                    const isValid = await bcrypt.compare(credentials.password, user.password)

                    if(credentials?.email === user.email && isValid) {
                        return { id: user._id.toString(), name: user.name, email: user.email };
                    } else {
                        return null
                    }
                } catch(e) {
                    console.log("authorize error", e)
                }
            }
        })
    ],
    session: {
        strategy: "jwt", // JWT alapú session kezelés
        maxAge: 30 * 24 * 60 * 60, // 30 napig érvényes session
        updateAge: 24 * 60 * 60 // Naponta frissíti a JWT-t
    },
    callbacks: {
        async jwt({ token, user }) {
            if(user) {
                token.id = user.id
                token.name = user.name
                token.email = user.email
            }
            return token
        },
        async session({ session, token }) {
            session.user.id = token.id
            session.user.name = token.name
            session.user.email = token.email
            return session
        }
    },
    cookies: {
        sessionToken: {
            name: `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: '/',
                secure: false,
            }
        }
    },
    secret: process.env.NEXTAUTH_SECRET
}