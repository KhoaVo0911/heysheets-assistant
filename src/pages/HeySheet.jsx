import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatInterface from "../components/chat-interface.jsx";
import "../index.css";

export default function HeySheetsChat() {
  const [isChatStarted, setIsChatStarted] = useState(false);
  const navigate = useNavigate();
  const [showBusinessModal, setShowBusinessModal] = useState(false);

  const startChat = () => {
    setIsChatStarted(true);
  };

  const backToProfile = () => {
    setIsChatStarted(false);
  };

  if (window.innerWidth <= 768) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Chat Interface - Show immediately */}
        <div className="flex flex-col h-screen">
          {/* Chat Header */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-bold text-white">LD</span>
                </div>
                <span className="font-semibold text-gray-800">
                  Chat Assistant
                </span>
              </div>
              <button
                onClick={() => setShowBusinessModal(true)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                ℹ️ Business Info
              </button>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1">
            <ChatInterface />
          </div>
        </div>

        {/* Business Info Modal */}
        {showBusinessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              {/* Modal Header with Close Button */}
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">
                  Business Information
                </h2>
                <button
                  onClick={() => setShowBusinessModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                >
                  ×
                </button>
              </div>

              <div className="p-6">
                {/* Business Profile */}
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">LD</span>
                  </div>
                  <h1 className="text-xl font-bold text-gray-800 mb-3">
                    Lucky Doll Pin-up Lingerie
                  </h1>
                  <p className="text-gray-600 text-sm mb-4">
                    Manila's Premier Vintage-Inspired Lingerie Boutique
                  </p>
                  <div className="space-y-2 text-gray-700 mb-4">
                    <div className="flex items-center justify-center">
                      <span className="text-pink-500 mr-2 text-base">🕒</span>
                      <span className="text-sm">Mon-Sat 1pm-6pm</span>
                    </div>
                    <div className="text-center">
                      <span className="text-pink-500 mr-2 text-base">📍</span>
                      <span className="text-xs">
                        Unit E 4th floor 1867 Oroquieta St. Sta. Cruz Manila,
                        Metro Manila 1003
                      </span>
                    </div>
                  </div>

                  {/* Contact Icons */}
                  <div className="flex justify-center space-x-4">
                    <span className="text-gray-500 text-lg">📧</span>
                    <span className="text-gray-500 text-lg">🌐</span>
                    <span className="text-gray-500 text-lg">📷</span>
                    <span className="text-gray-500 text-lg">🎵</span>
                  </div>
                </div>

                {/* Your Chat Assistant Section */}
                <div className="mb-6">
                  <h2 className="text-base font-semibold text-gray-800 mb-3">
                    Your Chat Assistant
                  </h2>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    I'm here 24/7 to help you browse our collection, check
                    availability, book appointments, and answer any questions
                    about our products and services.
                  </p>
                </div>

                {/* How I can help you Section */}
                <div className="mb-6">
                  <h2 className="text-base font-semibold text-gray-800 mb-4">
                    How I can help you
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="text-blue-500 mr-3 text-base">🛍️</span>
                      <span className="text-gray-600 text-xs">
                        Browse products and check availability
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-purple-500 mr-3 text-base">📅</span>
                      <span className="text-gray-600 text-xs">
                        Schedule appointments and bookings
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-pink-500 mr-3 text-base">💬</span>
                      <span className="text-gray-600 text-xs">
                        Answer questions about our services
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-pink-500 mr-3 text-base">🎯</span>
                      <span className="text-gray-600 text-xs">
                        Get personalized recommendations
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="text-center text-gray-400 text-xs">
                  Powered by HeySheets
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop View (giữ nguyên như cũ)
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Left Sidebar - Business Info + Chat Assistant */}
        <div className="w-1/2 bg-white border-r border-gray-200 p-8 overflow-y-auto sticky left-0 h-screen">
          {/* Business Profile */}
          <div className="mb-12">
            <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-white">LD</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800 mb-3">
              Lucky Doll Pin-up Lingerie
            </h1>
            <p className="text-gray-600 text-sm mb-4">
              Manila's Premier Vintage-Inspired Lingerie Boutique
            </p>
            <div className="space-y-2 text-gray-700 mb-4">
              <div className="flex items-center">
                <span className="text-pink-500 mr-2 text-base">🕒</span>
                <span className="text-sm">Mon-Sat 1pm-6pm</span>
              </div>
              <div className="flex items-start">
                <span className="text-pink-500 mr-2 text-base mt-0.5">📍</span>
                <span className="text-xs leading-relaxed">
                  Unit E 4th floor 1867 Oroquieta St. Sta. Cruz Manila, Metro
                  Manila 1003
                </span>
              </div>
            </div>

            {/* Contact Icons */}
            <div className="flex space-x-4">
              <span className="text-gray-500 text-lg">📧</span>
              <span className="text-gray-500 text-lg">🌐</span>
              <span className="text-gray-500 text-lg">📷</span>
              <span className="text-gray-500 text-lg">🎵</span>
            </div>
          </div>

          {/* Your Chat Assistant Section */}
          <div className="mb-8">
            <h2 className="text-base font-semibold text-gray-800 mb-3">
              Your Chat Assistant
            </h2>
            <p className="text-gray-600 text-xs leading-relaxed">
              I'm here 24/7 to help you browse our collection, check
              availability, book appointments, and answer any questions about
              our products and services.
            </p>
          </div>

          {/* How I can help you Section */}
          <div className="mb-8">
            <h2 className="text-base font-semibold text-gray-800 mb-4">
              How I can help you
            </h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-blue-500 mr-3 text-base">🛍️</span>
                <span className="text-gray-600 text-xs">
                  Browse products and check availability
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-purple-500 mr-3 text-base">📅</span>
                <span className="text-gray-600 text-xs">
                  Schedule appointments and bookings
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-pink-500 mr-3 text-base">💬</span>
                <span className="text-gray-600 text-xs">
                  Answer questions about our services
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-pink-500 mr-3 text-base">🎯</span>
                <span className="text-gray-600 text-xs">
                  Get personalized recommendations
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-gray-400 text-xs mt-auto pt-8">
            Powered by HeySheets
          </div>
        </div>

        {/* Right Side - Chat Area */}
        <div className="w-1/2 flex flex-col">
          {/* Small link to Component Showcase */}
          <div className="bg-white border-b border-gray-200 px-6 py-2">
            <div className="flex justify-end">
              <button
                onClick={() => navigate("/showcase")}
                className="text-sm text-gray-500 hover:text-gray-700 hover:underline"
              >
                🧪 Component Showcase
              </button>
            </div>
          </div>
          <ChatInterface />
        </div>
      </div>
    </div>
  );
}
