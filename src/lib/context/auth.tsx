'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { authService } from '../auth/authService'

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

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await authService.getSession()
        setUser(session?.user || null)

        const { data: { subscription } } = authService.onAuthStateChange((event, session) => {
          setUser(session?.user || null)
          
          if (event === 'SIGNED_IN' && authService.isLearnDomain()) {
            authService.redirectToLearnDashboard()
          }
        })

        return () => subscription.unsubscribe()
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      signOut: () => authService.signOut() 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)