import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ThumbsUp, MessageSquare, Bell } from "lucide-react"

interface InitiativeCardProps {
  title: string
  description: string
  category: "environmental" | "social" | "circular"
  status: "active" | "planned" | "completed"
  progress: number
  company: {
    name: string
    avatar: string
    initials: string
  }
  impact: {
    primary: {
      value: number | string
      label: string
    }
    secondary?: {
      value: number | string
      label: string
    }
  }
  collaborators?: number
  className?: string
  id?: string
}

export default function InitiativeCard({
  title,
  description,
  category,
  status,
  progress,
  company,
  impact,
  collaborators,
  className,
  id = "1",
}: InitiativeCardProps) {
  const getCategoryStyles = () => {
    switch (category) {
      case "environmental":
        return {
          badge: "bg-eco-green-light text-eco-green",
          icon: "bg-eco-green text-white",
        }
      case "social":
        return {
          badge: "bg-eco-blue-light text-eco-blue",
          icon: "bg-eco-blue text-white",
        }
      case "circular":
        return {
          badge: "bg-eco-orange-light text-eco-orange",
          icon: "bg-eco-orange text-white",
        }
    }
  }

  const getStatusBadge = () => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>
      case "planned":
        return <Badge variant="outline">Planned</Badge>
      case "completed":
        return <Badge variant="secondary">Completed</Badge>
    }
  }

  const categoryStyles = getCategoryStyles()

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge className={categoryStyles.badge} variant="outline">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Badge>
          {getStatusBadge()}
        </div>
        <CardTitle className="line-clamp-1 text-base mt-2">{title}</CardTitle>
        <CardDescription className="line-clamp-2 text-xs">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="mb-4 space-y-1">
          <div className="flex justify-between text-xs">
            <span>Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="rounded-md bg-muted p-2 text-center">
            <div className="text-sm font-bold">{impact.primary.value}</div>
            <div className="text-xs text-muted-foreground">{impact.primary.label}</div>
          </div>
          {impact.secondary && (
            <div className="rounded-md bg-muted p-2 text-center">
              <div className="text-sm font-bold">{impact.secondary.value}</div>
              <div className="text-xs text-muted-foreground">{impact.secondary.label}</div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={company.avatar} alt={company.name} />
              <AvatarFallback>{company.initials}</AvatarFallback>
            </Avatar>
            <span className="text-xs">{company.name}</span>
          </div>
          {collaborators && (
            <Badge variant="outline" className="text-xs">
              +{collaborators} collaborators
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ThumbsUp className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MessageSquare className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/initiatives/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

