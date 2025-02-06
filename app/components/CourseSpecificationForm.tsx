"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FileText, LinkIcon, X } from "lucide-react"

interface Resource {
  type: "link" | "book" | "note"
  title: string
  url?: string
  description?: string
}

export function CourseSpecificationForm({ onSubmit, onBack }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    audience: "",
    moduleCount: 8, // Changed from 5 to 8
    resources: [] as Resource[],
  })

  const [newResource, setNewResource] = useState<Resource>({
    type: "link",
    title: "",
    url: "",
  })

  const addResource = () => {
    if (newResource.title) {
      setFormData({
        ...formData,
        resources: [...formData.resources, newResource],
      })
      setNewResource({ type: "link", title: "", url: "" })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Course Title</label>
        <Input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter course title"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe your course"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Target Audience</label>
        <Input
          type="text"
          value={formData.audience}
          onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
          placeholder="Who is this course for?"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Number of Modules</label>
        <Input
          type="number"
          value={formData.moduleCount}
          onChange={(e) => setFormData({ ...formData, moduleCount: Math.max(1, Number.parseInt(e.target.value) || 1) })}
          min={1}
          max={20}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Add Resources</label>
        <div className="flex gap-2 mb-2">
          <select
            value={newResource.type}
            onChange={(e) => setNewResource({ ...newResource, type: e.target.value as Resource["type"] })}
            className="p-2 border rounded-lg"
          >
            <option value="link">Link</option>
            <option value="book">Book</option>
            <option value="note">Note</option>
          </select>
          <Input
            type="text"
            value={newResource.title}
            onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
            placeholder="Resource title"
          />
          {newResource.type !== "note" && (
            <Input
              type="text"
              value={newResource.url || ""}
              onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
              placeholder="URL or Reference"
            />
          )}
          <Button onClick={addResource} type="button">
            Add
          </Button>
        </div>
      </div>

      {formData.resources.length > 0 && (
        <div className="space-y-2">
          {formData.resources.map((resource, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-[#FAF6F1] rounded">
              <div className="flex items-center gap-2">
                {resource.type === "link" ? <LinkIcon className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                <span>{resource.title}</span>
              </div>
              <X
                className="w-4 h-4 cursor-pointer hover:text-red-500"
                onClick={() => {
                  const newResources = [...formData.resources]
                  newResources.splice(index, 1)
                  setFormData({ ...formData, resources: newResources })
                }}
              />
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between">
        <Button type="button" onClick={onBack} variant="outline">
          Back
        </Button>
        <Button type="submit">Generate Course</Button>
      </div>
    </form>
  )
}
