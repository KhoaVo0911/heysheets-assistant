import React, { useState } from "react";
import { Thread } from "./components/thread"; // Sửa import path
import "./index.css";

export default function HeySheetsChat() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-96 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:inset-0`}
      >
        <div className="p-6 overflow-y-auto h-full">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-md">
              LD
            </div>
            <h2 className="mt-4 text-lg font-semibold text-gray-800">
              Lucky Doll Pin-up Lingerie
            </h2>
            <p className="text-sm text-gray-500">Mon-Sat 1pm-6pm</p>
            <p className="text-sm text-gray-500 mt-1 text-center">
              Unit E 4th floor 1867 Oroquieta St. Sta. Cruz, Manila, Metro
              Manila 1003
            </p>
            <div className="flex gap-3 mt-4">
              <span className="material-icons text-gray-500 cursor-pointer hover:text-pink-400 transition-colors duration-200">
                email
              </span>
              <span className="material-icons text-gray-500 cursor-pointer hover:text-pink-400 transition-colors duration-200">
                language
              </span>
              <span className="material-icons text-gray-500 cursor-pointer hover:text-pink-400 transition-colors duration-200">
                music_note
              </span>
            </div>
          </div>

          {/* Chat Assistant Introduction Section */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3">
              Your Chat Assistant
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              I'm here 24/7 to help you browse our collection, check
              availability, book appointments, and answer any questions about
              our products and services.
            </p>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg space-y-4 text-sm">
            <p className="font-medium text-gray-800">How I can help you</p>
            <ul className="space-y-2 text-gray-600">
              <li>📦 Browse products and check availability</li>
              <li>📅 Schedule appointments and bookings</li>
              <li>💬 Answer questions about our services</li>
              <li>🎯 Get personalized recommendations</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white md:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors duration-200"
          >
            <span className="material-icons">menu</span>
          </button>
          <h1 className="font-semibold text-gray-800">Your Chat Assistant</h1>
          <div className="w-10"></div>
        </div>

        {/* Chat (Thread) */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Thread />
        </div>
      </div>
    </div>
  );
}
