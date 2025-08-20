import React, { useState, useEffect } from "react";
import {
  ThreadPrimitive,
  MessagePrimitive,
  ComposerPrimitive,
  ThreadListPrimitive,
  AssistantRuntimeProvider,
} from "@assistant-ui/react";
import { chatService } from "../services/chatService.js";

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize with welcome message
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Hi! I'm your HeySheets assistant. How can I help you today?",
        timestamp: new Date(),
      },
    ]);
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    // Add user message
    const newUserMessage = {
      id: Date.now().toString(),
      role: "user",
      content: userMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);

    try {
      const response = await chatService.processMessage(userMessage);

      // Add assistant response
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error processing message:", error);

      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    chatService.resetConversation();
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Hi! I'm your HeySheets assistant. How can I help you today?",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <AssistantRuntimeProvider>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">
              HeySheets Chat
            </h1>
            <button
              onClick={handleResetChat}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Reset Chat
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4">
          <ThreadListPrimitive.Items>
            <ThreadPrimitive.Root>
              {messages.map((message) => (
                <MessagePrimitive.Root key={message.id} role={message.role}>
                  <MessagePrimitive.Content>
                    {message.content}
                  </MessagePrimitive.Content>
                </MessagePrimitive.Root>
              ))}
              {isLoading && (
                <MessagePrimitive.Root role="assistant">
                  <MessagePrimitive.Content>...</MessagePrimitive.Content>
                </MessagePrimitive.Root>
              )}
            </ThreadPrimitive.Root>
          </ThreadListPrimitive.Items>
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4">
          <ThreadListPrimitive.Items>
            <div className="flex space-x-2">
              <ComposerPrimitive.Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
              />
              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </ThreadListPrimitive.Items>
        </div>
      </div>
    </AssistantRuntimeProvider>
  );
}
