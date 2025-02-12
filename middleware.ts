// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getMainUrl, getLearnUrl } from '@/src/lib/config/domains'

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const isLearnDomain = hostname.startsWith('learn.')
  const { pathname } = request.nextUrl
  
  // Create response to modify
  const res = NextResponse.next()
  
  // Initialize Supabase client
  const supabase = createMiddlewareClient({ req: request, res })
  
  // Get session - this needs to be done before any redirects
  const { data: { session } } = await supabase.auth.getSession()

  // Learn domain specific rules
  if (isLearnDomain) {
    // Always require authentication on learn domain
    if (!session) {
      // Store the attempted URL to redirect back after auth
      const redirectUrl = getMainUrl(`/auth?returnTo=${encodeURIComponent(request.url)}`)
      return NextResponse.redirect(redirectUrl)
    }

    // If on root of learn domain, redirect to dashboard
    if (pathname === '/') {
      return NextResponse.redirect(getLearnUrl('/learn/dashboard'))
    }

    // Only allow access to (priv) routes on learn domain
    if (!pathname.startsWith('/learn') && !pathname.startsWith('/api')) {
      return NextResponse.redirect(getLearnUrl('/learn/dashboard'))
    }
  }

  // Main domain specific rules
  if (!isLearnDomain) {
    // If authenticated user tries to access auth page on main domain
    if (session && pathname.startsWith('/auth')) {
      return NextResponse.redirect(getLearnUrl('/learn/dashboard'))
    }

    // Block access to private routes on main domain
    if (pathname.startsWith('/learn/')) {
      return NextResponse.redirect(getMainUrl())
    }
  }

  return res
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}