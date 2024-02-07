import "@/styles/globals.css"

import { Inter } from "next/font/google"
import MyThemeProvider from "@/providers/theme"
import { Toaster } from "sonner"
import MySessionProvider from "@/providers/session"
import { TRPCReactProvider } from "@/providers/trpc"
import { Metadata, Viewport } from "next"
import { AppAutoMobileHeightProvider } from "@/providers/app-auto-mobile-height-provider"
import SocketProvider from "@/providers/socket"
import BgProvider from "@/providers/bg"

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
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable}`}>
        <MySessionProvider>
          <TRPCReactProvider>
            <SocketProvider>
              <MyThemeProvider>
                <AppAutoMobileHeightProvider>
                  <main className={"relative w-screen"}>
                    <BgProvider>{children}</BgProvider>

                    <Toaster
                      richColors
                      position={"top-right"}
                      duration={1000}
                    />
                  </main>
                </AppAutoMobileHeightProvider>
              </MyThemeProvider>
            </SocketProvider>
          </TRPCReactProvider>
        </MySessionProvider>
      </body>
    </html>
  )
}
