import { useState, useEffect, useRef } from "react";
import { chatService } from "../services/chatService.js";
import DemoPanel from "./demo-panel.jsx";
import DataManager from "./data-manager.jsx";
import BookingFlow from "./booking-flow.jsx";

export default function Thread() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showBookingFlow, setShowBookingFlow] = useState(false);
  const [lastBooking, setLastBooking] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    // Add user message to chat
    const userMsg = {
      id: Date.now(),
      sender: "user",
      message: userMessage,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const response = await chatService.processMessage(userMessage);

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
        message: "Sorry, I encountered an error. Please try again.",
        suggestedActions: ["Try again", "Start over"],
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedAction = async (action) => {
    if (isLoading) return;

    if (
      action.toLowerCase().includes("book") ||
      action.toLowerCase().includes("appointment")
    ) {
      setShowBookingFlow(true);
      return;
    }

    try {
      const response = await chatService.handleSuggestedAction(action);

      const userMsg = {
        id: Date.now(),
        sender: "user",
        message: action,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMsg]);

      const assistantMsg = {
        id: Date.now() + 1,
        sender: "assistant",
        message: response.message,
        suggestedActions: response.suggestedActions,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error("Error handling suggested action:", error);
    }
  };

  const handleResetChat = () => {
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
  };

  const handleRunDemo = async (demoStep) => {
    try {
      const response = await chatService.processMessage(demoStep);
      return response;
    } catch (error) {
      console.error("Error running demo step:", error);
      return {
        message: "Demo step failed",
        intent: "ERROR",
        confidence: 0,
      };
    }
  };

  const handleDataChange = (newData) => {
    console.log("Data changed:", newData);
    // Here you can update the chat service with new data
    // or trigger a refresh of the conversation
  };

  const handleBookingComplete = (bookingData) => {
    setLastBooking(bookingData);

    const confirmationMsg = {
      id: Date.now(),
      sender: "assistant",
      message:
        `🎉 **Booking Confirmed!**\n\nYour appointment has been successfully scheduled:\n\n` +
        `📅 **Service:** ${bookingData.service.name}\n` +
        `📅 **Date:** ${new Date(bookingData.date).toLocaleDateString()}\n` +
        `⏰ **Time:** ${bookingData.time}\n` +
        `🆔 **Booking ID:** ${bookingData.id}\n\n` +
        `A confirmation email has been sent to ${bookingData.customer.email}`,
      suggestedActions: [
        "Book another appointment",
        "Show me your products",
        "What are your hours?",
        "Where are you located?",
      ],
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, confirmationMsg]);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-2 md:p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85vw] md:max-w-xs lg:max-w-md px-3 md:px-4 py-2 rounded-lg ${
                message.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <div className="whitespace-pre-wrap text-sm md:text-base">
                {message.message}
              </div>

              {message.suggestedActions &&
                message.suggestedActions.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {message.suggestedActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestedAction(action)}
                        disabled={isLoading}
                        className="block w-full text-left px-2 md:px-3 py-2 bg-white bg-opacity-20 rounded text-xs md:text-sm hover:bg-opacity-30 transition-colors disabled:opacity-50"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}

              <div className="text-xs opacity-70 mt-2">
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 px-3 md:px-4 py-2 rounded-lg max-w-[85vw] md:max-w-xs">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                <span className="text-sm md:text-base">Thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="block md:hidden space-y-3">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleResetChat}
              className="bg-gray-500 text-white px-3 py-2 rounded-lg hover:bg-gray-600 text-sm"
            >
              🔄 Reset
            </button>
            <button
              onClick={() => setShowBookingFlow(true)}
              className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 text-sm"
            >
              📅 Book Now
            </button>
          </div>
        </div>

        <div className="hidden md:flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
          <button
            onClick={handleResetChat}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            🔄 Reset
          </button>
          <button
            onClick={() => setShowBookingFlow(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            📅 Book Now
          </button>
        </div>
      </div>

      <DemoPanel onRunDemo={handleRunDemo} onReset={handleResetChat} />

      <DataManager onDataChange={handleDataChange} />

      <BookingFlow
        isOpen={showBookingFlow}
        onClose={() => setShowBookingFlow(false)}
        onBookingComplete={handleBookingComplete}
      />
    </div>
  );
}
