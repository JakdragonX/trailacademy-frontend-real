export default function LearnLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="min-h-screen bg-[#FAF6F1]">
        {children}
      </div>
    )
  }