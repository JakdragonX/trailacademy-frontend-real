// src/lib/auth/authService.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const LEARN_DOMAIN = 'learn.trailacademy.net'

export class AuthService {
  private static instance: AuthService
  private supabase: any
  
  private constructor() {
    // Initialize Supabase with cookie options
    this.supabase = createClientComponentClient({
      cookieOptions: {
        name: 'sb-auth-token',
        domain: '.trailacademy.net', // Allows sharing across subdomains
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
      }
    })
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  public async getSession() {
    return await this.supabase.auth.getSession()
  }

  public async signOut() {
    await this.supabase.auth.signOut()
    // Clear cookies across domains
    document.cookie = 'sb-auth-token=; path=/; domain=.trailacademy.net; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  }

  public onAuthStateChange(callback: (event: string, session: any) => void) {
    return this.supabase.auth.onAuthStateChange(callback)
  }

  public isLearnDomain(): boolean {
    return window.location.hostname === LEARN_DOMAIN
  }

  public redirectToLearnDashboard() {
    if (this.isLearnDomain()) {
      window.location.href = `https://${LEARN_DOMAIN}/learn/dashboard`
    }
  }
}

export const authService = AuthService.getInstance()