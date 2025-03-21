"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { initiatives } from "@/lib/data";
import { bransonQuotes } from "@/lib/quotes";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronRight,
  Filter,
  MessageCircle,
  Play,
  Search,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [showAIBubble, setShowAIBubble] = useState(false);
  const { toast } = useToast();
  const searchRef = useRef<HTMLInputElement>(null);

  const filteredInitiatives =
    initiatives?.filter((initiative) => {
      const matchesSearch = initiative.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesFilter =
        !activeFilter || initiative.category === activeFilter;
      return matchesSearch && matchesFilter;
    }) || [];

  const categories = Array.from(
    new Set(initiatives?.map((initiative) => initiative.category) || [])
  );

  // Rotate through Branson quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % bransonQuotes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Show AI bubble after a delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAIBubble(true);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  const handleSearchFocus = () => {
    toast({
      title: "Discover Your Passion",
      description: "Find initiatives that match your sustainability interests!",
      duration: 3000,
    });
  };

  return (
    <div className="w-full">
      <motion.div
        className="sticky top-0 z-10 bg-white p-4 border-b shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/images/virgin-sustain_logo.png"
              alt="Virgin Logo"
              width={100}
              height={40}
              className="h-10 w-auto"
            />
          </motion.div>
          <AnimatePresence>
            {showAIBubble && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.1 }}
                className="relative"
              >
                <Link href="/mb/assistant">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-virgin-red text-virgin-red relative"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse"></span>
                  </Button>
                </Link>
                <motion.div
                  className="absolute top-full mt-2 right-0 bg-virgin-red text-white text-[10px] p-1.5 rounded-lg whitespace-nowrap z-20"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Meet EcoSpark!
                  <div className="absolute top-0 right-4 transform -translate-y-1/2 rotate-45 w-1.5 h-1.5 bg-virgin-red"></div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <motion.h1
          className="text-2xl font-bold mb-4 text-virgin-red"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Your Sustainability Journey
        </motion.h1>
        <motion.div
          className="relative mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search your passion..."
            className="pl-10 border-virgin-red/30 focus:border-virgin-red"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleSearchFocus}
            ref={searchRef}
          />
        </motion.div>
        <motion.div
          className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            variant={activeFilter === null ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter(null)}
            className={
              activeFilter === null
                ? "bg-virgin-red hover:bg-virgin-red/90"
                : ""
            }
          >
            All
          </Button>
          {categories.map((category, index) => (
            <Button
              key={category}
              variant={activeFilter === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(category)}
              className={
                activeFilter === category
                  ? "bg-virgin-red hover:bg-virgin-red/90"
                  : ""
              }
            >
              {category}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="flex items-center"
            onClick={() => {
              toast({
                title: "More Filters Coming Soon",
                description:
                  "We're expanding our filter options to help you find exactly what you're passionate about.",
                duration: 3000,
              });
            }}
          >
            <Filter className="h-4 w-4 mr-1" />
            More
          </Button>
        </motion.div>
      </motion.div>

      {/* Branson's Inspiration Corner */}
      <motion.div
        className="mx-4 my-4 bg-gradient-to-r from-virgin-red to-virgin-red/80 rounded-xl p-4 text-white relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
          <Image
            src="/images/virgin-sustain_logo.png"
            alt="Virgin Logo"
            width={80}
            height={80}
            className="h-full w-full"
          />
        </div>
        <div className="flex items-center mb-2">
          <Avatar className="h-10 w-10 mr-3 border-2 border-white">
            <AvatarImage
              src="/placeholder.svg?height=40&width=40"
              alt="Richard Branson"
            />
            <AvatarFallback>RB</AvatarFallback>
          </Avatar>
          <h3 className="font-bold">Branson's Inspiration Corner</h3>
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={currentQuote}
            className="text-sm italic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            "{bransonQuotes[currentQuote]}"
          </motion.p>
        </AnimatePresence>
        <Button
          variant="ghost"
          size="sm"
          className="mt-2 text-white hover:bg-white/20 flex items-center text-xs"
          onClick={() => {
            toast({
              title: "Video Coming Soon",
              description:
                "Richard's video message will be available in the next update!",
              duration: 3000,
            });
          }}
        >
          <Play className="h-3 w-3 mr-1" /> Watch video message
        </Button>
      </motion.div>

      <div className="p-4 space-y-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold text-gray-800">Featured Missions</h2>
          <Button
            variant="link"
            className="text-virgin-red p-0 h-auto flex items-center text-sm"
          >
            View all <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {filteredInitiatives.map((initiative, index) => (
          <motion.div
            key={initiative.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className="transform transition-all duration-300"
          >
            <Link href={`/initiative/${initiative.id}`}>
              <Card className="overflow-hidden hover:shadow-lg border-2 border-transparent hover:border-virgin-red/20">
                <div className="relative h-48 w-full">
                  <Image
                    src={initiative.image || "/placeholder.svg"}
                    alt={initiative.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <Badge className="absolute top-2 right-2 bg-virgin-red animate-pulse">
                    {initiative.category}
                  </Badge>
                  <div className="absolute bottom-2 right-2 bg-white/90 rounded-full px-2 py-1 text-xs font-bold flex items-center">
                    <span className="text-virgin-red">
                      {initiative.progress}%
                    </span>
                    <span className="ml-1 text-gray-700">Complete</span>
                  </div>
                </div>
                <CardContent className="p-4 relative">
                  <h2 className="text-lg font-bold mb-2">{initiative.title}</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    {initiative.summary}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="font-medium">
                        {initiative.location.name}
                      </span>
                    </div>
                    <Button className="bg-virgin-red hover:bg-virgin-red/90 group">
                      Join Mission
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          duration: 1.5,
                        }}
                      >
                        <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </motion.span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
