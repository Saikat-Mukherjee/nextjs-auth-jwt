import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function redirect(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  return NextResponse.redirect(url);
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/login' || path === '/signup';
  const token = request.cookies.get('token')?.value || '';

  if (!isPublicPath && !token) {
    return redirect(request, '/login');
  }

  if (isPublicPath && token) {
    return redirect(request, '/');
  }
}

export const config = {
  matcher: ['/', '/profile', '/login', '/signup'],
};