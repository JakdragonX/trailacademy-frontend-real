// src/app/(priv)/layout.tsx
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getMainUrl } from '@/src/lib/config/domains'
import Navbar from "@/src/components/shared/Navbar"

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Server-side domain check
  const headersList = await headers()
  const host = headersList.get('host') || ''
  const isLearnDomain = host.startsWith('learn.')

  // If not on learn domain, redirect to main site
  if (!isLearnDomain) {
    redirect(getMainUrl())
  }

  return (
    <div className="min-h-screen bg-[#FAF6F1]">
      <Navbar />
      <main>{children}</main>
    </div>
  )
}