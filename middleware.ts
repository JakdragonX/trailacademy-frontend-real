import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

// Array of valid main domains
const MAIN_DOMAINS = ['trailacademy.net', 'demo.trailacademy.net', 'test.trailacademy.net']

export async function middleware(request: NextRequest) {
  try {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req: request, res })
    
    // Get hostname and path
    const hostname = request.headers.get('host') || ''
    const path = request.nextUrl.pathname
    const { data: { session } } = await supabase.auth.getSession()

    // Handle learn subdomain access
    if (hostname === 'learn.trailacademy.net') {
      const isAuthPath = path.startsWith('/auth') || path.startsWith('/_next') || path.startsWith('/api')

      // Redirect to auth if not authenticated and accessing protected pages
      if (!session && !isAuthPath) {
        console.log('Redirecting to auth - No session found')
        return NextResponse.redirect(new URL('/auth', request.url))
      }
      return res
    }

    // Redirect /learn paths on main domains to learn subdomain
    const isMainDomain = MAIN_DOMAINS.some(domain => hostname.includes(domain))
    if (isMainDomain && path.startsWith('/learn')) {
      const redirectUrl = new URL(path, 'https://learn.trailacademy.net')
      return NextResponse.redirect(redirectUrl)
    }

    return res
  } catch (error) {
    console.error('Middleware error:', error)
    // Allow request through on failure rather than blocking access
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/.*|api/.*|assets/.*|.*\\..*).*)',
  ],
}
