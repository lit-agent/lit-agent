import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  async function middleware(req) {
    const redirect = (url: string) =>
      NextResponse.redirect(new URL(url, req.url))

    const nextPath = req.nextUrl.pathname
    const token = await getToken({ req })

    const isLoggingIn = nextPath.startsWith("/intro")
    const isValidating = nextPath.startsWith("/validation")

    console.log("[Next-Auth Middleware]: ", {
      url: req.url,
      referer: req.referrer,
      nextPath,
      // req,
      token,
      isLoggingIn,
      isValidating,
    })

    // 没有 token 且不在登录页，重定向到登录页
    if (!token && !isLoggingIn) return redirect("/intro")

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
