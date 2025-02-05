"use client"

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { FileText, Link as LinkIcon, X } from 'lucide-react'

interface Resource {
  type: 'link' | 'book' | 'note'
  title: string
  url?: string
  description?: string
}

export function ContentSpecificationForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    audience: '',
    moduleCount: 5,
    resources: [] as Resource[]
  })

  const [newResource, setNewResource] = useState<Resource>({
    type: 'link',
    title: '',
    url: ''
  })

  const addResource = () => {
    if (newResource.title) {
      setFormData({
        ...formData,
        resources: [...formData.resources, newResource]
      })
      setNewResource({ type: 'link', title: '', url: '' })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Course Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          className="w-full p-2 border rounded-lg"
          placeholder="Enter course title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          className="w-full p-2 border rounded-lg"
          rows={3}
          placeholder="Describe your course"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Target Audience</label>
        <input
          type="text"
          value={formData.audience}
          onChange={(e) => setFormData({...formData, audience: e.target.value})}
          className="w-full p-2 border rounded-lg"
          placeholder="Who is this course for?"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Number of Modules</label>
        <input
          type="number"
          value={formData.moduleCount}
          onChange={(e) => setFormData({...formData, moduleCount: parseInt(e.target.value)})}
          className="w-full p-2 border rounded-lg"
          min={1}
          max={20}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Add Resources</label>
        <div className="flex gap-2 mb-2">
          <select
            value={newResource.type}
            onChange={(e) => setNewResource({...newResource, type: e.target.value as Resource['type']})}
            className="p-2 border rounded-lg"
          >
            <option value="link">Link</option>
            <option value="book">Book</option>
            <option value="note">Note</option>
          </select>
          <input
            type="text"
            value={newResource.title}
            onChange={(e) => setNewResource({...newResource, title: e.target.value})}
            className="flex-1 p-2 border rounded-lg"
            placeholder="Resource title"
          />
          {newResource.type !== 'note' && (
            <input
              type="text"
              value={newResource.url || ''}
              onChange={(e) => setNewResource({...newResource, url: e.target.value})}
              className="flex-1 p-2 border rounded-lg"
              placeholder="URL or Reference"
            />
          )}
          <button
            onClick={addResource}
            className="bg-[#2D4F1E] text-white px-4 py-2 rounded hover:bg-[#1F3614]"
          >
            Add
          </button>
        </div>
      </div>

      {formData.resources.length > 0 && (
        <div className="space-y-2">
          {formData.resources.map((resource, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-[#FAF6F1] rounded">
              <div className="flex items-center gap-2">
                {resource.type === 'link' ? <LinkIcon className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                <span>{resource.title}</span>
              </div>
              <X
                className="w-4 h-4 cursor-pointer hover:text-red-500"
                onClick={() => {
                  const newResources = [...formData.resources]
                  newResources.splice(index, 1)
                  setFormData({...formData, resources: newResources})
                }}
              />
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => onSubmit(formData)}
        className="w-full bg-[#2D4F1E] text-white px-4 py-2 rounded hover:bg-[#1F3614]"
      >
        Generate Course
      </button>
    </div>
  )
}