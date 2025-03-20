"use client"

import { useState } from "react"
import { Bell, Search, Settings, Filter, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export default function Header() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New sustainability initiative",
      description: "Virgin Atlantic launched a carbon offset program",
      time: "5 minutes ago",
      type: "environmental",
      read: false,
    },
    {
      id: 2,
      title: "Collaboration request",
      description: "Virgin Hotels wants to partner on waste reduction",
      time: "25 minutes ago",
      type: "collaboration",
      read: false,
    },
    {
      id: 3,
      title: "Impact report available",
      description: "Q2 sustainability impact report is now available",
      time: "2 hours ago",
      type: "report",
      read: true,
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const getNotificationTypeClass = (type: string) => {
    switch (type) {
      case "environmental":
        return "bg-eco-green-light text-eco-green"
      case "collaboration":
        return "bg-eco-blue-light text-eco-blue"
      case "report":
        return "bg-eco-orange-light text-eco-orange"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <header className="border-b bg-background px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 md:w-1/3">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search initiatives, companies, reports..."
              className="w-full bg-muted pl-9 focus-visible:ring-primary"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge
                    className="absolute -right-1 -top-1 h-5 w-5 rounded-full flex items-center justify-center p-0 text-xs"
                    variant="destructive"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                Notifications
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" className="h-auto p-0 text-xs font-normal" onClick={markAllAsRead}>
                    Mark all as read
                  </Button>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.length === 0 ? (
                <div className="py-4 text-center text-sm text-muted-foreground">No notifications</div>
              ) : (
                notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className="cursor-pointer"
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className={`flex w-full flex-col gap-1 py-1 ${!notification.read ? "font-medium" : ""}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${getNotificationTypeClass(notification.type)}`}></div>
                          <span>{notification.title}</span>
                        </div>
                        {!notification.read && <Badge variant="default" className="h-2 w-2 rounded-full p-0" />}
                      </div>
                      <span className="text-xs text-muted-foreground">{notification.description}</span>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                  </DropdownMenuItem>
                ))
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer justify-center text-center">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}

