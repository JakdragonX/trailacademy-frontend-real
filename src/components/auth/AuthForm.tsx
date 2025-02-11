import { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/src/lib/supabase/client';
import { createUserProfile } from '@/src/lib/auth/hooks';

export default function AuthForm() {
  useEffect(() => {
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
            
            // Redirect to dashboard
            window.location.href = 'https://learn.trailacademy.net';
          } catch (error) {
            console.error('Error handling sign in:', error);
          }
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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
        redirectTo={`${window.location.origin}/auth/callback`}
      />
    </div>
  );
}