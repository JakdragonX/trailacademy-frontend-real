import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  try {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req: request, res })
    const hostname = request.headers.get('host') || ''
    const { data: { session } } = await supabase.auth.getSession()
    const path = request.nextUrl.pathname

    console.log('Middleware check:', { hostname, path, isAuthenticated: !!session })

    // Handle learn subdomain
    if (hostname === 'learn.trailacademy.net') {
      // If not authenticated, only allow auth routes
      if (!session) {
        const isAuthPath = path.startsWith('/auth') || 
                          path.startsWith('/_next') || 
                          path.startsWith('/api')
        
        if (!isAuthPath) {
          return NextResponse.redirect(new URL('/auth', request.url))
        }
      } else if (path === '/') {
        // If authenticated and at root, redirect to dashboard
        return NextResponse.redirect(new URL('/learn/dashboard', request.url))
      }
    } else {
      // On main domains (test.trailacademy.net, etc.)
      // If authenticated and trying to access auth pages, redirect to learn domain
      if (session && path.startsWith('/auth')) {
        return NextResponse.redirect('https://learn.trailacademy.net/learn/dashboard')
      }
    }

    return res
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
}