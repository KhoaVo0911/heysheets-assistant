import { fakeBusinessData } from "../data/fakeData.js";
import { contextManager } from "./contextManager.js";

export class ResponseGenerator {
  constructor() {
    this.businessData = fakeBusinessData;
    this.conversationContext = {};
  }

  async generateResponse(intent, entities = {}, context = {}) {
    console.log("🎯 Generating response for intent:", intent);
    console.log("🎯 Entities:", entities);
    console.log("🎯 Context:", context);

    switch (intent) {
      case "PRODUCT_CATEGORY":
        return this.handleProductCategory(context);
      case "PRODUCT_PURCHASE":
        return this.handleProductPurchase(entities, context);
      case "BOOKING":
        return this.handleBooking(entities);
      case "SERVICE_SELECTION":
        return this.handleServiceSelection(entities, context);
      case "BUSINESS_HOURS":
        return this.handleBusinessHours();
      case "LOCATION":
        return this.handleLocation();
      case "CONTACT":
        return this.handleContact();
      case "AVAILABILITY_CHECK":
        return this.handleAvailabilityCheck(entities);
      case "PRICING":
        return this.handlePricing(entities);
      case "SHIPPING":
        return this.handleShipping();
      case "RETURN_POLICY":
        return this.handleReturnPolicy();
      case "CUSTOMIZATION":
        return this.handleCustomization();
      case "GENERAL_QUESTION":
        return this.handleGeneralQuestion();
      case "APPOINTMENT_MANAGEMENT":
        return this.handleAppointmentManagement();
      case "ADD_TO_CART":
        return this.handleAddToCart(entities, context);
      case "VIEW_CART":
        return this.handleViewCart();
      case "CHECKOUT":
        return this.handleCheckout();
      case "PLACE_ORDER":
        return this.handlePlaceOrder(entities, context);
      default:
        return this.handleUnknownIntent();
    }
  }

  handleProductCategory(context = {}) {
    const categories = [
      ...new Set(this.businessData.products.map((p) => p.category)),
    ];

    const message = context.lastUserMessage || "";

    console.log("🔍 Debug - Last user message:", message);
    console.log("🔍 Debug - Context:", context);

    if (message.toLowerCase().includes("corset")) {
      contextManager.updateContext("SELECT_CATEGORY");
      const corsets = this.businessData.products.filter(
        (p) => p.category === "CORSETS"
      );
      return {
        message:
          `Here are our beautiful corsets:\n\n` +
          corsets
            .map(
              (c) =>
                `**${c.name}**\n` +
                `💰 Price: ${c.currency} ${c.price}\n` +
                `📦 Availability: ${c.availability}\n` +
                `🎨 Colors: ${c.colors.join(", ")}\n` +
                `📏 Sizes: ${c.sizes.join(", ")}\n\n`
            )
            .join("") +
          `Would you like to see more details about any specific corset?`,
        suggestedActions: contextManager.getSmartSuggestions(),
      };
    }

    if (
      message.toLowerCase().includes("lingerie set") ||
      message.toLowerCase().includes("lingerie sets")
    ) {
      contextManager.updateContext("SELECT_CATEGORY");
      const lingerieSets = this.businessData.products.filter(
        (p) => p.category === "LINGERIE_SETS"
      );
      return {
        message:
          `Here are our elegant lingerie sets:\n\n` +
          lingerieSets
            .map(
              (c) =>
                `**${c.name}**\n` +
                `💰 Price: ${c.currency} ${c.price}\n` +
                `📦 Availability: ${c.availability}\n` +
                `🎨 Colors: ${c.colors.join(", ")}\n` +
                `📏 Sizes: ${c.sizes.join(", ")}\n\n`
            )
            .join("") +
          `Would you like to see more details about any specific set?`,
        suggestedActions: contextManager.getSmartSuggestions(),
      };
    }

    if (message.toLowerCase().includes("accessories")) {
      contextManager.updateContext("SELECT_CATEGORY");
      const accessories = this.businessData.products.filter(
        (p) => p.category === "ACCESSORIES"
      );
      return {
        message:
          `Here are our stylish accessories:\n\n` +
          accessories
            .map(
              (c) =>
                `**${c.name}**\n` +
                `💰 Price: ${c.currency} ${c.price}\n` +
                `📦 Availability: ${c.availability}\n` +
                `🎨 Colors: ${c.colors.join(", ")}\n` +
                `📏 Sizes: ${c.colors.join(", ")}\n\n`
            )
            .join("") +
          `Would you like to see more details about any specific accessory?`,
        suggestedActions: contextManager.getSmartSuggestions(),
      };
    }

    if (
      message.toLowerCase().includes("products") ||
      message.toLowerCase().includes("show me") ||
      message.toLowerCase().includes("what do you have")
    ) {
      contextManager.updateContext("START_PRODUCT_BROWSE");
      return {
        message:
          `Great! We have several categories:\n\n` +
          categories.map((cat) => `• **${cat.replace("_", " ")}**`).join("\n") +
          `\n\nWhat would you like to see?`,
        suggestedActions: contextManager.getSmartSuggestions(),
      };
    }

    contextManager.updateContext("START_PRODUCT_BROWSE");
    return {
      message:
        `Great! We have several categories:\n\n` +
        categories.map((cat) => `• **${cat.replace("_", " ")}**`).join("\n") +
        `\n\nWhat would you like to see?`,
      suggestedActions: contextManager.getSmartSuggestions(),
    };
  }

  handleProductPurchase(entities, context) {
    console.log("🛒 Handling product purchase for:", entities, context);

    const message = context.lastUserMessage || "";

    if (message.toLowerCase().includes("classic pin-up corset")) {
      const corset = this.businessData.products.find(
        (p) => p.name === "Classic Pin-up Corset"
      );

      if (corset) {
        contextManager.updateContext("SELECT_PRODUCT", { product: corset });
        return {
          message:
            `Perfect! I found the **${corset.name}** for you!\n\n` +
            `💰 **Price:** ${corset.currency} ${corset.price}\n` +
            `📦 **Availability:** ${corset.availability}\n` +
            `🎨 **Colors:** ${corset.colors.join(", ")}\n` +
            `📏 **Sizes:** ${corset.sizes.join(", ")}\n\n` +
            `This beautiful corset features:\n` +
            `• Classic pin-up style design\n` +
            `• High-quality materials\n` +
            `• Adjustable fit\n` +
            `• Perfect for special occasions\n\n` +
            `Would you like to add this to your cart or need help with sizing?`,
          suggestedActions: contextManager.getSmartSuggestions(),
        };
      }
    }

    return {
      message:
        `I'd be happy to help you with your purchase! What specific product are you interested in?\n\n` +
        `You can:\n` +
        `• Ask about specific products\n` +
        `• Check availability and pricing\n` +
        `• Add to cart\n` +
        `• Get sizing recommendations`,
      suggestedActions: contextManager.getSmartSuggestions(),
    };
  }

  handleAddToCart(entities, context) {
    const message = context.lastUserMessage || "";

    if (message.toLowerCase().includes("add to cart")) {
      const flowInfo = contextManager.getCurrentFlowInfo();
      if (flowInfo.product) {
        contextManager.addToCart(flowInfo.product);

        return {
          message:
            `✅ **${flowInfo.product.name}** has been added to your cart!\n\n` +
            `🛒 **Cart Total:** ${
              flowInfo.product.currency
            } ${contextManager.getCartTotal()}\n` +
            `📦 **Items in Cart:** ${
              contextManager.getCurrentFlowInfo().cartCount
            }\n\n` +
            `What would you like to do next?`,
          suggestedActions: contextManager.getSmartSuggestions(),
        };
      }
    }

    return {
      message:
        "I'd be happy to help you add items to your cart! What would you like to add?",
      suggestedActions: contextManager.getSmartSuggestions(),
    };
  }

  handleViewCart() {
    const flowInfo = contextManager.getCurrentFlowInfo();
    const cart = contextManager.cart;

    if (cart.length === 0) {
      return {
        message:
          "🛒 Your cart is empty. Would you like to browse our products?",
        suggestedActions: contextManager.getSmartSuggestions(),
      };
    }

    const cartItems = cart
      .map((item) => `• **${item.name}** - ${item.currency} ${item.price}`)
      .join("\n");

    return {
      message:
        `🛒 **Your Cart:**\n\n${cartItems}\n\n` +
        `💰 **Total:** ${
          flowInfo.currency || "PHP"
        } ${contextManager.getCartTotal()}\n\n` +
        `What would you like to do?`,
      suggestedActions: contextManager.getSmartSuggestions(),
    };
  }

  handleCheckout() {
    contextManager.updateContext("START_CHECKOUT");

    return {
      message:
        `🛒 **Proceeding to Checkout**\n\n` +
        `You have ${
          contextManager.getCurrentFlowInfo().cartCount
        } item(s) in your cart.\n` +
        `Total: PHP ${contextManager.getCartTotal()}\n\n` +
        `To complete your order, I'll need some information from you.`,
      suggestedActions: contextManager.getSmartSuggestions(),
    };
  }

  handlePlaceOrder(entities, context) {
    contextManager.updateContext("PLACE_ORDER", {
      customerInfo: entities,
      items: contextManager.cart,
      total: contextManager.getCartTotal(),
    });

    return {
      message:
        `🎉 **Order Placed Successfully!**\n\n` +
        `📦 **Order ID:** ORD-${Date.now()}\n` +
        `💰 **Total:** PHP ${contextManager.getCartTotal()}\n` +
        `📧 **Confirmation:** We'll send you an email with order details\n\n` +
        `Thank you for choosing Lucky Doll! Your order will be processed within 1-2 business days.`,
      suggestedActions: contextManager.getSmartSuggestions(),
    };
  }

  handleBooking() {
    contextManager.updateContext("START_BOOKING");

    return {
      message:
        `I'd love to help you book an appointment! Here are our professional services:\n\n` +
        `**🛍️ Personal Fitting Session**\n` +
        `💰 Price: PHP 500 | ⏱️ Duration: 60 minutes\n` +
        `✨ Includes: Size measurement, style consultation, fit adjustments, product recommendations\n\n` +
        `**🎨 Custom Design Consultation**\n` +
        `💰 Price: PHP 800 | ⏱️ Duration: 90 minutes\n` +
        `✨ Includes: Design discussion, fabric selection, custom measurements, design sketches\n\n` +
        `**👥 Group Fitting Session**\n` +
        `💰 Price: PHP 300 per person | ⏱️ Duration: 120 minutes\n` +
        `✨ Perfect for bridal parties or special events\n\n` +
        `**📅 Available Times:**\n` +
        `• Monday - Friday: 9:00 AM - 5:00 PM\n` +
        `• Saturday: 10:00 AM - 4:00 PM\n` +
        `• Sunday: Closed\n\n` +
        `Would you like to proceed with booking? I can help you select a service, choose a date and time, and collect your information.`,
      suggestedActions: [
        "Book an appointment now",
        "Tell me more about Personal Fitting Session",
        "What about Custom Design Consultation?",
        "What are your business hours?",
        "Where are you located?",
      ],
    };
  }

  handleServiceSelection(entities, context) {
    const message = context.lastUserMessage || "";
    let selectedService = null;

    if (entities.service) {
      selectedService = entities.service;
    } else if (message.toLowerCase().includes("personal fitting session")) {
      selectedService = "Personal Fitting Session";
    } else if (message.toLowerCase().includes("custom design consultation")) {
      selectedService = "Custom Design Consultation";
    }

    if (selectedService) {
      const service = this.businessData.services.find(
        (s) => s.name === selectedService
      );

      if (service) {
        contextManager.updateContext("SELECT_SERVICE", { service: service });

        return {
          message:
            `Perfect! You've selected **${service.name}**\n\n` +
            `📅 **Duration:** ${service.duration} minutes\n` +
            `💰 **Price:** ${service.currency} ${service.price}\n` +
            `✨ **What's included:**\n` +
            `• Professional fitting consultation\n` +
            `• Size and style recommendations\n` +
            `• Custom adjustments if needed\n\n` +
            `**Available time slots:**\n` +
            `• Monday - Friday: 2:00 PM - 5:00 PM\n` +
            `• Saturday: 1:00 PM - 4:00 PM\n\n` +
            `Would you like to confirm this appointment?`,
          suggestedActions: contextManager.getSmartSuggestions(),
        };
      }
    }

    return {
      message:
        "I'm sorry, I didn't catch which service you'd like. Could you please specify?",
      suggestedActions: contextManager.getSmartSuggestions(),
    };
  }

  handleAvailabilityCheck(entities) {
    if (entities.product && entities.size && entities.color) {
      const product = this.businessData.products.find((p) =>
        p.name.toLowerCase().includes(entities.product)
      );

      if (product) {
        const available =
          product.sizes.includes(entities.size.toUpperCase()) &&
          product.colors
            .map((c) => c.toLowerCase())
            .includes(entities.color.toLowerCase());

        return {
          message: available
            ? `✅ Yes! We have the **${product.name}** in ${
                entities.color
              } size ${entities.size.toUpperCase()} available.`
            : `❌ Sorry, the **${product.name}** in ${
                entities.color
              } size ${entities.size.toUpperCase()} is currently out of stock.\n\n` +
              `Available options:\n` +
              `• Colors: ${product.colors.join(", ")}\n` +
              `• Sizes: ${product.sizes.join(", ")}`,
          suggestedActions: available
            ? ["Add to cart", "Show me other colors", "What about other sizes?"]
            : [
                "Show me what's available",
                "When will you restock?",
                "Recommend alternatives",
              ],
        };
      }
    }

    return {
      message: `I'd be happy to check availability for you! What product, size, and color are you looking for?`,
      suggestedActions: contextManager.getSmartSuggestions(),
    };
  }

  handlePricing(entities) {
    if (entities.product) {
      const product = this.businessData.products.find((p) =>
        p.name.toLowerCase().includes(entities.product)
      );

      if (product) {
        return {
          message:
            `The **${product.name}** costs **${product.currency} ${product.price}**.\n\n` +
            `This includes:\n` +
            `• High-quality materials\n` +
            `• Professional craftsmanship\n` +
            `• Perfect fit guarantee\n\n` +
            `Would you like to add this to your cart?`,
          suggestedActions: [
            "Add to cart",
            "Show me other options",
            "What about shipping costs?",
            "Tell me about payment methods",
          ],
        };
      }
    }

    return {
      message:
        `Our pricing varies by product and service. Here's a general overview:\n\n` +
        `**Products:**\n` +
        this.businessData.products
          .map((p) => `• ${p.name}: ${p.currency} ${p.price}`)
          .join("\n") +
        `\n\n**Services:**\n` +
        this.businessData.services
          .map((s) => `• ${s.name}: ${s.currency} ${s.price}`)
          .join("\n") +
        `\n\nWhat specific item or service would you like pricing for?`,
      suggestedActions: contextManager.getSmartSuggestions(),
    };
  }

  handleShipping() {
    return {
      message:
        `We offer flexible shipping options:\n\n` +
        `🚚 **Local Delivery (Manila):**\n` +
        `• Same day delivery: ${this.businessData.business.currency} 200\n` +
        `• Next day delivery: ${this.businessData.business.currency} 150\n` +
        `• 2-3 business days: ${this.businessData.business.currency} 100\n\n` +
        `🌍 **International Shipping:**\n` +
        `• DHL Express: 3-5 business days\n` +
        `• Costs vary by location\n` +
        `• Free shipping on orders over ${this.businessData.business.currency} 5000\n\n` +
        `**Processing time:** 1-2 business days for order processing.`,
      suggestedActions: contextManager.getSmartSuggestions(),
    };
  }

  handleReturnPolicy() {
    return {
      message:
        `Our return policy is customer-friendly:\n\n` +
        `✅ **Returns accepted within 14 days**\n` +
        `✅ **Original tags must be attached**\n` +
        `✅ **Items must be unworn and unwashed**\n` +
        `❌ **Custom items are non-refundable**\n\n` +
        `**Return process:**\n` +
        `1. Contact us within 14 days\n` +
        `2. Return item with original packaging\n` +
        `3. Receive refund or exchange\n\n` +
        `**Exchanges:** We're happy to exchange for different sizes or colors if available.`,
      suggestedActions: contextManager.getSmartSuggestions(),
    };
  }

  handleCustomization() {
    return {
      message:
        `We love creating custom pieces! Here's what we can customize:\n\n` +
        `🎨 **Customization options:**\n` +
        `• Colors and fabrics\n` +
        `• Sizes and measurements\n` +
        `• Design modifications\n` +
        `• Personal touches\n\n` +
        `⏱️ **Timeline:** 2-4 weeks for custom orders\n` +
        `💰 **Pricing:** Starts at ${this.businessData.business.currency} 1500\n\n` +
        `Would you like to book a consultation to discuss your custom design?`,
      suggestedActions: contextManager.getSmartSuggestions(),
    };
  }

  handleGeneralQuestion() {
    return {
      message:
        `Great question! **Lucky Doll Pin-up Lingerie** is Manila's premier destination for:\n\n` +
        `✨ **Unique Designs:** Vintage-inspired pin-up and Victorian styles\n` +
        `👗 **Perfect Fit:** Professional fitting sessions and custom sizing\n` +
        `🎯 **Quality:** Premium materials and expert craftsmanship\n` +
        `💝 **Personal Service:** One-on-one consultations and styling advice\n\n` +
        `We specialize in making every customer feel beautiful and confident. What would you like to know more about?`,
      suggestedActions: contextManager.getSmartSuggestions(),
    };
  }

  handleAppointmentManagement() {
    return {
      message:
        `I can help you manage your appointments! Here's what I can do:\n\n` +
        `📅 **Reschedule:** Change date or time\n` +
        `❌ **Cancel:** Cancel existing appointments\n` +
        `✏️ **Modify:** Change service or add notes\n` +
        `📋 **View:** Check your upcoming appointments\n\n` +
        `What would you like to do with your appointment?`,
      suggestedActions: contextManager.getSmartSuggestions(),
    };
  }

  handleBusinessHours() {
    return {
      message:
        `Our business hours are:\n\n` +
        `📅 **${this.businessData.business.hours}**\n\n` +
        `📍 **Address:** ${this.businessData.business.address}\n\n` +
        `We're closed on Sundays. Would you like to book an appointment?`,
      suggestedActions: contextManager.getSmartSuggestions(),
    };
  }

  handleLocation() {
    return {
      message:
        `We're located at:\n\n` +
        `📍 **${this.businessData.business.address}**\n\n` +
        `**Getting here:**\n` +
        `• Take the elevator to the 4th floor\n` +
        `• Look for Unit E\n` +
        `• Street parking available\n` +
        `• Near public transportation`,
      suggestedActions: contextManager.getSmartSuggestions(),
    };
  }

  handleContact() {
    return {
      message:
        `Here's how you can reach us:\n\n` +
        `📧 **Email:** ${this.businessData.business.email}\n` +
        `📱 **Phone:** ${this.businessData.business.phone}\n` +
        `🌐 **Website:** ${this.businessData.business.website}\n` +
        `📍 **Address:** ${this.businessData.business.address}`,
      suggestedActions: contextManager.getSmartSuggestions(),
    };
  }

  handleUnknownIntent() {
    return {
      message:
        `I'm not quite sure I understood that. Let me help you better!\n\n` +
        `I can help you with:\n` +
        `• **Products:** Browse our collection\n` +
        `• **Bookings:** Schedule appointments\n` +
        `• **Information:** Hours, location, policies\n` +
        `• **Support:** Questions and assistance`,
      suggestedActions: contextManager.getSmartSuggestions(),
    };
  }

  updateContext(newContext) {
    this.conversationContext = { ...this.conversationContext, ...newContext };
  }

  getContext() {
    return this.conversationContext;
  }
}

export const responseGenerator = new ResponseGenerator();
