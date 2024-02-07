import "@/styles/globals.css"

import { Inter } from "next/font/google"
import MyThemeProvider from "@/providers/theme.provider"
import { Toaster } from "sonner"
import MySessionProvider from "@/providers/session.provider"
import { TRPCReactProvider } from "@/providers/trpc.provider"
import { Metadata, Viewport } from "next"
import { AutoHeightThread } from "@/providers/auto-height.thread"
import SocketThread from "@/providers/socket.thread"
import BgProvider from "@/providers/bg.provider"
import NavProvider from "@/providers/nav.provider"
import { prisma } from "@/server/db"
import { messageViewSelector } from "@/ds/message.base"
import { getServerUser } from "@/server/auth"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Lit Agent",
  description: "Developed by github@markshawn2020",
  icons: [{ rel: "Icon", url: "/favicon.ico" }],
}

// ref: https://nextjs.org/docs/app/building-your-application/upgrading/codemods#use-viewport-export
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const serverMessages = await prisma.message.findMany({
    ...messageViewSelector,
    orderBy: { createdAt: "desc" },
  })
  const user = await getServerUser()

  return (
    <html lang="zh" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable}`}>
        <main className={"relative w-screen"}>
          <MySessionProvider>
            <TRPCReactProvider>
              <MyThemeProvider>
                <BgProvider>
                  <NavProvider user={user}>
                    {children}

                    {user && (
                      <SocketThread
                        serverMessages={serverMessages}
                        user={user}
                      />
                    )}

                    <AutoHeightThread />

                    <Toaster
                      richColors
                      position={"top-right"}
                      duration={1000}
                    />
                  </NavProvider>
                </BgProvider>
              </MyThemeProvider>
            </TRPCReactProvider>
          </MySessionProvider>
        </main>
      </body>
    </html>
  )
}
