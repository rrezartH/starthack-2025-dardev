"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Header from "@/components/header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Edit,
  Trash2,
  TrendingDown,
  TrendingUp,
  Users,
  Building,
  Globe,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BarChart3,
  Leaf,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Eye,
  Download,
} from "lucide-react"
import { virginCompanies } from "@/lib/virgin-companies-data"

export default function CompanyDetailPage() {
  const params = useParams()
  const router = useRouter()
  const companyId = params.id as string
  const [company, setCompany] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Find the company by ID
    const foundCompany = virginCompanies.find((c) => c.id === companyId)

    if (foundCompany) {
      // Enhance the company with additional mock data for the detail view
      setCompany({
        ...foundCompany,
        email: `info@${foundCompany.website}`,
        phone: "+1 (555) 123-4567",
        address: "123 Virgin Way, London, UK",
        description: `${foundCompany.name} is a key part of the Virgin Group, committed to sustainable business practices and reducing environmental impact across all operations.`,
        employees: Math.floor(Math.random() * 5000) + 500,
        founded: 2000 + Math.floor(Math.random() * 20),
        sustainabilityScore: Math.floor(Math.random() * 40) + 60,
        sustainabilityGoals: [
          { name: "Carbon Neutrality", target: "2030", progress: Math.floor(Math.random() * 60) + 20 },
          { name: "Zero Waste", target: "2028", progress: Math.floor(Math.random() * 70) + 10 },
          { name: "Renewable Energy", target: "2025", progress: Math.floor(Math.random() * 50) + 40 },
        ],
        recentInitiatives: [
          {
            id: "init-1",
            name: "Solar Panel Installation",
            status: "Completed",
            date: "2023-11-15",
            impact: "Reduced carbon emissions by 15%",
          },
          {
            id: "init-2",
            name: "Waste Reduction Program",
            status: "In Progress",
            date: "2024-01-10",
            impact: "On track to reduce waste by 30%",
          },
          {
            id: "init-3",
            name: "Employee Sustainability Training",
            status: "Planned",
            date: "2024-06-01",
            impact: "Expected to improve sustainability awareness by 50%",
          },
        ],
        keyMetrics: [
          {
            name: "Energy Consumption",
            value: `${Math.floor(Math.random() * 500) + 1000} MWh`,
            trend: Math.random() > 0.5 ? -1 : 1,
          },
          {
            name: "Water Usage",
            value: `${Math.floor(Math.random() * 1000) + 5000} m³`,
            trend: Math.random() > 0.5 ? -1 : 1,
          },
          {
            name: "Waste Generated",
            value: `${Math.floor(Math.random() * 100) + 200} tons`,
            trend: Math.random() > 0.5 ? -1 : 1,
          },
        ],
        carbonFootprint: {
          current: Math.floor(Math.random() * 100000) + 50000,
          trend: (Math.random() - 0.5) * 0.2, // Random trend between -20% and +20%
        },
      })
    }

    setLoading(false)
  }, [companyId])

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6">
            <div className="flex items-center space-x-4 mb-6">
              <Button variant="outline" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="h-8 w-64 bg-muted animate-pulse rounded-md"></div>
            </div>
            <div className="grid gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="h-7 w-48 bg-muted animate-pulse rounded-md"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-24 bg-muted animate-pulse rounded-md"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="h-20 bg-muted animate-pulse rounded-md"></div>
                      <div className="h-20 bg-muted animate-pulse rounded-md"></div>
                      <div className="h-20 bg-muted animate-pulse rounded-md"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    )
  }

  if (!company) {
    return (
      <div className="flex min-h-screen">
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6">
            <div className="flex items-center space-x-4 mb-6">
              <Button variant="outline" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-bold tracking-tight">Company Not Found</h1>
            </div>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Company Not Found</h2>
                  <p className="text-muted-foreground mb-6">
                    The company you are looking for does not exist or has been removed.
                  </p>
                  <Button asChild>
                    <Link href="/companies">Back to Companies</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="flex items-center space-x-4 mb-6">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{company.name}</h1>
              <p className="text-muted-foreground">
                {company.category} • {company.status === "active" ? "Active" : "Inactive"}
              </p>
            </div>
            <div className="ml-auto space-x-2">
              <Button variant="outline" asChild>
                <Link href={`/admin/companies/${company.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Company
                </Link>
              </Button>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="initiatives">Initiatives</TabsTrigger>
              <TabsTrigger value="metrics">Metrics</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Company Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4 mb-6">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={company.logo} alt={company.name} />
                        <AvatarFallback>{company.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold">{company.name}</h3>
                        <p className="text-sm text-muted-foreground">{company.description}</p>
                      </div>
                    </div>

                    <div className="grid gap-4">
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                        <a
                          href={`https://${company.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm hover:underline"
                        >
                          {company.website}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{company.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{company.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{company.address}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{company.employees.toLocaleString()} Employees</span>
                      </div>
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Founded {company.founded}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Sustainability Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Sustainability Score</span>
                        <span className="text-sm font-medium">{company.sustainabilityScore}/100</span>
                      </div>
                      <Progress value={company.sustainabilityScore} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-2">
                        Based on carbon footprint, initiatives, and sustainability goals
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold">Carbon Footprint</h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold">
                            {(company.carbonFootprint.current / 1000).toFixed(1)}K
                          </div>
                          <div className="text-xs text-muted-foreground">tons CO₂e</div>
                        </div>
                        <div
                          className={`flex items-center ${company.carbonFootprint.trend < 0 ? "text-green-500" : "text-red-500"}`}
                        >
                          {company.carbonFootprint.trend < 0 ? (
                            <TrendingDown className="h-4 w-4 mr-1" />
                          ) : (
                            <TrendingUp className="h-4 w-4 mr-1" />
                          )}
                          <span>{Math.abs(company.carbonFootprint.trend).toFixed(1)}% YoY</span>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div>
                      <h4 className="text-sm font-semibold mb-3">Sustainability Goals</h4>
                      <div className="space-y-3">
                        {company.sustainabilityGoals.map((goal: any, index: number) => (
                          <div key={index}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm">{goal.name}</span>
                              <span className="text-xs text-muted-foreground">Target: {goal.target}</span>
                            </div>
                            <Progress value={goal.progress} className="h-2" />
                            <div className="flex justify-end mt-1">
                              <span className="text-xs text-muted-foreground">{goal.progress}% complete</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Recent Initiatives</CardTitle>
                  <CardDescription>Latest sustainability initiatives by {company.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    {company.recentInitiatives.map((initiative: any) => (
                      <Card key={initiative.id}>
                        <CardHeader className="p-4 pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-base">{initiative.name}</CardTitle>
                            <Badge
                              variant={
                                initiative.status === "Completed"
                                  ? "default"
                                  : initiative.status === "In Progress"
                                    ? "secondary"
                                    : "outline"
                              }
                              className={initiative.status === "Completed" ? "bg-green-500" : ""}
                            >
                              {initiative.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-2">
                          <div className="flex items-center text-xs text-muted-foreground mb-2">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(initiative.date).toLocaleDateString()}
                          </div>
                          <p className="text-sm">{initiative.impact}</p>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <Button variant="outline" size="sm" className="w-full" asChild>
                            <Link href={`/initiatives/${initiative.id}`}>View Details</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center border-t px-6 py-4">
                  <Button variant="outline" asChild>
                    <Link href={`/initiatives?company=${company.id}`}>View All Initiatives</Link>
                  </Button>
                </CardFooter>
              </Card>

              <div className="grid gap-6 md:grid-cols-3">
                {company.keyMetrics.map((metric: any, index: number) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{metric.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">{metric.value}</div>
                        <div className={`flex items-center ${metric.trend < 0 ? "text-green-500" : "text-red-500"}`}>
                          {metric.trend < 0 ? (
                            <TrendingDown className="h-4 w-4 mr-1" />
                          ) : (
                            <TrendingUp className="h-4 w-4 mr-1" />
                          )}
                          <span>{Math.abs(Math.floor(Math.random() * 15) + 1)}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="initiatives" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Sustainability Initiatives</CardTitle>
                      <CardDescription>All initiatives by {company.name}</CardDescription>
                    </div>
                    <Button>
                      <Leaf className="mr-2 h-4 w-4" />
                      Add Initiative
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 p-4 font-medium border-b">
                      <div className="col-span-4">Initiative</div>
                      <div className="col-span-2">Status</div>
                      <div className="col-span-2">Date</div>
                      <div className="col-span-3">Impact</div>
                      <div className="col-span-1"></div>
                    </div>
                    {[...company.recentInitiatives, ...Array(4).fill(null)]
                      .slice(0, 7)
                      .map((initiative: any, index: number) => {
                        // Generate random initiatives for the extras
                        const init = initiative || {
                          id: `init-extra-${index}`,
                          name: [
                            "Energy Efficiency Upgrade",
                            "Sustainable Supply Chain",
                            "Green Office Initiative",
                            "Carbon Offset Program",
                            "Plastic Reduction Campaign",
                          ][Math.floor(Math.random() * 5)],
                          status: ["Completed", "In Progress", "Planned"][Math.floor(Math.random() * 3)],
                          date: new Date(
                            2023 + Math.floor(Math.random() * 2),
                            Math.floor(Math.random() * 12),
                            Math.floor(Math.random() * 28) + 1,
                          )
                            .toISOString()
                            .split("T")[0],
                          impact: [
                            "Reduced energy consumption by 12%",
                            "Decreased packaging waste by 30%",
                            "Cut carbon emissions by 25%",
                            "Saved 500,000 liters of water annually",
                            "Eliminated 2 tons of single-use plastic",
                          ][Math.floor(Math.random() * 5)],
                        }

                        return (
                          <div key={init.id} className="grid grid-cols-12 p-4 border-b items-center">
                            <div className="col-span-4 font-medium">{init.name}</div>
                            <div className="col-span-2">
                              <Badge
                                variant={
                                  init.status === "Completed"
                                    ? "default"
                                    : init.status === "In Progress"
                                      ? "secondary"
                                      : "outline"
                                }
                                className={init.status === "Completed" ? "bg-green-500" : ""}
                              >
                                {init.status === "Completed" ? (
                                  <CheckCircle2 className="mr-1 h-3 w-3" />
                                ) : init.status === "In Progress" ? (
                                  <Clock className="mr-1 h-3 w-3" />
                                ) : (
                                  <Calendar className="mr-1 h-3 w-3" />
                                )}
                                {init.status}
                              </Badge>
                            </div>
                            <div className="col-span-2 text-sm text-muted-foreground">
                              {new Date(init.date).toLocaleDateString()}
                            </div>
                            <div className="col-span-3 text-sm">{init.impact}</div>
                            <div className="col-span-1 text-right">
                              <Button variant="ghost" size="icon" asChild>
                                <Link href={`/initiatives/${init.id}`}>
                                  <Eye className="h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">Showing 7 of {company.initiatives} initiatives</div>
                  <Button variant="outline">View All</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="metrics" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Sustainability Metrics</CardTitle>
                      <CardDescription>Key performance indicators and trends</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                      </Button>
                      <Button>
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Add Metric
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md border border-dashed">
                    <div className="text-center">
                      <BarChart3 className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">Metrics Visualization</h3>
                      <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4">
                        Interactive charts and graphs would be displayed here showing carbon emissions, energy usage,
                        waste reduction, and other sustainability metrics over time.
                      </p>
                      <Button variant="outline">Configure Dashboard</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Company Users</CardTitle>
                      <CardDescription>Manage users with access to {company.name}</CardDescription>
                    </div>
                    <Button>
                      <Users className="mr-2 h-4 w-4" />
                      Add User
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 p-4 font-medium border-b">
                      <div className="col-span-4">User</div>
                      <div className="col-span-3">Role</div>
                      <div className="col-span-3">Last Active</div>
                      <div className="col-span-2 text-right">Actions</div>
                    </div>
                    {Array(5)
                      .fill(null)
                      .map((_, index) => {
                        const roles = ["Admin", "Editor", "Viewer"]
                        const role = roles[Math.floor(Math.random() * roles.length)]
                        const firstName = ["John", "Sarah", "Michael", "Emma", "David"][Math.floor(Math.random() * 5)]
                        const lastName = ["Smith", "Johnson", "Williams", "Brown", "Jones"][
                          Math.floor(Math.random() * 5)
                        ]

                        return (
                          <div key={index} className="grid grid-cols-12 p-4 border-b items-center">
                            <div className="col-span-4 flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarFallback>
                                  {firstName[0]}
                                  {lastName[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">
                                  {firstName} {lastName}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {firstName.toLowerCase()}.{lastName.toLowerCase()}@{company.website}
                                </div>
                              </div>
                            </div>
                            <div className="col-span-3">
                              <Badge
                                variant={role === "Admin" ? "default" : role === "Editor" ? "secondary" : "outline"}
                              >
                                {role}
                              </Badge>
                            </div>
                            <div className="col-span-3 text-sm text-muted-foreground">
                              {new Date(Date.now() - Math.floor(Math.random() * 10) * 86400000).toLocaleDateString()}
                            </div>
                            <div className="col-span-2 flex justify-end space-x-1">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Company Settings</CardTitle>
                  <CardDescription>Manage company information and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md border border-dashed">
                    <div className="text-center">
                      <Building className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">Company Settings</h3>
                      <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4">
                        This section would contain forms to edit company details, notification preferences, integration
                        settings, and other configuration options.
                      </p>
                      <Button variant="outline">Edit Settings</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

