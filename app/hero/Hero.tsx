'use client';

import React, { useState, useEffect } from "react";
import { useChat, Message } from "ai/react";
import { useRouter } from "next/navigation"; 
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Send, Bot, User, Sun, Moon, LogOut } from "lucide-react";
import { generateId } from "ai";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => (
  <div
    className={`flex ${
      message.role === "assistant" ? "justify-start" : "justify-end"
    } mb-4`}
  >
    <div
      className={`flex items-start max-w-[100%] ${
        message.role === "assistant" ? "flex-row" : "flex-row-reverse"
      }`}
    >
      <div
        className={`rounded-full p-2 ${
          message.role === "assistant" ? "bg-green-500" : "bg-blue-500"
        } text-white shadow-lg`}
      >
        {message.role === "assistant" ? <Bot size={24} /> : <User size={24} />}
      </div>
      <div
        className={`mx-3 px-4 py-2 rounded-lg shadow-md ${
          message.role === "assistant"
            ? "bg-white text-gray-800 dark:bg-gray-700 dark:text-white"
            : "bg-blue-500 text-white"
        }`}
      >
        {message.content}
      </div>
    </div>
  </div>
);

const ApothekaAIAssistant: React.FC = () => {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: originalHandleSubmit,
    setMessages,
    error,
  } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        role: "assistant",
        content:
          "Bună ziua și bine ați venit la Apotheka! Sunt ApothekaAI, asistentul dumneavoastră virtual. Cu ce vă pot ajuta astăzi?",
        id: generateId(),
      },
    ],
    onError: (error) => {
      console.error("Chat error:", error);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userMessage = input.trim();
  
    if (!userMessage) return;
  
    const newUserMessage: Message = { role: "user", content: userMessage, id: generateId() };
    setMessages([...messages, newUserMessage]);
  
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, newUserMessage],
        }),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
  
      if (data.nonMedicalResponse) {
        const newAssistantMessage: Message = { role: "assistant", content: data.nonMedicalResponse, id: generateId() };
        setMessages([...messages, newUserMessage, newAssistantMessage]);
      } else {
        originalHandleSubmit(e);
      }
    } catch (error) {
      console.error("Error in chat:", error);
    }
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      setIsDarkMode(JSON.parse(savedMode));
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    router.push("/"); 
  };

  return (
    <div className="flex w-full h-screen p-2 sm:p-4 md:p-6 lg:p-8">
      <Card className="w-full max-w-4xl mx-auto flex flex-col shadow-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-4 sm:p-6">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl sm:text-3xl font-bold">
              Asistentul AI Apotheka
            </CardTitle>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleDarkMode}
                className="rounded-full"
              >
                {isDarkMode ? (
                  <Sun className="h-[1.2rem] w-[1.2rem]" />
                ) : (
                  <Moon className="h-[1.2rem] w-[1.2rem] text-black" />
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleLogout}
                className="rounded-full"
              >
                <LogOut className="h-[1.2rem] w-[1.2rem] text-black" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4 bg-gray-50 dark:bg-gray-800 overflow-hidden">
          <ScrollArea className="h-full pr-4">
            {messages
              .filter((msg) => msg.role !== "system")
              .map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
          </ScrollArea>
        </CardContent>
        <CardFooter className="p-4 bg-white dark:bg-gray-900 border-t dark:border-gray-700">
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              type="text"
              placeholder="Întrebați asistentul Apotheka..."
              value={input}
              onChange={handleInputChange}
              className="flex-grow bg-gray-100 dark:bg-gray-800 dark:text-white"
            />
            <Button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <Send size={18} />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ApothekaAIAssistant;