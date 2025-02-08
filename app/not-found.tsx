import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAF6F1]">
      <h1 className="text-4xl font-bold text-[#2D4F1E] mb-4">404 - Page Not Found</h1>
      <p className="text-xl text-[#2D4F1E] mb-8">This feature is unavailable in the demo stage. Try again later!</p>
      <Link href="/">
        <Button className="bg-[#2D4F1E] text-white hover:bg-[#4A7A30]">Return to Home</Button>
      </Link>
    </div>
  )
}