import "@/styles/globals.css";

import { Inter } from "next/font/google";

import { cn } from "@/lib/utils";
import MyThemeProvider from "@/providers/theme";
import { bgModel } from "@/config";
import { Toaster } from "sonner";
import MySessionProvider from "@/providers/session";
import { TRPCReactProvider } from "@/providers/trpc";
import { Metadata, Viewport } from "next";
import { AppAutoMobileHeight } from "@/components/app-auto-mobile-height";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Lit Agent",
  description: "Developed by github@markshawn2020",
  icons: [{ rel: "Icon", url: "/favicon.ico" }],
};

// ref: https://nextjs.org/docs/app/building-your-application/upgrading/codemods#use-viewport-export
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable}`}>
        <MyThemeProvider>
          <MySessionProvider>
            <TRPCReactProvider>
              <AppAutoMobileHeight />

              <Toaster richColors position={"top-right"} />

              <main className={"relative w-screen"}>
                <div
                  className={cn(
                    "fixed inset-0 z-0 h-full w-full",
                    "pointer-events-none",
                    bgModel === "mirror"
                      ? "scale-125 blur-lg brightness-[15%]"
                      : "bg-background",
                  )}
                >
                  {bgModel === "plain" ? null : children}
                </div>

                <div
                  className={
                    "absolute inset-0 flex h-full w-full justify-center"
                  }
                >
                  <div className={"bg-muted w-full max-w-screen-sm"}>
                    {children}
                  </div>
                </div>
              </main>
            </TRPCReactProvider>
          </MySessionProvider>
        </MyThemeProvider>
      </body>
    </html>
  );
}
