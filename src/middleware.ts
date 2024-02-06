export { default } from "next-auth/middleware"

export const config = {
  matcher: [
    "/",
    "/((?:room|validation|logout|task).*)",
    // "/(api|trpc)(.*)"
    // "/((?!.+\\.[\\w]+$|_next).*)",
  ],
}
