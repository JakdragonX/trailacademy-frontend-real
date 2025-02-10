import { supabase } from './client'

export async function checkConnection() {
  try {
    const { data, error } = await supabase.from('health_check').select('*').limit(1)
    if (error) throw error
    return { ok: true }
  } catch (error) {
    console.error('Supabase connection error:', error)
    return { ok: false, error }
  }
}