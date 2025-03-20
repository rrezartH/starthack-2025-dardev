"use client";
import ActivityFeed from "@/components/activity-feed";
import Header from "@/components/header";
import IdeaCard from "@/components/idea-card";
import InitiativeCard from "@/components/initiative-card";
import SustainabilityMetricCard from "@/components/sustainability-metric-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  Calendar,
  Globe,
  Heart,
  Leaf,
  LineChart,
  Plus,
  Recycle,
} from "lucide-react";

export default function Dashboard() {
  // Sample data for the activity feed
  const activities = [
    {
      id: "1",
      company: {
        name: "Virgin Atlantic",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "VA",
      },
      action: "launched a new sustainability initiative",
      target: "Carbon Neutral Flying",
      category: "environmental" as const,
      time: "5 minutes ago",
    },
    {
      id: "2",
      company: {
        name: "Virgin Media",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "VM",
      },
      action: "shared impact report",
      target: "Digital Inclusion Program",
      category: "social" as const,
      time: "25 minutes ago",
    },
    {
      id: "3",
      company: {
        name: "Virgin Voyages",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "VV",
      },
      action: "started a collaboration on",
      target: "Ocean Plastic Reduction",
      category: "circular" as const,
      time: "1 hour ago",
    },
    {
      id: "4",
      company: {
        name: "Virgin Hotels",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "VH",
      },
      action: "updated progress on",
      target: "Zero Waste Operations",
      category: "environmental" as const,
      time: "2 hours ago",
    },
    {
      id: "5",
      company: {
        name: "Virgin Active",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "VA",
      },
      action: "proposed a new idea for",
      target: "Community Wellness Program",
      category: "social" as const,
      time: "3 hours ago",
    },
  ];

  // Sample data for initiatives
  const initiatives = [
    {
      id: "1",
      title: "Carbon Neutral Flying",
      description:
        "Developing sustainable aviation fuel and carbon offset programs",
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
        "Partnering with ocean cleanup organizations to remove plastic waste",
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
        "Providing internet access and digital skills to underserved communities",
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
      description:
        "Transitioning all operations to 100% renewable energy sources",
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
  ];

  // Sample data for ideas
  const ideas = [
    {
      id: "1",
      title: "Cross-Brand Recycling Program",
      description:
        "Create a unified recycling system across all Virgin properties that allows customers to drop off recyclables at any location.",
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
        "Partner with local communities to install solar panels on public buildings, with Virgin providing initial funding and technical expertise.",
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
  ];

  // Sample data for upcoming events
  const upcomingEvents = [
    {
      id: "1",
      title: "Sustainability Strategy Meeting",
      date: "Today, 2:00 PM",
      participants: 8,
    },
    {
      id: "2",
      title: "Carbon Reduction Workshop",
      date: "Tomorrow, 10:00 AM",
      participants: 12,
    },
    {
      id: "3",
      title: "Ocean Cleanup Campaign Kickoff",
      date: "Jul 15, 9:30 AM",
      participants: 15,
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">
            Sustainability Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track, collaborate, and amplify sustainability initiatives across
            the Virgin ecosystem
          </p>
        </div>

        {/* Sustainability Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <SustainabilityMetricCard
            title="Carbon Footprint Reduction"
            value="42.5%"
            description="vs. 2019 baseline"
            trend={{ value: 12.3, isPositive: true }}
            icon={<Globe className="h-4 w-4" />}
            type="environmental"
          />
          <SustainabilityMetricCard
            title="People Positively Impacted"
            value="8.2M"
            description="across all initiatives"
            trend={{ value: 15.7, isPositive: true }}
            icon={<Heart className="h-4 w-4" />}
            type="social"
          />
          <SustainabilityMetricCard
            title="Waste Diverted from Landfill"
            value="68.3%"
            description="year to date"
            trend={{ value: 5.2, isPositive: true }}
            icon={<Recycle className="h-4 w-4" />}
            type="circular"
          />
          <SustainabilityMetricCard
            title="Active Initiatives"
            value="24"
            description="across 8 companies"
            icon={<Leaf className="h-4 w-4" />}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-6 lg:grid-cols-12">
          {/* Charts Section */}
          <div className="md:col-span-4 lg:col-span-8">
            <div className="grid gap-6 grid-cols-1">
              {/* Impact Metrics */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        Sustainability Impact
                      </CardTitle>
                      <CardDescription>
                        Track progress across environmental, social, and
                        circular economy initiatives
                      </CardDescription>
                    </div>
                    <Tabs defaultValue="environmental">
                      <TabsList>
                        <TabsTrigger
                          value="environmental"
                          className="flex items-center gap-1"
                        >
                          <Globe className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">
                            Environmental
                          </span>
                        </TabsTrigger>
                        <TabsTrigger
                          value="social"
                          className="flex items-center gap-1"
                        >
                          <Heart className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Social</span>
                        </TabsTrigger>
                        <TabsTrigger
                          value="circular"
                          className="flex items-center gap-1"
                        >
                          <Recycle className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Circular</span>
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                    <div className="flex flex-col items-center text-muted-foreground">
                      <LineChart className="h-10 w-10 mb-2" />
                      <span>Impact metrics visualization</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Initiatives Section */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      Active Initiatives
                    </CardTitle>
                    <Button variant="outline" size="sm">
                      View All
                      <ArrowRight className="ml-2 h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <CardDescription>
                    Monitor ongoing sustainability initiatives across Virgin
                    companies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {initiatives.map((initiative) => (
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
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="md:col-span-2 lg:col-span-4">
            <div className="grid gap-6 grid-cols-1">
              {/* Activity Feed */}
              <ActivityFeed activities={activities} />

              {/* Idea Board Preview */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Latest Ideas</CardTitle>
                    <Button variant="outline" size="sm">
                      View All
                      <ArrowRight className="ml-2 h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <CardDescription>
                    New sustainability concepts from across the ecosystem
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {ideas.map((idea) => (
                    <IdeaCard
                      key={idea.id}
                      title={idea.title}
                      description={idea.description}
                      author={idea.author}
                      category={idea.category}
                      votes={idea.votes}
                      comments={idea.comments}
                      lookingForCollaborators={idea.lookingForCollaborators}
                      date={idea.date}
                    />
                  ))}
                  <Button variant="default" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Submit New Idea
                  </Button>
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Upcoming Events</CardTitle>
                    <Button variant="ghost" size="icon">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div
                        key={event.id}
                        className="flex items-start space-x-4"
                      >
                        <div className="rounded-md bg-primary/10 p-2 text-primary">
                          <Calendar className="h-4 w-4" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {event.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {event.date}
                          </p>
                          <div className="flex items-center pt-1">
                            <div className="flex -space-x-1">
                              {[...Array(Math.min(3, event.participants))].map(
                                (_, i) => (
                                  <Avatar
                                    key={i}
                                    className="h-5 w-5 border-2 border-background"
                                  >
                                    <AvatarFallback className="text-[8px]">
                                      {String.fromCharCode(65 + i)}
                                    </AvatarFallback>
                                  </Avatar>
                                )
                              )}
                            </div>
                            {event.participants > 3 && (
                              <span className="text-xs text-muted-foreground ml-1">
                                +{event.participants - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="mt-4 w-full">
                    View Calendar
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
