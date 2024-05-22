import { auth } from "@/auth";
import { authRoutes, protectedRoutes } from "@/routes";

// @ts-ignore
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/", nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && isProtectedRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbakUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/sign-in?callbackUrl=${encodedCallbakUrl}`, nextUrl),
    );
  }

  return null;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
