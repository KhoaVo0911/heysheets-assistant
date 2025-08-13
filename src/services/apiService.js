// API Service cho HeySheets - Kết nối backend
// Thay thế mockSheetsAPI trong tương lai

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3001/api";

class APIService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.headers = {
      "Content-Type": "application/json",
      // Thêm auth token nếu cần
      // 'Authorization': `Bearer ${localStorage.getItem('token')}`
    };
  }

  // Helper method để gọi API
  async makeRequest(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const config = {
        headers: this.headers,
        ...options,
      };

      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API Request failed:", error);
      throw error;
    }
  }

  // Google Sheets Operations
  async readSheet(sheetName, range = "A:Z") {
    return this.makeRequest("/sheets/read", {
      method: "POST",
      body: JSON.stringify({ sheetName, range }),
    });
  }

  async writeSheet(sheetName, data, range = "A:Z") {
    return this.makeRequest("/sheets/write", {
      method: "POST",
      body: JSON.stringify({ sheetName, data, range }),
    });
  }

  async updateSheet(sheetName, data, range) {
    return this.makeRequest("/sheets/update", {
      method: "PUT",
      body: JSON.stringify({ sheetName, data, range }),
    });
  }

  // Business Data Operations
  async getBusinessInfo() {
    return this.makeRequest("/business/info");
  }

  async getProducts(category = null) {
    const endpoint = category ? `/products?category=${category}` : "/products";
    return this.makeRequest(endpoint);
  }

  async getServices() {
    return this.makeRequest("/services");
  }

  async getAppointments() {
    return this.makeRequest("/appointments");
  }

  async createAppointment(appointmentData) {
    return this.makeRequest("/appointments", {
      method: "POST",
      body: JSON.stringify(appointmentData),
    });
  }

  async updateAppointment(id, updateData) {
    return this.makeRequest(`/appointments/${id}`, {
      method: "PUT",
      body: JSON.stringify(updateData),
    });
  }

  async deleteAppointment(id) {
    return this.makeRequest(`/appointments/${id}`, {
      method: "DELETE",
    });
  }

  // Orders & Sales
  async createOrder(orderData) {
    return this.makeRequest("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    });
  }

  async getOrders(customerId = null) {
    const endpoint = customerId
      ? `/orders?customerId=${customerId}`
      : "/orders";
    return this.makeRequest(endpoint);
  }

  // Customer Management
  async getCustomerInfo(customerId) {
    return this.makeRequest(`/customers/${customerId}`);
  }

  async updateCustomer(customerId, updateData) {
    return this.makeRequest(`/customers/${customerId}`, {
      method: "PUT",
      body: JSON.stringify(updateData),
    });
  }

  // Analytics & Reports
  async getSalesReport(startDate, endDate) {
    return this.makeRequest("/analytics/sales", {
      method: "POST",
      body: JSON.stringify({ startDate, endDate }),
    });
  }

  async getInventoryReport() {
    return this.makeRequest("/analytics/inventory");
  }

  // AI Integration
  async classifyIntent(userMessage) {
    return this.makeRequest("/ai/intent", {
      method: "POST",
      body: JSON.stringify({ message: userMessage }),
    });
  }

  async generateResponse(intent, entities, context) {
    return this.makeRequest("/ai/response", {
      method: "POST",
      body: JSON.stringify({ intent, entities, context }),
    });
  }

  // File Upload (cho images, documents)
  async uploadFile(file, type = "image") {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    return this.makeRequest("/upload", {
      method: "POST",
      headers: {}, // Không set Content-Type cho FormData
      body: formData,
    });
  }

  // Webhook endpoints
  async registerWebhook(
    url,
    events = ["appointment.created", "order.created"]
  ) {
    return this.makeRequest("/webhooks", {
      method: "POST",
      body: JSON.stringify({ url, events }),
    });
  }

  // Health check
  async healthCheck() {
    return this.makeRequest("/health");
  }
}

// Singleton instance
export const apiService = new APIService();

// Export individual methods nếu cần
export const {
  readSheet,
  writeSheet,
  updateSheet,
  getBusinessInfo,
  getProducts,
  getServices,
  createAppointment,
  createOrder,
  classifyIntent,
  generateResponse,
} = apiService;
