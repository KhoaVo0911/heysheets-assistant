import React, { useState, useEffect, useRef } from "react";
import { chatService } from "../services/chatService.js";

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    // Initialize with welcome message
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hey gorgeous! ❤️ I'm your chat assistant at Lucky Doll Pin-up Lingerie. I'm here to help you find the perfect piece that makes you feel absolutely stunning! What can I help you with today?",
        timestamp: new Date(),
      },
    ]);
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setIsLoading(true);

    try {
      // Add user message to chat FIRST
      const newUserMessage = {
        id: Date.now() + "-user",
        role: "user",
        content: userMessage,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newUserMessage]);

      // Clear input AFTER adding message
      setInput("");

      // Process message and get response
      const result = await chatService.processMessage(userMessage);

      // Add assistant response to chat
      const newAssistantMessage = {
        id: Date.now() + "-assistant",
        role: "assistant",
        content: result.message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newAssistantMessage]);

      // Scroll to bottom after adding messages
      setTimeout(() => {
        const chatArea = document.querySelector(".flex-1.overflow-y-auto");
        if (chatArea) {
          chatArea.scrollTop = chatArea.scrollHeight;
        }
        // Refocus input after sending
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    } catch (error) {
      console.error("Error processing message:", error);

      // Add error message
      const errorMessage = {
        id: Date.now() + "-error",
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
      e.preventDefault(); // Prevent default Enter behavior
      if (input.trim() && !isLoading) {
        handleSendMessage();
      }
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendClick = () => {
    if (input.trim() && !isLoading) {
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    chatService.resetConversation();
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hey gorgeous! ❤️ I'm your chat assistant at Lucky Doll Pin-up Lingerie. I'm here to help you find the perfect piece that makes you feel absolutely stunning! What can I help you with today?",
        timestamp: new Date(),
      },
    ]);
  };

  const isInputValid = input.trim().length > 0 && !isLoading;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              Your Chat Assistant
            </h1>
            <p className="text-sm text-gray-600">
              I'm here to help you with products, bookings, and questions
            </p>
          </div>
          <button
            onClick={handleResetChat}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Reset Chat
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id}>
            {/* Message */}
            <div
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              } mb-3`}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center mr-3 mt-1">
                  <span className="text-sm font-bold text-white">LD</span>
                </div>
              )}
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  message.role === "user"
                    ? "bg-gray-800 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              {message.role === "user" && (
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center ml-3 mt-1">
                  <span className="text-sm font-bold text-white">U</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isLoading && (
          <div className="flex justify-start mb-3">
            <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-sm font-bold text-white">LD</span>
            </div>
            <div className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2 flex items-center">
              <span>...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ref={inputRef}
          />
          <button
            onClick={handleSendClick}
            disabled={!isInputValid}
            className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed w-10 h-10 flex items-center justify-center"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
