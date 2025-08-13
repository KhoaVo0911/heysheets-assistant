export class ContextManager {
  constructor() {
    this.currentFlow = null;
    this.currentStep = null;
    this.selectedProduct = null;
    this.selectedService = null;
    this.cart = [];
    this.appointmentData = {};
    this.orderData = {};
  }

  updateContext(action, data = {}) {
    console.log("🔄 Updating context:", {
      action,
      data,
      currentFlow: this.currentFlow,
    });

    switch (action) {
      case "START_PRODUCT_BROWSE":
        this.currentFlow = "PRODUCT_BROWSE";
        this.currentStep = "CATEGORY_SELECTION";
        this.clearFlowData();
        break;

      case "SELECT_CATEGORY":
        this.currentFlow = "PRODUCT_BROWSE";
        this.currentStep = "PRODUCT_SELECTION";
        this.selectedProduct = null;
        break;

      case "SELECT_PRODUCT":
        this.currentFlow = "PRODUCT_BROWSE";
        this.currentStep = "PRODUCT_DETAILS";
        this.selectedProduct = data.product;
        break;

      case "ADD_TO_CART":
        this.currentFlow = "SHOPPING";
        this.currentStep = "CART_REVIEW";
        this.cart.push(data.product);
        break;

      case "START_CHECKOUT":
        this.currentFlow = "CHECKOUT";
        this.currentStep = "CUSTOMER_INFO";
        break;

      case "START_BOOKING":
        this.currentFlow = "BOOKING";
        this.currentStep = "SERVICE_SELECTION";
        this.clearFlowData();
        break;

      case "SELECT_SERVICE":
        this.currentFlow = "BOOKING";
        this.currentStep = "APPOINTMENT_DETAILS";
        this.selectedService = data.service;
        break;

      case "CONFIRM_APPOINTMENT":
        this.currentFlow = "BOOKING";
        this.currentStep = "APPOINTMENT_CONFIRMED";
        this.appointmentData = data;
        break;

      case "PLACE_ORDER":
        this.currentFlow = "ORDER";
        this.currentStep = "ORDER_CONFIRMED";
        this.orderData = data;
        break;

      case "RESET":
        this.clearFlowData();
        break;
    }

    console.log("✅ Context updated:", {
      flow: this.currentFlow,
      step: this.currentStep,
      product: this.selectedProduct,
      service: this.selectedService,
    });
  }

  getSmartSuggestions() {
    const suggestions = [];

    switch (this.currentFlow) {
      case "PRODUCT_BROWSE":
        if (this.currentStep === "CATEGORY_SELECTION") {
          suggestions.push(
            "Show me corsets",
            "I want to see lingerie sets",
            "What accessories do you have?"
          );
        } else if (this.currentStep === "PRODUCT_SELECTION") {
          suggestions.push(
            "Tell me about the Classic Pin-up Corset",
            "Show me other corsets",
            "What about lingerie sets?"
          );
        } else if (this.currentStep === "PRODUCT_DETAILS") {
          suggestions.push(
            "Add to cart",
            "Check availability",
            "Tell me about sizing",
            "Show me other products"
          );
        }
        break;

      case "SHOPPING":
        if (this.currentStep === "CART_REVIEW") {
          suggestions.push(
            "Continue shopping",
            "Proceed to checkout",
            "Remove from cart",
            "Clear cart"
          );
        }
        break;

      case "CHECKOUT":
        if (this.currentStep === "CUSTOMER_INFO") {
          suggestions.push(
            "Enter my details",
            "Use saved information",
            "Go back to cart"
          );
        }
        break;

      case "BOOKING":
        if (this.currentStep === "SERVICE_SELECTION") {
          suggestions.push(
            "Personal Fitting Session",
            "Custom Design Consultation",
            "Tell me about services"
          );
        } else if (this.currentStep === "APPOINTMENT_DETAILS") {
          suggestions.push(
            "Confirm appointment",
            "Change service",
            "Go back to services",
            "What are your hours?"
          );
        } else if (this.currentStep === "APPOINTMENT_CONFIRMED") {
          suggestions.push(
            "Book another appointment",
            "Show me your products",
            "What are your hours?",
            "Where are you located?"
          );
        }
        break;

      default:
        // Default suggestions when no specific flow
        suggestions.push(
          "Show me your products",
          "Book an appointment",
          "What are your hours?",
          "Where are you located?"
        );
    }

    return suggestions;
  }

  isSuggestionRelevant(suggestion) {
    const currentSuggestions = this.getSmartSuggestions();
    return currentSuggestions.includes(suggestion);
  }

  getCurrentFlowInfo() {
    return {
      flow: this.currentFlow,
      step: this.currentStep,
      product: this.selectedProduct,
      service: this.selectedService,
      cartCount: this.cart.length,
    };
  }

  clearFlowData() {
    this.currentFlow = null;
    this.currentStep = null;
    this.selectedProduct = null;
    this.selectedService = null;
    this.cart = [];
    this.appointmentData = {};
    this.orderData = {};
  }

  addToCart(product) {
    this.cart.push({
      ...product,
      addedAt: new Date().toISOString(),
      id: Date.now(),
    });
    this.updateContext("ADD_TO_CART", { product });
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter((item) => item.id !== productId);
    if (this.cart.length === 0) {
      this.updateContext("RESET");
    }
  }

  getCartTotal() {
    return this.cart.reduce((total, item) => total + item.price, 0);
  }
}

export const contextManager = new ContextManager();
