"use client"

import { useState } from "react"
import Header from "@/components/header"
import IdeaCard from "@/components/idea-card"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus, Users } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AddIdeaDialog from "@/components/add-idea-dialog"

export default function IdeasPage() {
  // Sample data for ideas
  const allIdeas = [
    {
      id: "1",
      title: "Cross-Brand Recycling Program",
      description:
        "Create a unified recycling system across all Virgin properties that allows customers to drop off recyclables at any location. This would increase recycling rates and create a consistent sustainability experience across the Virgin ecosystem.",
      author: {
        name: "Sarah Johnson",
        company: "Virgin Hotels",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "SJ",
      },
      category: "circular" as const,
      votes: 24,
      comments: 8,
      lookingForCollaborators: true,
      date: "2 days ago",
    },
    {
      id: "2",
      title: "Community Solar Initiative",
      description:
        "Partner with local communities to install solar panels on public buildings, with Virgin providing initial funding and technical expertise. The energy generated could be shared between Virgin properties and the community.",
      author: {
        name: "Michael Chen",
        company: "Virgin Media",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "MC",
      },
      category: "environmental" as const,
      votes: 18,
      comments: 5,
      lookingForCollaborators: true,
      date: "3 days ago",
    },
    {
      id: "3",
      title: "Digital Skills for All",
      description:
        "Launch a program to provide digital literacy training to underserved communities, leveraging Virgin Media's expertise and infrastructure. This could help bridge the digital divide and create more inclusive communities.",
      author: {
        name: "Emma Wilson",
        company: "Virgin Media",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "EW",
      },
      category: "social" as const,
      votes: 32,
      comments: 12,
      lookingForCollaborators: false,
      date: "5 days ago",
    },
    {
      id: "4",
      title: "Sustainable Travel Rewards",
      description:
        "Create a rewards program that incentivizes sustainable travel choices across Virgin Atlantic, Virgin Voyages, and Virgin Hotels. Customers could earn points for choosing eco-friendly options like carbon offsets or plant-based meals.",
      author: {
        name: "James Taylor",
        company: "Virgin Atlantic",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "JT",
      },
      category: "environmental" as const,
      votes: 15,
      comments: 7,
      lookingForCollaborators: true,
      date: "1 week ago",
    },
    {
      id: "5",
      title: "Plastic-Free Packaging Alliance",
      description:
        "Form an alliance with suppliers to eliminate plastic packaging across all Virgin businesses. By leveraging our combined purchasing power, we could drive industry-wide change in packaging practices.",
      author: {
        name: "David Lee",
        company: "Virgin Voyages",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "DL",
      },
      category: "circular" as const,
      votes: 29,
      comments: 10,
      lookingForCollaborators: true,
      date: "1 week ago",
    },
    {
      id: "6",
      title: "Employee Volunteer Program",
      description:
        "Create a cross-company volunteer program that allows employees from different Virgin businesses to collaborate on community service projects. This would strengthen our social impact and build connections across the ecosystem.",
      author: {
        name: "Lisa Thompson",
        company: "Virgin Hotels",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "LT",
      },
      category: "social" as const,
      votes: 21,
      comments: 9,
      lookingForCollaborators: false,
      date: "2 weeks ago",
    },
  ]

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSort, setSelectedSort] = useState("votes")
  const [collaboratorsOnly, setCollaboratorsOnly] = useState(false)
  const [isAddIdeaOpen, setIsAddIdeaOpen] = useState(false)

  // Filter ideas based on search, category, and collaborators
  const filteredIdeas = allIdeas.filter((idea) => {
    const matchesSearch =
      searchQuery === "" ||
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || idea.category === selectedCategory

    const matchesCollaborators = !collaboratorsOnly || idea.lookingForCollaborators

    return matchesSearch && matchesCategory && matchesCollaborators
  })

  // Sort ideas
  const sortedIdeas = [...filteredIdeas].sort((a, b) => {
    switch (selectedSort) {
      case "votes":
        return b.votes - a.votes
      case "comments":
        return b.comments - a.comments
      case "recent":
        // Simple date sorting (in a real app, would use actual date objects)
        return a.date.localeCompare(b.date)
      default:
        return 0
    }
  })

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Idea Board</h1>
            <p className="text-muted-foreground">Share, discuss, and collaborate on new sustainability concepts</p>
          </div>
          <Button onClick={() => setIsAddIdeaOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Submit New Idea
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid gap-4 md:grid-cols-12">
              <div className="relative md:col-span-5">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search ideas..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="md:col-span-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="environmental">Environmental</SelectItem>
                    <SelectItem value="social">Social Impact</SelectItem>
                    <SelectItem value="circular">Circular Economy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <Select value={selectedSort} onValueChange={setSelectedSort}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="votes">Most Votes</SelectItem>
                    <SelectItem value="comments">Most Comments</SelectItem>
                    <SelectItem value="recent">Most Recent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-3">
                <Button
                  variant={collaboratorsOnly ? "default" : "outline"}
                  className="w-full"
                  onClick={() => setCollaboratorsOnly(!collaboratorsOnly)}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Seeking Collaborators
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedIdeas.length > 0 ? (
            sortedIdeas.map((idea) => (
              <IdeaCard
                key={idea.id}
                id={idea.id}
                title={idea.title}
                description={idea.description}
                author={idea.author}
                category={idea.category}
                votes={idea.votes}
                comments={idea.comments}
                lookingForCollaborators={idea.lookingForCollaborators}
                date={idea.date}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-3">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-medium">No ideas found</h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-md">
                We couldn't find any ideas matching your search criteria. Try adjusting your filters or submit a new
                idea.
              </p>
              <Button className="mt-4" onClick={() => setIsAddIdeaOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Submit New Idea
              </Button>
            </div>
          )}
        </div>
      </div>

      <AddIdeaDialog open={isAddIdeaOpen} onOpenChange={setIsAddIdeaOpen} />
    </div>
  )
}

