import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-[#2D4F1E] mb-8">Welcome, {session.user.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-[#2D4F1E]">Your Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">You haven't created any courses yet.</p>
            <Link href="/courses/create">
              <Button className="bg-[#2D4F1E] text-white hover:bg-[#4A7A30]">Create a Course</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-[#2D4F1E]">Account Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Manage your account settings and preferences.</p>
            <Link href="/settings">
              <Button variant="outline" className="border-[#2D4F1E] text-[#2D4F1E]">
                Go to Settings
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
