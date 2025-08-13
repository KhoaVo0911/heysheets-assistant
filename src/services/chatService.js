import { intentClassifier } from "./intentClassifier.js";
import { responseGenerator } from "./responseGenerator.js";
import { mockSheetsAPI } from "../data/fakeData.js";
import { contextManager } from "./contextManager.js";

export class ChatService {
  constructor() {
    this.conversationHistory = [];
    this.currentContext = {};
    this.currentFlow = null;
    this.currentStep = null;
  }

  async processMessage(userMessage) {
    try {
      const intentResult = await intentClassifier.classifyIntent(userMessage);

      const entities = intentClassifier.extractEntities(
        userMessage,
        intentResult.intent
      );

      this.updateContext(intentResult.intent, entities);

      const response = await responseGenerator.generateResponse(
        intentResult.intent,
        entities,
        this.currentContext
      );

      this.addToHistory("user", userMessage);
      this.addToHistory("assistant", response.message);

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

  updateContext(intent, entities) {
    const lastUserMessage =
      this.conversationHistory.filter((msg) => msg.sender === "user").pop()
        ?.message || "";

    this.currentContext.lastUserMessage = lastUserMessage;

    console.log("🔍 Debug - Storing context:");
    console.log("🔍 Last user message:", lastUserMessage);
    console.log("🔍 Intent:", intent);
    console.log("🔍 Context updated:", this.currentContext);

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

      case "SERVICE_SELECTION":
        if (entities.service) {
          this.currentContext.selectedService = entities.service;
          this.currentContext.currentFlow = "BOOKING";
          this.currentContext.currentStep = "APPOINTMENT_DETAILS";
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
        if (lastUserMessage.toLowerCase().includes("corset")) {
          this.currentContext.interestedCategory = "CORSETS";
        } else if (lastUserMessage.toLowerCase().includes("lingerie")) {
          this.currentContext.interestedCategory = "LINGERIE_SETS";
        } else if (lastUserMessage.toLowerCase().includes("accessories")) {
          this.currentContext.interestedCategory = "ACCESSORIES";
        }
        break;
    }

    responseGenerator.updateContext(this.currentContext);
  }

  addToHistory(sender, message) {
    this.conversationHistory.push({
      id: Date.now(),
      sender,
      message,
      timestamp: new Date().toISOString(),
    });

    if (this.conversationHistory.length > 50) {
      this.conversationHistory = this.conversationHistory.slice(-50);
    }
  }

  getConversationHistory() {
    return this.conversationHistory;
  }

  getCurrentContext() {
    return this.currentContext;
  }

  resetConversation() {
    this.conversationHistory = [];
    this.currentContext = {
      currentFlow: null,
      currentStep: null,
      selectedProduct: null,
      selectedService: null,
      lastUserMessage: "",
      interestedCategory: null,
      lastCheckedProduct: null,
      lastCheckedSize: null,
      lastCheckedColor: null,
    };

    contextManager.clearFlowData();

    console.log("🔄 Conversation reset - Context cleared");

    return {
      message:
        "Hello! I'm your HeySheets assistant for Lucky Doll Pin-up Lingerie. I'm here to help you browse our collection, check availability, book appointments, and answer any questions about our products and services.\n\nWhat would you like to do today?",
      suggestedActions: contextManager.getSmartSuggestions(),
    };
  }

  async handleSuggestedAction(action) {
    return await this.processMessage(action);
  }

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

  async createAppointment(appointmentData) {
    try {
      const result = await mockSheetsAPI.createAppointment(appointmentData);

      if (result.success) {
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

  async createOrder(orderData) {
    try {
      const result = await mockSheetsAPI.createOrder(orderData);

      if (result.success) {
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

  getCurrentFlowInfo() {
    return contextManager.getCurrentFlowInfo();
  }

  getCartInfo() {
    return {
      items: contextManager.cart,
      total: contextManager.getCartTotal(),
      count: contextManager.cart.length,
    };
  }
}

export const chatService = new ChatService();
