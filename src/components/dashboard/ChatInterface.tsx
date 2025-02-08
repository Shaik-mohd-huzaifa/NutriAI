import React, { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Bot, Send, User } from "lucide-react";
import ProfileResults from "./ProfileResults";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  showProfiles?: boolean;
}

interface ChatInterfaceProps {
  messages?: Message[];
  onSendMessage?: (message: string) => void;
}

const defaultMessages: Message[] = [
  {
    id: "1",
    content:
      "Hello! I'm your AI nutrition assistant. How can I help you today?",
    sender: "ai",
    timestamp: new Date(),
  },
  {
    id: "2",
    content:
      "Show me people with similar fitness goals who are into weight training and high protein diets.",
    sender: "user",
    timestamp: new Date(),
  },
  {
    id: "3",
    content:
      "I've found some profiles that match your criteria. Here are people who share similar fitness goals and dietary preferences:",
    sender: "ai",
    timestamp: new Date(),
    showProfiles: true,
  },
];

const ChatInterface = ({
  messages = defaultMessages,
  onSendMessage = () => {},
}: ChatInterfaceProps) => {
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      onSendMessage(inputMessage);
      setInputMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="w-full h-[600px] flex flex-col bg-card">
      <CardHeader className="border-b px-4 py-3">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          AI Nutrition Assistant
        </CardTitle>
      </CardHeader>
      <ScrollArea className="flex-1 px-4 py-6">
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex flex-col ${message.sender === "user" ? "items-end" : "items-start"}`}
            >
              <div
                className={`flex items-start gap-3 max-w-[85%] ${
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <Avatar
                  className={`w-8 h-8 ${message.sender === "ai" ? "bg-primary/10 text-primary" : "bg-muted"}`}
                >
                  {message.sender === "ai" ? (
                    <Bot className="h-4 w-4" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </Avatar>
                <div
                  className={`rounded-lg p-4 text-sm shadow-sm ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50 border"
                  }`}
                >
                  {message.content}
                </div>
              </div>
              {message.sender === "ai" && message.showProfiles && (
                <div className="mt-4 w-full">
                  <ProfileResults
                    query={
                      messages.find(
                        (m) => m.id === (parseInt(message.id) - 1).toString(),
                      )?.content
                    }
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t bg-background">
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask anything about nutrition..."
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            size="icon"
            className="rounded-full h-10 w-10"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatInterface;
