"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { initiatives } from "@/lib/data-mobile";
import { motion } from "framer-motion";
import { ArrowUp, Download, RefreshCw, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Safely calculate metrics with null checks
const safeInitiatives = Array.isArray(initiatives) ? initiatives : [];

// Calculate total metrics with null checks
const totalInitiatives = safeInitiatives.length;
const totalContributions = safeInitiatives.reduce(
  (sum, i) => sum + (i?.contributions || 0),
  0
);
const totalImpact = safeInitiatives.reduce(
  (sum, i) => sum + (i?.impactScore || 0),
  0
);

// Data for category distribution with null check
const categoryData = (() => {
  try {
    const categoryMap = new Map<string, number>();

    safeInitiatives.forEach((initiative) => {
      if (initiative && initiative.category) {
        const currentCount = categoryMap.get(initiative.category) || 0;
        categoryMap.set(initiative.category, currentCount + 1);
      }
    });

    return Array.from(categoryMap).map(([name, value]) => ({ name, value }));
  } catch (error) {
    console.error("Error creating category data:", error);
    return [];
  }
})();

// Data for monthly engagement
const monthlyEngagementData = [
  { name: "Jan", value: 65 },
  { name: "Feb", value: 59 },
  { name: "Mar", value: 80 },
  { name: "Apr", value: 81 },
  { name: "May", value: 56 },
  { name: "Jun", value: 55 },
  { name: "Jul", value: 40 },
  { name: "Aug", value: 70 },
  { name: "Sep", value: 90 },
  { name: "Oct", value: 110 },
  { name: "Nov", value: 130 },
  { name: "Dec", value: 150 },
];

// Data for impact by region
const regionImpactData = [
  { name: "North America", value: 35 },
  { name: "Europe", value: 45 },
  { name: "Asia", value: 25 },
  { name: "Africa", value: 15 },
  { name: "South America", value: 20 },
  { name: "Australia", value: 10 },
];

// Data for carbon reduction over time
const carbonReductionData = [
  { name: "2020", value: 10 },
  { name: "2021", value: 25 },
  { name: "2022", value: 45 },
  { name: "2023", value: 70 },
  { name: "2024", value: 90 },
  { name: "2025", value: 120, projected: true },
];

const COLORS = [
  "#e60000",
  "#ff3333",
  "#ff6666",
  "#ff9999",
  "#ffcccc",
  "#ffe6e6",
];

export default function ImpactDashboard() {
  const [timeRange, setTimeRange] = useState("year");
  const [chartProgress, setChartProgress] = useState({
    category: 0,
    monthly: 0,
    region: 0,
    carbon: 0,
  });
  const { toast } = useToast();

  // Animate charts one by one
  useEffect(() => {
    const timers = [
      setTimeout(
        () => setChartProgress((prev) => ({ ...prev, category: 100 })),
        300
      ),
      setTimeout(
        () => setChartProgress((prev) => ({ ...prev, monthly: 100 })),
        600
      ),
      setTimeout(
        () => setChartProgress((prev) => ({ ...prev, region: 100 })),
        900
      ),
      setTimeout(
        () => setChartProgress((prev) => ({ ...prev, carbon: 100 })),
        1200
      ),
    ];

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  const handleShare = () => {
    toast({
      title: "Share Your Impact",
      description: "Dashboard sharing will be available in the next update!",
      duration: 3000,
    });
  };

  const handleDownload = () => {
    toast({
      title: "Download Report",
      description: "Your impact report is being prepared for download.",
      duration: 3000,
    });
  };

  const handleRefresh = () => {
    toast({
      title: "Refreshing Data",
      description: "Dashboard data is being updated with the latest metrics.",
      duration: 3000,
    });

    // Reset and reanimate charts
    setChartProgress({
      category: 0,
      monthly: 0,
      region: 0,
      carbon: 0,
    });

    setTimeout(
      () =>
        setChartProgress({
          category: 100,
          monthly: 100,
          region: 100,
          carbon: 100,
        }),
      300
    );
  };

  return (
    <div className="p-4 space-y-6">
      <motion.div
        className="flex justify-between items-center mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div>
          <h2 className="text-lg font-bold text-virgin-red">
            Your Impact Dashboard
          </h2>
          <p className="text-xs text-gray-500">
            Last updated: Today at 9:30 AM
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={handleRefresh}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="overflow-hidden border-2 border-virgin-red/10">
          <CardHeader className="p-4 pb-2 bg-gradient-to-r from-virgin-red/10 to-white">
            <CardTitle className="text-sm font-medium">Initiatives</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold text-virgin-red">
              {totalInitiatives}
            </div>
            <div className="flex items-center text-xs text-green-600 font-medium">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>2 new this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-2 border-virgin-red/10">
          <CardHeader className="p-4 pb-2 bg-gradient-to-r from-virgin-red/10 to-white">
            <CardTitle className="text-sm font-medium">Contributions</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold text-virgin-red">
              {totalContributions.toLocaleString()}
            </div>
            <div className="flex items-center text-xs text-green-600 font-medium">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>+15% from last month</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {categoryData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: chartProgress.category > 0 ? 1 : 0,
            y: chartProgress.category > 0 ? 0 : 20,
          }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden border-2 border-virgin-red/10">
            <CardHeader className="p-4 pb-2 bg-gradient-to-r from-virgin-red/10 to-white">
              <CardTitle className="text-sm font-medium">
                Initiative Categories
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 h-64">
              <ChartContainer
                config={
                  {
                    /* add your chart configuration here */
                  }
                }
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#e60000"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      animationBegin={0}
                      animationDuration={1500}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: chartProgress.monthly > 0 ? 1 : 0,
          y: chartProgress.monthly > 0 ? 0 : 20,
        }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden border-2 border-virgin-red/10">
          <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between bg-gradient-to-r from-virgin-red/10 to-white">
            <CardTitle className="text-sm font-medium">
              Engagement Trends
            </CardTitle>
            <Tabs
              defaultValue="year"
              className="w-[160px]"
              onValueChange={setTimeRange}
            >
              <TabsList className="grid w-full grid-cols-3 h-8">
                <TabsTrigger value="month" className="text-xs">
                  Month
                </TabsTrigger>
                <TabsTrigger value="quarter" className="text-xs">
                  Quarter
                </TabsTrigger>
                <TabsTrigger value="year" className="text-xs">
                  Year
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="p-4 pt-0 h-64">
            <ChartContainer
              config={
                {
                  /* add your chart configuration here */
                }
              }
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={monthlyEngagementData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#e60000" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#e60000"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<ChartTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#e60000"
                    fillOpacity={1}
                    fill="url(#colorValue)"
                    strokeWidth={2}
                    animationBegin={0}
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: chartProgress.region > 0 ? 1 : 0,
          y: chartProgress.region > 0 ? 0 : 20,
        }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden border-2 border-virgin-red/10">
          <CardHeader className="p-4 pb-2 bg-gradient-to-r from-virgin-red/10 to-white">
            <CardTitle className="text-sm font-medium">
              Impact by Region
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 h-64">
            <ChartContainer
              config={
                {
                  /* add your chart configuration here */
                }
              }
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={regionImpactData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  barSize={20}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    scale="point"
                    padding={{ left: 10, right: 10 }}
                  />
                  <YAxis />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar
                    dataKey="value"
                    fill="#e60000"
                    background={{ fill: "#eee" }}
                    animationBegin={0}
                    animationDuration={1500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: chartProgress.carbon > 0 ? 1 : 0,
          y: chartProgress.carbon > 0 ? 0 : 20,
        }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden border-2 border-virgin-red/10">
          <CardHeader className="p-4 pb-2 bg-gradient-to-r from-virgin-red/10 to-white">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-medium">
                Carbon Reduction Progress
              </CardTitle>
              <Badge className="bg-green-500">On Track</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0 h-64">
            <ChartContainer
              config={
                {
                  /* add your chart configuration here */
                }
              }
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={carbonReductionData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#e60000"
                    strokeWidth={2}
                    dot={{ r: 6 }}
                    activeDot={{ r: 8 }}
                    animationBegin={0}
                    animationDuration={1500}
                  />
                  {/* Projected line with dashed style */}
                  <Line
                    type="monotone"
                    dataKey="projected"
                    stroke="#e60000"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="flex items-center justify-center mt-2 text-xs text-gray-500">
              <div className="flex items-center mr-4">
                <div className="w-3 h-3 bg-virgin-red rounded-full mr-1"></div>
                <span>Actual</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 border border-virgin-red rounded-full mr-1"></div>
                <span>Projected</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="bg-gradient-to-r from-virgin-red/10 to-white p-4 rounded-lg border-2 border-virgin-red/10"
      >
        <h3 className="font-bold mb-2">Your Personal Impact</h3>
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm">
            <div className="font-medium">Carbon Offset</div>
            <div className="text-gray-500">Your contributions have offset</div>
          </div>
          <div className="text-2xl font-bold text-virgin-red">2.4 tons</div>
        </div>
        <Button className="w-full bg-virgin-red hover:bg-virgin-red/90">
          Boost Your Impact
        </Button>
      </motion.div>
    </div>
  );
}
