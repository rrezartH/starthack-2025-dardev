"use client";

import Header from "@/components/header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { getInitiativeById, type Comment } from "@/lib/data";
import { format } from "date-fns";
import {
  Bell,
  BellOff,
  Calendar,
  ChevronLeft,
  Clock,
  ListChecks,
  MapPin,
  MessageSquare,
  Share2,
  Star,
  Target,
  ThumbsUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";

interface Update {
  id: string;
  author: string;
  date: string;
  title: string;
  content: string;
  likes: number;
}

export default function InitiativeDetailPage() {
  const { id } = useParams();
  const initiative = getInitiativeById(id as string);
  const [newComment, setNewComment] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [comments, setComments] = useState<Comment[]>(
    initiative?.comments || []
  );
  const [isFollowing, setIsFollowing] = useState(false);
  const [likeCount, setLikeCount] = useState(initiative?.ratings.count || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [followerCount, setFollowerCount] = useState(128);
  const [newUpdateTitle, setNewUpdateTitle] = useState("");
  const [newUpdateContent, setNewUpdateContent] = useState("");
  const [updates, setUpdates] = useState<Update[]>([
    {
      id: "u1",
      author: "Initiative Lead",
      date: "2025-03-15",
      title: "Phase 1 Complete",
      content:
        "We've successfully completed the first phase of this initiative, reducing carbon emissions by 15% across all participating Virgin companies. The team has worked tirelessly to implement new energy-saving measures.",
      likes: 24,
    },
    {
      id: "u2",
      author: "Project Manager",
      date: "2025-02-28",
      title: "New Partnership Announcement",
      content:
        "We're excited to announce a new partnership with a leading sustainable energy provider that will help us accelerate our goals. This collaboration will enable us to implement innovative solutions across our operations.",
      likes: 18,
    },
  ]);

  if (!initiative) {
    notFound();
  }

  const handleAddComment = () => {
    if (!newComment || userRating === 0) return;

    const comment: Comment = {
      id: `c${Date.now()}`,
      author: "You",
      date: new Date().toISOString().split("T")[0],
      content: newComment,
      rating: userRating,
    };

    setComments([comment, ...comments]);
    setNewComment("");
    setUserRating(0);
  };

  const handleToggleFollow = () => {
    setIsFollowing(!isFollowing);
    setFollowerCount(isFollowing ? followerCount - 1 : followerCount + 1);
  };

  const handleToggleLike = () => {
    setHasLiked(!hasLiked);
    setLikeCount(hasLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleAddUpdate = () => {
    if (!newUpdateTitle.trim() || !newUpdateContent.trim()) return;

    const update: Update = {
      id: `u${Date.now()}`,
      author: "You",
      date: new Date().toISOString().split("T")[0],
      title: newUpdateTitle,
      content: newUpdateContent,
      likes: 0,
    };

    setUpdates([update, ...updates]);
    setNewUpdateTitle("");
    setNewUpdateContent("");
  };

  const handleLikeUpdate = (updateId: string) => {
    setUpdates(
      updates.map((update) =>
        update.id === updateId ? { ...update, likes: update.likes + 1 } : update
      )
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Added horizontal padding with px-4 */}
      <div className="container py-8 px-4 flex-1">
        <Link
          href="/initiatives"
          className="mb-6 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Initiatives
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-6 overflow-hidden rounded-lg">
              <img
                src={
                  initiative.image || "/placeholder.svg?height=400&width=800"
                }
                alt={initiative.title}
                className="h-auto w-full object-cover"
              />
            </div>

            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">{initiative.category}</Badge>
                <Badge
                  variant={
                    initiative.status === "active"
                      ? "default"
                      : initiative.status === "completed"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {initiative.status}
                </Badge>
                <div className="ml-auto flex items-center">
                  <Star
                    className={`h-4 w-4 ${
                      hasLiked
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                  <span className="ml-1 text-sm font-medium">{likeCount}</span>
                  <span className="ml-1 text-xs text-muted-foreground">
                    ratings
                  </span>
                </div>
              </div>
              <h1 className="mt-4 text-3xl font-bold">{initiative.title}</h1>
              <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="mr-1 h-4 w-4" />
                  {initiative.location.name}
                </div>
                <div className="flex items-center">
                  <Users className="mr-1 h-4 w-4" />
                  {followerCount} followers
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  Started {format(new Date(2024, 0, 15), "MMM yyyy")}
                </div>
              </div>
            </div>

            <Tabs defaultValue="overview">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="updates">Updates</TabsTrigger>
                <TabsTrigger value="impact">Impact</TabsTrigger>
                <TabsTrigger value="feedback">
                  Feedback ({comments.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    About this Initiative
                  </h2>
                  <p className="text-muted-foreground">{initiative.summary}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <Target className="mr-2 h-5 w-5 text-primary" />
                    Main Goal
                  </h3>
                  <p className="text-muted-foreground">
                    To reduce carbon emissions across all Virgin operations by
                    50% by 2030 and achieve net-zero by 2050.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <ListChecks className="mr-2 h-5 w-5 text-primary" />
                    Key Objectives
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>
                      Transition to sustainable aviation fuel for 30% of flights
                      by 2027
                    </li>
                    <li>
                      Implement carbon offset programs for all Virgin Atlantic
                      flights
                    </li>
                    <li>
                      Reduce single-use plastics by 90% across all operations
                    </li>
                    <li>
                      Collaborate with industry partners to develop new green
                      technologies
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-primary" />
                    Timeline
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="mr-3 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">
                        1
                      </div>
                      <div>
                        <p className="font-medium">
                          Phase 1: Research & Planning
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Jan 2024 - Jun 2024 (Completed)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-3 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">
                        2
                      </div>
                      <div>
                        <p className="font-medium">
                          Phase 2: Initial Implementation
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Jul 2024 - Dec 2024 (In Progress)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-3 h-6 w-6 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs">
                        3
                      </div>
                      <div>
                        <p className="font-medium">
                          Phase 3: Scaling & Optimization
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Jan 2025 - Dec 2025 (Upcoming)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Button size="lg" className="flex-1">
                    {initiative.callToAction}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    asChild
                  >
                    <Link href={initiative.link}>Learn More</Link>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="updates" className="space-y-6">
                <div className="bg-muted/30 rounded-lg p-4 border border-border">
                  <h3 className="text-lg font-semibold mb-2">Post an Update</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Share progress, milestones, or news about this initiative.
                    All followers will be notified.
                  </p>
                  <div className="space-y-3">
                    <Input
                      placeholder="Update title"
                      value={newUpdateTitle}
                      onChange={(e) => setNewUpdateTitle(e.target.value)}
                    />
                    <Textarea
                      placeholder="What's the latest on this initiative?"
                      className="min-h-[100px]"
                      value={newUpdateContent}
                      onChange={(e) => setNewUpdateContent(e.target.value)}
                    />
                    <div className="flex justify-end">
                      <Button
                        onClick={handleAddUpdate}
                        disabled={
                          !newUpdateTitle.trim() || !newUpdateContent.trim()
                        }
                      >
                        Post Update
                      </Button>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold">Recent Updates</h3>

                {updates.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No updates have been posted yet.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {updates.map((update) => (
                      <Card key={update.id}>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">
                                {update.title}
                              </CardTitle>
                              <CardDescription>
                                Posted by {update.author} on{" "}
                                {format(new Date(update.date), "MMMM d, yyyy")}
                              </CardDescription>
                            </div>
                            <Badge variant="outline">
                              {update.date ===
                              new Date().toISOString().split("T")[0]
                                ? "New"
                                : "Update"}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">
                            {update.content}
                          </p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <div className="flex items-center gap-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleLikeUpdate(update.id)}
                            >
                              <ThumbsUp className="mr-1 h-4 w-4" />
                              {update.likes}
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MessageSquare className="mr-1 h-4 w-4" />
                              Comment
                            </Button>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Share2 className="mr-1 h-4 w-4" />
                            Share
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="impact" className="space-y-6">
                <h2 className="text-xl font-semibold">Impact Metrics</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-2xl font-bold text-primary">
                        {initiative.impact.co2Reduced.toLocaleString()}
                      </CardTitle>
                      <CardDescription>kg CO₂ Reduced</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-2xl font-bold text-primary">
                        {initiative.impact.peopleImpacted.toLocaleString()}
                      </CardTitle>
                      <CardDescription>People Impacted</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-2xl font-bold text-primary">
                        {initiative.impact.resourcesSaved.toLocaleString()}
                      </CardTitle>
                      <CardDescription>Resources Saved (kg)</CardDescription>
                    </CardHeader>
                  </Card>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Impact Breakdown
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">
                          Carbon Reduction Progress
                        </span>
                        <span className="text-sm font-medium">65%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-primary"
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
                        <span className="text-sm">People Reached</span>
                        <span className="text-sm font-medium">42%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: "42%" }}
                        ></div>
                      </div>
                      <div className="flex justify-end mt-1">
                        <span className="text-xs text-muted-foreground">
                          42% of 2025 target
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Resource Conservation</span>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: "78%" }}
                        ></div>
                      </div>
                      <div className="flex justify-end mt-1">
                        <span className="text-xs text-muted-foreground">
                          78% of 2025 target
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Participating Companies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Virgin Atlantic</Badge>
                    <Badge variant="secondary">Virgin Hotels</Badge>
                    <Badge variant="secondary">Virgin Voyages</Badge>
                    <Badge variant="secondary">Virgin Media</Badge>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="feedback" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold">Leave Your Feedback</h2>
                  <div className="mt-2">
                    <div className="mb-2 flex items-center">
                      <span className="mr-2 text-sm">Your rating:</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setUserRating(star)}
                            className="p-1"
                          >
                            <Star
                              className={`h-5 w-5 ${
                                userRating >= star
                                  ? "fill-primary text-primary"
                                  : "text-muted-foreground"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <Textarea
                      placeholder="Share your thoughts about this initiative..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="mb-2"
                    />
                    <Button onClick={handleAddComment}>Submit Feedback</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">
                    Community Feedback ({comments.length})
                  </h2>
                  {comments.length === 0 ? (
                    <p className="text-muted-foreground">
                      Be the first to leave feedback on this initiative.
                    </p>
                  ) : (
                    comments.map((comment) => (
                      <Card key={comment.id}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>
                                  {comment.author.substring(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <CardTitle className="text-base">
                                  {comment.author}
                                </CardTitle>
                                <CardDescription>
                                  {comment.date}
                                </CardDescription>
                              </div>
                            </div>
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < comment.rating
                                      ? "fill-primary text-primary"
                                      : "text-muted-foreground"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">{comment.content}</p>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <div className="flex gap-4">
                            <Button variant="ghost" size="sm">
                              <ThumbsUp className="mr-1 h-4 w-4" />
                              Helpful
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MessageSquare className="mr-1 h-4 w-4" />
                              Reply
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share2 className="mr-1 h-4 w-4" />
                              Share
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <div className="space-y-6">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Get Involved</CardTitle>
                  <CardDescription>
                    Join us in making a positive impact
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    className="w-full"
                    variant={isFollowing ? "outline" : "default"}
                    onClick={handleToggleFollow}
                  >
                    {isFollowing ? (
                      <>
                        <BellOff className="mr-2 h-4 w-4" />
                        Unfollow Initiative
                      </>
                    ) : (
                      <>
                        <Bell className="mr-2 h-4 w-4" />
                        Follow Initiative
                      </>
                    )}
                  </Button>
                  <Button
                    variant={hasLiked ? "outline" : "default"}
                    className="w-full"
                    onClick={handleToggleLike}
                  >
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    {hasLiked ? "Liked" : "Like This Initiative"}
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={initiative.link}>Learn More</Link>
                  </Button>
                  <Button variant="secondary" className="w-full">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share This Initiative
                  </Button>
                </CardContent>
                <CardFooter>
                  <p className="text-xs text-muted-foreground">
                    By participating, you're helping Virgin achieve its
                    sustainability goals and creating a better future for our
                    planet.
                  </p>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Top Contributors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>SJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Sarah Johnson</p>
                        <p className="text-xs text-muted-foreground">
                          Virgin Atlantic
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>MC</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Michael Chen</p>
                        <p className="text-xs text-muted-foreground">
                          Virgin Hotels
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>EW</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Emma Wilson</p>
                        <p className="text-xs text-muted-foreground">
                          Virgin Voyages
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Related Initiatives
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="group rounded-md p-2 hover:bg-muted transition-colors">
                      <Link href="/initiatives/2" className="block">
                        <p className="font-medium group-hover:text-primary transition-colors">
                          Ocean Plastic Recovery
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Virgin Voyages
                        </p>
                      </Link>
                    </div>
                    <div className="group rounded-md p-2 hover:bg-muted transition-colors">
                      <Link href="/initiatives/3" className="block">
                        <p className="font-medium group-hover:text-primary transition-colors">
                          Renewable Energy Transition
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Virgin Hotels
                        </p>
                      </Link>
                    </div>
                    <div className="group rounded-md p-2 hover:bg-muted transition-colors">
                      <Link href="/initiatives/5" className="block">
                        <p className="font-medium group-hover:text-primary transition-colors">
                          Zero Waste Operations
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Virgin Group
                        </p>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
