import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Add a new header x-current-path which passes the path to downstream components
  const headers = new Headers(request.headers);
  headers.set("x-current-path", request.nextUrl.pathname);
  // Assume a "Cookie:jwt=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API
  let cookie = request.cookies.get("jwt");
  // console.log(cookie); // => { name: 'jwt', value: 'fast', Path: '/' }
  const allCookies = request.cookies.getAll();
  // console.log(allCookies); // => [{ name: 'jwt', value: 'fast' }]

  request.cookies.has("jwt"); // => true
  request.cookies.delete("jwt");
  request.cookies.has("jwt"); // => false

  // Setting cookies on the response using the `ResponseCookies` API
  const response = NextResponse.next();
  response.cookies.set("vercel", "fast");

  if (cookie?.name && cookie?.value) {
    response.cookies.set({
      name: cookie.name,
      value: cookie.value,
      path: "/",
    });
  }

  cookie = response.cookies.get("jwt");
  console.log("final", cookie); // => { name: 'vercel', value: 'fast', Path: '/' }
  // The outgoing r

  return NextResponse.next({ headers });
}

export const config = {
  matcher: [
    // match all routes except static files and APIs
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
