import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { getSession, signOut } from "next-auth/react"
import { LOG_AUTH_ENABLED } from "./config"

export default withAuth(
  async function middleware(req) {
    const redirect = (url: string) =>
      NextResponse.redirect(new URL(url, req.url))

    console.log("[Next-Auth Middleware]: >>>\n")

    const nextPath = req.nextUrl.pathname
    const token = await getToken({ req })

    // ref: https://github.com/nextauthjs/next-auth/discussions/4265#discussioncomment-6490939
    const requestForNextAuth = {
      headers: {
        cookie: req.headers.get("cookie") ?? undefined,
      },
    }
    const session = await getSession({ req: requestForNextAuth })

    const isLoggingIn = nextPath.startsWith("/intro")
    const isValidating = nextPath.startsWith("/validation")

    if (LOG_AUTH_ENABLED)
      console.log(
        "[Next-Auth Middleware]: ",
        JSON.stringify({ id: token?.sub, error: session?.error, url: req.url }),
        "\n<<<\n\n",
      )

    if (
      // 1. session 有问题，比如数据库里的用户被删除了
      !token ||
      // 2. 没有 token 且不在登录页，重定向到登录页
      session?.error
    )
      return isLoggingIn ? null : redirect("/intro")

    // 兼容 token.validated = null | undefined
    // token 还没置真，且在验证页，重定向到验证页
    if (token?.validated === false && !isValidating)
      return redirect("/validation")

    // 已经有token了，但在登录或者验证页，重定向到首页
    if (token?.validated && (isLoggingIn || isValidating)) return redirect("/")

    return null
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
