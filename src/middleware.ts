import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  async function middleware(req) {
    const redirect = (url: string) =>
      NextResponse.redirect(new URL(url, req.url))

    const token = await getToken({ req })

    const isLoggingIn = req.nextUrl.pathname.startsWith("/intro")
    const isValidating = req.nextUrl.pathname.startsWith("/validation")

    // 没有session，始终跳转到登录页
    if (!token) return isLoggingIn ? null : redirect("/intro")

    // 已登录，但未通过审核，始终重定向到审核页
    if (token.validated === false)
      return isValidating ? null : redirect("/validation")

    // 兼容旧版，有token，但没有 validated 信息，由进一步的auth 处理
    if (!token.validated) return null

    // 已登录，且有 validated信息，无视登录页、审核页
    return isLoggingIn || isValidating ? redirect("/") : null
  },
  {
    callbacks: {
      async authorized() {
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
