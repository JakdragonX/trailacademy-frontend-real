"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogPortal = DialogPrimitive.Portal
export const DialogClose = DialogPrimitive.Close

export const DialogContent = React.forwardRef(({ children, className, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm">
      <DialogPrimitive.Content
        ref={ref}
        className={`fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] rounded-lg p-6 shadow-lg ${className}`}
        style={{ backgroundColor: 'white' }}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-90 hover:opacity-100">
          <X className="h-4 w-4" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Overlay>
  </DialogPrimitive.Portal>
))
DialogContent.displayName = "DialogContent"

export const DialogHeader = ({ className, ...props }) => (
  <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`} {...props} />
)

export const DialogTitle = ({ className, ...props }) => (
  <DialogPrimitive.Title className={`text-lg font-semibold ${className}`} {...props} />
)

export const DialogDescription = ({ className, ...props }) => (
  <DialogPrimitive.Description className={`text-sm text-gray-500 ${className}`} {...props} />
)