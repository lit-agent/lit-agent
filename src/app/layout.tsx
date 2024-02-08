import "@/styles/globals.css"

import { Inter } from "next/font/google"
import MyThemeProvider from "@/app/providers/theme.provider"
import { Toaster } from "sonner"
import { TRPCReactProvider } from "@/app/providers/trpc.provider"
import { Metadata, Viewport } from "next"
import { AutoHeightThread } from "@/components/auto-height.thread"
import MessagesProvider from "@/app/providers/messages.provider"
import BgProvider from "@/app/providers/bg.provider"
import NavProvider from "@/app/providers/nav.provider"
import StableSessionProvider from "./providers/session.provider"

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
  return (
    <StableSessionProvider>
      <TRPCReactProvider>
        <html lang="zh" suppressHydrationWarning>
          <body className={`font-sans ${inter.variable}`}>
            <main className={"relative w-screen"}>
              <MyThemeProvider>
                <BgProvider>
                  <NavProvider>
                    {children}

                    <MessagesProvider />

                    <AutoHeightThread />

                    <Toaster
                      richColors
                      position={"top-right"}
                      duration={1000}
                    />
                  </NavProvider>
                </BgProvider>
              </MyThemeProvider>
            </main>
          </body>
        </html>
      </TRPCReactProvider>
    </StableSessionProvider>
  )
}
