import { useState, useEffect } from "react";

export default function DemoPanel({ onRunDemo, onReset }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState(null);
  const [demoResults, setDemoResults] = useState([]);

  const demoConfigs = {
    "shopping-flow": {
      name: "🛒 Shopping Flow",
      description: "Complete shopping experience from browse to checkout",
      steps: [
        "Show me your products",
        "Show me corsets",
        "Tell me about the Classic Pin-up Corset",
        "Add to cart",
        "View cart",
        "Proceed to checkout",
        "Place order",
      ],
      category: "E-commerce",
    },
    "booking-flow": {
      name: "📅 Booking Flow",
      description: "Appointment booking and service selection",
      steps: [
        "Book an appointment",
        "Personal Fitting Session",
        "Confirm appointment",
      ],
      category: "Services",
    },
    "info-queries": {
      name: "💬 Info Queries",
      description: "Business information and policies",
      steps: [
        "What are your hours?",
        "Where are you located?",
        "Tell me about shipping",
        "What's your return policy?",
      ],
      category: "Information",
    },
    "product-browsing": {
      name: "👗 Product Browsing",
      description: "Explore different product categories",
      steps: [
        "Show me your products",
        "What accessories do you have?",
        "Tell me about lingerie sets",
      ],
      category: "Products",
    },
    "custom-requests": {
      name: "🎨 Custom Requests",
      description: "Customization and special orders",
      steps: [
        "Can you customize this?",
        "I need a different size",
        "Do you have this in red?",
      ],
      category: "Customization",
    },
  };

  const runDemo = async (demoKey) => {
    const demo = demoConfigs[demoKey];
    if (!demo) return;

    setSelectedDemo(demoKey);
    setDemoResults([]);

    console.log(`🚀 Running demo: ${demo.name}`);

    for (let i = 0; i < demo.steps.length; i++) {
      const step = demo.steps[i];

      setDemoResults((prev) => [
        ...prev,
        {
          type: "user",
          message: step,
          timestamp: new Date().toISOString(),
        },
      ]);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const result = await onRunDemo(step);

      setDemoResults((prev) => [
        ...prev,
        {
          type: "bot",
          message: result.message,
          intent: result.intent,
          confidence: result.confidence,
          timestamp: new Date().toISOString(),
        },
      ]);
    }

    console.log(`✅ Demo completed: ${demo.name}`);
  };

  const runAllDemos = async () => {
    console.log("🚀 Running all demos...");
    for (const demoKey of Object.keys(demoConfigs)) {
      await runDemo(demoKey);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay between demos
    }
    console.log("✅ All demos completed!");
  };

  const clearResults = () => {
    setDemoResults([]);
    setSelectedDemo(null);
  };

  const exportResults = () => {
    const data = {
      timestamp: new Date().toISOString(),
      demo: selectedDemo ? demoConfigs[selectedDemo].name : "All Demos",
      results: demoResults,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `demo-results-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
      >
        {isOpen ? "❌" : "🧪"} Demo Panel
      </button>

      {isOpen && (
        <div className="absolute top-16 right-0 w-96 bg-white border border-gray-200 rounded-lg shadow-xl p-4 max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              🧪 Demo System
            </h3>
            <button
              onClick={clearResults}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Clear
            </button>
          </div>

          <div className="space-y-3 mb-4">
            {Object.entries(demoConfigs).map(([key, demo]) => (
              <div key={key} className="border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-gray-800">{demo.name}</h4>
                    <p className="text-sm text-gray-600">{demo.description}</p>
                    <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded mt-1">
                      {demo.category}
                    </span>
                  </div>
                  <button
                    onClick={() => runDemo(key)}
                    disabled={selectedDemo === key}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 disabled:opacity-50"
                  >
                    {selectedDemo === key ? "Running..." : "Run"}
                  </button>
                </div>

                <div className="text-xs text-gray-500">
                  <div className="font-medium mb-1">Steps:</div>
                  <div className="space-y-1">
                    {demo.steps.slice(0, 3).map((step, idx) => (
                      <div key={idx} className="truncate">
                        • {step}
                      </div>
                    ))}
                    {demo.steps.length > 3 && (
                      <div className="text-gray-400">
                        ... and {demo.steps.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex space-x-2 mb-4">
            <button
              onClick={runAllDemos}
              className="bg-purple-600 text-white px-3 py-2 rounded text-sm hover:bg-purple-700 flex-1"
            >
              🚀 Run All Demos
            </button>
            <button
              onClick={onReset}
              className="bg-gray-600 text-white px-3 py-2 rounded text-sm hover:bg-gray-700"
            >
              🔄 Reset Chat
            </button>
          </div>

          {demoResults.length > 0 && (
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-800">Demo Results</h4>
                <button
                  onClick={exportResults}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  📥 Export
                </button>
              </div>

              <div className="space-y-2 max-h-32 overflow-y-auto">
                {demoResults.map((result, idx) => (
                  <div
                    key={idx}
                    className={`text-xs p-2 rounded ${
                      result.type === "user"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    <div className="font-medium">
                      {result.type === "user" ? "👤 User" : "🤖 Bot"}
                    </div>
                    <div className="truncate">{result.message}</div>
                    {result.intent && (
                      <div className="text-gray-600">
                        Intent: {result.intent} (
                        {Math.round(result.confidence * 100)}%)
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
