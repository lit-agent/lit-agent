import "@/styles/globals.css"

import { Inter } from "next/font/google"
import MyThemeProvider from "@/components/theme.provider"
import { Toaster } from "sonner"
import MySessionProvider from "@/components/session.provider"
import { TRPCReactProvider } from "@/components/trpc.provider"
import { Metadata, Viewport } from "next"
import { AutoHeightThread } from "@/components/auto-height.thread"
import SocketThread from "@/components/socket.thread"
import BgProvider from "@/components/bg.provider"
import NavProvider from "@/components/nav.provider"
import { prisma } from "@/lib/db"
import { messageViewSelector } from "@/schema/message.base"
import { getServerUser } from "@/lib/auth"

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

  return (
    <html lang="zh" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable}`}>
        <main className={"relative w-screen"}>
          <MySessionProvider>
            <TRPCReactProvider>
              <MyThemeProvider>
                <BgProvider>
                  <NavProvider>
                    {children}

                    <SocketThread serverMessages={serverMessages} />

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
