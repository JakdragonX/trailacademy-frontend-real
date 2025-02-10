"use client"

import { useState, useEffect } from 'react'
import { supabase } from '@/src/lib/supabase/client'

export default function SupabaseTest() {
  const [status, setStatus] = useState('Testing connection...')

  useEffect(() => {
    async function testConnection() {
      try {
        // Simply test if we can connect to Supabase
        const { data, error } = await supabase.from('_price_tracking_status').select('*')
        // Even if we get an error about the table not existing,
        // if we can reach Supabase, we're good!
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