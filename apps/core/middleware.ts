import { getSessionCookie } from 'better-auth/cookies'
import { type NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request, {
    cookiePrefix: 'axium',
  })

  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|signin|robots.txt).*)',
  ],
}
