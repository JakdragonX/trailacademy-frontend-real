// middleware.ts
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

    // Handle learn subdomain
    if (hostname === 'learn.trailacademy.net') {
      // List of paths that don't require auth
      const publicPaths = ['/auth', '/_next', '/api']
      const isPublicPath = publicPaths.some(p => path.startsWith(p))

      // If logged in and on auth page, redirect to dashboard
      if (session && path.startsWith('/auth')) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }

      // If logged in and on root or /learn, redirect to dashboard
      if (session && (path === '/' || path === '/learn')) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }

      // If not logged in and trying to access protected route
      if (!session && !isPublicPath) {
        return NextResponse.redirect(new URL('/auth', request.url))
      }

      return res
    }

    // Handle main domains (trailacademy.net, test.trailacademy.net, etc.)
    if (path.startsWith('/dashboard') || path.startsWith('/learn')) {
      // Always redirect learn-related paths to learn subdomain
      return NextResponse.redirect(`https://learn.trailacademy.net${path}`)
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