"use client"

import { useState, useEffect } from 'react'
import { supabase } from '@/src/lib/supabase/client'

export default function SupabaseTest() {
  const [status, setStatus] = useState('Testing connection...')

  useEffect(() => {
    async function testConnection() {
      try {
        const { data, error } = await supabase.from('profiles').select('count')
        if (error) throw error
        setStatus('Connected to Supabase! ✅')
      } catch (error) {
        console.error('Connection test failed:', error)
        setStatus('Failed to connect to Supabase ❌')
      }
    }

    testConnection()
  }, [])

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-white rounded-lg shadow-lg">
      {status}
    </div>
  )
}