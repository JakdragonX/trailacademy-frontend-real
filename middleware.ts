import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  try {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req: request, res })
    
    const hostname = request.headers.get('host') || ''
    const path = request.nextUrl.pathname
    const { data: { session } } = await supabase.auth.getSession()

    // Handle learn subdomain
    if (hostname === 'learn.trailacademy.net') {
      // Don't redirect auth-related paths
      const isAuthPath = path.startsWith('/auth') || 
                        path.startsWith('/_next') || 
                        path.startsWith('/api')
      
      if (!session && !isAuthPath) {
        return NextResponse.redirect(new URL('/auth', request.url))
      }
      return res
    }

    // Handle main domain redirects to learn subdomain
    if (path.startsWith('/learn')) {
      return NextResponse.redirect(new URL(path, 'https://learn.trailacademy.net'))
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