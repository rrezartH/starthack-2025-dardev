"use client"

import { useState } from "react"
import Header from "@/components/header"
import InitiativeCard from "@/components/initiative-card"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AddInitiativeDialog from "@/components/add-initiative-dialog"

export default function InitiativesPage() {
  // Sample data for initiatives
  const allInitiatives = [
    {
      id: "1",
      title: "Carbon Neutral Flying",
      description:
        "Developing sustainable aviation fuel and carbon offset programs to make Virgin flights carbon neutral by 2030.",
      category: "environmental" as const,
      status: "active" as const,
      progress: 65,
      company: {
        name: "Virgin Atlantic",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "VA",
      },
      impact: {
        primary: {
          value: "250K",
          label: "CO₂ Reduced (tons)",
        },
        secondary: {
          value: "5M",
          label: "People Impacted",
        },
      },
      collaborators: 3,
    },
    {
      id: "2",
      title: "Ocean Plastic Recovery",
      description:
        "Partnering with ocean cleanup organizations to remove plastic waste from the world's oceans and incorporate recycled materials into Virgin products.",
      category: "circular" as const,
      status: "active" as const,
      progress: 42,
      company: {
        name: "Virgin Voyages",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "VV",
      },
      impact: {
        primary: {
          value: "500K",
          label: "Plastic Removed (kg)",
        },
      },
      collaborators: 2,
    },
    {
      id: "3",
      title: "Digital Inclusion Program",
      description:
        "Providing internet access and digital skills training to underserved communities to bridge the digital divide.",
      category: "social" as const,
      status: "active" as const,
      progress: 78,
      company: {
        name: "Virgin Media",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "VM",
      },
      impact: {
        primary: {
          value: "100K",
          label: "People Trained",
        },
        secondary: {
          value: "250",
          label: "Communities Served",
        },
      },
    },
    {
      id: "4",
      title: "Renewable Energy Transition",
      description: "Transitioning all Virgin properties and operations to 100% renewable energy sources by 2025.",
      category: "environmental" as const,
      status: "planned" as const,
      progress: 25,
      company: {
        name: "Virgin Hotels",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "VH",
      },
      impact: {
        primary: {
          value: "30%",
          label: "Energy Converted",
        },
      },
      collaborators: 4,
    },
    {
      id: "5",
      title: "Zero Waste Operations",
      description:
        "Eliminating single-use plastics and implementing comprehensive recycling and composting programs across all Virgin businesses.",
      category: "circular" as const,
      status: "active" as const,
      progress: 55,
      company: {
        name: "Virgin Hotels",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "VH",
      },
      impact: {
        primary: {
          value: "800K",
          label: "Waste Diverted (kg)",
        },
      },
      collaborators: 2,
    },
    {
      id: "6",
      title: "Community Wellness Program",
      description:
        "Supporting local health initiatives and providing access to fitness resources in communities where Virgin operates.",
      category: "social" as const,
      status: "completed" as const,
      progress: 100,
      company: {
        name: "Virgin Active",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "VA",
      },
      impact: {
        primary: {
          value: "50K",
          label: "People Benefited",
        },
      },
    },
    {
      id: "7",
      title: "Sustainable Supply Chain",
      description:
        "Implementing rigorous sustainability standards across Virgin's global supply chain to reduce environmental impact and ensure ethical practices.",
      category: "environmental" as const,
      status: "active" as const,
      progress: 60,
      company: {
        name: "Virgin Group",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "VG",
      },
      impact: {
        primary: {
          value: "320K",
          label: "CO₂ Reduced (tons)",
        },
        secondary: {
          value: "250K",
          label: "Resources Saved (kg)",
        },
      },
      collaborators: 5,
    },
    {
      id: "8",
      title: "Biodiversity Protection",
      description:
        "Supporting conservation projects to protect endangered species and restore natural habitats in regions where Virgin operates.",
      category: "environmental" as const,
      status: "planned" as const,
      progress: 15,
      company: {
        name: "Virgin Limited Edition",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "VL",
      },
      impact: {
        primary: {
          value: "5",
          label: "Habitats Protected",
        },
      },
      collaborators: 2,
    },
  ]

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedCompany, setSelectedCompany] = useState("all")
  const [sortBy, setSortBy] = useState("progress")
  const [isAddInitiativeOpen, setIsAddInitiativeOpen] = useState(false)

  // Filter initiatives based on search, category, status, and company
  const filteredInitiatives = allInitiatives.filter((initiative) => {
    const matchesSearch =
      searchQuery === "" ||
      initiative.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      initiative.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || initiative.category === selectedCategory

    const matchesStatus = selectedStatus === "all" || initiative.status === selectedStatus

    const matchesCompany = selectedCompany === "all" || initiative.company.name === selectedCompany

    return matchesSearch && matchesCategory && matchesStatus && matchesCompany
  })

  // Sort initiatives
  const sortedInitiatives = [...filteredInitiatives].sort((a, b) => {
    switch (sortBy) {
      case "progress":
        return b.progress - a.progress
      case "impact":
        // Simple impact sorting based on primary impact value
        const aImpact = Number.parseInt(a.impact.primary.value.replace(/[^0-9]/g, "")) || 0
        const bImpact = Number.parseInt(b.impact.primary.value.replace(/[^0-9]/g, "")) || 0
        return bImpact - aImpact
      case "collaborators":
        return (b.collaborators || 0) - (a.collaborators || 0)
      default:
        return 0
    }
  })

  // Get unique companies for filter
  const companies = ["all", ...new Set(allInitiatives.map((i) => i.company.name))]

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Sustainability Initiatives</h1>
            <p className="text-muted-foreground">
              Browse, filter, and collaborate on sustainability projects across the Virgin ecosystem
            </p>
          </div>
          <Button onClick={() => setIsAddInitiativeOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Initiative
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid gap-4 md:grid-cols-12">
              <div className="relative md:col-span-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search initiatives..."
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
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="planned">Planned</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                  <SelectTrigger>
                    <SelectValue placeholder="Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Companies</SelectItem>
                    {companies
                      .filter((c) => c !== "all")
                      .map((company) => (
                        <SelectItem key={company} value={company}>
                          {company}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="progress">Progress</SelectItem>
                    <SelectItem value="impact">Impact</SelectItem>
                    <SelectItem value="collaborators">Collaborators</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedInitiatives.length > 0 ? (
            sortedInitiatives.map((initiative) => (
              <InitiativeCard
                key={initiative.id}
                title={initiative.title}
                description={initiative.description}
                category={initiative.category}
                status={initiative.status}
                progress={initiative.progress}
                company={initiative.company}
                impact={initiative.impact}
                collaborators={initiative.collaborators}
                className="hover:shadow-md transition-shadow"
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-3">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-medium">No initiatives found</h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-md">
                We couldn't find any initiatives matching your search criteria. Try adjusting your filters or create a
                new initiative.
              </p>
              <Button className="mt-4" onClick={() => setIsAddInitiativeOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create New Initiative
              </Button>
            </div>
          )}
        </div>
      </div>

      <AddInitiativeDialog open={isAddInitiativeOpen} onOpenChange={setIsAddInitiativeOpen} />
    </div>
  )
}

