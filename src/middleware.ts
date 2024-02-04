export const config = {
  matcher: [
    "/",
    "/((?:room|validation|logout|task).*)",
    // "/(api|trpc)(.*)"
    // "/((?!.+\\.[\\w]+$|_next).*)",
  ],
};
export { default } from "next-auth/middleware";

//
// export default withAuth(
//   //   todo: clear user cookie if db is inconsistent
//   async function middleware(request: NextRequest) {
//     const session = await getSession({ req: request });
//     console.log("-- [[[withAuth]]] session: ", session);
//
//     if (!session) {
//       // Invalidate the cookie
//       const response = NextResponse.next();
//       response.cookies.set("next-auth.session-token", "", {
//         expires: new Date(0), // Set to a past date to invalidate
//         path: "/",
//       });
//
//       // Redirect to login page
//       return NextResponse.redirect(new URL("/intro", request.url));
//     }
//
//     return NextResponse.next();
//   },
//   {
//     // callbacks: {
//     //   authorized: ({ token }) => {
//     //     console.log("-- authorized: ", { token });
//     //     if (token.exp <= Date.now() / 1000) {
//     //       signOut();
//     //       return false;
//     //     }
//     //     return true;
//     //   }, // token?.role === "admin",
//     // },
//   },
// );
