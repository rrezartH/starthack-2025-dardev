"use client";

import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart, Download, Filter, LineChart, PieChart } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Sustainability Impact Analytics
            </h1>
            <p className="text-muted-foreground">
              Measure and analyze the impact of sustainability initiatives
              across the Virgin ecosystem
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Select defaultValue="30d">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/*         <Tabs defaultValue="overview" className="mb-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger
              value="environmental"
              className="flex items-center gap-1"
            >
              <Globe className="h-3.5 w-3.5" />
              Environmental
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-1">
              <Heart className="h-3.5 w-3.5" />
              Social
            </TabsTrigger>
            <TabsTrigger value="circular" className="flex items-center gap-1">
              <Recycle className="h-3.5 w-3.5" />
              Circular
            </TabsTrigger>
            <TabsTrigger value="companies">Companies</TabsTrigger>
          </TabsList>
        </Tabs>
 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-6">
          <Card className="border-l-4 border-l-[hsl(var(--eco-green))]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Carbon Footprint Reduction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42.5%</div>
              <div className="mt-1 flex items-center text-xs text-muted-foreground">
                <span className="text-[hsl(var(--eco-green))] mr-1">
                  ↑ 12.3%
                </span>
                <span>vs. 2019 baseline</span>
              </div>
              <div className="mt-4 h-[80px] flex items-center justify-center bg-muted/20 rounded-md">
                <LineChart className="h-8 w-8 text-[hsl(var(--eco-green))]" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-[hsl(var(--eco-blue))]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                People Positively Impacted
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.2M</div>
              <div className="mt-1 flex items-center text-xs text-muted-foreground">
                <span className="text-[hsl(var(--eco-blue))] mr-1">
                  ↑ 15.7%
                </span>
                <span>across all initiatives</span>
              </div>
              <div className="mt-4 h-[80px] flex items-center justify-center bg-muted/20 rounded-md">
                <BarChart className="h-8 w-8 text-[hsl(var(--eco-blue))]" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-[hsl(var(--eco-orange))]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Waste Diverted from Landfill
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68.3%</div>
              <div className="mt-1 flex items-center text-xs text-muted-foreground">
                <span className="text-[hsl(var(--eco-orange))] mr-1">
                  ↑ 5.2%
                </span>
                <span>year to date</span>
              </div>
              <div className="mt-4 h-[80px] flex items-center justify-center bg-muted/20 rounded-md">
                <PieChart className="h-8 w-8 text-[hsl(var(--eco-orange))]" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-6 lg:grid-cols-12">
          <div className="md:col-span-8">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Sustainability Impact Trends</CardTitle>
                <CardDescription>
                  Track progress across key sustainability metrics over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md">
                  <div className="flex flex-col items-center text-muted-foreground">
                    <LineChart className="h-10 w-10 mb-2" />
                    <span>Impact trends visualization</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-4">
            <div className="grid gap-6 grid-cols-1">
              <Card>
                <CardHeader>
                  <CardTitle>Initiative Categories</CardTitle>
                  <CardDescription>Distribution by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-md">
                    <div className="flex flex-col items-center text-muted-foreground">
                      <PieChart className="h-10 w-10 mb-2" />
                      <span>Category distribution chart</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Company Participation</CardTitle>
                  <CardDescription>Initiatives by company</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-md">
                    <div className="flex flex-col items-center text-muted-foreground">
                      <BarChart className="h-10 w-10 mb-2" />
                      <span>Company participation chart</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Environmental Impact</CardTitle>
              <CardDescription>Key environmental metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Carbon Emissions Reduced</span>
                    <span className="text-sm font-medium">1.2M tons</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-[hsl(var(--eco-green))]"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-muted-foreground">
                      65% of 2025 target
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Renewable Energy Adoption</span>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-[hsl(var(--eco-green))]"
                      style={{ width: "78%" }}
                    ></div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-muted-foreground">
                      78% of 100% target
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Water Conservation</span>
                    <span className="text-sm font-medium">320M gallons</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-[hsl(var(--eco-green))]"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-muted-foreground">
                      45% of 2025 target
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Social Impact</CardTitle>
              <CardDescription>Key social metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Community Investment</span>
                    <span className="text-sm font-medium">$12.5M</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-[hsl(var(--eco-blue))]"
                      style={{ width: "83%" }}
                    ></div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-muted-foreground">
                      83% of 2025 target
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Digital Inclusion</span>
                    <span className="text-sm font-medium">1.8M people</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-[hsl(var(--eco-blue))]"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-muted-foreground">
                      60% of 2025 target
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Employee Volunteer Hours</span>
                    <span className="text-sm font-medium">125,000 hours</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-[hsl(var(--eco-blue))]"
                      style={{ width: "72%" }}
                    ></div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-xs text-muted-foreground">
                      72% of 2025 target
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
