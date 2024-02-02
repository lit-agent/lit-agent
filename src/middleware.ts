export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/((?:chat|validation|logout|task).*)",
    // "/(api|trpc)(.*)"
    // "/((?!.+\\.[\\w]+$|_next).*)",
  ],
};
