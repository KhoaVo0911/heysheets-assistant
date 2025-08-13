import React, { useState, useEffect, useRef } from "react";
import { chatService } from "../services/chatService.js";
import { runDemoFlow, runAllDemos } from "../demo/testCases.js";

export const Thread = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showDemoButtons, setShowDemoButtons] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize chat
  useEffect(() => {
    const welcomeMessage = chatService.resetConversation();
    setMessages([
      {
        id: Date.now(),
        sender: "assistant",
        message: welcomeMessage.message,
        suggestedActions: welcomeMessage.suggestedActions,
        timestamp: new Date().toISOString(),
      },
    ]);
  }, []);

  // Handle send message
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue("");

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: "user",
      message: userMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Process message through chat service
      const response = await chatService.processMessage(userMessage);

      // Add assistant response
      const assistantMsg = {
        id: Date.now() + 1,
        sender: "assistant",
        message: response.message,
        suggestedActions: response.suggestedActions,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error("Error processing message:", error);

      const errorMsg = {
        id: Date.now() + 1,
        sender: "assistant",
        message: "I'm sorry, I encountered an error. Please try again.",
        suggestedActions: ["Try again", "Start over"],
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle suggested action click
  const handleSuggestedAction = async (action) => {
    if (isLoading) return;

    setInputValue(action);
    await handleSendMessage();
  };

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle demo flows
  const handleDemoFlow = async (flowName) => {
    console.log(`🚀 Running ${flowName} demo...`);
    await runDemoFlow(chatService, flowName);
  };

  const handleRunAllDemos = async () => {
    console.log("🎬 Running all demos...");
    await runAllDemos(chatService);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Demo Controls */}
      <div className="bg-blue-50 p-3 border-b">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowDemoButtons(!showDemoButtons)}
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
          >
            {showDemoButtons ? "Hide" : "Show"} Demo Controls
          </button>

          {showDemoButtons && (
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => handleDemoFlow("productBrowsing")}
                className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
              >
                🛍️ Product Flow
              </button>
              <button
                onClick={() => handleDemoFlow("bookingFlow")}
                className="bg-purple-500 text-white px-2 py-1 rounded text-xs hover:bg-purple-600"
              >
                📅 Booking Flow
              </button>
              <button
                onClick={() => handleDemoFlow("informationQueries")}
                className="bg-orange-500 text-white px-2 py-1 rounded text-xs hover:bg-orange-600"
              >
                ℹ️ Info Queries
              </button>
              <button
                onClick={() => handleDemoFlow("pricingAvailability")}
                className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
              >
                💰 Pricing
              </button>
              <button
                onClick={handleRunAllDemos}
                className="bg-indigo-500 text-white px-2 py-1 rounded text-xs hover:bg-indigo-600"
              >
                🎬 Run All
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <Message
            key={msg.id}
            message={msg}
            onSuggestedAction={handleSuggestedAction}
          />
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t bg-white p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="bg-pink-500 text-white px-4 py-1 rounded-lg hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

// Message component
const Message = ({ message, onSuggestedAction }) => {
  const isUser = message.sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs lg:max-w-md ${
          isUser ? "bg-blue-600 text-white" : "bg-white border border-gray-200"
        } rounded-lg p-3 shadow-sm`}
      >
        <div className="text-sm">{message.message}</div>

        {/* Suggested Actions */}
        {message.suggestedActions &&
          message.suggestedActions.length > 0 &&
          !isUser && (
            <div className="mt-3 space-y-2">
              {message.suggestedActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => onSuggestedAction(action)}
                  className="block w-full text-left text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded px-3 py-2 transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>
          )}

        <div
          className={`text-xs mt-2 ${
            isUser ? "text-blue-100" : "text-gray-400"
          }`}
        >
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};
