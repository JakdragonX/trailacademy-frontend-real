import { createClient } from '@supabase/supabase-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// Helper to clean environment variables
const cleanEnvValue = (value: string | undefined) => {
  if (!value) return undefined
  // Remove surrounding quotes if they exist
  return value.replace(/^["'](.+(?=["']$))["']$/, '$1')
}

const supabaseUrl = cleanEnvValue(process.env.NEXT_PUBLIC_SUPABASE_URL)
const supabaseAnonKey = cleanEnvValue(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

if (!supabaseUrl) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
}
if (!supabaseAnonKey) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

// Create the regular client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Create component client for use in components
export const createComponentClient = () => {
  return createClientComponentClient()
}

// Admin client - only use server-side
export const createAdminClient = () => {
  const serviceRoleKey = cleanEnvValue(process.env.SUPABASE_SERVICE_ROLE_KEY)
  if (!serviceRoleKey) {
    throw new Error('Missing env.SUPABASE_SERVICE_ROLE_KEY')
  }
  
  return createClient(supabaseUrl, serviceRoleKey)
}