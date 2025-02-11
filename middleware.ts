import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })
  const { data: { session } } = await supabase.auth.getSession()

  // Get hostname (e.g. learn.trailacademy.net, trailacademy.net)
  const hostname = request.headers.get('host') || ''
  const path = request.nextUrl.pathname

  // Handle learn subdomain access
  if (hostname === 'learn.trailacademy.net') {
    // Will need auth for protected routes later
    // if (!session) {
    //   return NextResponse.redirect(new URL('/auth', request.url))
    // }
    return res
  }

  // Prevent access to /learn routes on non-learn domains
  if (path.startsWith('/learn') && hostname !== 'learn.trailacademy.net') {
    return NextResponse.redirect(new URL(`https://learn.trailacademy.net${path}`, request.url))
  }

  return res
}

// Configure what routes middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - public files
     */
    '/((?!_next/static|_next/image|favicon.ico|public|.*\\..*$).*)',
  ],
}