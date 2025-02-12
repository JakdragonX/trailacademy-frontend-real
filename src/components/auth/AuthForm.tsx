'use client'

import { useEffect, useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { createUserProfile } from '@/src/lib/auth/hooks';
import { useRouter } from 'next/navigation';

export default function AuthForm() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // If already logged in, redirect to dashboard
        router.replace('/dashboard');
      }
      setLoading(false);
    };
    checkSession();
  }, [router]);

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
            router.replace('/dashboard');
          } catch (error) {
            console.error('Error handling sign in:', error);
          }
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [router]);

  if (loading) {
    return <div className="flex items-center justify-center p-4">Loading...</div>;
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
        redirectTo="https://learn.trailacademy.net/auth/callback"
        magicLink={true}
      />
    </div>
  );
}