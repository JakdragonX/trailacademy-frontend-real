import Link from "next/link"
import { LucideCable } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#2D4F1E] text-[#FAF6F1]/90">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-[#FAF6F1] mb-3">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/courses">Courses</Link>
              </li>
              <li>
                <Link href="/pricing">Pricing</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#FAF6F1] mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms">Terms</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy</Link>
              </li>
              <li>
                <Link href="/cookies">Cookies</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#FAF6F1] mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about">Community</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#FAF6F1] mb-3">Connect</h3>
            <div className="flex space-x-4">
              <Link href="https://discord.gg/3n7KPDxdtZ" className="hover:text-[#FAF6F1]">
                <LucideCable className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-[#FAF6F1]/10 text-sm text-center text-[#FAF6F1]/70">
          © {currentYear} Trail Academy, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
