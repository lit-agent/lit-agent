// todo: auth invalid
export { default } from "next-auth/middleware"

// todo: redirect to `/intro` if user is not validated
export const config = {
  matcher: [
    "/",
    "/((?:validation|bill|chat|create|home|product|settings|task).*)",
    // "/(api|trpc)(.*)"
    // "/((?!.+\\.[\\w]+$|_next).*)",
  ],
}
