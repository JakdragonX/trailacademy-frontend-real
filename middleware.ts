import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  try {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req: request, res })
    const hostname = request.headers.get('host') || ''
    const { data: { session } } = await supabase.auth.getSession()

    // Handle learn subdomain
    if (hostname === 'learn.trailacademy.net') {
      const path = request.nextUrl.pathname
      const isPublicPath = path.startsWith('/auth') || 
                          path.startsWith('/_next') || 
                          path.startsWith('/api')

      // If logged in and trying to access auth page, redirect to dashboard
      if (session && path.startsWith('/auth')) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }

      // If not logged in and trying to access protected route
      if (!session && !isPublicPath) {
        return NextResponse.redirect(new URL('/auth', request.url))
      }
    } else {
      // Handle main domain redirects
      if (request.nextUrl.pathname.startsWith('/learn')) {
        return NextResponse.redirect(`https://learn.trailacademy.net${request.nextUrl.pathname}`)
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