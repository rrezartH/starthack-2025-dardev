"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { X, Maximize, Minimize, Leaf, Rocket, Zap, Globe, Plane, Ship, Wifi, Users, Heart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

// Updated initiatives with global distribution
const mapInitiatives = [
  {
    id: "1",
    title: "Youngest, Cleanest Fleet in the Sky",
    category: "Clean Energy",
    location: "Global",
    summary: "Achieving net-zero by 2050 and pioneering sustainable aviation fuel",
    image: "/placeholder.svg?height=400&width=600",
    progress: 65,
    contributions: 1250,
    mapPosition: {
      x: "25%",
      y: "30%",
    },
    icon: Plane,
  },
  {
    id: "2",
    title: "Protecting our Planet",
    category: "Climate Action",
    location: "Global",
    summary: "Addressing the environmental impact of aircraft contrails on global warming",
    image: "/placeholder.svg?height=400&width=600",
    progress: 45,
    contributions: 980,
    mapPosition: {
      x: "35%",
      y: "40%",
    },
    icon: Globe,
  },
  {
    id: "3",
    title: "Epic Sea Change For All",
    category: "Ocean Conservation",
    location: "Caribbean",
    summary: "Protecting and restoring vital mangrove forests in the Caribbean",
    image: "/placeholder.svg?height=400&width=600",
    progress: 52,
    contributions: 720,
    mapPosition: {
      x: "28%",
      y: "48%",
    },
    icon: Ship,
  },
  {
    id: "4",
    title: "Better Connections Plan - Europe",
    category: "Digital Inclusion",
    location: "Europe",
    summary: "Bridging the digital divide across European communities",
    image: "/placeholder.svg?height=400&width=600",
    progress: 78,
    contributions: 3800,
    mapPosition: {
      x: "48%",
      y: "32%",
    },
    icon: Wifi,
  },
  {
    id: "5",
    title: "Better Connections Plan - Asia",
    category: "Digital Inclusion",
    location: "Asia",
    summary: "Expanding connectivity solutions throughout Asian markets",
    image: "/placeholder.svg?height=400&width=600",
    progress: 65,
    contributions: 2500,
    mapPosition: {
      x: "70%",
      y: "38%",
    },
    icon: Wifi,
  },
  {
    id: "6",
    title: "Better Connections Plan - Africa",
    category: "Digital Inclusion",
    location: "Africa",
    summary: "Developing sustainable connectivity infrastructure in African nations",
    image: "/placeholder.svg?height=400&width=600",
    progress: 55,
    contributions: 1560,
    mapPosition: {
      x: "52%",
      y: "52%",
    },
    icon: Wifi,
  },
  {
    id: "7",
    title: "Better Connections Plan - Americas",
    category: "Digital Inclusion",
    location: "North & South America",
    summary: "Creating inclusive digital access across the Americas",
    image: "/placeholder.svg?height=400&width=600",
    progress: 70,
    contributions: 2100,
    mapPosition: {
      x: "22%",
      y: "60%",
    },
    icon: Wifi,
  },
  {
    id: "8",
    title: "Pride 'n Purpose",
    category: "Community Development",
    location: "South Africa",
    summary: "Empowering disadvantaged communities near the Sabi Sand Reserve",
    image: "/placeholder.svg?height=400&width=600",
    progress: 70,
    contributions: 35000,
    mapPosition: {
      x: "55%",
      y: "65%",
    },
    icon: Heart,
  },
  {
    id: "9",
    title: "Mahali Mzuri: Inua Jamii",
    category: "Conservation & Community",
    location: "Kenya",
    summary: "Supporting local Maasai communities and preserving wildlife migration routes",
    image: "/placeholder.svg?height=400&width=600",
    progress: 68,
    contributions: 1250,
    mapPosition: {
      x: "58%",
      y: "55%",
    },
    icon: Leaf,
  },
  {
    id: "10",
    title: "Planetary Guardians",
    category: "Environmental Protection",
    location: "Global",
    summary: "Safeguarding Earth's critical systems and planetary boundaries",
    image: "/placeholder.svg?height=400&width=600",
    progress: 40,
    contributions: 980,
    mapPosition: {
      x: "50%",
      y: "25%",
    },
    icon: Globe,
  },
  {
    id: "11",
    title: "The Elders",
    category: "Peace & Justice",
    location: "Global",
    summary: "Independent global leaders working for peace, justice, and human rights",
    image: "/placeholder.svg?height=400&width=600",
    progress: 75,
    contributions: 2500,
    mapPosition: {
      x: "45%",
      y: "45%",
    },
    icon: Users,
  },
  {
    id: "12",
    title: "Ocean Unite / ORRAA",
    category: "Ocean Conservation",
    location: "Antarctica & Global Oceans",
    summary: "Protecting 30% of the ocean by 2030 and safeguarding Antarctica's waters",
    image: "/placeholder.svg?height=400&width=600",
    progress: 45,
    contributions: 1800,
    mapPosition: {
      x: "50%",
      y: "85%",
    },
    icon: Ship,
  },
  {
    id: "13",
    title: "Community Mapathon: HOT",
    category: "Humanitarian Aid",
    location: "Global",
    summary: "Community mapping to support humanitarian responses to global crises",
    image: "/placeholder.svg?height=400&width=600",
    progress: 60,
    contributions: 5000,
    mapPosition: {
      x: "65%",
      y: "60%",
    },
    icon: Globe,
  },
  {
    id: "14",
    title: "Project CETI",
    category: "Marine Research",
    location: "Caribbean",
    summary: "Decoding sperm whale communication using artificial intelligence",
    image: "/placeholder.svg?height=400&width=600",
    progress: 35,
    contributions: 850,
    mapPosition: {
      x: "30%",
      y: "42%",
    },
    icon: Zap,
  },
  {
    id: "15",
    title: "Eve Branson Foundation",
    category: "Education & Empowerment",
    location: "Morocco",
    summary: "Supporting education and sustainable livelihoods in Morocco's Atlas Mountains",
    image: "/placeholder.svg?height=400&width=600",
    progress: 82,
    contributions: 12000,
    mapPosition: {
      x: "45%",
      y: "38%",
    },
    icon: Heart,
  },
  {
    id: "16",
    title: "Unite BVI",
    category: "Island Resilience",
    location: "British Virgin Islands",
    summary: "Building resilient communities and ecosystems in the British Virgin Islands",
    image: "/placeholder.svg?height=400&width=600",
    progress: 68,
    contributions: 3200,
    mapPosition: {
      x: "27%",
      y: "45%",
    },
    icon: Rocket,
  },
]

export default function InitiativeMap() {
  const [selectedInitiative, setSelectedInitiative] = useState<string | null>(null)
  const [isZoomed, setIsZoomed] = useState(false)
  const [visiblePins, setVisiblePins] = useState<string[]>([])
  const { toast } = useToast()

  const initiative = selectedInitiative ? mapInitiatives.find((i) => i.id === selectedInitiative) : null

  // Animate pins appearing one by one
  useEffect(() => {
    const timer = setTimeout(() => {
      const ids = mapInitiatives?.map((i) => i.id) || []
      let index = 0

      const interval = setInterval(() => {
        if (index < ids.length) {
          setVisiblePins((prev) => [...prev, ids[index]])
          index++
        } else {
          clearInterval(interval)
        }
      }, 200)

      return () => clearInterval(interval)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-full">
      <motion.div
        className="absolute top-0 left-0 right-0 z-10 bg-white p-4 border-b"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-xl font-bold text-virgin-red">Global Impact Map</h1>
        <p className="text-sm text-gray-500">Explore Virgin's sustainability initiatives around the world</p>
      </motion.div>

      <div className="relative w-full h-full pt-20">
        {/* World map with gradient background */}
        <div className="relative w-full h-full bg-gradient-to-b from-blue-50 to-blue-100">
          <Image src="/images/world-map.png" alt="World Map" fill className="object-contain opacity-80" priority />

          <motion.div
            className="absolute top-4 right-4 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              variant="outline"
              size="sm"
              className="bg-white/80 backdrop-blur-sm"
              onClick={() => setIsZoomed(!isZoomed)}
            >
              {isZoomed ? <Minimize className="h-4 w-4 mr-1" /> : <Maximize className="h-4 w-4 mr-1" />}
              {isZoomed ? "Zoom Out" : "Zoom In"}
            </Button>
          </motion.div>

          {/* Animated pulse effect */}
          <motion.div
            className="absolute inset-0 bg-blue-400 rounded-full opacity-0"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0, 0.1, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 3,
              ease: "easeInOut",
            }}
            style={{
              left: "50%",
              top: "50%",
              width: "10px",
              height: "10px",
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Map pins */}
          {mapInitiatives.map((initiative) => {
            const IconComponent = initiative.icon || Globe

            return (
              <AnimatePresence key={initiative.id}>
                {visiblePins.includes(initiative.id) && (
                  <motion.button
                    className={`absolute flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 z-20 ${
                      selectedInitiative === initiative.id ? "z-30" : ""
                    }`}
                    style={{
                      left: initiative.mapPosition.x,
                      top: initiative.mapPosition.y,
                    }}
                    onClick={() => setSelectedInitiative(initiative.id)}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="relative">
                      <div className="w-10 h-10 bg-virgin-red rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <motion.div
                        className="absolute inset-0 rounded-full bg-virgin-red"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.7, 0, 0.7],
                        }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          duration: 2,
                          ease: "easeInOut",
                        }}
                      />
                    </div>
                    <motion.div
                      className="mt-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-md shadow-md text-xs font-medium max-w-[120px] text-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {initiative.title.split(":")[0].split(" - ")[0]}
                    </motion.div>
                  </motion.button>
                )}
              </AnimatePresence>
            )
          })}

          {/* Connection lines between initiatives */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {visiblePins.length > 1 &&
              mapInitiatives.slice(0, visiblePins.length).map((initiative, index, arr) => {
                if (index === arr.length - 1 || index % 3 === 0) return null

                const next = arr[index + 1]
                const x1 = (Number.parseFloat(initiative.mapPosition.x) / 100) * 100
                const y1 = (Number.parseFloat(initiative.mapPosition.y) / 100) * 100
                const x2 = (Number.parseFloat(next.mapPosition.x) / 100) * 100
                const y2 = (Number.parseFloat(next.mapPosition.y) / 100) * 100

                return (
                  <motion.line
                    key={`line-${initiative.id}-${next.id}`}
                    x1={`${x1}%`}
                    y1={`${y1}%`}
                    x2={`${x2}%`}
                    y2={`${y2}%`}
                    stroke="rgba(230, 0, 0, 0.3)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.5 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                )
              })}
          </svg>
        </div>
      </div>

      {/* Initiative popup */}
      <AnimatePresence>
        {selectedInitiative && initiative && (
          <motion.div
            className="absolute bottom-4 left-4 right-4 z-40"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <Card className="relative overflow-hidden border-2 border-virgin-red/20">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white/90 rounded-full h-8 w-8"
                onClick={() => setSelectedInitiative(null)}
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="relative h-32 w-full">
                <Image
                  src={initiative.image || "/placeholder.svg"}
                  alt={initiative.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-2 left-2">
                  <Badge className="bg-virgin-red">{initiative.category}</Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h2 className="text-lg font-bold mb-1">{initiative.title}</h2>
                <div className="flex items-center mb-2">
                  <div className="text-sm text-gray-500 mr-2">{initiative.location}</div>
                  <div className="text-xs bg-virgin-red/10 text-virgin-red px-2 py-0.5 rounded-full">
                    {initiative.progress}% Complete
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{initiative.summary}</p>
                <div className="flex justify-between items-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold"
                      >
                        U{i}
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-virgin-red text-white flex items-center justify-center text-xs">
                      +{initiative.contributions > 999 ? "999+" : initiative.contributions}
                    </div>
                  </div>
                  <Link href={`/initiative/${initiative.id}`}>
                    <Button className="bg-virgin-red hover:bg-virgin-red/90">View Mission</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

