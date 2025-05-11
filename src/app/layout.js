import "./globals.css"

export const metadata = {
    title: "Aqua3Designer",
    description: "Next gen 3d aquarium layout editor",
};

export default async function RootLayout({ children }) {
    return (
        <html suppressHydrationWarning>
            <body>{children}</body>
        </html>
    )
}