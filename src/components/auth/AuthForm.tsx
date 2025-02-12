'use client'

import { useEffect, useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { createUserProfile } from '@/src/lib/auth/hooks';

export default function AuthForm() {
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://learn.trailacademy.net';

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        window.location.href = `${siteUrl}/dashboard`;
      }
      setLoading(false);
    };
    checkSession();
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event);
        if (event === 'SIGNED_IN' && session?.user) {
          try {
            await createUserProfile({
              id: session.user.id,
              email: session.user.email,
              full_name: session.user.user_metadata?.full_name
            });
            window.location.href = `${siteUrl}/dashboard`;
          } catch (error) {
            console.error('Error handling sign in:', error);
          }
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
        magicLink={true}
      />
    </div>
  );
}