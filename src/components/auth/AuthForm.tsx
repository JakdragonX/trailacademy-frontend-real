import { useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/src/lib/supabase/client';

export default function AuthForm() {
  const [view, setView] = useState('sign-in')
  
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Auth
        supabaseClient={supabase}
        view={view}
        appearance={{ theme: ThemeSupa }}
        theme="dark"
        showLinks={true}
        providers={['google']}
        redirectTo={`${window.location.origin}/auth/callback`}
      />
    </div>
  );
}