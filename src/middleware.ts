export { default } from "next-auth/middleware"

// todo: redirect to `/intro` if user is not validated
export const config = {
  matcher: [
    "/",
    "/((?:room|validation|logout|task).*)",
    // "/(api|trpc)(.*)"
    // "/((?!.+\\.[\\w]+$|_next).*)",
  ],
}
