import { Navbar } from '@/src/components/shared/Navbar'

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#FAF6F1]">
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  )
}