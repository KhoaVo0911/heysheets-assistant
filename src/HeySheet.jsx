import React, { useState } from "react";
import Thread from "./components/thread.jsx";
import "./index.css";

export default function HeySheetsChat() {
  const [isChatStarted, setIsChatStarted] = useState(false);

  const startChat = () => {
    setIsChatStarted(true);
  };

  const backToProfile = () => {
    setIsChatStarted(false);
  };

  if (window.innerWidth <= 768) {
    if (!isChatStarted) {
      return (
        <div className="min-h-screen bg-gray-50">
          <div className="p-6">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">LD</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-3">
                Lucky Doll Pin-up Lingerie
              </h1>
              <p className="text-gray-600 text-lg">
                Manila's Premier Vintage-Inspired Lingerie Boutique
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                📍 Contact Information
              </h2>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-center justify-center">
                  <span className="text-pink-500 mr-3 text-xl">🕒</span>
                  <span className="text-lg">Mon-Sat 1pm-6pm</span>
                </div>
                <div className="text-center">
                  <span className="text-pink-500 mr-3 text-xl">📍</span>
                  <span className="text-lg">
                    Unit E 4th floor 1867 Oroquieta St. Sta. Cruz Manila, Metro
                    Manila 1003
                  </span>
                </div>
              </div>

              <div className="flex justify-center space-x-6 mt-6 pt-4 border-t border-gray-100">
                <span className="text-purple-500 text-2xl">📧</span>
                <span className="text-blue-400 text-2xl">🌐</span>
                <span className="text-gray-600 text-2xl">📷</span>
                <span className="text-purple-500 text-2xl">🎵</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                ✨ Our Services
              </h2>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-pink-50 rounded-lg">
                  <span className="text-2xl mb-2 block">👗</span>
                  <p className="text-sm font-medium text-gray-800">
                    Lingerie Collection
                  </p>
                </div>
                <div className="p-4 bg-pink-50 rounded-lg">
                  <span className="text-2xl mb-2 block">📅</span>
                  <p className="text-sm font-medium text-gray-800">
                    Fitting Sessions
                  </p>
                </div>
                <div className="p-4 bg-pink-50 rounded-lg">
                  <span className="text-2xl mb-2 block">🎨</span>
                  <p className="text-sm font-medium text-gray-800">
                    Custom Design
                  </p>
                </div>
                <div className="p-4 bg-pink-50 rounded-lg">
                  <span className="text-2xl mb-2 block">💝</span>
                  <p className="text-sm font-medium text-gray-800">
                    Personal Styling
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={startChat}
                className="bg-pink-500 text-white px-8 py-4 rounded-xl text-xl font-semibold shadow-lg hover:bg-pink-600 transition-colors w-full"
              >
                💬 Start Chat with Us
              </button>
              <p className="text-gray-500 text-sm mt-3">
                Get instant help with products, bookings, and questions
              </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center">
            <button
              onClick={backToProfile}
              className="mr-4 text-gray-600 hover:text-gray-800"
            >
              ← Back to Profile
            </button>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-sm font-bold text-white">LD</span>
              </div>
              <span className="font-semibold text-gray-800">
                Chat Assistant
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <Thread />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <div className="w-96 bg-white border-r border-gray-200 p-6 overflow-y-auto">
          <div className="mb-8 text-center">
            <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">LD</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Lucky Doll Pin-up Lingerie
            </h1>
          </div>

          <p className="text-gray-700 mb-4">Mon-Sat 1pm-6pm</p>

          <p className="text-gray-700 mb-6">
            Unit E 4th floor 1867 Oroquieta St. Sta. Cruz Manila, Metro Manila
            1003
          </p>

          <div className="flex space-x-4 mb-6">
            <span className="text-gray-500 text-xl">📧</span>
            <span className="text-gray-500 text-xl">🌐</span>
            <span className="text-gray-500 text-xl">📷</span>
            <span className="text-gray-500 text-xl">🎵</span>
          </div>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Your Chat Assistant
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              I'm available 24/7 to help you:
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>📦 Browse our collection and check availability</li>
              <li>📅 Schedule appointments and bookings</li>
              <li>💬 Answer questions about our services</li>
              <li>🎯 Get personalized recommendations</li>
            </ul>
          </div>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              How I can help you
            </h2>
            <p className="text-gray-600 text-sm mb-4">I can assist with:</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>📦 Browse products and check availability</li>
              <li>📅 Schedule appointments and bookings</li>
              <li>💬 Answer questions about our services</li>
              <li>🎯 Get personalized recommendations</li>
            </ul>
          </div>

          <div className="mt-auto pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-500">
              Powered by HeySheets
            </p>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <Thread />
        </div>
      </div>
    </div>
  );
}
