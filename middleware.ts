import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

// Array of valid main domains
const MAIN_DOMAINS = ['trailacademy.net', 'demo.trailacademy.net']

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })
  const { data: { session } } = await supabase.auth.getSession()

  // Get hostname (e.g. learn.trailacademy.net, trailacademy.net)
  const hostname = request.headers.get('host') || ''
  const path = request.nextUrl.pathname

  // Handle learn subdomain access
  if (hostname === 'learn.trailacademy.net') {
    // Protected routes require authentication
    if (!session) {
      return NextResponse.redirect(new URL('/auth', request.url))
    }
    return res
  }

  // Prevent access to /learn routes on non-learn domains
  if (path.startsWith('/learn') && hostname !== 'learn.trailacademy.net') {
    // Check if the request is coming from any of our main domains
    const isMainDomain = MAIN_DOMAINS.some(domain => hostname.includes(domain))
    if (isMainDomain) {
      return NextResponse.redirect(new URL(`https://learn.trailacademy.net${path}`, request.url))
    }
  }

  return res
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public|.*\\..*$).*)',
  ],
}