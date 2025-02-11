import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const MAIN_DOMAINS = ['trailacademy.net', 'demo.trailacademy.net', 'test.trailacademy.net']

export async function middleware(request: NextRequest) {
  try {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req: request, res })
    
    // Get hostname and path
    const hostname = request.headers.get('host') || ''
    const path = request.nextUrl.pathname

    // Refresh session if it exists
    const { data: { session } } = await supabase.auth.getSession()

    // Handle learn subdomain
    if (hostname === 'learn.trailacademy.net') {
      // Don't redirect these paths even without auth
      const isAuthPath = path.startsWith('/auth') || 
                        path.startsWith('/_next') || 
                        path.startsWith('/api')
      
      if (!session && !isAuthPath) {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = '/auth'
        return NextResponse.redirect(redirectUrl)
      }
      return res
    }

    // Redirect /learn paths on main domains to learn subdomain
    if (path.startsWith('/learn')) {
      const isMainDomain = MAIN_DOMAINS.some(domain => hostname.includes(domain))
      if (isMainDomain) {
        const redirectUrl = new URL(path, 'https://learn.trailacademy.net')
        return NextResponse.redirect(redirectUrl)
      }
    }

    return res
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.next()
  }
}

// More specific matcher to prevent unexpected token errors
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     * - api routes
     * - assets
     * - files with extensions
     */
    '/((?!_next/static|_next/image|favicon.ico|public/.*|api/.*|assets/.*|.*\\..*$).*)',
  ],
}