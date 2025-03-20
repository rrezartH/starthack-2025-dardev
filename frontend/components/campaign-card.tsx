import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface CampaignCardProps {
  title: string
  description: string
  status: "active" | "scheduled" | "completed" | "draft"
  progress: number
  company: {
    name: string
    avatar: string
    initials: string
  }
  startDate: string
  endDate: string
}

export default function CampaignCard({
  title,
  description,
  status,
  progress,
  company,
  startDate,
  endDate,
}: CampaignCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "scheduled":
        return "bg-blue-500"
      case "completed":
        return "bg-gray-500"
      case "draft":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="capitalize">
            <span className={`mr-1.5 h-2 w-2 rounded-full ${getStatusColor(status)}`}></span>
            {status}
          </Badge>
          <Avatar className="h-6 w-6">
            <AvatarImage src={company.avatar} alt={company.name} />
            <AvatarFallback>{company.initials}</AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="line-clamp-1 text-base">{title}</CardTitle>
        <CardDescription className="line-clamp-2 text-xs">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="mb-2 space-y-1">
          <div className="flex justify-between text-xs">
            <span>Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-muted">
            <div className="h-1.5 rounded-full bg-primary" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{startDate}</span>
          <span>{endDate}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="outline" size="sm" className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

