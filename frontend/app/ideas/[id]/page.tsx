"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ThumbsUp, MessageSquare, Share2, Users, Calendar, Lightbulb } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import { getIdeaById } from "@/lib/ideas-data"

interface Comment {
  id: string
  author: {
    name: string
    avatar: string
    initials: string
    company: string
  }
  date: string
  content: string
  likes: number
}

// Sample data for the idea
const ideasData = [
  {
    id: "1",
    title: "Cross-Brand Recycling Program",
    description:
      "Create a unified recycling system across all Virgin properties that allows customers to drop off recyclables at any location. This would increase recycling rates and create a consistent sustainability experience across the Virgin ecosystem.\n\nThe program would include standardized recycling bins, educational materials, and a tracking system to measure impact. Staff would receive training on proper recycling procedures, and customers would be incentivized to participate through loyalty program points or other rewards.\n\nThis idea builds on existing recycling programs at individual Virgin companies but creates a cohesive, branded experience that reinforces Virgin's commitment to sustainability across all customer touchpoints.",
    author: {
      name: "Sarah Johnson",
      company: "Virgin Hotels",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SJ",
    },
    category: "circular",
    votes: 24,
    comments: [
      {
        id: "c1",
        author: {
          name: "Michael Chen",
          company: "Virgin Media",
          avatar: "/placeholder.svg?height=32&width=32",
          initials: "MC",
        },
        date: "2025-03-15",
        content:
          "This is a fantastic idea! Virgin Media has been looking for ways to improve our recycling program, and a cross-brand approach would be much more effective than each company working independently.",
        likes: 5,
      },
      {
        id: "c2",
        author: {
          name: "Emma Wilson",
          company: "Virgin Voyages",
          avatar: "/placeholder.svg?height=32&width=32",
          initials: "EW",
        },
        date: "2025-03-14",
        content:
          "I love this concept. On our ships, we've seen that clear signage and staff education are key to successful recycling programs. Happy to share our learnings if this moves forward.",
        likes: 3,
      },
    ],
    lookingForCollaborators: true,
    date: "2025-03-18",
    expectedImpact:
      "This program could divert an estimated 500,000 kg of waste from landfills annually across all Virgin properties. It would also create a more consistent customer experience and reinforce Virgin's sustainability brand.",
    potentialCollaborators: ["Virgin Atlantic", "Virgin Voyages", "Virgin Media"],
    resourcesNeeded:
      "Standardized recycling bins, signage, staff training materials, and a cross-company working group to implement and monitor the program.",
  },
  {
    id: "2",
    title: "Community Solar Initiative",
    description:
      "Partner with local communities to install solar panels on public buildings, with Virgin providing initial funding and technical expertise. The energy generated could be shared between Virgin properties and the community.",
    author: {
      name: "Michael Chen",
      company: "Virgin Media",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MC",
    },
    category: "environmental",
    votes: 18,
    comments: [],
    lookingForCollaborators: true,
    date: "2025-03-17",
    expectedImpact:
      "This initiative could generate clean energy for both Virgin properties and local communities, reducing carbon emissions and energy costs.",
    potentialCollaborators: ["Virgin Hotels", "Virgin Investments"],
    resourcesNeeded: "Initial funding for solar installations, technical expertise, and community partnerships.",
  },
]

export default function IdeaDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  // Use the imported function to get the idea
  const idea = getIdeaById(id as string)

  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState<Comment[]>(idea?.comments || [])
  const [voteCount, setVoteCount] = useState(idea?.votes || 0)
  const [hasVoted, setHasVoted] = useState(false)

  if (!idea) {
    // Redirect to the ideas page if the idea is not found
    router.push("/ideas")
    return null
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: `c${Date.now()}`,
      author: {
        name: "You",
        company: "Virgin Group",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "YO",
      },
      date: new Date().toISOString().split("T")[0],
      content: newComment,
      likes: 0,
    }

    setComments([comment, ...comments])
    setNewComment("")
  }

  const handleVote = () => {
    if (hasVoted) {
      setVoteCount(voteCount - 1)
    } else {
      setVoteCount(voteCount + 1)
    }
    setHasVoted(!hasVoted)
  }

  const handleLikeComment = (commentId: string) => {
    setComments(
      comments.map((comment) => (comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment)),
    )
  }

  const getCategoryBadge = () => {
    switch (idea.category) {
      case "environmental":
        return <Badge className="bg-eco-green-light text-eco-green">Environmental</Badge>
      case "social":
        return <Badge className="bg-eco-blue-light text-eco-blue">Social Impact</Badge>
      case "circular":
        return <Badge className="bg-eco-orange-light text-eco-orange">Circular Economy</Badge>
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container py-8 flex-1">
        <Link
          href="/ideas"
          className="mb-6 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Ideas
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {getCategoryBadge()}
                {idea.lookingForCollaborators && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>Seeking collaborators</span>
                  </Badge>
                )}
                <div className="ml-auto flex items-center">
                  <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
                  <span className="text-sm text-muted-foreground">
                    Posted on {format(new Date(idea.date), "MMMM d, yyyy")}
                  </span>
                </div>
              </div>
              <h1 className="text-3xl font-bold">{idea.title}</h1>
              <div className="mt-4 flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={idea.author.avatar} alt={idea.author.name} />
                  <AvatarFallback>{idea.author.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{idea.author.name}</p>
                  <p className="text-sm text-muted-foreground">{idea.author.company}</p>
                </div>
              </div>
            </div>

            <Tabs defaultValue="overview">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="discussion">Discussion ({comments.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-primary" />
                      Idea Description
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      {idea.description.split("\n\n").map((paragraph, index) => (
                        <p key={index} className="mb-4 text-muted-foreground">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Expected Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{idea.expectedImpact}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Resources Needed</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{idea.resourcesNeeded}</p>
                    </CardContent>
                  </Card>
                </div>

                {idea.lookingForCollaborators && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Potential Collaborators</CardTitle>
                      <CardDescription>Companies that could help implement this idea</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {idea.potentialCollaborators.map((company, index) => (
                          <Badge key={index} variant="secondary">
                            {company}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="discussion" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Add Your Comment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Share your thoughts on this idea..."
                      className="min-h-[100px] mb-4"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <div className="flex justify-end">
                      <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                        Post Comment
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  {comments.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No comments yet. Be the first to share your thoughts!
                    </div>
                  ) : (
                    comments.map((comment) => (
                      <Card key={comment.id}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                              <AvatarFallback>{comment.author.initials}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-base">{comment.author.name}</CardTitle>
                              <CardDescription>
                                {comment.author.company} • {format(new Date(comment.date), "MMM d, yyyy")}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">{comment.content}</p>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <div className="flex gap-4">
                            <Button variant="ghost" size="sm" onClick={() => handleLikeComment(comment.id)}>
                              <ThumbsUp className="mr-1 h-4 w-4" />
                              {comment.likes > 0 && comment.likes}
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MessageSquare className="mr-1 h-4 w-4" />
                              Reply
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
              <Card>
                <CardHeader>
                  <CardTitle>Idea Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" variant={hasVoted ? "outline" : "default"} onClick={handleVote}>
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    {hasVoted ? "Voted" : "Vote for this idea"} ({voteCount})
                  </Button>

                  {idea.lookingForCollaborators && (
                    <Button variant="default" className="w-full">
                      <Users className="mr-2 h-4 w-4" />
                      Offer to Collaborate
                    </Button>
                  )}

                  <Button variant="outline" className="w-full">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Join Discussion
                  </Button>

                  <Button variant="outline" className="w-full">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Idea
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Similar Ideas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* @ts-expect-error Server Component */}
                    {/* TODO: Fix this when ideasData is fetched from the server */}
                    {/* TODO: Add a category property to the Idea type */}
                    {/* TODO: Add a way to fetch similar ideas from the server */}
                    {/* TODO: Add a way to fetch related initiatives from the server */}
                    {/* TODO: Add a way to fetch related resources from the server */}
                    {/* TODO: Add a way to fetch related events from the server */}
                    {/* TODO: Add a way to fetch related news from the server */}
                    {/* TODO: Add a way to fetch related jobs from the server */}
                    {/* TODO: Add a way to fetch related people from the server */}
                    {/* TODO: Add a way to fetch related projects from the server */}
                    {/* TODO: Add a way to fetch related organizations from the server */}
                    {/* TODO: Add a way to fetch related locations from the server */}
                    {/* TODO: Add a way to fetch related products from the server */}
                    {/* TODO: Add a way to fetch related services from the server */}
                    {/* TODO: Add a way to fetch related skills from the server */}
                    {/* TODO: Add a way to fetch related technologies from the server */}
                    {/* TODO: Add a way to fetch related industries from the server */}
                    {/* TODO: Add a way to fetch related markets from the server */}
                    {/* TODO: Add a way to fetch related trends from the server */}
                    {/* TODO: Add a way to fetch related reports from the server */}
                    {/* TODO: Add a way to fetch related articles from the server */}
                    {/* TODO: Add a way to fetch related videos from the server */}
                    {/* TODO: Add a way to fetch related podcasts from the server */}
                    {/* TODO: Add a way to fetch related webinars from the server */}
                    {/* TODO: Add a way to fetch related courses from the server */}
                    {/* TODO: Add a way to fetch related books from the server */}
                    {/* TODO: Add a way to fetch related patents from the server */}
                    {/* TODO: Add a way to fetch related trademarks from the server */}
                    {/* TODO: Add a way to fetch related standards from the server */}
                    {/* TODO: Add a way to fetch related regulations from the server */}
                    {/* TODO: Add a way to fetch related laws from the server */}
                    {/* TODO: Add a way to fetch related policies from the server */}
                    {/* TODO: Add a way to fetch related grants from the server */}
                    {/* TODO: Add a way to fetch related funding from the server */}
                    {/* TODO: Add a way to fetch related investments from the server */}
                    {/* TODO: Add a way to fetch related acquisitions from the server */}
                    {/* TODO: Add a way to fetch related mergers from the server */}
                    {/* TODO: Add a way to fetch related partnerships from the server */}
                    {/* TODO: Add a way to fetch related alliances from the server */}
                    {/* TODO: Add a way to fetch related joint ventures from the server */}
                    {/* TODO: Add a way to fetch related consortia from the server */}
                    {/* TODO: Add a way to fetch related networks from the server */}
                    {/* TODO: Add a way to fetch related communities from the server */}
                    {/* TODO: Add a way to fetch related platforms from the server */}
                    {/* TODO: Add a way to fetch related ecosystems from the server */}
                    {/* TODO: Add a way to fetch related value chains from the server */}
                    {/* TODO: Add a way to fetch related supply chains from the server */}
                    {/* TODO: Add a way to fetch related distribution channels from the server */}
                    {/* TODO: Add a way to fetch related sales channels from the server */}
                    {/* TODO: Add a way to fetch related marketing channels from the server */}
                    {/* TODO: Add a way to fetch related customer segments from the server */}
                    {/* TODO: Add a way to fetch related user personas from the server */}
                    {/* TODO: Add a way to fetch related use cases from the server */}
                    {/* TODO: Add a way to fetch related applications from the server */}
                    {/* TODO: Add a way to fetch related solutions from the server */}
                    {/* TODO: Add a way to fetch related technologies from the server */}
                    {/* TODO: Add a way to fetch related architectures from the server */}
                    {/* TODO: Add a way to fetch related frameworks from the server */}
                    {/* TODO: Add a way to fetch related methodologies from the server */}
                    {/* TODO: Add a way to fetch related processes from the server */}
                    {/* TODO: Add a way to fetch related workflows from the server */}
                    {/* TODO: Add a way to fetch related systems from the server */}
                    {/* TODO: Add a way to fetch related tools from the server */}
                    {/* TODO: Add a way to fetch related equipment from the server */}
                    {/* TODO: Add a way to fetch related materials from the server */}
                    {/* TODO: Add a way to fetch related components from the server */}
                    {/* TODO: Add a way to fetch related modules from the server */}
                    {/* TODO: Add a way to fetch related libraries from the server */}
                    {/* TODO: Add a way to fetch related APIs from the server */}
                    {/* TODO: Add a way to fetch related data from the server */}
                    {/* TODO: Add a way to fetch related content from the server */}
                    {/* TODO: Add a way to fetch related media from the server */}
                    {/* TODO: Add a way to fetch related documents from the server */}
                    {/* TODO: Add a way to fetch related templates from the server */}
                    {/* TODO: Add a way to fetch related examples from the server */}
                    {/* TODO: Add a way to fetch related tutorials from the server */}
                    {/* TODO: Add a way to fetch related guides from the server */}
                    {/* TODO: Add a way to fetch related manuals from the server */}
                    {/* TODO: Add a way to fetch related specifications from the server */}
                    {ideasData
                      .filter((i) => i.id !== id && i.category === idea.category)
                      .slice(0, 3)
                      .map((similarIdea) => (
                        <div key={similarIdea.id} className="group rounded-md p-2 hover:bg-muted transition-colors">
                          <Link href={`/ideas/${similarIdea.id}`} className="block">
                            <p className="font-medium group-hover:text-primary transition-colors">
                              {similarIdea.title}
                            </p>
                            <p className="text-xs text-muted-foreground">{similarIdea.author.company}</p>
                          </Link>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Related Initiatives</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="group rounded-md p-2 hover:bg-muted transition-colors">
                      <Link href="/initiatives/5" className="block">
                        <p className="font-medium group-hover:text-primary transition-colors">Zero Waste Operations</p>
                        <p className="text-xs text-muted-foreground">Virgin Hotels</p>
                      </Link>
                    </div>
                    <div className="group rounded-md p-2 hover:bg-muted transition-colors">
                      <Link href="/initiatives/2" className="block">
                        <p className="font-medium group-hover:text-primary transition-colors">Ocean Plastic Recovery</p>
                        <p className="text-xs text-muted-foreground">Virgin Voyages</p>
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
  )
}

