"use client";

import type React from "react";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { AnimatePresence, motion } from "framer-motion";
import { Leaf, Rocket, Send, Settings, User, X, Zap } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Message = {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
};

type AvatarOption = {
  id: string;
  name: string;
  icon: React.ElementType | null;
  color: string;
  description: string;
  image: string;
  customImage?: boolean;
};

const avatarOptions: AvatarOption[] = [
  {
    id: "sprout",
    name: "Sprout",
    icon: null,
    color: "bg-green-400",
    description:
      "A friendly and enthusiastic sustainability guide with a passion for helping others discover eco-friendly practices.",
    image: "/images/sprout.jpg",
    customImage: true,
  },
  {
    id: "greengenie",
    name: "Green Genie",
    icon: Zap,
    color: "bg-blue-500",
    description:
      "Hyperactive and enthusiastic. Will get extremely excited about your compost bin.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "renewableray",
    name: "Renewable Ray",
    icon: Rocket,
    color: "bg-virgin-red",
    description:
      "The action hero of climate change. Thinks every problem can be solved with solar panels.",
    image: "/placeholder.svg?height=200&width=200",
  },
];

export default function AIAssistant() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your personal sustainability mentor. How can I help you discover and engage with Virgin's sustainability initiatives today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [showMentorSelection, setShowMentorSelection] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate assistant response
    setTimeout(() => {
      const responses = [
        "I'd recommend checking out our Ocean Cleanup initiative. It's making great progress in reducing plastic waste. Would you like to learn more about how you can contribute?",
        "Based on your interests, you might enjoy our Renewable Energy projects in Europe. These initiatives are transforming how we power our operations and reducing carbon emissions significantly.",
        "Have you seen our latest Carbon Offset program? You can contribute directly and earn special badges that showcase your commitment to sustainability.",
        "Our most popular initiative this month is Sustainable Aviation. Many users are engaging with it and making a real difference in reducing the environmental impact of air travel.",
        "I can help you find initiatives near your location. Would you like me to suggest some projects where you can make a local impact while contributing to global sustainability?",
      ];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: "assistant",
        timestamp: new Date(),
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const getSelectedAvatar = () => {
    return (
      avatarOptions.find((a) => a.id === selectedAvatar) || avatarOptions[0]
    );
  };

  const handleAvatarChange = (avatarId: string) => {
    setSelectedAvatar(avatarId);
    const avatar = avatarOptions.find((a) => a.id === avatarId);

    toast({
      title: `${avatar?.name} is now your mentor!`,
      description: "Your AI sustainability mentor has been updated.",
      duration: 3000,
    });

    setShowAvatarSelector(false);
  };

  const handleMentorSelect = (avatarId: string) => {
    setSelectedAvatar(avatarId);
    setShowMentorSelection(false);

    // Update the first message to include the mentor's name
    const avatar = avatarOptions.find((a) => a.id === avatarId);
    setMessages([
      {
        id: "1",
        content: `Hello! I'm ${avatar?.name}, your personal sustainability mentor. How can I help you discover and engage with Virgin's sustainability initiatives today?`,
        sender: "assistant",
        timestamp: new Date(),
      },
    ]);
  };

  const selectedAvatarOption = selectedAvatar ? getSelectedAvatar() : null;
  const AvatarIcon = selectedAvatarOption?.icon || Leaf;

  const renderAvatarContent = (avatar: AvatarOption) => {
    if (avatar.customImage) {
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-28 w-28">
            <Image
              src={avatar.image || "/placeholder.svg"}
              alt={avatar.name}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      );
    }

    const Icon = avatar.icon || Leaf;
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon className="h-20 w-20 text-white" />
      </div>
    );
  };

  const renderAvatarInChat = (avatar: AvatarOption) => {
    if (avatar.customImage) {
      return (
        <div className="relative h-full w-full">
          <Image
            src={avatar.image || "/placeholder.svg"}
            alt={avatar.name}
            fill
            className="object-contain"
            priority
          />
        </div>
      );
    }

    const Icon = avatar.icon || Leaf;
    return <Icon className="h-5 w-5 text-white" />;
  };

  if (showMentorSelection) {
    return (
      <div className="flex flex-col h-[calc(100vh-8rem)] p-4 pb-20 overflow-y-auto">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold text-virgin-red mb-2">
            Choose Your Sustainability Mentor
          </h2>
          <p className="text-gray-600">
            Select a mentor who will guide you through Virgin's sustainability
            initiatives
          </p>
        </motion.div>

        <div className="grid gap-8 mt-4 max-w-[95%] mx-auto pb-8">
          {avatarOptions.map((avatar, index) => {
            return (
              <motion.div
                key={avatar.id}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant="outline"
                  className="w-full max-w-[320px] mx-auto p-0 h-auto overflow-hidden border-2 hover:border-virgin-red hover:shadow-lg transition-all duration-300"
                  onClick={() => handleMentorSelect(avatar.id)}
                >
                  <div className="flex flex-col w-full">
                    <div className={`w-full h-40 ${avatar.color} relative`}>
                      {renderAvatarContent(avatar)}
                    </div>
                    <div className="p-5 text-left min-h-[120px] flex flex-col justify-center">
                      <h3 className="text-lg font-bold mb-2">{avatar.name}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {avatar.description}
                      </p>
                    </div>
                  </div>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <motion.div
        className="bg-gradient-to-r from-virgin-red/10 to-white p-3 mb-2 flex items-center justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center">
          <Avatar className={`h-8 w-8 mr-2 ${selectedAvatarOption?.color}`}>
            {selectedAvatarOption?.customImage ? (
              <div className="relative h-full w-full">
                <Image
                  src={selectedAvatarOption.image || "/placeholder.svg"}
                  alt={selectedAvatarOption.name}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            ) : (
              <AvatarIcon className="h-5 w-5 text-white" />
            )}
          </Avatar>
          <div>
            <h3 className="font-bold text-sm">{selectedAvatarOption?.name}</h3>
            <p className="text-xs text-gray-500">Your Sustainability Mentor</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setShowAvatarSelector(true)}
        >
          <Settings className="h-4 w-4" />
        </Button>
      </motion.div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div
              className={`flex gap-3 max-w-[80%] ${
                message.sender === "user" ? "flex-row-reverse" : ""
              }`}
            >
              {message.sender === "assistant" ? (
                <Avatar className={`h-8 w-8 ${selectedAvatarOption?.color}`}>
                  {selectedAvatarOption?.customImage ? (
                    <div className="relative h-full w-full">
                      <Image
                        src={selectedAvatarOption.image || "/placeholder.svg"}
                        alt={selectedAvatarOption.name}
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  ) : (
                    <AvatarIcon className="h-5 w-5 text-white" />
                  )}
                </Avatar>
              ) : (
                <Avatar className="h-8 w-8 bg-gray-200">
                  <User className="h-5 w-5 text-gray-700" />
                </Avatar>
              )}

              <Card
                className={`p-3 ${
                  message.sender === "assistant"
                    ? "bg-white"
                    : "bg-virgin-red text-white"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </Card>
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            className="flex justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex gap-3 max-w-[80%]">
              <Avatar className={`h-8 w-8 ${selectedAvatarOption?.color}`}>
                {selectedAvatarOption?.customImage ? (
                  <div className="relative h-full w-full">
                    <Image
                      src={selectedAvatarOption.image || "/placeholder.svg"}
                      alt={selectedAvatarOption.name}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                ) : (
                  <AvatarIcon className="h-5 w-5 text-white" />
                )}
              </Avatar>

              <Card className="p-3 bg-white">
                <div className="flex space-x-1">
                  <motion.div
                    className="h-2 w-2 bg-gray-300 rounded-full"
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 0.8,
                      delay: 0,
                    }}
                  />
                  <motion.div
                    className="h-2 w-2 bg-gray-300 rounded-full"
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 0.8,
                      delay: 0.2,
                    }}
                  />
                  <motion.div
                    className="h-2 w-2 bg-gray-300 rounded-full"
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 0.8,
                      delay: 0.4,
                    }}
                  />
                </div>
              </Card>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <motion.div
        className="p-4 border-t bg-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex gap-2">
          <Input
            placeholder="Ask about sustainability initiatives..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 border-virgin-red/30 focus:border-virgin-red"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-virgin-red hover:bg-virgin-red/90 group"
          >
            <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showAvatarSelector && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg w-full max-w-sm p-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Choose Your AI Mentor</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setShowAvatarSelector(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3 mb-4">
                {avatarOptions.map((avatar) => {
                  return (
                    <Button
                      key={avatar.id}
                      variant="outline"
                      className={`w-full justify-start h-auto py-3 ${
                        selectedAvatar === avatar.id
                          ? "border-2 border-virgin-red"
                          : ""
                      }`}
                      onClick={() => handleAvatarChange(avatar.id)}
                    >
                      <Avatar className={`h-10 w-10 mr-3 ${avatar.color}`}>
                        {avatar.customImage ? (
                          <div className="relative h-full w-full">
                            <Image
                              src={avatar.image || "/placeholder.svg"}
                              alt={avatar.name}
                              fill
                              className="object-contain"
                              priority
                            />
                          </div>
                        ) : (
                          avatar.icon && (
                            <avatar.icon className="h-5 w-5 text-white" />
                          )
                        )}
                      </Avatar>
                      <div className="text-left">
                        <div className="font-medium">{avatar.name}</div>
                        <div className="text-xs text-gray-500">
                          {avatar.description}
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </div>

              <Button
                className="w-full bg-virgin-red hover:bg-virgin-red/90"
                onClick={() => setShowAvatarSelector(false)}
              >
                Confirm Selection
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
