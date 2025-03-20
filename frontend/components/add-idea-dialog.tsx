"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface AddIdeaDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (data: any) => void
}

export default function AddIdeaDialog({ open, onOpenChange, onSubmit }: AddIdeaDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [lookingForCollaborators, setLookingForCollaborators] = useState(false)
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])

  const companies = [
    { id: "virgin-atlantic", name: "Virgin Atlantic", initials: "VA" },
    { id: "virgin-voyages", name: "Virgin Voyages", initials: "VV" },
    { id: "virgin-hotels", name: "Virgin Hotels", initials: "VH" },
    { id: "virgin-media", name: "Virgin Media", initials: "VM" },
    { id: "virgin-active", name: "Virgin Active", initials: "VA" },
    { id: "virgin-galactic", name: "Virgin Galactic", initials: "VG" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would collect all form data here
    // and pass it to the onSubmit handler
    const formData = {
      title,
      description,
      category,
      lookingForCollaborators,
      selectedCompanies,
      date: new Date().toISOString(),
    }

    if (onSubmit) {
      onSubmit(formData)
    }

    // Reset form
    setTitle("")
    setDescription("")
    setCategory("")
    setLookingForCollaborators(false)
    setSelectedCompanies([])

    onOpenChange(false)
  }

  const toggleCompany = (companyId: string) => {
    if (selectedCompanies.includes(companyId)) {
      setSelectedCompanies(selectedCompanies.filter((id) => id !== companyId))
    } else {
      setSelectedCompanies([...selectedCompanies, companyId])
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Submit New Idea</DialogTitle>
          <DialogDescription>
            Share your sustainability idea with the Virgin ecosystem. Great ideas can become initiatives!
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto pr-1 flex-1">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Idea Title</Label>
              <Input
                id="title"
                placeholder="Enter a clear, descriptive title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="environmental">Environmental</SelectItem>
                  <SelectItem value="social">Social Impact</SelectItem>
                  <SelectItem value="circular">Circular Economy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your idea in detail. What problem does it solve? How could it be implemented?"
                className="min-h-[150px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="looking-for-collaborators"
                checked={lookingForCollaborators}
                onCheckedChange={(checked) => setLookingForCollaborators(checked as boolean)}
              />
              <Label htmlFor="looking-for-collaborators">Looking for collaborators</Label>
            </div>

            {lookingForCollaborators && (
              <div className="space-y-2">
                <Label>Potential Collaborating Companies</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Select companies you'd like to collaborate with on this idea
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {companies.map((company) => (
                    <div
                      key={company.id}
                      className={`flex items-center gap-2 p-2 rounded-md border cursor-pointer transition-colors ${
                        selectedCompanies.includes(company.id) ? "bg-primary/10 border-primary" : "hover:bg-muted"
                      }`}
                      onClick={() => toggleCompany(company.id)}
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{company.initials}</AvatarFallback>
                      </Avatar>
                      <span>{company.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="expected-impact">Expected Impact</Label>
              <Textarea
                id="expected-impact"
                placeholder="What impact do you expect this idea to have? How many people might it affect?"
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="resources">Resources Needed</Label>
              <Textarea
                id="resources"
                placeholder="What resources would be needed to implement this idea?"
                className="min-h-[80px]"
              />
            </div>
          </form>
        </div>

        <DialogFooter className="mt-4 pt-4 border-t">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Submit Idea
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

