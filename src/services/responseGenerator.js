// Response Generator Service cho HeySheets
import { fakeBusinessData } from "../data/fakeData.js";

export class ResponseGenerator {
  constructor() {
    this.businessData = fakeBusinessData;
    this.conversationContext = {};
  }

  async generateResponse(intent, entities = {}, context = {}) {
    this.conversationContext = { ...this.conversationContext, ...context };

    switch (intent) {
      case "PRODUCT_CATEGORY":
        return this.handleProductCategory();
      case "PRODUCT_PURCHASE":
        return this.handleProductPurchase(entities);
      case "BOOKING":
        return this.handleBooking();
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
      case "BUSINESS_HOURS":
        return this.handleBusinessHours();
      case "LOCATION":
        return this.handleLocation();
      case "CONTACT":
        return this.handleContact();
      case "GENERAL_QUESTION":
        return this.handleGeneralQuestion();
      case "APPOINTMENT_MANAGEMENT":
        return this.handleAppointmentManagement();
      default:
        return this.handleUnknownIntent();
    }
  }

  handleProductCategory() {
    const categories = [
      ...new Set(this.businessData.products.map((p) => p.category)),
    ];

    // Check if user is asking for specific category
    const message = this.conversationContext.lastUserMessage || "";

    if (message.includes("corset")) {
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
        suggestedActions: [
          "Tell me about the Classic Pin-up Corset",
          "I want to buy a corset",
          "Show me other categories",
          "What about lingerie sets?",
        ],
      };
    }

    if (message.includes("lingerie set") || message.includes("lingerie sets")) {
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
        suggestedActions: [
          "Tell me about the Victorian Lingerie Set",
          "I want to buy a lingerie set",
          "Show me other categories",
          "What about corsets?",
        ],
      };
    }

    if (message.includes("accessories")) {
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
                `📏 Sizes: ${c.sizes.join(", ")}\n\n`
            )
            .join("") +
          `Would you like to see more details about any specific accessory?`,
        suggestedActions: [
          "Tell me about the Retro Stockings",
          "I want to buy accessories",
          "Show me other categories",
          "What about corsets?",
        ],
      };
    }

    // Default response for general product browsing
    return {
      message:
        `Great! We have several categories:\n\n` +
        categories.map((cat) => `• **${cat.replace("_", " ")}**`).join("\n") +
        `\n\nWhat would you like to see?`,
      suggestedActions: [
        "Show me corsets",
        "I want to see lingerie sets",
        "What accessories do you have?",
        "Tell me about your products",
      ],
    };
  }

  handleProductPurchase(entities) {
    if (entities.product) {
      const product = this.businessData.products.find((p) =>
        p.name.toLowerCase().includes(entities.product)
      );

      if (product) {
        return {
          message:
            `Perfect! I found the **${product.name}** for you.\n\n` +
            `💰 **Price:** ${product.currency} ${product.price}\n` +
            `📦 **Availability:** ${product.availability}\n` +
            `🎨 **Colors:** ${product.colors.join(", ")}\n` +
            `📏 **Sizes:** ${product.sizes.join(", ")}\n\n` +
            `Would you like to proceed with purchasing this item?`,
          suggestedActions: [
            "Yes, I want to buy it",
            "What sizes do you have?",
            "Show me other colors",
          ],
        };
      }
    }

    return {
      message: `I'd be happy to help you with your purchase! What product are you interested in?`,
      suggestedActions: [
        "Show me your corsets",
        "I want lingerie sets",
        "What accessories do you have?",
      ],
    };
  }

  handleBooking() {
    return {
      message:
        `I'd love to help you book an appointment! We offer:\n\n` +
        this.businessData.services
          .map(
            (s) =>
              `• **${s.name}** - ${s.duration}min (${s.currency} ${s.price})`
          )
          .join("\n") +
        `\n\nWhich service would you like to book?`,
      suggestedActions: [
        "Personal Fitting Session",
        "Custom Design Consultation",
        "Tell me more about your services",
      ],
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
            ? [
                "I want to buy it",
                "Show me other colors",
                "What about other sizes?",
              ]
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
      suggestedActions: [
        "Check corset availability",
        "Do you have lingerie sets?",
        "What's in stock?",
      ],
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
            `Would you like to proceed with purchasing?`,
          suggestedActions: [
            "Yes, I want to buy it",
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
      suggestedActions: [
        "Tell me about corset prices",
        "How much are fitting sessions?",
        "What about custom designs?",
      ],
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
      suggestedActions: [
        "Calculate shipping to my location",
        "What about local delivery?",
        "Tell me about your products",
        "How do I track my order?",
      ],
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
      suggestedActions: [
        "I want to make a return",
        "How do I contact you?",
        "What about exchanges?",
        "Tell me about your products",
      ],
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
      suggestedActions: [
        "Book a consultation",
        "Tell me about the process",
        "What are your prices?",
        "Show me examples",
      ],
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
      suggestedActions: [
        "Show me your products",
        "Book a fitting session",
        "Tell me about your services",
        "What makes you special?",
      ],
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
      suggestedActions: [
        "I need to reschedule",
        "I want to cancel",
        "Change my appointment details",
        "View my appointments",
      ],
    };
  }

  handleBusinessHours() {
    return {
      message:
        `Our business hours are:\n\n` +
        `📅 **${this.businessData.business.hours}**\n\n` +
        `📍 **Address:** ${this.businessData.business.address}\n\n` +
        `We're closed on Sundays. Would you like to book an appointment?`,
      suggestedActions: [
        "Book an appointment",
        "What's your address?",
        "Do you have parking?",
      ],
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
      suggestedActions: [
        "Book an appointment",
        "What are your hours?",
        "Do you have parking?",
      ],
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
      suggestedActions: [
        "Book an appointment",
        "Ask me a question",
        "Tell me about your products",
      ],
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
      suggestedActions: [
        "Show me your products",
        "Book an appointment",
        "What are your hours?",
        "Where are you located?",
      ],
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
