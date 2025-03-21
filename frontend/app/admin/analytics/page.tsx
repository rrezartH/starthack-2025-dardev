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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getAllCompaniesForTimeframe } from "@/lib/company-data";
import {
  ArrowUpDown,
  BarChart,
  Building2,
  Download,
  Filter,
  Globe,
  Heart,
  Info,
  LineChart,
  PieChart,
  Recycle,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState("30d");
  const [sortBy, setSortBy] = useState("carbon");
  const [companyData, setCompanyData] = useState<any[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([
    "1",
    "2",
    "3",
  ]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Load company data based on timeframe
  useEffect(() => {
    const data = getAllCompaniesForTimeframe(timeframe);
    setIsAnimating(true);

    // Set the data after a small delay to allow for animation
    setTimeout(() => {
      setCompanyData(data);
      // Reset animation flag after the transition completes
      setTimeout(() => setIsAnimating(false), 600);
    }, 50);
  }, [timeframe]);

  // Filter companies based on selection
  const filteredCompanies = companyData.filter((company) =>
    selectedCompanies.includes(company.id)
  );

  // Sort companies based on selected criteria
  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    if (sortBy === "carbon") {
      return a.carbonFootprint.current - b.carbonFootprint.current;
    } else if (sortBy === "trend") {
      return a.carbonFootprint.trend - b.carbonFootprint.trend;
    } else if (sortBy === "waste") {
      return b.wasteReduction.current - a.wasteReduction.current;
    } else if (sortBy === "renewable") {
      return b.renewableEnergy.current - a.renewableEnergy.current;
    }
    return 0;
  });

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const getTimeframeLabel = () => {
    switch (timeframe) {
      case "30d":
        return "Last 30 Days";
      case "2m":
        return "Last 2 Months";
      case "6m":
        return "Last 6 Months";
      case "1y":
        return "Last Year";
      case "2y":
        return "Last 2 Years";
      default:
        return "Last 30 Days";
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-auto p-6">
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
            <Select
              value={timeframe}
              onValueChange={(value) => setTimeframe(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="2m">Last 2 months</SelectItem>
                <SelectItem value="6m">Last 6 months</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
                <SelectItem value="2y">Last 2 years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="companies" className="mb-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="companies" className="flex items-center gap-1">
              <Building2 className="h-3.5 w-3.5" />
              Companies
            </TabsTrigger>
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
          </TabsList>

          <TabsContent value="overview">
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
                      <CardDescription>
                        Distribution by category
                      </CardDescription>
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
          </TabsContent>

          <TabsContent value="companies">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Compare Companies</CardTitle>
                  <CardDescription>Select companies to compare</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {companyData.map((company) => (
                      <div
                        key={company.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`company-${company.id}`}
                          checked={selectedCompanies.includes(company.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedCompanies([
                                ...selectedCompanies,
                                company.id,
                              ]);
                            } else {
                              setSelectedCompanies(
                                selectedCompanies.filter(
                                  (id) => id !== company.id
                                )
                              );
                            }
                          }}
                        />
                        <Label
                          htmlFor={`company-${company.id}`}
                          className="flex items-center"
                        >
                          <div
                            className="w-2 h-2 rounded-full mr-2"
                            style={{
                              backgroundColor:
                                company.carbonFootprint.trend < 0
                                  ? "#10b981"
                                  : "#ef4444",
                            }}
                          ></div>
                          {company.name}
                        </Label>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <Label className="mb-2 block">Sort By</Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="carbon">Carbon Footprint</SelectItem>
                        <SelectItem value="trend">Carbon Trend</SelectItem>
                        <SelectItem value="waste">Waste Reduction</SelectItem>
                        <SelectItem value="renewable">
                          Renewable Energy
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="mt-6 p-3 bg-muted/30 rounded-md">
                    <div className="flex items-center mb-2">
                      <Info className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        Current Timeframe
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {getTimeframeLabel()}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-3">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Carbon Footprint Comparison</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm">
                            <ArrowUpDown className="h-4 w-4 mr-2" />
                            Sort
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Sort companies by carbon footprint</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardTitle>
                  <CardDescription>
                    Annual CO₂ emissions by company (tons) -{" "}
                    {getTimeframeLabel()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {sortedCompanies.map((company) => (
                      <div key={company.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div
                              className="w-3 h-3 rounded-full mr-2"
                              style={{
                                backgroundColor:
                                  company.carbonFootprint.trend < 0
                                    ? "#10b981"
                                    : "#ef4444",
                              }}
                            ></div>
                            <span className="font-medium">{company.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold">
                              {formatNumber(company.carbonFootprint.current)}
                            </span>
                            <div
                              className={`flex items-center ${
                                company.carbonFootprint.trend < 0
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {company.carbonFootprint.trend < 0 ? (
                                <TrendingDown className="h-4 w-4 mr-1" />
                              ) : (
                                <TrendingUp className="h-4 w-4 mr-1" />
                              )}
                              <span>
                                {Math.abs(company.carbonFootprint.trend)}%
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted relative">
                          <div
                            className={`h-2 rounded-full ${
                              company.carbonFootprint.trend < 0
                                ? "bg-green-500"
                                : "bg-red-500"
                            } transition-all duration-500 ease-in-out ${
                              isAnimating ? "opacity-50" : "opacity-100"
                            }`}
                            style={{
                              width: `${
                                (company.carbonFootprint.current / 1000000) *
                                100
                              }%`,
                            }}
                          ></div>
                          <div
                            className="h-4 w-1 bg-black absolute top-1/2 transform -translate-y-1/2"
                            style={{
                              left: `${
                                (company.carbonFootprint.target2025 / 1000000) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>
                            Current:{" "}
                            {formatNumber(company.carbonFootprint.current)}
                          </span>
                          <span>
                            Previous:{" "}
                            {formatNumber(company.carbonFootprint.previous)}
                          </span>
                          <span>
                            2025 Target:{" "}
                            {formatNumber(company.carbonFootprint.target2025)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                    <div className="flex flex-col items-center text-muted-foreground">
                      <BarChart className="h-10 w-10 mb-2" />
                      <span>Carbon emissions comparison chart</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Waste Reduction Comparison</CardTitle>
                  <CardDescription>
                    Percentage of waste diverted from landfill -{" "}
                    {getTimeframeLabel()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sortedCompanies.map((company) => (
                      <div key={company.id} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{company.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-bold">
                              {company.wasteReduction.current}%
                            </span>
                            <div className="text-green-500 flex items-center">
                              <TrendingUp className="h-4 w-4 mr-1" />
                              <span>{company.wasteReduction.trend}%</span>
                            </div>
                          </div>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-[hsl(var(--eco-orange))] transition-all duration-500 ease-in-out"
                            style={{
                              width: `${company.wasteReduction.current}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Renewable Energy Comparison</CardTitle>
                  <CardDescription>
                    Percentage of energy from renewable sources -{" "}
                    {getTimeframeLabel()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sortedCompanies.map((company) => (
                      <div key={company.id} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{company.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-bold">
                              {company.renewableEnergy.current}%
                            </span>
                            <div className="text-green-500 flex items-center">
                              <TrendingUp className="h-4 w-4 mr-1" />
                              <span>{company.renewableEnergy.trend}%</span>
                            </div>
                          </div>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-[hsl(var(--eco-blue))] transition-all duration-500 ease-in-out"
                            style={{
                              width: `${company.renewableEnergy.current}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="environmental">
            <Card>
              <CardHeader>
                <CardTitle>Environmental Impact</CardTitle>
                <CardDescription>
                  Key environmental metrics - {getTimeframeLabel()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md">
                  <div className="flex flex-col items-center text-muted-foreground">
                    <Globe className="h-10 w-10 mb-2" />
                    <span>Environmental impact visualization</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social">
            <Card>
              <CardHeader>
                <CardTitle>Social Impact</CardTitle>
                <CardDescription>
                  Key social metrics - {getTimeframeLabel()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md">
                  <div className="flex flex-col items-center text-muted-foreground">
                    <Heart className="h-10 w-10 mb-2" />
                    <span>Social impact visualization</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="circular">
            <Card>
              <CardHeader>
                <CardTitle>Circular Economy</CardTitle>
                <CardDescription>
                  Key circular economy metrics - {getTimeframeLabel()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md">
                  <div className="flex flex-col items-center text-muted-foreground">
                    <Recycle className="h-10 w-10 mb-2" />
                    <span>Circular economy visualization</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
