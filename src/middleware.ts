// todo: auth invalid
export { default } from "next-auth/middleware"

// todo: redirect to `/intro` if user is not validated
export const config = {
  matcher: [
    "/",
    "/((?:room|validation|task|chat).*)",
    // "/(api|trpc)(.*)"
    // "/((?!.+\\.[\\w]+$|_next).*)",
  ],
}
