import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/api/auth/[...nextauth]/route";

export async function middleware(request: NextRequest) {
  const session = await getServerSession(auth);
  const isAuthRoute = request.nextUrl.pathname.startsWith('/auth');
  const isApiAuthRoute = request.nextUrl.pathname.startsWith('/api/auth');
  
  // Allow API routes and auth routes without authentication
  if (isApiAuthRoute) {
    return NextResponse.next();
  }
  
  // Redirect authenticated users away from auth pages
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // Redirect unauthenticated users to login page
  if (!isAuthRoute && !session) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
};
