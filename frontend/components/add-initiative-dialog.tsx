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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2 } from "lucide-react"

interface AddInitiativeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (data: any) => void
}

export default function AddInitiativeDialog({ open, onOpenChange, onSubmit }: AddInitiativeDialogProps) {
  const [activeTab, setActiveTab] = useState("basic")
  const [objectives, setObjectives] = useState<string[]>([""])

  const handleAddObjective = () => {
    setObjectives([...objectives, ""])
  }

  const handleRemoveObjective = (index: number) => {
    const newObjectives = [...objectives]
    newObjectives.splice(index, 1)
    setObjectives(newObjectives)
  }

  const handleObjectiveChange = (index: number, value: string) => {
    const newObjectives = [...objectives]
    newObjectives[index] = value
    setObjectives(newObjectives)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would collect all form data here
    // and pass it to the onSubmit handler
    onOpenChange(false)
  }

  const handleNextTab = () => {
    if (activeTab === "basic") setActiveTab("details")
    else if (activeTab === "details") setActiveTab("impact")
  }

  const handlePreviousTab = () => {
    if (activeTab === "impact") setActiveTab("details")
    else if (activeTab === "details") setActiveTab("basic")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Create New Initiative</DialogTitle>
          <DialogDescription>
            Add a new sustainability initiative to collaborate with other Virgin companies.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="details">Details & Objectives</TabsTrigger>
            <TabsTrigger value="impact">Impact & Timeline</TabsTrigger>
          </TabsList>

          <div className="overflow-y-auto flex-1 pr-2">
            <TabsContent value="basic" className="space-y-4 mt-0">
              <div className="space-y-2">
                <Label htmlFor="title">Initiative Title</Label>
                <Input id="title" placeholder="Enter a clear, descriptive title" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="climate-action">Climate Action</SelectItem>
                      <SelectItem value="ocean-conservation">Ocean Conservation</SelectItem>
                      <SelectItem value="clean-energy">Clean Energy</SelectItem>
                      <SelectItem value="responsible-consumption">Responsible Consumption</SelectItem>
                      <SelectItem value="waste-reduction">Waste Reduction</SelectItem>
                      <SelectItem value="conservation">Conservation</SelectItem>
                      <SelectItem value="responsible-travel">Responsible Travel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Lead Company</Label>
                  <Select>
                    <SelectTrigger id="company">
                      <SelectValue placeholder="Select company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="virgin-atlantic">Virgin Atlantic</SelectItem>
                      <SelectItem value="virgin-voyages">Virgin Voyages</SelectItem>
                      <SelectItem value="virgin-hotels">Virgin Hotels</SelectItem>
                      <SelectItem value="virgin-media">Virgin Media</SelectItem>
                      <SelectItem value="virgin-active">Virgin Active</SelectItem>
                      <SelectItem value="virgin-galactic">Virgin Galactic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="summary">Summary</Label>
                <Textarea
                  id="summary"
                  placeholder="Provide a brief summary of the initiative"
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="e.g., Global, London, Caribbean" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planned">Planned</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4 mt-0">
              <div className="space-y-2">
                <Label htmlFor="main-goal">Main Goal</Label>
                <Textarea
                  id="main-goal"
                  placeholder="What is the primary goal of this initiative?"
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Key Objectives</Label>
                  <Button type="button" variant="outline" size="sm" onClick={handleAddObjective}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Objective
                  </Button>
                </div>

                <div className="space-y-2">
                  {objectives.map((objective, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={objective}
                        onChange={(e) => handleObjectiveChange(index, e.target.value)}
                        placeholder={`Objective ${index + 1}`}
                      />
                      {objectives.length > 1 && (
                        <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveObjective(index)}>
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide a comprehensive description of the initiative"
                  className="min-h-[150px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="call-to-action">Call to Action</Label>
                <Input
                  id="call-to-action"
                  placeholder="e.g., Join the Clean Ocean Movement, Support Carbon Neutral Flights"
                />
              </div>
            </TabsContent>

            <TabsContent value="impact" className="space-y-4 mt-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="co2-reduced">Estimated CO₂ Reduction (kg)</Label>
                  <Input id="co2-reduced" type="number" placeholder="0" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="people-impacted">People Impacted</Label>
                  <Input id="people-impacted" type="number" placeholder="0" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="resources-saved">Resources Saved (kg)</Label>
                  <Input id="resources-saved" type="number" placeholder="0" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="target-date">Target Completion Date</Label>
                  <Input id="target-date" type="date" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="collaborators">Potential Collaborators</Label>
                <Select>
                  <SelectTrigger id="collaborators">
                    <SelectValue placeholder="Select companies to collaborate with" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="virgin-atlantic">Virgin Atlantic</SelectItem>
                    <SelectItem value="virgin-voyages">Virgin Voyages</SelectItem>
                    <SelectItem value="virgin-hotels">Virgin Hotels</SelectItem>
                    <SelectItem value="virgin-media">Virgin Media</SelectItem>
                    <SelectItem value="virgin-active">Virgin Active</SelectItem>
                    <SelectItem value="virgin-galactic">Virgin Galactic</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  These companies will be notified about this initiative
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Cover Image URL</Label>
                <Input id="image" placeholder="https://example.com/image.jpg" />
                <p className="text-xs text-muted-foreground mt-1">
                  Provide a URL for an image that represents this initiative
                </p>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <DialogFooter className="flex items-center justify-between mt-4 pt-4 border-t">
          {activeTab !== "basic" ? (
            <Button type="button" variant="outline" onClick={handlePreviousTab}>
              Previous
            </Button>
          ) : (
            <div></div>
          )}

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>

            {activeTab !== "impact" ? (
              <Button type="button" onClick={handleNextTab}>
                Next
              </Button>
            ) : (
              <Button type="button" onClick={handleSubmit}>
                Create Initiative
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

