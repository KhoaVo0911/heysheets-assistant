import React from "react";
import Thread from "./components/thread.jsx";
import "./index.css";

export default function HeySheetsChat() {
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
