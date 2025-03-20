import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface SustainabilityMetricCardProps {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
  type?: "environmental" | "social" | "circular" | "default"
}

export default function SustainabilityMetricCard({
  title,
  value,
  description,
  icon,
  trend,
  className,
  type = "default",
}: SustainabilityMetricCardProps) {
  const getTypeStyles = () => {
    switch (type) {
      case "environmental":
        return "border-l-4 border-l-[hsl(var(--eco-green))]"
      case "social":
        return "border-l-4 border-l-[hsl(var(--eco-blue))]"
      case "circular":
        return "border-l-4 border-l-[hsl(var(--eco-orange))]"
      default:
        return ""
    }
  }

  const getIconStyles = () => {
    switch (type) {
      case "environmental":
        return "text-[hsl(var(--eco-green))]"
      case "social":
        return "text-[hsl(var(--eco-blue))]"
      case "circular":
        return "text-[hsl(var(--eco-orange))]"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <Card className={cn("overflow-hidden", getTypeStyles(), className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className={cn("h-4 w-4", getIconStyles())}>{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(description || trend) && (
          <div className="flex items-center text-xs text-muted-foreground">
            {trend && (
              <span className={cn("mr-1", trend.isPositive ? "text-[hsl(var(--eco-green))]" : "text-red-500")}>
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
            )}
            {description && <span>{description}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

