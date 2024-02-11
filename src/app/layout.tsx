import "@/styles/globals.css"

import { Inter } from "next/font/google"
import MyThemeProvider from "@/providers/theme.provider"
import { Toaster } from "sonner"
import { TRPCReactProvider } from "@/providers/trpc.provider"
import { Metadata, Viewport } from "next"
import BgProvider from "@/providers/bg.provider"
import StableSessionProvider from "@/providers/session.provider"
import { Suspense } from "react"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Lit Agent",
  description: "Developed by github@markshawn2020",
  icons: [{ rel: "Icon", url: "/favicon.ico" }],
}
// <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />

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
          <head>
            {/* todo: 这个不能开，开了之后本地的服务资源就都挂了 */}
            {/*<meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />*/}
          </head>

          <body className={`font-sans ${inter.variable}`}>
            <main className={"relative w-screen"}>
              <Suspense>
                <BgProvider>
                  <MyThemeProvider>
                    {children}

                    <Toaster
                      richColors
                      position={"top-right"}
                      duration={2000}
                    />
                  </MyThemeProvider>
                </BgProvider>
              </Suspense>
            </main>
          </body>
        </html>
      </TRPCReactProvider>
    </StableSessionProvider>
  )
}
