import { supabase } from '@/src/lib/supabase/client'

export async function createUserProfile(userData: {
  id: string
  email?: string
  full_name?: string
}) {
  const account_id = `TA_${Math.random().toString(36).slice(2, 12)}`
  
  const { data, error } = await supabase
    .from('user_profiles')
    .insert([
      {
        account_id,
        email: userData.email,
        full_name: userData.full_name,
        subscription_tier: 'free',
        user_role: 'user'
      }
    ])
    .select()
    .single()

  if (error) {
    console.error('Error creating user profile:', error)
    throw error
  }

  return data
}