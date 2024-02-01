export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/((?:chat|validation).*)",
    // "/(api|trpc)(.*)"
    // "/((?!.+\\.[\\w]+$|_next).*)",
  ],
};
