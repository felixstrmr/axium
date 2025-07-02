import { authMiddleware } from '@axium/auth/middleware'

export default authMiddleware

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|signin).*)',
  ],
}
