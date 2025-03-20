"use client"

import { useState } from "react"
import Header from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Plus, Users, Video, MapPin } from "lucide-react"

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  type: "meeting" | "campaign" | "deadline" | "other"
  participants: {
    name: string
    avatar: string
    initials: string
  }[]
  location?: string
  isVirtual?: boolean
}

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

  // Sample events data
  const events: Event[] = [
    {
      id: "1",
      title: "Cross-Promotional Strategy Meeting",
      description: "Discuss Q3 cross-promotional opportunities",
      date: "2025-03-20",
      time: "14:00 - 15:30",
      type: "meeting",
      participants: [
        {
          name: "Sarah Johnson",
          avatar: "/placeholder.svg?height=32&width=32",
          initials: "SJ",
        },
        {
          name: "Michael Chen",
          avatar: "/placeholder.svg?height=32&width=32",
          initials: "MC",
        },
        {
          name: "Emma Wilson",
          avatar: "/placeholder.svg?height=32&width=32",
          initials: "EW",
        },
      ],
      isVirtual: true,
    },
    {
      id: "2",
      title: "Summer Campaign Launch",
      description: "Launch of the joint summer promotion",
      date: "2025-03-20",
      time: "10:00 - 11:00",
      type: "campaign",
      participants: [
        {
          name: "James Taylor",
          avatar: "/placeholder.svg?height=32&width=32",
          initials: "JT",
        },
        {
          name: "Sarah Johnson",
          avatar: "/placeholder.svg?height=32&width=32",
          initials: "SJ",
        },
      ],
      location: "Virgin Hotels London",
      isVirtual: false,
    },
    {
      id: "3",
      title: "Q2 Performance Review",
      description: "Review of Q2 performance metrics",
      date: "2025-03-21",
      time: "10:00 - 12:00",
      type: "meeting",
      participants: [
        {
          name: "Michael Chen",
          avatar: "/placeholder.svg?height=32&width=32",
          initials: "MC",
        },
        {
          name: "Emma Wilson",
          avatar: "/placeholder.svg?height=32&width=32",
          initials: "EW",
        },
      ],
      isVirtual: true,
    },
    {
      id: "4",
      title: "Content Submission Deadline",
      description: "Final deadline for campaign content",
      date: "2025-03-22",
      time: "18:00",
      type: "deadline",
      participants: [
        {
          name: "James Taylor",
          avatar: "/placeholder.svg?height=32&width=32",
          initials: "JT",
        },
      ],
      isVirtual: false,
    },
  ]

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth)
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i))
    }

    return days
  }

  // Format date to YYYY-MM-DD
  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
  }

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    const dateString = formatDate(date)
    return events.filter((event) => event.date === dateString)
  }

  // Navigate to previous month
  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  // Navigate to today
  const goToToday = () => {
    const today = new Date()
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1))
    setSelectedDate(today)
  }

  // Check if a date is today
  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  // Check if a date is selected
  const isSelected = (date: Date) => {
    return (
      selectedDate &&
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    )
  }

  // Get event type color
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "meeting":
        return "bg-blue-500"
      case "campaign":
        return "bg-green-500"
      case "deadline":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const calendarDays = generateCalendarDays()
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : []

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
            <p className="text-muted-foreground">Manage events and collaborations</p>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={goToToday} variant="outline" size="sm">
              Today
            </Button>
            <Button onClick={previousMonth} variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button onClick={nextMonth} variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <h2 className="text-lg font-semibold px-2">
              {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
            </h2>
            <Button variant="default" size="sm" className="ml-4">
              <Plus className="mr-2 h-4 w-4" />
              New Event
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* Calendar Grid */}
          <Card className="md:col-span-8">
            <CardContent className="p-4">
              <div className="grid grid-cols-7 gap-1">
                {weekdays.map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium">
                    {day}
                  </div>
                ))}
                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    className={`min-h-[100px] rounded-md border p-1 ${
                      day ? "cursor-pointer hover:bg-muted/50" : "bg-muted/20"
                    } ${day && isToday(day) ? "border-primary" : ""} ${day && isSelected(day) ? "bg-muted" : ""}`}
                    onClick={() => day && setSelectedDate(day)}
                  >
                    {day && (
                      <>
                        <div className="flex justify-between">
                          <span className={`text-sm ${isToday(day) ? "font-bold text-primary" : ""}`}>
                            {day.getDate()}
                          </span>
                          {getEventsForDate(day).length > 0 && (
                            <Badge variant="outline" className="h-5 px-1 text-xs">
                              {getEventsForDate(day).length}
                            </Badge>
                          )}
                        </div>
                        <div className="mt-1 space-y-1">
                          {getEventsForDate(day)
                            .slice(0, 2)
                            .map((event) => (
                              <div
                                key={event.id}
                                className={`truncate rounded px-1 py-0.5 text-xs text-white ${getEventTypeColor(
                                  event.type,
                                )}`}
                              >
                                {event.time.split(" - ")[0]} {event.title}
                              </div>
                            ))}
                          {getEventsForDate(day).length > 2 && (
                            <div className="text-xs text-muted-foreground">
                              +{getEventsForDate(day).length - 2} more
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Event Details */}
          <Card className="md:col-span-4">
            <CardHeader>
              <CardTitle>
                {selectedDate
                  ? selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })
                  : "No Date Selected"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDateEvents.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-muted-foreground">No events scheduled</p>
                  <Button variant="outline" className="mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Event
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedDateEvents.map((event) => (
                    <Card key={event.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-2">
                          <div className={`mt-1 h-3 w-3 rounded-full ${getEventTypeColor(event.type)}`}></div>
                          <div className="flex-1">
                            <h3 className="font-medium">{event.title}</h3>
                            <p className="text-sm text-muted-foreground">{event.time}</p>
                            <p className="mt-1 text-sm">{event.description}</p>

                            {(event.location || event.isVirtual) && (
                              <div className="mt-2 flex items-center text-xs text-muted-foreground">
                                {event.isVirtual ? (
                                  <>
                                    <Video className="mr-1 h-3 w-3" />
                                    <span>Virtual Meeting</span>
                                  </>
                                ) : (
                                  <>
                                    <MapPin className="mr-1 h-3 w-3" />
                                    <span>{event.location}</span>
                                  </>
                                )}
                              </div>
                            )}

                            <div className="mt-3">
                              <div className="flex items-center">
                                <Users className="mr-1 h-3 w-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                  {event.participants.length} participants
                                </span>
                              </div>
                              <div className="mt-1 flex -space-x-2">
                                {event.participants.map((participant, index) => (
                                  <Avatar key={index} className="h-6 w-6 border-2 border-background">
                                    <AvatarImage src={participant.avatar} alt={participant.name} />
                                    <AvatarFallback className="text-[10px]">{participant.initials}</AvatarFallback>
                                  </Avatar>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

