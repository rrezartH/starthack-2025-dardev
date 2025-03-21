"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { BarChart2, Home, Map, User } from "lucide-react";
import Link from "next/link";

type BottomNavigationProps = {
  activeTab: "home" | "map" | "dashboard" | "profile";
};

export default function BottomNavigation({ activeTab }: BottomNavigationProps) {
  const tabs = [
    {
      name: "Journey",
      icon: Home,
      href: "/mb",
      id: "home",
    },
    {
      name: "Map",
      icon: Map,
      href: "/mb/map",
      id: "map",
    },
    {
      name: "Impact",
      icon: BarChart2,
      href: "/mb/dashboard",
      id: "dashboard",
    },
    {
      name: "Hero",
      icon: User,
      href: "/mb/profile",
      id: "profile",
    },
  ];

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex justify-around items-center h-16 px-4"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5 }}
    >
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          href={tab.href}
          className={cn(
            "flex flex-col items-center justify-center w-full h-full relative",
            activeTab === tab.id
              ? "text-virgin-red"
              : "text-gray-500 hover:text-virgin-red"
          )}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute -top-2 w-1/2 h-1 bg-virgin-red rounded-full"
              transition={{ type: "spring", duration: 0.5 }}
            />
          )}
          <tab.icon className="h-6 w-6" />
          <span className="text-xs mt-1">{tab.name}</span>
        </Link>
      ))}
    </motion.div>
  );
}
