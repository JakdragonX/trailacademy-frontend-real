'use client'

import { useEffect, useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/src/lib/supabase/client';
import { createUserProfile } from '@/src/lib/auth/hooks';

export default function AuthForm() {
  const [origin, setOrigin] = useState<string>('')
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://learn.trailacademy.net'

  useEffect(() => {
    // Set origin once component mounts in browser
    setOrigin(window.location.origin)
  }, [])

  useEffect(() => {
    if (!origin) return;

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          try {
            // Create user profile if they're new
            await createUserProfile({
              id: session.user.id,
              email: session.user.email,
              full_name: session.user.user_metadata?.full_name
            });
            
            // Redirect to dashboard instead of root
            window.location.href = `${siteUrl}/dashboard`;
          } catch (error) {
            console.error('Error handling sign in:', error);
          }
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [origin]);

  if (!origin) return null; // Don't render until we have the origin

  return (
    <div className="w-full">
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
        localization={{
          variables: {
            sign_up: {
              email_label: 'Email',
              password_label: 'Create a Password',
              button_label: 'Sign Up',
              loading_button_label: 'Creating Account...',
              social_provider_text: 'Sign up with {{provider}}',
            },
            sign_in: {
              email_label: 'Email',
              password_label: 'Your Password',
              button_label: 'Sign In',
              loading_button_label: 'Signing In...',
              social_provider_text: 'Sign in with {{provider}}',
            },
          }
        }}
      />
    </div>
  );
}