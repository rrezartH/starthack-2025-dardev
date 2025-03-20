"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { initiatives, categories } from "@/lib/data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, MapPin } from "lucide-react"

export default function MapPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedInitiative, setSelectedInitiative] = useState<string | null>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  // Filter initiatives by category
  const filteredInitiatives =
    selectedCategory === "All"
      ? initiatives
      : initiatives.filter((initiative) => initiative.category === selectedCategory)

  // Get selected initiative details
  const selectedInitiativeDetails = initiatives.find((initiative) => initiative.id === selectedInitiative)

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

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
        <h1 className="text-3xl font-bold text-primary">Geographical Impact</h1>
        <p className="mt-2 text-muted-foreground">Explore Virgin's sustainability initiatives around the world</p>
      </div>

      <div className="mb-8 flex items-center justify-between">
        <div className="text-sm">
          Showing {filteredInitiatives.length} initiatives
          {selectedCategory !== "All" && ` in ${selectedCategory}`}
        </div>

        <div className="w-[200px]">
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <div
              ref={mapRef}
              className="relative h-[500px] w-full bg-muted"
              style={{
                backgroundImage: "url('/placeholder.svg?height=500&width=800')",
                backgroundSize: "cover",
              }}
            >
              {mapLoaded ? (
                <>
                  {filteredInitiatives.map((initiative) => (
                    <button
                      key={initiative.id}
                      className={`absolute z-10 transform -translate-x-1/2 -translate-y-1/2 transition-all ${
                        selectedInitiative === initiative.id ? "scale-125" : "hover:scale-110"
                      }`}
                      style={{
                        left: `${((initiative.location.lng + 180) / 360) * 100}%`,
                        top: `${((90 - initiative.location.lat) / 180) * 100}%`,
                      }}
                      onClick={() => setSelectedInitiative(initiative.id)}
                    >
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          selectedInitiative === initiative.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-background text-primary"
                        } shadow-md`}
                      >
                        <MapPin className="h-5 w-5" />
                      </div>
                    </button>
                  ))}
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    <p className="mt-2 text-sm text-muted-foreground">Loading map...</p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        <div>
          {selectedInitiativeDetails ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{selectedInitiativeDetails.category}</Badge>
                  <Badge
                    variant={
                      selectedInitiativeDetails.status === "active"
                        ? "default"
                        : selectedInitiativeDetails.status === "completed"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {selectedInitiativeDetails.status}
                  </Badge>
                </div>
                <CardTitle className="mt-2">{selectedInitiativeDetails.title}</CardTitle>
                <CardDescription className="flex items-center">
                  <MapPin className="mr-1 h-4 w-4" />
                  {selectedInitiativeDetails.location.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{selectedInitiativeDetails.summary}</p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-lg font-bold text-primary">
                      {selectedInitiativeDetails.impact.co2Reduced.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">kg CO₂ Reduced</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-primary">
                      {selectedInitiativeDetails.impact.peopleImpacted.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">People Impacted</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-primary">
                      {selectedInitiativeDetails.impact.resourcesSaved.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">Resources Saved</div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button asChild>
                    <Link href={`/initiatives/${selectedInitiativeDetails.id}`}>View Details</Link>
                  </Button>
                  <Button variant="outline">{selectedInitiativeDetails.callToAction}</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Initiative Details</CardTitle>
                <CardDescription>Select an initiative on the map to view details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Click on any marker on the map to see detailed information about that sustainability initiative.
                  </p>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Initiative Count by Region:</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Global</span>
                        <span className="text-sm font-medium">
                          {initiatives.filter((i) => i.location.name === "Global").length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">North America</span>
                        <span className="text-sm font-medium">
                          {
                            initiatives.filter(
                              (i) =>
                                i.location.lat > 20 &&
                                i.location.lat < 70 &&
                                i.location.lng > -140 &&
                                i.location.lng < -50,
                            ).length
                          }
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Europe</span>
                        <span className="text-sm font-medium">
                          {
                            initiatives.filter(
                              (i) =>
                                i.location.lat > 35 &&
                                i.location.lat < 70 &&
                                i.location.lng > -10 &&
                                i.location.lng < 40,
                            ).length
                          }
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Asia Pacific</span>
                        <span className="text-sm font-medium">
                          {
                            initiatives.filter(
                              (i) =>
                                i.location.lat > -40 &&
                                i.location.lat < 40 &&
                                i.location.lng > 100 &&
                                i.location.lng < 180,
                            ).length
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Initiatives List</CardTitle>
              <CardDescription>
                All initiatives in {selectedCategory === "All" ? "all categories" : selectedCategory}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2">
                {filteredInitiatives.map((initiative) => (
                  <button
                    key={initiative.id}
                    className={`w-full rounded-md p-2 text-left transition-colors ${
                      selectedInitiative === initiative.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                    onClick={() => setSelectedInitiative(initiative.id)}
                  >
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 shrink-0" />
                      <div>
                        <div className="text-sm font-medium line-clamp-1">{initiative.title}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1">{initiative.location.name}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

