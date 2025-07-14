// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/", "/log-in(.*)", "/sign-up(.*)"
]);

export default clerkMiddleware((auth, req) => {
  const { userId } = auth();

  // If not logged in and not accessing public route
  if (!isPublicRoute(req) && !userId) {
    const signInUrl = new URL("/log-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.url); // ⬅️ Save where they were going
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next(); // Proceed as normal
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)",
    "/(api|trpc)(.*)",
  ],
};
