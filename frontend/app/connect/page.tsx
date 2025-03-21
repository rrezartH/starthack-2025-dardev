"use client";

import Header from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Building,
  Fuel,
  Globe,
  Heart,
  Leaf,
  Lightbulb,
  Link,
  Plane,
  Plus,
  Recycle,
  Rocket,
  RotateCcw,
  Ship,
  Train,
  Users,
  Wifi,
  Wind,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ConnectPage() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [activeConnection, setActiveConnection] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const [newCompany, setNewCompany] = useState<{
    id: string;
    name: string;
    description: string;
    position: { top: string; left: string };
  } | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionProgress, setConnectionProgress] = useState(0);
  const [newConnectionId, setNewConnectionId] = useState<string | null>(null);
  const [allCompanies, setAllCompanies] = useState<any[]>([]);
  const [allConnections, setAllConnections] = useState<any[]>([]);

  // Reference to store the original position of the new company
  const originalPositionRef = useRef<{ top: string; left: string } | null>(
    null
  );
  // Reference to store the target position (Virgin Atlantic position)
  const targetPositionRef = useRef<{ top: string; left: string } | null>(null);

  const handleZoomIn = () => {
    setZoomLevel(Math.min(zoomLevel + 0.1, 1.5));
  };

  const handleZoomOut = () => {
    setZoomLevel(Math.max(zoomLevel - 0.1, 0.7));
  };

  const handleReset = () => {
    setZoomLevel(1);
    setActiveNode(null);
    setActiveConnection(null);
  };

  const getCompanyIcon = (company: string) => {
    switch (company) {
      case "Virgin Atlantic":
        return <Plane className="h-6 w-6" />;
      case "Virgin Voyages":
        return <Ship className="h-6 w-6" />;
      case "Virgin Galactic":
        return <Rocket className="h-6 w-6" />;
      case "Virgin Hyperloop":
        return <Train className="h-6 w-6" />;
      case "Virgin Media O2":
        return <Wifi className="h-6 w-6" />;
      case "Virgin Hotels & Leisure":
        return <Building className="h-6 w-6" />;
      case "Virgin Investments":
        return <Wind className="h-6 w-6" />;
      case "Virgin Unite":
        return <Heart className="h-6 w-6" />;
      default:
        return <Leaf className="h-6 w-6" />;
    }
  };

  const getThemeIcon = (theme: string) => {
    switch (theme) {
      case "Net-Zero Carbon":
        return <Globe className="h-5 w-5" />;
      case "Sustainable Fuels":
        return <Fuel className="h-5 w-5" />;
      case "Waste Reduction & Circular Economy":
        return <Recycle className="h-5 w-5" />;
      case "Innovation & Collaboration":
        return <Lightbulb className="h-5 w-5" />;
      case "Community & Conservation":
        return <Users className="h-5 w-5" />;
      default:
        return <Leaf className="h-5 w-5" />;
    }
  };

  const initialCompanies = [
    {
      id: "virgin-atlantic",
      name: "Virgin Atlantic",
      description:
        "Net Zero 2050; challenges: CO2 emissions, aviation fuel; solutions: young efficient fleet, 100% SAF flight",
      position: { top: "30%", left: "25%" },
    },
    {
      id: "virgin-voyages",
      name: "Virgin Voyages",
      description:
        "Net Zero 2050; challenges: ship emissions, ocean plastic; solutions: waste-heat recovery tech, banned single-use plastics, testing waste-derived biofuels",
      position: { top: "20%", left: "75%" },
    },
    {
      id: "virgin-galactic",
      name: "Virgin Galactic",
      description:
        "Sustainability in space tourism; challenges: rocket emissions; solutions: reusable spacecraft, SAF for mothership",
      position: { top: "70%", left: "20%" },
    },
    {
      id: "virgin-hyperloop",
      name: "Virgin Hyperloop",
      description:
        "Future green transit; challenges: development risk; solutions: all-electric zero-direct-emission pods",
      position: { top: "80%", left: "40%" },
    },
    {
      id: "virgin-media-o2",
      name: "Virgin Media O2",
      description:
        "Net Zero 2040; challenges: energy use, e-waste; solutions: renewable energy, 60% emissions cut achieved, device recycling",
      position: { top: "65%", left: "75%" },
    },
    {
      id: "virgin-hotels",
      name: "Virgin Hotels & Leisure",
      description:
        "Sustainable hospitality; solutions: green building, eliminate mini-plastics, local sourcing",
      position: { top: "40%", left: "85%" },
    },
    {
      id: "virgin-investments",
      name: "Virgin Investments",
      description: "Clean energy projects (solar, wind)",
      position: { top: "85%", left: "60%" },
    },
    {
      id: "virgin-unite",
      name: "Virgin Unite",
      description:
        "Group-level sustainability and philanthropy (Carbon War Room, Earth Challenge, Galactic Unite)",
      position: { top: "50%", left: "50%" },
    },
  ];

  const initialConnections = [
    {
      id: "atlantic-voyages",
      source: "virgin-atlantic",
      target: "virgin-voyages",
      name: "Virgin Atlantic ↔ Virgin Voyages",
      description:
        "Shared initiatives on sustainable aviation/marine fuels and plastic-free practices.",
      note: "Both are pioneering alternative fuel usage and waste reduction in travel.",
    },
    {
      id: "atlantic-galactic",
      source: "virgin-atlantic",
      target: "virgin-galactic",
      name: "Virgin Atlantic ↔ Virgin Galactic",
      description:
        "Collaboration on sustainable aviation fuel (SAF) research and reusable technology.",
      note: "Leveraging SAF innovations to reduce emissions in both air and space travel.",
    },
    {
      id: "voyages-hotels",
      source: "virgin-voyages",
      target: "virgin-hotels",
      name: "Virgin Voyages ↔ Virgin Hotels & Leisure",
      description:
        "Shared approaches to waste reduction and green hospitality practices.",
      note: "Integrating sustainable design and plastic elimination across travel and accommodation.",
    },
    {
      id: "media-atlantic",
      source: "virgin-media-o2",
      target: "virgin-atlantic",
      name: "Virgin Media O2 ↔ Virgin Atlantic",
      description:
        "Joint focus on renewable energy strategies and energy efficiency.",
      note: "Combining digital infrastructure improvements with travel-related energy optimization.",
    },
    {
      id: "unite-atlantic",
      source: "virgin-unite",
      target: "virgin-atlantic",
      name: "Virgin Unite ↔ Virgin Atlantic",
      description:
        "Collaborative sustainability innovation and community engagement.",
      note: "Supporting carbon reduction initiatives and sustainable aviation research.",
    },
    {
      id: "unite-voyages",
      source: "virgin-unite",
      target: "virgin-voyages",
      name: "Virgin Unite ↔ Virgin Voyages",
      description: "Ocean conservation and sustainable tourism initiatives.",
      note: "Joint programs for marine ecosystem protection and sustainable cruise practices.",
    },
    {
      id: "unite-galactic",
      source: "virgin-unite",
      target: "virgin-galactic",
      name: "Virgin Unite ↔ Virgin Galactic",
      description: "STEM education and sustainable space innovation.",
      note: "Galactic Unite program supporting next generation of sustainable space technology.",
    },
    {
      id: "unite-media",
      source: "virgin-unite",
      target: "virgin-media-o2",
      name: "Virgin Unite ↔ Virgin Media O2",
      description: "Digital inclusion and e-waste reduction programs.",
      note: "Bridging the digital divide while promoting sustainable technology practices.",
    },
    {
      id: "unite-hotels",
      source: "virgin-unite",
      target: "virgin-hotels",
      name: "Virgin Unite ↔ Virgin Hotels & Leisure",
      description: "Sustainable hospitality and community engagement.",
      note: "Local sourcing initiatives and community development programs.",
    },
    {
      id: "unite-investments",
      source: "virgin-unite",
      target: "virgin-investments",
      name: "Virgin Unite ↔ Virgin Investments",
      description: "Impact investing and renewable energy projects.",
      note: "Funding sustainable initiatives and clean energy development.",
    },
    {
      id: "atlantic-hyperloop",
      source: "virgin-atlantic",
      target: "virgin-hyperloop",
      name: "Virgin Atlantic ↔ Virgin Hyperloop",
      description:
        "Low-carbon transportation alternatives for short-haul routes.",
      note: "Exploring how Hyperloop technology could replace short-haul flights.",
    },
    {
      id: "voyages-media",
      source: "virgin-voyages",
      target: "virgin-media-o2",
      name: "Virgin Voyages ↔ Virgin Media O2",
      description: "Digital sustainability and onboard connectivity.",
      note: "Implementing energy-efficient digital solutions on cruise ships.",
    },
    {
      id: "investments-media",
      source: "virgin-investments",
      target: "virgin-media-o2",
      name: "Virgin Investments ↔ Virgin Media O2",
      description: "Renewable energy for digital infrastructure.",
      note: "Powering data centers and network operations with clean energy.",
    },
  ];

  // Initialize state with the initial data
  useEffect(() => {
    setAllCompanies(initialCompanies);
    setAllConnections(initialConnections);
  }, []);

  // Animation effect for moving the new company
  useEffect(() => {
    if (
      isConnecting &&
      connectionProgress > 0 &&
      newCompany &&
      originalPositionRef.current &&
      targetPositionRef.current
    ) {
      // Calculate the interpolated position based on the connection progress
      const progress = connectionProgress / 100;

      // Parse the percentage values
      const origTop = Number.parseInt(originalPositionRef.current.top);
      const origLeft = Number.parseInt(originalPositionRef.current.left);
      const targetTop = Number.parseInt(targetPositionRef.current.top);
      const targetLeft = Number.parseInt(targetPositionRef.current.left);

      // Calculate the intermediate position
      const newTop = origTop + (targetTop - origTop) * progress * 0.4;
      const newLeft = origLeft + (targetLeft - origLeft) * progress * 0.4;

      // Update the company position
      setAllCompanies((prev) =>
        prev.map((company) =>
          company.id === newCompany.id
            ? {
                ...company,
                position: { top: `${newTop}%`, left: `${newLeft}%` },
              }
            : company
        )
      );
    }
  }, [connectionProgress, isConnecting, newCompany]);

  // Get connections for a specific company
  const getCompanyConnections = (companyId: string) => {
    return allConnections.filter(
      (conn) => conn.source === companyId || conn.target === companyId
    );
  };

  // Get themes for a specific company
  const getCompanyThemes = (companyId: string) => {
    return themes.filter((theme) => theme.companies.includes(companyId));
  };

  const themes = [
    {
      id: "net-zero-carbon",
      name: "Net-Zero Carbon",
      description: "Shared commitment to achieving net-zero carbon emissions",
      position: { top: "15%", left: "50%" },
      companies: [
        "virgin-atlantic",
        "virgin-voyages",
        "virgin-galactic",
        "virgin-media-o2",
      ],
    },
    {
      id: "sustainable-fuels",
      name: "Sustainable Fuels",
      description:
        "Research and implementation of sustainable alternative fuels",
      position: { top: "45%", left: "15%" },
      companies: ["virgin-atlantic", "virgin-voyages", "virgin-galactic"],
    },
    {
      id: "waste-circular",
      name: "Waste Reduction & Circular Economy",
      description:
        "Eliminating waste and implementing circular economy principles",
      position: { top: "35%", left: "60%" },
      companies: [
        "virgin-atlantic",
        "virgin-voyages",
        "virgin-hotels",
        "virgin-media-o2",
      ],
    },
    {
      id: "innovation",
      name: "Innovation & Collaboration",
      description: "Collaborative innovation across Virgin companies",
      position: { top: "60%", left: "35%" },
      companies: [
        "virgin-atlantic",
        "virgin-galactic",
        "virgin-hyperloop",
        "virgin-unite",
      ],
    },
    {
      id: "community",
      name: "Community & Conservation",
      description:
        "Environmental conservation and community engagement initiatives",
      position: { top: "75%", left: "80%" },
      companies: [
        "virgin-voyages",
        "virgin-atlantic",
        "virgin-investments",
        "virgin-unite",
      ],
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Virgin Connect
            </h1>
            <p className="text-muted-foreground">
              Explore direct collaborations between Virgin companies on
              sustainability initiatives
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => setShowAddDialog(true)}
            >
              <Plus className="h-4 w-4 mr-2" /> Add Company
            </Button>
          </div>
        </div>

        <Tabs defaultValue="mindmap" className="mb-6">
          <TabsList>
            <TabsTrigger value="mindmap">Mind Map</TabsTrigger>
            <TabsTrigger value="connections">Company Connections</TabsTrigger>
            <TabsTrigger value="themes">Sustainability Themes</TabsTrigger>
          </TabsList>
        </Tabs>

        {newCompany && !isConnecting && (
          <div className="mb-4">
            <Button
              onClick={() => {
                setIsConnecting(true);

                // Store the original position of the new company
                originalPositionRef.current = { ...newCompany.position };

                // Find Virgin Atlantic's position
                const atlanticCompany = allCompanies.find(
                  (c) => c.id === "virgin-atlantic"
                );
                if (atlanticCompany) {
                  targetPositionRef.current = { ...atlanticCompany.position };
                }

                // Create a new connection ID
                const newConnId = `atlantic-${newCompany.id}`;
                setNewConnectionId(newConnId);

                // Animate the connection progress
                let progress = 0;
                const interval = setInterval(() => {
                  progress += 2;
                  setConnectionProgress(progress);

                  if (progress >= 100) {
                    clearInterval(interval);

                    // Add the connection after animation completes
                    const newConnection = {
                      id: newConnId,
                      source: "virgin-atlantic",
                      target: newCompany.id,
                      name: `Virgin Atlantic ↔ ${newCompany.name}`,
                      description:
                        "New sustainability collaboration initiative.",
                      note: "Exploring shared sustainability goals and initiatives.",
                    };

                    setAllConnections((prev) => [...prev, newConnection]);
                    setIsConnecting(false);
                    setConnectionProgress(0);
                    setNewConnectionId(null);
                  }
                }, 20);
              }}
              className="gap-2"
            >
              <Link className="h-4 w-4" /> Analyze Connection
            </Button>
          </div>
        )}

        {isConnecting && (
          <div className="mb-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Establishing connection...</span>
                <span className="text-sm">{connectionProgress}%</span>
              </div>
              <Progress value={connectionProgress} />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="md:col-span-8">
            <Card className="h-full">
              <CardContent className="p-4">
                <div
                  className="relative h-[700px] bg-muted/20 rounded-lg overflow-hidden border border-muted"
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: "center center",
                    transition: "transform 0.3s ease",
                  }}
                >
                  {/* Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {/* Direct company-to-company connections */}
                    {allConnections.map((connection) => {
                      const source = allCompanies.find(
                        (c) => c.id === connection.source
                      );
                      const target = allCompanies.find(
                        (c) => c.id === connection.target
                      );

                      if (source && target) {
                        // Parse percentage values correctly
                        const sourceLeft = Number.parseInt(
                          source.position.left.toString().replace("%", "")
                        );
                        const sourceTop = Number.parseInt(
                          source.position.top.toString().replace("%", "")
                        );
                        const targetLeft = Number.parseInt(
                          target.position.left.toString().replace("%", "")
                        );
                        const targetTop = Number.parseInt(
                          target.position.top.toString().replace("%", "")
                        );

                        // Calculate midpoint
                        const midX = (sourceLeft + targetLeft) / 2;
                        const midY = (sourceTop + targetTop) / 2;

                        return (
                          <g key={`connection-${connection.id}`}>
                            <line
                              x1={`${sourceLeft}%`}
                              y1={`${sourceTop}%`}
                              x2={`${targetLeft}%`}
                              y2={`${targetTop}%`}
                              stroke={
                                activeConnection === connection.id ||
                                activeNode === connection.source ||
                                activeNode === connection.target
                                  ? "hsl(var(--primary))"
                                  : connection.id === newConnectionId
                                  ? "hsl(var(--green-500))"
                                  : "hsl(var(--muted))"
                              }
                              strokeWidth="3"
                              className="transition-all duration-300"
                              style={{
                                opacity:
                                  activeConnection === connection.id ||
                                  activeNode === connection.source ||
                                  activeNode === connection.target ||
                                  !activeNode
                                    ? 1
                                    : 0.3,
                              }}
                            />
                          </g>
                        );
                      }
                      return null;
                    })}

                    {/* Animated connection line during connection process */}
                    {isConnecting &&
                      newCompany &&
                      connectionProgress > 0 &&
                      (() => {
                        const atlanticCompany = allCompanies.find(
                          (c) => c.id === "virgin-atlantic"
                        );
                        const newComp = allCompanies.find(
                          (c) => c.id === newCompany.id
                        );

                        if (atlanticCompany && newComp) {
                          const sourceLeft = Number.parseInt(
                            atlanticCompany.position.left
                              .toString()
                              .replace("%", "")
                          );
                          const sourceTop = Number.parseInt(
                            atlanticCompany.position.top
                              .toString()
                              .replace("%", "")
                          );
                          const targetLeft = Number.parseInt(
                            newComp.position.left.toString().replace("%", "")
                          );
                          const targetTop = Number.parseInt(
                            newComp.position.top.toString().replace("%", "")
                          );

                          // Calculate how much of the line to draw based on progress
                          const progress = connectionProgress / 100;
                          const currentTargetLeft =
                            sourceLeft + (targetLeft - sourceLeft) * progress;
                          const currentTargetTop =
                            sourceTop + (targetTop - sourceTop) * progress;

                          return (
                            <line
                              x1={`${sourceLeft}%`}
                              y1={`${sourceTop}%`}
                              x2={`${currentTargetLeft}%`}
                              y2={`${currentTargetTop}%`}
                              stroke="hsl(var(--green-500))"
                              strokeWidth="3"
                              className="transition-all duration-300"
                            />
                          );
                        }
                        return null;
                      })()}

                    {/* Theme connections */}
                    {themes.map((theme) =>
                      theme.companies.map((companyId) => {
                        const company = allCompanies.find(
                          (c) => c.id === companyId
                        );

                        if (company) {
                          // Parse percentage values correctly
                          const themeLeft = Number.parseInt(
                            theme.position.left.toString().replace("%", "")
                          );
                          const themeTop = Number.parseInt(
                            theme.position.top.toString().replace("%", "")
                          );
                          const companyLeft = Number.parseInt(
                            company.position.left.toString().replace("%", "")
                          );
                          const companyTop = Number.parseInt(
                            company.position.top.toString().replace("%", "")
                          );

                          return (
                            <line
                              key={`theme-${theme.id}-${companyId}`}
                              x1={`${themeLeft}%`}
                              y1={`${themeTop}%`}
                              x2={`${companyLeft}%`}
                              y2={`${companyTop}%`}
                              stroke={
                                activeNode === theme.id ||
                                activeNode === companyId
                                  ? "hsl(var(--eco-blue))"
                                  : "hsl(var(--muted))"
                              }
                              strokeWidth="2"
                              strokeDasharray="3,3"
                              className="transition-all duration-300"
                              style={{
                                opacity:
                                  activeNode === theme.id ||
                                  activeNode === companyId ||
                                  !activeNode
                                    ? 1
                                    : 0.3,
                              }}
                            />
                          );
                        }
                        return null;
                      })
                    )}
                  </svg>

                  {/* Company Nodes */}
                  {allCompanies.map((company) => (
                    <div
                      key={company.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                      style={{
                        top: company.position.top,
                        left: company.position.left,
                        transition: "all 0.3s ease",
                        opacity:
                          activeNode &&
                          activeNode !== company.id &&
                          !allConnections.some(
                            (c) =>
                              (c.source === company.id &&
                                c.target === activeNode) ||
                              (c.target === company.id &&
                                c.source === activeNode)
                          )
                            ? 0.6
                            : 1,
                      }}
                    >
                      <div
                        className={`flex flex-col items-center justify-center w-24 h-24 rounded-full bg-white border-2 ${
                          newCompany && company.id === newCompany.id
                            ? "border-green-500"
                            : "border-primary"
                        } shadow-md cursor-pointer transition-all hover:shadow-lg ${
                          activeNode === company.id ? "ring-4 ring-primary" : ""
                        }`}
                        onClick={() => {
                          setActiveNode(company.id);
                          setActiveConnection(null);
                        }}
                      >
                        <div
                          className={
                            newCompany && company.id === newCompany.id
                              ? "text-green-500"
                              : "text-primary"
                          }
                        >
                          {getCompanyIcon(company.name)}
                        </div>
                        <div className="text-center mt-1">
                          <div className="text-xs font-medium line-clamp-2 px-1">
                            {company.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Theme Nodes */}
                  {themes.map((theme) => (
                    <div
                      key={theme.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                      style={{
                        top: theme.position.top,
                        left: theme.position.left,
                        transition: "all 0.3s ease",
                        opacity:
                          activeNode &&
                          activeNode !== theme.id &&
                          !theme.companies.includes(activeNode as string)
                            ? 0.5
                            : 1,
                      }}
                    >
                      <div
                        className={`flex flex-col items-center justify-center w-20 h-20 rounded-full bg-eco-blue-light border border-[hsl(var(--eco-blue))] shadow-md cursor-pointer transition-all hover:shadow-lg ${
                          activeNode === theme.id
                            ? "ring-4 ring-[hsl(var(--eco-blue))]"
                            : ""
                        }`}
                        onClick={() => {
                          setActiveNode(theme.id);
                          setActiveConnection(null);
                        }}
                      >
                        <div className="text-[hsl(var(--eco-blue))]">
                          {getThemeIcon(theme.name)}
                        </div>
                        <div className="text-center mt-1">
                          <div className="text-[9px] font-medium line-clamp-2 px-1">
                            {theme.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Connection Interaction Areas */}
                  {allConnections.map((connection) => {
                    const source = allCompanies.find(
                      (c) => c.id === connection.source
                    );
                    const target = allCompanies.find(
                      (c) => c.id === connection.target
                    );

                    if (source && target) {
                      // Parse percentage values correctly
                      const sourceLeft = Number.parseInt(
                        source.position.left.toString().replace("%", "")
                      );
                      const sourceTop = Number.parseInt(
                        source.position.top.toString().replace("%", "")
                      );
                      const targetLeft = Number.parseInt(
                        target.position.left.toString().replace("%", "")
                      );
                      const targetTop = Number.parseInt(
                        target.position.top.toString().replace("%", "")
                      );

                      // Calculate midpoint
                      const midX = (sourceLeft + targetLeft) / 2;
                      const midY = (sourceTop + targetTop) / 2;

                      return (
                        <div
                          key={`interaction-${connection.id}`}
                          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-15 cursor-pointer"
                          style={{
                            top: `${midY}%`,
                            left: `${midX}%`,
                            opacity:
                              activeConnection === connection.id ? 1 : 0.7,
                          }}
                          onClick={() => {
                            setActiveConnection(connection.id);
                            setActiveNode(null);
                          }}
                        >
                          <div
                            className={`flex items-center justify-center w-8 h-8 rounded-full bg-white border ${
                              connection.id === newConnectionId
                                ? "border-green-500"
                                : "border-primary"
                            } hover:bg-primary/10 transition-all ${
                              activeConnection === connection.id
                                ? "bg-primary/20 ring-2 ring-primary"
                                : ""
                            }`}
                          >
                            <span
                              className={
                                connection.id === newConnectionId
                                  ? "text-green-500"
                                  : "text-primary"
                              }
                            >
                              ↔
                            </span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-4">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>
                  {activeNode ? (
                    <>
                      {allCompanies.find((c) => c.id === activeNode)?.name ||
                        themes.find((t) => t.id === activeNode)?.name ||
                        "Select a Node"}
                    </>
                  ) : activeConnection ? (
                    allConnections.find((c) => c.id === activeConnection)
                      ?.name || "Connection"
                  ) : (
                    "Virgin Sustainability Ecosystem"
                  )}
                </CardTitle>
                <CardDescription>
                  {activeNode
                    ? "Company details and connections"
                    : activeConnection
                    ? "Collaboration details"
                    : "Select a company, theme, or connection to see details"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
                {!activeNode && !activeConnection && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">
                      This mind map shows direct connections between Virgin
                      companies based on their shared sustainability challenges,
                      initiatives, and collaboration opportunities. Each
                      connection represents active collaboration between
                      companies.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-white border-2 border-primary"></div>
                        <span className="text-sm">Virgin Companies</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-[hsl(var(--eco-blue-light))] border border-[hsl(var(--eco-blue))]"></div>
                        <span className="text-sm">Sustainability Themes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-white border border-primary flex items-center justify-center">
                          <span className="text-primary text-xs">↔</span>
                        </div>
                        <span className="text-sm">Direct Collaborations</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Company Details */}
                {allCompanies.map(
                  (company) =>
                    activeNode === company.id && (
                      <div key={`detail-${company.id}`}>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="p-2 rounded-full bg-primary/10">
                            {getCompanyIcon(company.name)}
                          </div>
                          <div>
                            <h3 className="font-medium">{company.name}</h3>
                            <p className="text-xs text-muted-foreground">
                              Virgin Group Company
                            </p>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4">
                          {company.description}
                        </p>

                        <div className="space-y-4">
                          <div>
                            <p className="text-sm font-medium mb-1">
                              Direct Collaborations:
                            </p>
                            <div className="space-y-2">
                              {getCompanyConnections(company.id).map(
                                (connection) => {
                                  const otherCompanyId =
                                    connection.source === company.id
                                      ? connection.target
                                      : connection.source;
                                  const otherCompany = allCompanies.find(
                                    (c) => c.id === otherCompanyId
                                  );

                                  return (
                                    <div
                                      key={connection.id}
                                      className="p-2 rounded-md bg-muted cursor-pointer hover:bg-muted/80"
                                      onClick={() => {
                                        setActiveConnection(connection.id);
                                        setActiveNode(null);
                                      }}
                                    >
                                      <div className="flex items-center gap-2">
                                        <div className="p-1 rounded-full bg-primary/10">
                                          {otherCompany &&
                                            getCompanyIcon(otherCompany.name)}
                                        </div>
                                        <p className="text-sm font-medium">
                                          {connection.name}
                                        </p>
                                      </div>
                                      <p className="text-xs text-muted-foreground mt-1">
                                        {connection.description}
                                      </p>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-medium mb-1">
                              Sustainability Themes:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {getCompanyThemes(company.id).map((theme) => (
                                <Badge
                                  key={theme.id}
                                  variant="outline"
                                  className="cursor-pointer bg-eco-blue-light text-[hsl(var(--eco-blue))] hover:bg-eco-blue-light/80"
                                  onClick={() => {
                                    setActiveNode(theme.id);
                                    setActiveConnection(null);
                                  }}
                                >
                                  {theme.name}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                )}

                {/* Theme Details */}
                {themes.map(
                  (theme) =>
                    activeNode === theme.id && (
                      <div key={`theme-detail-${theme.id}`}>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="p-2 rounded-full bg-[hsl(var(--eco-blue-light))]">
                            {getThemeIcon(theme.name)}
                          </div>
                          <div>
                            <h3 className="font-medium">{theme.name}</h3>
                            <p className="text-xs text-muted-foreground">
                              Sustainability Theme
                            </p>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4">
                          {theme.description}
                        </p>

                        <div>
                          <p className="text-sm font-medium mb-1">
                            Connected Companies:
                          </p>
                          <div className="space-y-2">
                            {theme.companies.map((companyId) => {
                              const company = allCompanies.find(
                                (c) => c.id === companyId
                              );
                              return company ? (
                                <div
                                  key={company.id}
                                  className="flex items-center gap-2 p-2 rounded-md bg-muted cursor-pointer hover:bg-muted/80"
                                  onClick={() => {
                                    setActiveNode(company.id);
                                    setActiveConnection(null);
                                  }}
                                >
                                  <div className="p-1 rounded-full bg-primary/10">
                                    {getCompanyIcon(company.name)}
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">
                                      {company.name}
                                    </p>
                                  </div>
                                </div>
                              ) : null;
                            })}
                          </div>
                        </div>
                      </div>
                    )
                )}

                {/* Connection Details */}
                {allConnections.map(
                  (connection) =>
                    activeConnection === connection.id && (
                      <div key={`connection-detail-${connection.id}`}>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="p-2 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-primary">↔</span>
                          </div>
                          <div>
                            <h3 className="font-medium">{connection.name}</h3>
                            <p className="text-xs text-muted-foreground">
                              Collaborative Initiative
                            </p>
                          </div>
                        </div>

                        <p className="text-sm font-medium mb-1">Description:</p>
                        <p className="text-sm text-muted-foreground mb-4">
                          {connection.description}
                        </p>

                        <p className="text-sm font-medium mb-1">Note:</p>
                        <p className="text-sm text-muted-foreground mb-4">
                          {connection.note}
                        </p>

                        <div>
                          <p className="text-sm font-medium mb-1">
                            Connected Companies:
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            {[connection.source, connection.target].map(
                              (companyId) => {
                                const company = allCompanies.find(
                                  (c) => c.id === companyId
                                );
                                return company ? (
                                  <div
                                    key={company.id}
                                    className="flex flex-col items-center p-2 rounded-md bg-muted cursor-pointer hover:bg-muted/80"
                                    onClick={() => {
                                      setActiveNode(company.id);
                                      setActiveConnection(null);
                                    }}
                                  >
                                    <div className="p-1 rounded-full bg-primary/10">
                                      {getCompanyIcon(company.name)}
                                    </div>
                                    <p className="text-sm font-medium mt-1">
                                      {company.name}
                                    </p>
                                  </div>
                                ) : null;
                              }
                            )}
                          </div>
                        </div>

                        <div className="mt-4">
                          <p className="text-sm font-medium mb-1">
                            Related Sustainability Themes:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {themes
                              .filter(
                                (theme) =>
                                  theme.companies.includes(connection.source) &&
                                  theme.companies.includes(connection.target)
                              )
                              .map((theme) => (
                                <Badge
                                  key={theme.id}
                                  variant="outline"
                                  className="cursor-pointer bg-eco-blue-light text-[hsl(var(--eco-blue))] hover:bg-eco-blue-light/80"
                                  onClick={() => {
                                    setActiveNode(theme.id);
                                    setActiveConnection(null);
                                  }}
                                >
                                  {theme.name}
                                </Badge>
                              ))}
                          </div>
                        </div>
                      </div>
                    )
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Add Company Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Company</DialogTitle>
              <DialogDescription>
                Add a new Virgin company to the sustainability ecosystem.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = formData.get("name") as string;
                const description = formData.get("description") as string;

                // Create a new company with a random position on the right side
                const newCompanyData = {
                  id: `virgin-${name.toLowerCase().replace(/\s+/g, "-")}`,
                  name: `Virgin ${name}`,
                  description,
                  position: {
                    top: `${Math.floor(30 + Math.random() * 40)}%`,
                    left: `${Math.floor(85 + Math.random() * 10)}%`,
                  },
                };

                setNewCompany(newCompanyData);
                setAllCompanies((prev) => [...prev, newCompanyData]);
                setShowAddDialog(false);
              }}
            >
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g. Sustainable"
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Company's sustainability focus..."
                    className="col-span-3"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Company</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
