// src/lib/context/auth.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const AuthContext = createContext<{
  user: any
  loading: boolean
  signOut: () => Promise<void>
}>({
  user: null,
  loading: true,
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  // Handle sign out across all domains
  const signOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  useEffect(() => {
    // Check session on mount and set up listener
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user || null)
        
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
          console.log('Auth state changed:', event, session?.user?.email)
          setUser(session?.user || null)
          
          // Handle sign in/out redirects
          if (event === 'SIGNED_IN') {
            window.location.href = 'https://learn.trailacademy.net/learn/dashboard'
          }
        })

        return () => subscription.unsubscribe()
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const value = {
    user,
    loading,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)