'use client'

import AuthForm from '@/src/components/auth/AuthForm'

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-[#FAF6F1] flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-[#2D4F1E] mb-8">
          Welcome to Trail Academy 🌿
        </h1>
        <AuthForm />
      </div>
    </div>
  )
}