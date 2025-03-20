"use client"

import { useState } from "react"
import Link from "next/link"
import { initiatives, categories } from "@/lib/data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function DashboardPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  // Calculate total metrics
  const totalImpact = initiatives.reduce(
    (acc, initiative) => {
      acc.co2Reduced += initiative.impact.co2Reduced
      acc.peopleImpacted += initiative.impact.peopleImpacted
      acc.resourcesSaved += initiative.impact.resourcesSaved
      return acc
    },
    { co2Reduced: 0, peopleImpacted: 0, resourcesSaved: 0 },
  )

  // Calculate engagement metrics
  const totalEngagement = {
    ratings: initiatives.reduce((acc, initiative) => acc + initiative.ratings.count, 0),
    comments: initiatives.reduce((acc, initiative) => acc + initiative.comments.length, 0),
    averageRating: initiatives.reduce((acc, initiative) => acc + initiative.ratings.average, 0) / initiatives.length,
  }

  // Filter initiatives by category
  const filteredInitiatives =
    selectedCategory === "All"
      ? initiatives
      : initiatives.filter((initiative) => initiative.category === selectedCategory)

  // Calculate category distribution
  const categoryDistribution = categories
    .filter((category) => category !== "All")
    .map((category) => {
      const count = initiatives.filter((initiative) => initiative.category === category).length
      return { category, count }
    })
    .sort((a, b) => b.count - a.count)

  // Calculate status distribution
  const statusDistribution = {
    active: initiatives.filter((initiative) => initiative.status === "active").length,
    completed: initiatives.filter((initiative) => initiative.status === "completed").length,
    planned: initiatives.filter((initiative) => initiative.status === "planned").length,
  }

  return (
    <div className="container py-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Initiatives
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary">Impact Dashboard</h1>
        <p className="mt-2 text-muted-foreground">Track the impact of Virgin's sustainability initiatives</p>
      </div>

      <div className="mb-8 flex items-center justify-between">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="ml-4 w-[180px]">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-3xl font-bold text-primary">
                {totalImpact.co2Reduced.toLocaleString()} kg
              </CardTitle>
              <CardDescription>CO₂ Emissions Reduced</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 rounded-full bg-primary" style={{ width: "75%" }}></div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">75% of 2025 target</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-3xl font-bold text-primary">
                {totalImpact.peopleImpacted.toLocaleString()}
              </CardTitle>
              <CardDescription>People Positively Impacted</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 rounded-full bg-primary" style={{ width: "60%" }}></div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">60% of 2025 target</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-3xl font-bold text-primary">
                {totalImpact.resourcesSaved.toLocaleString()} kg
              </CardTitle>
              <CardDescription>Resources Saved</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-2 rounded-full bg-primary" style={{ width: "45%" }}></div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">45% of 2025 target</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Initiative Status</CardTitle>
              <CardDescription>Current status of all initiatives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm">Active</span>
                    <span className="text-sm font-medium">{statusDistribution.active}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{
                        width: `${(statusDistribution.active / initiatives.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm">Completed</span>
                    <span className="text-sm font-medium">{statusDistribution.completed}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-secondary"
                      style={{
                        width: `${(statusDistribution.completed / initiatives.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm">Planned</span>
                    <span className="text-sm font-medium">{statusDistribution.planned}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-muted-foreground"
                      style={{
                        width: `${(statusDistribution.planned / initiatives.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Engagement Metrics</CardTitle>
              <CardDescription>User engagement with initiatives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{totalEngagement.ratings}</div>
                  <div className="text-xs text-muted-foreground">Total Ratings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{totalEngagement.comments}</div>
                  <div className="text-xs text-muted-foreground">Total Comments</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{totalEngagement.averageRating.toFixed(1)}</div>
                  <div className="text-xs text-muted-foreground">Avg. Rating</div>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="mb-2 text-sm font-medium">Most Engaged Initiatives</h4>
                <div className="space-y-2">
                  {initiatives
                    .sort((a, b) => b.ratings.count - a.ratings.count)
                    .slice(0, 3)
                    .map((initiative) => (
                      <div key={initiative.id} className="flex items-center justify-between">
                        <Link href={`/initiatives/${initiative.id}`} className="text-sm hover:text-primary">
                          {initiative.title}
                        </Link>
                        <span className="text-xs text-muted-foreground">{initiative.ratings.count} ratings</span>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Initiatives by Category</CardTitle>
            <CardDescription>Distribution of initiatives across categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryDistribution.map((item) => (
                <div key={item.category}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm">{item.category}</span>
                    <span className="text-sm font-medium">{item.count}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{
                        width: `${(item.count / initiatives.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 text-center">
          <Button asChild>
            <Link href="/map">View Geographical Impact</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

