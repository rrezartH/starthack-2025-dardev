import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp, MessageSquare, Users } from "lucide-react"
import Link from "next/link"

interface IdeaCardProps {
  id?: string
  title: string
  description: string
  author: {
    name: string
    company: string
    avatar: string
    initials: string
  }
  category: "environmental" | "social" | "circular"
  votes: number
  comments: number
  lookingForCollaborators?: boolean
  date: string
}

export default function IdeaCard({
  id = "1",
  title,
  description,
  author,
  category,
  votes,
  comments,
  lookingForCollaborators,
  date,
}: IdeaCardProps) {
  const getCategoryStyles = () => {
    switch (category) {
      case "environmental":
        return "bg-eco-green-light text-eco-green"
      case "social":
        return "bg-eco-blue-light text-eco-blue"
      case "circular":
        return "bg-eco-orange-light text-eco-orange"
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge className={getCategoryStyles()} variant="outline">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Badge>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
        <CardTitle className="text-base mt-2">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback>{author.initials}</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-xs font-medium">{author.name}</div>
              <div className="text-xs text-muted-foreground">{author.company}</div>
            </div>
          </div>

          {lookingForCollaborators && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span className="text-xs">Seeking collaborators</span>
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="gap-1">
            <ThumbsUp className="h-4 w-4" />
            <span>{votes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>{comments}</span>
          </Button>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/ideas/${id}`}>View Idea</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

