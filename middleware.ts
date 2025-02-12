import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getMainUrl, getLearnUrl } from '@/src/lib/config/domains'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })
  const hostname = request.headers.get('host') || ''

  // Check if on learn subdomain
  const isLearnDomain = hostname.startsWith('learn.')
  
  // Get session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Handle learn subdomain routing
  if (isLearnDomain) {
    // If not authenticated on learn domain, redirect to main site auth
    if (!session) {
      return NextResponse.redirect(getMainUrl('/auth'))
    }

    // If authenticated but on root of learn domain, redirect to dashboard
    if (request.nextUrl.pathname === '/') {
      return NextResponse.redirect(getLearnUrl('/learn/dashboard'))
    }
  }

  // Handle main domain auth routes
  if (!isLearnDomain) {
    // If authenticated user tries to access auth page on main domain, redirect to learn domain
    if (session && request.nextUrl.pathname.startsWith('/auth')) {
      return NextResponse.redirect(getLearnUrl('/learn/dashboard'))
    }
  }

  return res
}

export const config = {
  matcher: [
    '/(.*)',
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
}