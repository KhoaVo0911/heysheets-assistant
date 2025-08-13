import React from "react";
import Thread from "./components/thread.jsx";
import "./index.css";

export default function HeySheetsChat() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <div className="w-96 bg-white border-r border-gray-200 p-6 overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">HeySheets</h1>
            <p className="text-gray-600 text-sm">
              AI-Powered Customer Service Assistant
            </p>
          </div>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Your Chat Assistant
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              I'm here to help you with:
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>📦 Browse products and check availability</li>
              <li>📅 Schedule appointments and bookings</li>
              <li>💬 Answer questions about our services</li>
              <li>🎯 Get personalized recommendations</li>
            </ul>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              How I can help you
            </h2>
            <p className="text-gray-600 text-sm">
              I can assist with product inquiries, booking appointments,
              providing business information, and much more. Just ask me
              anything!
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
