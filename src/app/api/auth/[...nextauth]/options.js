import CredentialsProvider from 'next-auth/providers/credentials'

export const options = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "your-cool-username"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "your-awesome-password"
                }
            },
            async authorize(credentials) {
                const user = { id: "42", name: "Dave", password: "nextauth" }

                if (credentials?.username === user.name && credentials?.password === user.password) {
                    return { id: user.id, name: user.name };
                } else {
                    return null
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
            if (user) {
                token.id = user.id; // Felhasználó ID mentése a tokenbe
                token.name = user.name; // Név mentése a tokenbe
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.name = token.name;
            return session;
        }
    },
    cookies: {
        sessionToken: {
            name: `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                secure: false, // 🔹 Productionben secure, developmentben nem
            }
        }
    },
    secret: process.env.NEXTAUTH_SECRET
}