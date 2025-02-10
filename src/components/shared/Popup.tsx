"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/components/shared/ui/dialog"
import { Button } from "@/src/components/shared/ui/button"

interface PopupProps {
  isOpen: boolean
  onClose: () => void
}

export function Popup({ isOpen, onClose }: PopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Feature Unavailable</DialogTitle>
        </DialogHeader>
        <p>This feature is unavailable in the demo stage. Try again later!</p>
        <Button onClick={onClose} className="mt-4">
          Close
        </Button>
      </DialogContent>
    </Dialog>
  )
}