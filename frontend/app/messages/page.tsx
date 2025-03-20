"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Send, Paperclip, MoreVertical, Phone, Video } from "lucide-react"

interface Message {
  id: string
  sender: {
    id: string
    name: string
    avatar: string
    initials: string
  }
  content: string
  timestamp: string
  isMe: boolean
}

interface Conversation {
  id: string
  participant: {
    id: string
    name: string
    avatar: string
    initials: string
    company: string
    status: "online" | "offline" | "away"
  }
  lastMessage: {
    content: string
    timestamp: string
    unread: boolean
  }
}

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      participant: {
        id: "user1",
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SJ",
        company: "Virgin Atlantic",
        status: "online",
      },
      lastMessage: {
        content: "Let's discuss the new loyalty program integration",
        timestamp: "10:32 AM",
        unread: true,
      },
    },
    {
      id: "2",
      participant: {
        id: "user2",
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "MC",
        company: "Virgin Media",
        status: "online",
      },
      lastMessage: {
        content: "I've shared the Q2 analytics report with you",
        timestamp: "Yesterday",
        unread: false,
      },
    },
    {
      id: "3",
      participant: {
        id: "user3",
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "EW",
        company: "Virgin Hotels",
        status: "away",
      },
      lastMessage: {
        content: "Can we schedule a call to discuss the summer campaign?",
        timestamp: "Yesterday",
        unread: false,
      },
    },
    {
      id: "4",
      participant: {
        id: "user4",
        name: "James Taylor",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JT",
        company: "Virgin Voyages",
        status: "offline",
      },
      lastMessage: {
        content: "Thanks for sharing the presentation",
        timestamp: "Monday",
        unread: false,
      },
    },
  ])

  const [activeConversation, setActiveConversation] = useState<string>("1")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m1",
      sender: {
        id: "user1",
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SJ",
      },
      content: "Hi there! I wanted to discuss the new loyalty program integration between our companies.",
      timestamp: "10:15 AM",
      isMe: false,
    },
    {
      id: "m2",
      sender: {
        id: "me",
        name: "Me",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "ME",
      },
      content: "Hi Sarah, that sounds great. What aspects of the integration would you like to focus on?",
      timestamp: "10:18 AM",
      isMe: true,
    },
    {
      id: "m3",
      sender: {
        id: "user1",
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SJ",
      },
      content:
        "I think we should prioritize the points conversion system and the shared rewards catalog. Our customers have been asking for more flexibility in how they use their points across Virgin companies.",
      timestamp: "10:22 AM",
      isMe: false,
    },
    {
      id: "m4",
      sender: {
        id: "me",
        name: "Me",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "ME",
      },
      content:
        "That makes sense. We've been working on a new API that could facilitate this kind of integration. I can share the documentation with you.",
      timestamp: "10:25 AM",
      isMe: true,
    },
    {
      id: "m5",
      sender: {
        id: "user1",
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SJ",
      },
      content:
        "That would be perfect! Also, do you think we could set up a joint dashboard to track cross-company redemptions?",
      timestamp: "10:32 AM",
      isMe: false,
    },
  ])

  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: `m${messages.length + 1}`,
      sender: {
        id: "me",
        name: "Me",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "ME",
      },
      content: newMessage,
      timestamp: "Just now",
      isMe: true,
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const activeParticipant = conversations.find((conv) => conv.id === activeConversation)?.participant

  useEffect(() => {
    // Auto-scroll to bottom when messages change
    const messagesContainer = document.getElementById("messages-container")
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight
    }
  }, [messages])

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-hidden">
        <div className="grid h-full grid-cols-1 md:grid-cols-12">
          {/* Conversations List */}
          <div className="border-r md:col-span-3 lg:col-span-3">
            <div className="flex h-full flex-col">
              <div className="border-b p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search messages..." className="pl-9" />
                </div>
              </div>
              <div className="flex-1 overflow-auto">
                {conversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    className={`w-full border-b p-4 text-left transition-colors hover:bg-muted/50 ${
                      activeConversation === conversation.id ? "bg-muted" : ""
                    }`}
                    onClick={() => setActiveConversation(conversation.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={conversation.participant.avatar} alt={conversation.participant.name} />
                          <AvatarFallback>{conversation.participant.initials}</AvatarFallback>
                        </Avatar>
                        <span
                          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(
                            conversation.participant.status,
                          )}`}
                        ></span>
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{conversation.participant.name}</h3>
                          <span className="text-xs text-muted-foreground">{conversation.lastMessage.timestamp}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{conversation.participant.company}</p>
                        <p
                          className={`mt-1 truncate text-sm ${
                            conversation.lastMessage.unread ? "font-medium text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          {conversation.lastMessage.content}
                        </p>
                      </div>
                      {conversation.lastMessage.unread && <div className="ml-2 h-2 w-2 rounded-full bg-primary"></div>}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex flex-col md:col-span-9 lg:col-span-9">
            {activeParticipant ? (
              <>
                {/* Chat Header */}
                <div className="border-b p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={activeParticipant.avatar} alt={activeParticipant.name} />
                        <AvatarFallback>{activeParticipant.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{activeParticipant.name}</h3>
                        <div className="flex items-center gap-1">
                          <span className={`h-2 w-2 rounded-full ${getStatusColor(activeParticipant.status)}`}></span>
                          <p className="text-xs text-muted-foreground">
                            {activeParticipant.status} • {activeParticipant.company}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Phone className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Video className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div
                  id="messages-container"
                  className="flex-1 overflow-auto p-4"
                  style={{ maxHeight: "calc(100vh - 200px)" }}
                >
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.isMe ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`mt-1 text-right text-xs ${
                              message.isMe ? "text-primary-foreground/80" : "text-muted-foreground"
                            }`}
                          >
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1"
                    />
                    <Button size="icon" onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <h3 className="text-lg font-medium">No conversation selected</h3>
                  <p className="text-muted-foreground">Choose a conversation from the list to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

