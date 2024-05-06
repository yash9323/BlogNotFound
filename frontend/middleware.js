export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/profile/:path*",
    "/createblog",
    "/blog/:path*",
    "/blog/[id]",
    "/saved",
    "/myblogs",
    "/findpeople",
    "/fromfollowing",
  ],
};
