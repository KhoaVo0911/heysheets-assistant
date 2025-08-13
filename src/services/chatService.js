// Chat Service chính cho HeySheets
import { intentClassifier } from "./intentClassifier.js";
import { responseGenerator } from "./responseGenerator.js";
import { mockSheetsAPI } from "../data/fakeData.js";

export class ChatService {
  constructor() {
    this.conversationHistory = [];
    this.currentContext = {};
    this.currentFlow = null;
    this.currentStep = null;
  }

  // Xử lý message từ user
  async processMessage(userMessage) {
    try {
      // 1. Classify intent
      const intentResult = await intentClassifier.classifyIntent(userMessage);

      // 2. Extract entities
      const entities = intentClassifier.extractEntities(
        userMessage,
        intentResult.intent
      );

      // 3. Generate response
      const response = await responseGenerator.generateResponse(
        intentResult.intent,
        entities,
        this.currentContext
      );

      // 4. Update context
      this.updateContext(intentResult.intent, entities, response);

      // 5. Add to conversation history
      this.addToHistory("user", userMessage);
      this.addToHistory("assistant", response.message);

      // 6. Return response với suggested actions
      return {
        message: response.message,
        suggestedActions: response.suggestedActions || [],
        intent: intentResult.intent,
        confidence: intentResult.confidence,
        context: this.currentContext,
      };
    } catch (error) {
      console.error("Error processing message:", error);
      return {
        message:
          "I'm sorry, I encountered an error. Please try again or contact our support team.",
        suggestedActions: ["Try again", "Contact support", "Start over"],
        intent: "ERROR",
        confidence: 0,
        context: this.currentContext,
      };
    }
  }

  // Update conversation context
  updateContext(intent, entities, response) {
    // Store last user message for context
    this.currentContext.lastUserMessage =
      this.conversationHistory[this.conversationHistory.length - 2]?.message ||
      "";

    // Update context based on intent
    switch (intent) {
      case "PRODUCT_PURCHASE":
        if (entities.product) {
          this.currentContext.selectedProduct = entities.product;
          this.currentContext.currentFlow = "PRODUCT_PURCHASE";
          this.currentContext.currentStep = "PRODUCT_SELECTION";
        }
        break;

      case "BOOKING":
        if (entities.service) {
          this.currentContext.selectedService = entities.service;
          this.currentContext.currentFlow = "BOOKING";
          this.currentContext.currentStep = "SERVICE_SELECTION";
        }
        break;

      case "AVAILABILITY_CHECK":
        if (entities.product) {
          this.currentContext.lastCheckedProduct = entities.product;
          this.currentContext.lastCheckedSize = entities.size;
          this.currentContext.lastCheckedColor = entities.color;
        }
        break;

      case "PRODUCT_CATEGORY":
        // Store what category user is interested in
        if (this.currentContext.lastUserMessage.includes("corset")) {
          this.currentContext.interestedCategory = "CORSETS";
        } else if (this.currentContext.lastUserMessage.includes("lingerie")) {
          this.currentContext.interestedCategory = "LINGERIE_SETS";
        } else if (
          this.currentContext.lastUserMessage.includes("accessories")
        ) {
          this.currentContext.interestedCategory = "ACCESSORIES";
        }
        break;
    }

    // Update response generator context
    responseGenerator.updateContext(this.currentContext);
  }

  // Add message to conversation history
  addToHistory(sender, message) {
    this.conversationHistory.push({
      id: Date.now(),
      sender, // 'user' or 'assistant'
      message,
      timestamp: new Date().toISOString(),
    });

    // Keep only last 50 messages
    if (this.conversationHistory.length > 50) {
      this.conversationHistory = this.conversationHistory.slice(-50);
    }
  }

  // Get conversation history
  getConversationHistory() {
    return this.conversationHistory;
  }

  // Get current context
  getCurrentContext() {
    return this.currentContext;
  }

  // Reset conversation
  resetConversation() {
    this.conversationHistory = [];
    this.currentContext = {};
    this.currentFlow = null;
    this.currentStep = null;
    responseGenerator.updateContext({});

    return {
      message:
        "Hello! I'm your AI assistant for Lucky Doll Pin-up Lingerie. How can I help you today?",
      suggestedActions: [
        "Show me your products",
        "Book an appointment",
        "What are your hours?",
        "Where are you located?",
      ],
      intent: "GREETING",
      confidence: 1,
      context: {},
    };
  }

  // Handle suggested action click
  async handleSuggestedAction(action) {
    // Treat suggested action as a user message
    return await this.processMessage(action);
  }

  // Get business information
  async getBusinessInfo() {
    try {
      const products = await mockSheetsAPI.readProducts();
      const services = await mockSheetsAPI.readServices();

      return {
        products,
        services,
        business: {
          name: "Lucky Doll Pin-up Lingerie",
          hours: "Mon-Sat 1pm-6pm",
          address:
            "Unit E 4th floor 1867 Oroquieta St. Sta. Cruz, Manila, Metro Manila 1003",
        },
      };
    } catch (error) {
      console.error("Error getting business info:", error);
      return null;
    }
  }

  // Create appointment (simulate Google Sheets API)
  async createAppointment(appointmentData) {
    try {
      const result = await mockSheetsAPI.createAppointment(appointmentData);

      if (result.success) {
        // Update context
        this.currentContext.lastAppointmentId = result.id;
        this.currentContext.currentFlow = null;
        this.currentContext.currentStep = null;

        return {
          success: true,
          message:
            `Perfect! Your appointment has been scheduled successfully. Your appointment ID is: **${result.id}**\n\n` +
            `We'll send you a confirmation email shortly. If you need to make any changes, just let me know!`,
          appointmentId: result.id,
        };
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      return {
        success: false,
        message:
          "I'm sorry, there was an error scheduling your appointment. Please try again or contact us directly.",
      };
    }
  }

  // Create order (simulate Google Sheets API)
  async createOrder(orderData) {
    try {
      const result = await mockSheetsAPI.createOrder(orderData);

      if (result.success) {
        // Update context
        this.currentContext.lastOrderId = result.id;
        this.currentContext.currentFlow = null;
        this.currentContext.currentStep = null;

        return {
          success: true,
          message:
            `Excellent! Your order has been placed successfully. Your order ID is: **${result.id}**\n\n` +
            `We'll process your order and send you a confirmation email with tracking details. Thank you for choosing Lucky Doll!`,
          orderId: result.id,
        };
      }
    } catch (error) {
      console.error("Error creating order:", error);
      return {
        success: false,
        message:
          "I'm sorry, there was an error placing your order. Please try again or contact us directly.",
      };
    }
  }
}

// Singleton instance
export const chatService = new ChatService();
