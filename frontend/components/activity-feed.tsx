import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ActivityItem {
  id: string
  company: {
    name: string
    avatar: string
    initials: string
  }
  action: string
  target: string
  category?: "environmental" | "social" | "circular"
  time: string
}

interface ActivityFeedProps {
  activities: ActivityItem[]
  className?: string
}

export default function ActivityFeed({ activities, className }: ActivityFeedProps) {
  const getCategoryBadge = (category?: string) => {
    if (!category) return null

    switch (category) {
      case "environmental":
        return (
          <Badge className="bg-eco-green-light text-eco-green" variant="outline">
            Environmental
          </Badge>
        )
      case "social":
        return (
          <Badge className="bg-eco-blue-light text-eco-blue" variant="outline">
            Social
          </Badge>
        )
      case "circular":
        return (
          <Badge className="bg-eco-orange-light text-eco-orange" variant="outline">
            Circular
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader>
        <CardTitle className="text-lg">Sustainability Activity</CardTitle>
      </CardHeader>
      <CardContent className="max-h-[400px] overflow-y-auto">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.company.avatar} alt={activity.company.name} />
                <AvatarFallback>{activity.company.initials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1 flex-1">
                <div className="space-y-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.company.name}</span> {activity.action}{" "}
                    <span className="font-medium">{activity.target}</span>
                  </p>
                  {getCategoryBadge(activity.category)}
                </div>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

