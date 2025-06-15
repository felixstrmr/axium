import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (
    pathname.startsWith('/settings/admin') &&
    session?.user.role !== 'admin'
  ) {
    return NextResponse.redirect(new URL('/settings', request.url))
  }

  return NextResponse.next()
}

export const config = {
  runtime: 'nodejs',
  matcher: [
    '/((?!_next/static|_next/image|api|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
