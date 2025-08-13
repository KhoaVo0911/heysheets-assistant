import { useState, useEffect } from "react";

export default function DataManager({ onDataChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("products");
  const [editingData, setEditingData] = useState({});

  const [dataConfig, setDataConfig] = useState({
    products: [
      {
        id: 1,
        name: "Classic Pin-up Corset",
        category: "CORSETS",
        price: 2500,
        currency: "PHP",
        availability: "In Stock",
        colors: ["Black", "Red", "Navy"],
        sizes: ["XS", "S", "M", "L", "XL"],
        description: "Vintage-inspired corset with adjustable fit",
      },
      {
        id: 2,
        name: "Victorian Lingerie Set",
        category: "LINGERIE_SETS",
        price: 3200,
        currency: "PHP",
        availability: "In Stock",
        colors: ["Ivory", "Pink", "Lavender"],
        sizes: ["S", "M", "L"],
        description: "Elegant Victorian-style lingerie set",
      },
      {
        id: 3,
        name: "Silk Stockings",
        category: "ACCESSORIES",
        price: 800,
        currency: "PHP",
        availability: "In Stock",
        colors: ["Black", "Nude", "Red"],
        sizes: ["One Size"],
        description: "Premium silk stockings with lace trim",
      },
    ],
    services: [
      {
        id: 1,
        name: "Personal Fitting Session",
        duration: 60,
        price: 500,
        currency: "PHP",
        description:
          "Professional fitting consultation with size recommendations",
      },
      {
        id: 2,
        name: "Custom Design Consultation",
        duration: 90,
        price: 800,
        currency: "PHP",
        description: "One-on-one design consultation for custom pieces",
      },
    ],
    business: {
      name: "Lucky Doll Pin-up Lingerie",
      hours: "Mon-Sat 1pm-6pm",
      address: "Unit E 4th floor 1867 Oroquieta St. Sta. Cruz, Manila",
      phone: "+63 912 345 6789",
      email: "hello@luckydoll.com",
      website: "www.luckydoll.com",
    },
  });

  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    price: "",
    currency: "PHP",
    availability: "In Stock",
    colors: "",
    sizes: "",
    description: "",
  });

  const addNewItem = () => {
    if (!newItem.name || !newItem.category) return;

    const item = {
      id: Date.now(),
      ...newItem,
      colors: newItem.colors.split(",").map((c) => c.trim()),
      sizes: newItem.sizes.split(",").map((s) => s.trim()),
      price: parseFloat(newItem.price),
    };

    setDataConfig((prev) => ({
      ...prev,
      products: [...prev.products, item],
    }));

    setNewItem({
      name: "",
      category: "",
      price: "",
      currency: "PHP",
      availability: "In Stock",
      colors: "",
      sizes: "",
      description: "",
    });

    onDataChange && onDataChange(dataConfig);
  };

  const updateItem = (id, field, value) => {
    setDataConfig((prev) => ({
      ...prev,
      products: prev.products.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const deleteItem = (id) => {
    setDataConfig((prev) => ({
      ...prev,
      products: prev.products.filter((item) => item.id !== id),
    }));
  };

  const exportData = () => {
    const dataStr = JSON.stringify(dataConfig, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `demo-data-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        setDataConfig(data);
        onDataChange && onDataChange(data);
      } catch (error) {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  const resetToDefault = () => {
    const defaultData = {
      products: [
        {
          id: 1,
          name: "Classic Pin-up Corset",
          category: "CORSETS",
          price: 2500,
          currency: "PHP",
          availability: "In Stock",
          colors: ["Black", "Red", "Navy"],
          sizes: ["XS", "S", "M", "L", "XL"],
          description: "Vintage-inspired corset with adjustable fit",
        },
      ],
      services: [
        {
          id: 1,
          name: "Personal Fitting Session",
          duration: 60,
          price: 500,
          currency: "PHP",
          description: "Professional fitting consultation",
        },
      ],
      business: {
        name: "Lucky Doll Pin-up Lingerie",
        hours: "Mon-Sat 1pm-6pm",
        address: "Unit E 4th floor 1867 Oroquieta St. Sta. Cruz, Manila",
      },
    };

    setDataConfig(defaultData);
    onDataChange && onDataChange(defaultData);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-600 text-white px-3 md:px-4 py-2 rounded-lg shadow-lg hover:bg-green-700 transition-colors text-sm md:text-base"
      >
        {isOpen ? "❌" : "📊"}{" "}
        <span className="hidden sm:inline">Data Manager</span>
      </button>

      {isOpen && (
        <div className="absolute bottom-16 left-0 w-[90vw] max-w-sm md:w-96 bg-white border border-gray-200 rounded-lg shadow-xl p-3 md:p-4 max-h-[80vh] md:max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base md:text-lg font-semibold text-gray-800">
              📊 Data Manager
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={exportData}
                className="text-blue-600 hover:text-blue-800 text-xs md:text-sm"
              >
                📥 Export
              </button>
              <button
                onClick={resetToDefault}
                className="text-red-600 hover:text-red-800 text-xs md:text-sm"
              >
                🔄 Reset
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-1 mb-4">
            {["products", "services", "business"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 md:py-1 rounded text-sm ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div>
            <div className="border border-gray-200 rounded-lg p-3 mb-4">
              <h4 className="font-medium text-gray-800 mb-2">
                ➕ Add New Product
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <input
                  type="text"
                  placeholder="Name"
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="border border-gray-300 rounded px-2 py-1"
                />
                <select
                  value={newItem.category}
                  onChange={(e) =>
                    setNewItem((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  className="border border-gray-300 rounded px-2 py-1"
                >
                  <option value="">Select Category</option>
                  <option value="CORSETS">CORSETS</option>
                  <option value="LINGERIE_SETS">LINGERIE_SETS</option>
                  <option value="ACCESSORIES">ACCESSORIES</option>
                </select>
                <input
                  type="number"
                  placeholder="Price"
                  value={newItem.price}
                  onChange={(e) =>
                    setNewItem((prev) => ({ ...prev, price: e.target.value }))
                  }
                  className="border border-gray-300 rounded px-2 py-1"
                />
                <input
                  type="text"
                  placeholder="Colors (comma separated)"
                  value={newItem.colors}
                  onChange={(e) =>
                    setNewItem((prev) => ({
                      ...prev,
                      colors: e.target.value,
                    }))
                  }
                  className="border border-gray-300 rounded px-2 py-1"
                />
                <input
                  type="text"
                  placeholder="Sizes (comma separated)"
                  value={newItem.sizes}
                  onChange={(e) =>
                    setNewItem((prev) => ({ ...prev, sizes: e.target.value }))
                  }
                  className="border border-gray-300 rounded px-2 py-1 col-span-2"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newItem.description}
                  onChange={(e) =>
                    setNewItem((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="border border-gray-300 rounded px-2 py-1 col-span-2"
                />
              </div>
              <button
                onClick={addNewItem}
                className="mt-2 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
              >
                Add Product
              </button>
            </div>

            <div className="space-y-2">
              {dataConfig.products.map((product) => (
                <div
                  key={product.id}
                  className="border border-gray-200 rounded-lg p-2"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{product.name}</div>
                      <div className="text-xs text-gray-600">
                        {product.category} • {product.currency} {product.price}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteItem(product.id)}
                      className="text-red-600 hover:text-red-800 text-xs ml-2"
                    >
                      ❌
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {activeTab === "services" && (
            <div className="space-y-2">
              {dataConfig.services.map((service) => (
                <div
                  key={service.id}
                  className="border border-gray-200 rounded-lg p-2"
                >
                  <div className="font-medium text-sm">{service.name}</div>
                  <div className="text-xs text-gray-600">
                    {service.duration}min • {service.currency} {service.price}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "business" && (
            <div className="space-y-2">
              <div className="border border-gray-200 rounded-lg p-2">
                <div className="font-medium text-sm">
                  {dataConfig.business.name}
                </div>
                <div className="text-xs text-gray-600">
                  {dataConfig.business.hours}
                </div>
                <div className="text-xs text-gray-600">
                  {dataConfig.business.address}
                </div>
              </div>
            </div>
          )}

          <div className="border-t pt-4 mt-4">
            <h4 className="font-medium text-gray-800 mb-2">📁 Import Data</h4>
            <input
              type="file"
              accept=".json"
              onChange={importData}
              className="text-xs"
            />
          </div>
        </div>
      )}
    </div>
  );
}
