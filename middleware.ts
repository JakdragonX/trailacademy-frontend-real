import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  try {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req: request, res })
    const hostname = request.headers.get('host') || ''
    const { data: { session } } = await supabase.auth.getSession()

    // Debug logs
    console.log('Current hostname:', hostname)
    console.log('Session exists:', !!session)
    console.log('Current path:', request.nextUrl.pathname)

    // Handle learn subdomain access
    if (hostname === 'learn.trailacademy.net') {
      // Paths that don't require auth
      const publicPaths = ['/auth', '/_next', '/api', '/public']
      const isPublicPath = publicPaths.some(path => request.nextUrl.pathname.startsWith(path))

      if (!session && !isPublicPath) {
        console.log('Redirecting to auth - No session found')
        return NextResponse.redirect(new URL('/auth', request.url))
      }

      // If authenticated and on auth page, redirect to dashboard
      if (session && request.nextUrl.pathname.startsWith('/auth')) {
        console.log('Redirecting to dashboard - User is authenticated')
        return NextResponse.redirect(new URL('/dashboard', request.url))
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
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}