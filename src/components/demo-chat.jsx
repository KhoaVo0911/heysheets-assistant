import React from "react";
import ChatInterface from "./chat-interface.jsx";

export default function DemoChat() {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold text-lg">LD</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                Lucky Doll Assistant
              </h3>
              <p className="text-blue-100 text-sm">
                AI-powered customer service
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-blue-100 text-sm">Online</span>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="h-96">
        <ChatInterface />
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <div className="text-center text-sm text-gray-500">
          <span>Powered by HeySheets • Claude AI</span>
        </div>
      </div>
    </div>
  );
}
