"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function CreateCourseButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#8B4513] text-[#FAF6F1] hover:bg-[#8B4513]/90">
          <Plus className="mr-2 h-4 w-4" /> Create Course
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New Course</DialogTitle>
          <DialogDescription>
            Start building your custom course by providing some initial information.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Add form fields for course creation here */}
          <p>Course creation form will be implemented here.</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

