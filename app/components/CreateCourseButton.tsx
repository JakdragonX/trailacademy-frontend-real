"use client"

import { useState } from "react"
import NextLink from "next/link"
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
  return (
    <NextLink href="/create">
      <Button 
        className="bg-[#8B4513] text-[#FAF6F1] hover:bg-[#8B4513]/90"
      >
        <Plus className="mr-2 h-4 w-4" /> Create Course
      </Button>
    </NextLink>
  )
}
