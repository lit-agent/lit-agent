import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

import { LOG_AUTH_ENABLED } from "@/lib/auth/config"

export default withAuth(
  async function middleware(req) {
    const redirect = (url: string) =>
      NextResponse.redirect(new URL(url, req.url))

    const nextPath = req.nextUrl.pathname
    const token = req.nextauth.token

    const isLoggingIn = nextPath.startsWith("/intro")
    const isValidating = nextPath.startsWith("/validation")
    const isAuthing = isLoggingIn || isValidating

    // if (LOG_AUTH_ENABLED)
    console.log(
      "[Next-Auth Middleware]: ",
      JSON.stringify({
        id: token?.sub,
        url: req.url,
        nextPath,
      }),
    )

    // session 有问题，则重定向回登录页
    // 验证页pass
    if (!isLoggingIn && !token) return redirect("/intro")

    // 非Auth页，但处于待答题状态，则重定向回答题页
    // 登录页 pass
    if (!isValidating && token?.validated === false)
      return redirect("/validation")

    // 在Auth页，但处于已验证状态，则重定向回首页
    if (isAuthing && token?.validated) return redirect("/")
  },
  {
    callbacks: {
      async authorized({ req, token }) {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.

        return true
      },
    },
  },
)

export const config = {
  matcher: [
    // intro 和 validation 都不要加 auth，因为还没登陆
    // intro 和 validation 都是需要 phone、code 的，所以算是密码登录

    "/((?:intro|validation).*)",
    "/",
    "/((?:bill|chat|create|store|product|settings|task).*)",
    // "/(api|trpc)(.*)"
    // "/((?!.+\\.[\\w]+$|_next).*)",
  ],
}
