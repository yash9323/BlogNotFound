export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/profile/:path*",
    "/createblog",
    "/blog/:path*",
    "/saved",
    "/myblogs",
    "/findpeople",
    "/fromfollowing",
  ],
};
