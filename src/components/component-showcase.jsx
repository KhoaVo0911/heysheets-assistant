import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DemoPanel from "./demo-panel";
import DataManager from "./data-manager";

export default function ComponentShowcase() {
  const [activeTab, setActiveTab] = useState("demo");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Component Showcase
          </h1>
          <p className="text-gray-600">
            Test and manage all HeySheets components in one place
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("demo")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "demo"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                🧪 Demo Panel
              </button>
              <button
                onClick={() => setActiveTab("data")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "data"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                📊 Data Manager
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {activeTab === "demo" && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Demo Panel
              </h2>
              <p className="text-gray-600 mb-6">
                Test all chatbot conversation flows automatically
              </p>
              <DemoPanel />
            </div>
          )}

          {activeTab === "data" && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Data Manager
              </h2>
              <p className="text-gray-600 mb-6">
                Manage mock data for products, services, and business
                information
              </p>
              <DataManager />
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="text-center mt-8 space-x-4">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            ← Back to Demo
          </button>
          <button
            onClick={() => navigate("/landing")}
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            🚀 View Landing Page
          </button>
        </div>
      </div>
    </div>
  );
}
