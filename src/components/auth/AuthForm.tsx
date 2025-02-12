'use client'

import { useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AuthForm() {
  const supabase = createClientComponentClient()

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://learn.trailacademy.net'

  return (
    <div className="w-full max-w-md mx-auto">
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#2D4F1E',
                brandAccent: '#8B4513',
              },
            },
          },
        }}
        providers={['google']}
        redirectTo={`${siteUrl}/auth/callback`}
        onlyThirdPartyProviders={false}
      />
    </div>
  )
}