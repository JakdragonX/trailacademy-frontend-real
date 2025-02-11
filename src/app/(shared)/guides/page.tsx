"use client"

import { useState } from "react"
import Navbar from "@/src/components/shared/Navbar"
import Footer from "@/src/components/shared/Footer"
import GuideSidebar from "@/src/components/priv/GuideSidebar"
import GuideGrid from "@/src/components/priv/GuideGrid"
import { Button } from "@/src/components/shared/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/src/components/shared/ui/dialog"

export default function GuidesPage() {
  const [isModalOpen, setIsModalOpen] = useState(true)

  return (
    <div className="min-h-screen bg-[#FAF6F1] text-[#2D4F1E]">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Explore Guides</h1>
          <Button onClick={() => setIsModalOpen(true)} className="bg-[#8B4513] text-[#FAF6F1] hover:bg-[#8B4513]/90">
            Contribute a Guide
          </Button>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <GuideSidebar />
          <GuideGrid />
        </div>
      </main>
      <Footer />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Help Us Grow Our Community!</DialogTitle>
            <DialogDescription>
              We're looking for passionate educators, learners, and experts to contribute to our guides. Share your
              knowledge and help shape the future of education with Trail Academy.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex justify-end">
            <Button onClick={() => setIsModalOpen(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}












