"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { initiatives } from "@/lib/data-mobile";
import { motion } from "framer-motion";
import {
  Award,
  ChevronRight,
  Heart,
  Leaf,
  MessageSquare,
  Play,
  Rocket,
  Share2,
  ThumbsDown,
  ThumbsUp,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function InitiativeDetail({ id }: { id: string }) {
  const initiative = initiatives.find((i) => i.id === id);
  const [liked, setLiked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (initiative) {
      const timer = setTimeout(() => {
        setProgress(initiative.progress || 0);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [initiative]);

  if (!initiative) {
    return <div className="p-4">Initiative not found</div>;
  }

  const handleLike = () => {
    setLiked(!liked);
    toast({
      title: liked ? "Removed from favorites" : "Added to favorites!",
      description: liked
        ? "This initiative has been removed from your favorites."
        : "This initiative has been added to your favorites. Keep track of it in your profile!",
      duration: 3000,
    });
  };

  const handleShare = () => {
    toast({
      title: "Share Your Impact",
      description:
        "Sharing options will open in your next update. Spread the word about this amazing initiative!",
      duration: 3000,
    });
  };

  const handleComment = () => {
    toast({
      title: "Join the Conversation",
      description:
        "Comment feature will be available in your next update. Your voice matters!",
      duration: 3000,
    });
  };

  const handleContribute = (option: string) => {
    toast({
      title: "Thank You, Sustainability Hero!",
      description: `You've taken the first step to ${option.toLowerCase()}. Check your profile for mission updates!`,
      duration: 3000,
    });
  };

  return (
    <div className="w-full">
      <div className="relative h-64 w-full">
        <Image
          src={initiative.image || "/placeholder.svg"}
          alt={initiative.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

        <motion.div
          className="absolute bottom-4 left-4 right-4 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-2xl font-bold mb-1 drop-shadow-md">
            {initiative.title}
          </h1>
          <div className="flex items-center text-sm">
            <Badge className="bg-virgin-red mr-2">{initiative.category}</Badge>
            <span className="font-medium">{initiative.location}</span>
          </div>
        </motion.div>

        <motion.div
          className="absolute top-4 right-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white/20 backdrop-blur-sm border-white/50 text-white hover:bg-white/30"
            onClick={() => setShowVideo(true)}
          >
            <Play className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>

      {showVideo && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="relative w-full max-w-3xl aspect-video bg-black rounded-lg overflow-hidden">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 z-10 text-white hover:bg-white/20"
              onClick={() => setShowVideo(false)}
            >
              Close
            </Button>
            <div className="flex items-center justify-center h-full">
              <p className="text-white text-center">
                Video preview coming soon!
                <br />
                <span className="text-sm opacity-70">
                  Experience the full story of this initiative.
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="p-4">
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Mission Progress</span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-3 bg-gray-200">
            <div
              className="h-full bg-gradient-to-r from-virgin-red to-virgin-red/80 rounded-full relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              {progress > 30 && (
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div
                    className="absolute inset-0 opacity-30"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 1.5,
                      ease: "linear",
                    }}
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                    }}
                  />
                </div>
              )}
            </div>
          </Progress>
        </motion.div>

        <motion.div
          className="flex justify-between mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="outline"
            size="sm"
            className={`flex items-center gap-1 ${
              liked ? "text-virgin-red border-virgin-red" : ""
            }`}
            onClick={handleLike}
          >
            <Heart
              className={`h-4 w-4 ${
                liked ? "fill-virgin-red text-virgin-red" : ""
              }`}
            />
            {liked ? "Liked" : "Like"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
            Share Impact
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={handleComment}
          >
            <MessageSquare className="h-4 w-4" />
            Comment
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="impact">Impact</TabsTrigger>
              <TabsTrigger value="contribute">Join Mission</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="mt-4">
              <motion.p
                className="text-sm text-gray-700 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {initiative.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="font-bold mb-2">Key Objectives</h3>
                <ul className="space-y-2 mb-4">
                  {(initiative?.objectives || []).map((objective, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index + 0.3 }}
                    >
                      <Rocket className="h-5 w-5 text-virgin-red shrink-0 mt-0.5" />
                      <span className="text-sm">{objective}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                className="mt-6 bg-virgin-red/10 rounded-lg p-4 border border-virgin-red/20"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="font-bold text-virgin-red flex items-center">
                  <Zap className="h-5 w-5 mr-1" /> Quick Facts
                </h3>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="bg-white rounded p-2 text-center">
                    <div className="text-lg font-bold text-virgin-red">
                      {initiative.contributions.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">Contributors</div>
                  </div>
                  <div className="bg-white rounded p-2 text-center">
                    <div className="text-lg font-bold text-virgin-red">
                      {initiative.impactScore}
                    </div>
                    <div className="text-xs text-gray-500">Impact Score</div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="impact" className="mt-4">
              <div className="space-y-4">
                {(initiative?.impacts || []).map((impact, index) => (
                  <motion.div
                    key={index}
                    className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-lg border border-gray-100 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 * index }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-10 w-10 rounded-full bg-virgin-red flex items-center justify-center">
                        <Award className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="font-bold text-lg">{impact.title}</h3>
                    </div>
                    <p className="text-sm text-gray-700">
                      {impact.description}
                    </p>

                    <motion.div
                      className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.3 * index, duration: 0.5 }}
                    >
                      <motion.div
                        className="h-full bg-virgin-red rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${70 - index * 15}%` }}
                        transition={{ delay: 0.3 * index + 0.2, duration: 0.8 }}
                      />
                    </motion.div>
                  </motion.div>
                ))}

                <motion.div
                  className="mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <h3 className="font-bold mb-3">Community Impact</h3>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Card key={i} className="min-w-[150px] shrink-0">
                        <CardContent className="p-3">
                          <Avatar className="h-10 w-10 mb-2">
                            <AvatarImage
                              src={`/placeholder.svg?height=40&width=40`}
                            />
                            <AvatarFallback>U{i}</AvatarFallback>
                          </Avatar>
                          <h4 className="text-sm font-bold">User Story {i}</h4>
                          <p className="text-xs text-gray-500">
                            "This initiative changed how I think about
                            sustainability!"
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="contribute" className="mt-4">
              <motion.p
                className="text-sm text-gray-700 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Join us in making a difference! Choose how you want to
                contribute to this mission:
              </motion.p>
              <div className="space-y-4">
                {(initiative?.contributionOptions || []).map(
                  (option, index) => (
                    <motion.div
                      key={index}
                      className="border rounded-lg overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 * index }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="bg-gradient-to-r from-virgin-red/10 to-white p-3 border-b">
                        <h3 className="font-bold flex items-center">
                          {index === 0 ? (
                            <Rocket className="h-5 w-5 mr-2 text-virgin-red" />
                          ) : index === 1 ? (
                            <Leaf className="h-5 w-5 mr-2 text-virgin-red" />
                          ) : (
                            <Zap className="h-5 w-5 mr-2 text-virgin-red" />
                          )}
                          {option.title}
                        </h3>
                        <p className="text-sm text-gray-700 mt-1">
                          {option.description}
                        </p>
                      </div>
                      <div className="p-3">
                        <Button
                          className="w-full bg-virgin-red hover:bg-virgin-red/90 group"
                          onClick={() => handleContribute(option.title)}
                        >
                          {option.actionText}
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
                    </motion.div>
                  )
                )}
              </div>

              <motion.div
                className="mt-6 bg-gray-50 p-4 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <h3 className="font-bold mb-2 flex items-center">
                  <Award className="h-5 w-5 mr-2 text-virgin-red" /> Earn These
                  Badges
                </h3>
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-virgin-red/20 flex items-center justify-center">
                      <Rocket className="h-6 w-6 text-virgin-red" />
                    </div>
                    <span className="text-xs mt-1">Pioneer</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-virgin-red/20 flex items-center justify-center">
                      <Leaf className="h-6 w-6 text-virgin-red" />
                    </div>
                    <span className="text-xs mt-1">Eco Hero</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full bg-virgin-red/20 flex items-center justify-center">
                      <Zap className="h-6 w-6 text-virgin-red" />
                    </div>
                    <span className="text-xs mt-1">Energizer</span>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div
          className="mt-6 border-t pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <h3 className="font-bold mb-3">Was this initiative helpful?</h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-1 hover:bg-green-50 hover:border-green-200 hover:text-green-600"
              onClick={() => {
                toast({
                  title: "Thank You!",
                  description:
                    "Your feedback helps us improve our sustainability initiatives.",
                  duration: 3000,
                });
              }}
            >
              <ThumbsUp className="h-4 w-4" />
              Yes
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-1 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
              onClick={() => {
                toast({
                  title: "We Value Your Feedback",
                  description:
                    "Please let us know how we can improve this initiative.",
                  duration: 3000,
                });
              }}
            >
              <ThumbsDown className="h-4 w-4" />
              No
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
