"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  ChevronRight,
  Edit,
  Leaf,
  Rocket,
  Settings,
  Star,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

const avatarOptions = [
  { id: "ecosage", name: "EcoSage", icon: Leaf },
  { id: "greengenie", name: "Green Genie", icon: Zap },
  { id: "renewableray", name: "Renewable Ray", icon: Rocket },
];

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("achievements");
  const [progress, setProgress] = useState(0);
  const [selectedAvatar, setSelectedAvatar] = useState("ecosage");
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const { toast } = useToast();

  // Mock user data
  const user = {
    name: "Alex Johnson",
    username: "alexj",
    avatar: "/placeholder.svg?height=100&width=100",
    level: 12,
    points: 1250,
    nextLevel: 1500,
    badges: [
      {
        id: "1",
        name: "Early Adopter",
        icon: Star,
        date: "Jan 2025",
        description: "One of the first to join the sustainability journey",
      },
      {
        id: "2",
        name: "Climate Champion",
        icon: Award,
        date: "Feb 2025",
        description: "Contributed to 5 climate initiatives",
      },
      {
        id: "3",
        name: "Community Leader",
        icon: Users,
        date: "Mar 2025",
        description: "Inspired 10 others to join the mission",
      },
    ],
    missions: [
      {
        id: "1",
        name: "Ocean Guardian",
        description: "Complete 3 ocean conservation initiatives",
        progress: 67,
        rewards: "Ocean Guardian Badge + 500 points",
      },
      {
        id: "2",
        name: "Energy Revolutionary",
        description: "Contribute to renewable energy projects",
        progress: 45,
        rewards: "Energy Revolutionary Badge + 750 points",
      },
      {
        id: "3",
        name: "Global Impact",
        description: "Engage with initiatives on 3 continents",
        progress: 33,
        rewards: "Global Citizen Badge + 1000 points",
      },
    ],
    contributions: [
      { id: "1", name: "Ocean Cleanup", points: 250, date: "Jan 15, 2025" },
      { id: "2", name: "Renewable Energy", points: 350, date: "Feb 3, 2025" },
      { id: "3", name: "Reforestation", points: 200, date: "Feb 28, 2025" },
      {
        id: "4",
        name: "Sustainable Aviation",
        points: 450,
        date: "Mar 10, 2025",
      },
    ],
    leaderboard: [
      {
        rank: 1,
        name: "Sarah M.",
        points: 2450,
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        rank: 2,
        name: "David K.",
        points: 2100,
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        rank: 3,
        name: "Alex Johnson",
        points: 1250,
        avatar: "/placeholder.svg?height=40&width=40",
        isUser: true,
      },
      {
        rank: 4,
        name: "Jamie T.",
        points: 1100,
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        rank: 5,
        name: "Robin P.",
        points: 950,
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress((user.points / user.nextLevel) * 100);
    }, 500);
    return () => clearTimeout(timer);
  }, [user.points, user.nextLevel]);

  const handleAvatarChange = (avatarId: string) => {
    setSelectedAvatar(avatarId);
    setShowAvatarSelector(false);
    toast({
      title: "Avatar Updated!",
      description: `You are now a ${
        avatarOptions.find((a) => a.id === avatarId)?.name
      }. Your sustainability journey continues!`,
      duration: 3000,
    });
  };

  const getAvatarIcon = () => {
    const avatar = avatarOptions.find((a) => a.id === selectedAvatar);
    return avatar ? avatar.icon : Leaf;
  };

  const AvatarIcon = getAvatarIcon();

  return (
    <div className="p-4">
      <motion.div
        className="relative bg-gradient-to-r from-virgin-red to-virgin-red/80 rounded-xl p-4 mb-6 text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-20 w-20 border-2 border-white bg-white/20">
              <AvatarIcon className="h-10 w-10 text-white" />
              <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <Button
              variant="ghost"
              size="icon"
              className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-white text-virgin-red hover:bg-white/90"
              onClick={() => setShowAvatarSelector(true)}
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-sm opacity-90">@{user.username}</p>
            <div className="flex items-center mt-1">
              <Badge className="bg-white text-virgin-red">
                Level {user.level}
              </Badge>
              <span className="ml-2 text-sm">Sustainability Hero</span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between mb-1 text-sm">
            <span>Level Progress</span>
            <span>
              {user.points} / {user.nextLevel}
            </span>
          </div>
          <div className="h-2 bg-white/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          <p className="text-xs mt-1 opacity-80">
            {user.nextLevel - user.points} points until Level {user.level + 1}
          </p>
        </div>
      </motion.div>

      <AnimatePresence>
        {showAvatarSelector && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg w-full max-w-sm p-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Choose Your Avatar</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setShowAvatarSelector(false)}
                >
                  ✕
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                {avatarOptions.map((avatar) => {
                  const Icon = avatar.icon;
                  return (
                    <Button
                      key={avatar.id}
                      variant="outline"
                      className={`flex flex-col h-auto py-3 ${
                        selectedAvatar === avatar.id
                          ? "border-2 border-virgin-red"
                          : ""
                      }`}
                      onClick={() => handleAvatarChange(avatar.id)}
                    >
                      <div className="h-12 w-12 rounded-full bg-virgin-red/10 flex items-center justify-center mb-2">
                        <Icon className="h-6 w-6 text-virgin-red" />
                      </div>
                      <span className="text-xs">{avatar.name}</span>
                    </Button>
                  );
                })}
              </div>

              <Button
                className="w-full bg-virgin-red hover:bg-virgin-red/90"
                onClick={() => setShowAvatarSelector(false)}
              >
                Confirm Selection
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Tabs
        defaultValue="achievements"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="achievements">Badges</TabsTrigger>
          <TabsTrigger value="missions">Missions</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="achievements" className="mt-4 space-y-4">
          <div className="space-y-4">
            {(user?.badges || []).map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="overflow-hidden border-2 border-virgin-red/10">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-3 p-4">
                      <div className="h-12 w-12 rounded-full bg-virgin-red/10 flex items-center justify-center text-virgin-red">
                        <badge.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold">{badge.name}</h3>
                        <p className="text-xs text-gray-500">
                          Earned {badge.date}
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 text-sm text-gray-600 border-t">
                      {badge.description}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6"
          >
            <Button
              variant="outline"
              className="w-full border-dashed border-2"
              onClick={() => {
                toast({
                  title: "Badge Showcase Coming Soon",
                  description:
                    "Soon you'll be able to showcase your badges on your public profile!",
                  duration: 3000,
                });
              }}
            >
              <Trophy className="h-4 w-4 mr-2" />
              View All Available Badges
            </Button>
          </motion.div>
        </TabsContent>

        <TabsContent value="missions" className="mt-4 space-y-4">
          <div className="space-y-4">
            {(user?.missions || []).map((mission, index) => (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="overflow-hidden border-2 border-virgin-red/10">
                  <CardContent className="p-0">
                    <div className="p-4">
                      <h3 className="font-bold flex items-center">
                        <Rocket className="h-5 w-5 mr-2 text-virgin-red" />
                        {mission.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 mb-3">
                        {mission.description}
                      </p>

                      <div className="mb-1 flex justify-between text-xs">
                        <span>Progress</span>
                        <span>{mission.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-virgin-red rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${mission.progress}%` }}
                          transition={{ delay: 0.2, duration: 1 }}
                        />
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 border-t">
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-500">
                          <span className="font-medium text-virgin-red">
                            Rewards:
                          </span>{" "}
                          {mission.rewards}
                        </div>
                        <Button
                          size="sm"
                          className="bg-virgin-red hover:bg-virgin-red/90"
                          onClick={() => {
                            toast({
                              title: "Mission Details",
                              description: `View detailed steps to complete the ${mission.name} mission.`,
                              duration: 3000,
                            });
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-4"
          >
            <Button
              className="w-full bg-virgin-red hover:bg-virgin-red/90"
              onClick={() => {
                toast({
                  title: "New Missions Coming Soon",
                  description:
                    "We're preparing exciting new sustainability missions for you!",
                  duration: 3000,
                });
              }}
            >
              Discover New Missions
            </Button>
          </motion.div>
        </TabsContent>

        <TabsContent value="leaderboard" className="mt-4 space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-r from-virgin-red/10 to-white p-3 rounded-lg mb-4"
          >
            <h3 className="font-bold text-sm mb-1">This Month's Heroes</h3>
            <p className="text-xs text-gray-600">
              Compete with other sustainability champions and earn exclusive
              rewards!
            </p>
          </motion.div>

          <div className="space-y-4">
            {(user?.leaderboard || []).map((entry, index) => (
              <motion.div
                key={entry.rank}
                initial={{ opacity: 0, x: entry.isUser ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card
                  className={`overflow-hidden ${
                    entry.isUser ? "border-2 border-virgin-red" : ""
                  }`}
                >
                  <CardContent className="p-3 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-700 mr-2">
                      {entry.rank}
                    </div>
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={entry.avatar} alt={entry.name} />
                      <AvatarFallback>{entry.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-bold flex items-center">
                        {entry.name}
                        {entry.isUser && (
                          <Badge className="ml-2 bg-virgin-red text-xs">
                            You
                          </Badge>
                        )}
                      </h3>
                      <div className="flex items-center">
                        {entry.rank === 1 && (
                          <Trophy className="h-3 w-3 text-yellow-500 mr-1" />
                        )}
                        <span className="text-xs text-gray-500">
                          Level {Math.floor(entry.points / 200)}
                        </span>
                      </div>
                    </div>
                    <div className="font-bold text-virgin-red">
                      {entry.points}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-4 p-4 bg-gray-50 rounded-lg text-center"
          >
            <p className="text-sm font-medium mb-2">Your Rank: #3 of 156</p>
            <p className="text-xs text-gray-500 mb-3">
              You're in the top 2% of sustainability heroes!
            </p>
            <Button
              variant="outline"
              className="text-virgin-red border-virgin-red"
              onClick={() => {
                toast({
                  title: "Challenge Friends",
                  description:
                    "Invite friends feature coming in the next update!",
                  duration: 3000,
                });
              }}
            >
              <Users className="h-4 w-4 mr-2" />
              Challenge Friends
            </Button>
          </motion.div>
        </TabsContent>
      </Tabs>

      <motion.div
        className="mt-6 pt-4 border-t"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Button
          variant="outline"
          className="w-full flex items-center justify-between"
          onClick={() => {
            toast({
              title: "Account Settings",
              description:
                "Settings page will be available in the next update.",
              duration: 3000,
            });
          }}
        >
          <div className="flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            Account Settings
          </div>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  );
}
