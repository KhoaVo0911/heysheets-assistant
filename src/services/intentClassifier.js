// Intent Classification Service cho HeySheets
// Mô phỏng Groq LLM intent classification

import { intentExamples } from "../data/fakeData.js";

export class IntentClassifier {
  constructor() {
    this.intents = Object.keys(intentExamples);
    this.confidenceThreshold = 0.3;
  }

  async classifyIntent(userMessage) {
    const message = userMessage.toLowerCase();

    // Simple keyword-based classification (trong thực tế sẽ dùng Groq LLM)
    const intentScores = {};

    this.intents.forEach((intent) => {
      intentScores[intent] = this.calculateIntentScore(message, intent);
    });

    // Tìm intent có score cao nhất
    const bestIntent = Object.entries(intentScores).sort(
      ([, a], [, b]) => b - a
    )[0];

    // Debug logging
    console.log("Message:", userMessage);
    console.log("Intent scores:", intentScores);
    console.log("Best intent:", bestIntent);

    if (bestIntent[1] >= this.confidenceThreshold) {
      return {
        intent: bestIntent[0],
        confidence: bestIntent[1],
        message: userMessage,
      };
    }

    return {
      intent: "GENERAL_QUESTION",
      confidence: 0.5,
      message: userMessage,
    };
  }

  calculateIntentScore(message, intent) {
    const keywords = this.getIntentKeywords(intent);
    let score = 0;

    // Check for exact matches first (highest priority)
    if (
      intentExamples[intent].some((example) =>
        message.includes(example.toLowerCase())
      )
    ) {
      score += 1.0; // Tăng bonus cho exact matches
    }

    // Check for keyword matches
    keywords.forEach((keyword) => {
      if (message.includes(keyword.toLowerCase())) {
        score += 0.4;
      }
    });

    // Special handling for common phrases with higher weights
    if (intent === "PRODUCT_CATEGORY") {
      if (
        message.includes("show me") ||
        message.includes("i want to see") ||
        message.includes("looking for")
      ) {
        score += 0.5;
      }
      if (message.includes("products") || message.includes("collection")) {
        score += 0.3;
      }
    }

    if (intent === "BOOKING") {
      if (
        message.includes("book") ||
        message.includes("schedule") ||
        message.includes("appointment")
      ) {
        score += 0.6;
      }
      if (message.includes("fitting") || message.includes("consultation")) {
        score += 0.4;
      }
      // Negative scoring for non-booking keywords
      if (
        message.includes("products") ||
        message.includes("hours") ||
        message.includes("where")
      ) {
        score -= 0.3;
      }
    }

    if (intent === "BUSINESS_HOURS") {
      if (
        message.includes("hours") ||
        message.includes("open") ||
        message.includes("when")
      ) {
        score += 0.6;
      }
      if (
        message.includes("time") ||
        message.includes("sunday") ||
        message.includes("monday")
      ) {
        score += 0.4;
      }
      // Negative scoring for non-hours keywords
      if (
        message.includes("products") ||
        message.includes("book") ||
        message.includes("where")
      ) {
        score -= 0.3;
      }
    }

    if (intent === "LOCATION") {
      if (
        message.includes("where") ||
        message.includes("location") ||
        message.includes("address")
      ) {
        score += 0.6;
      }
      if (message.includes("store") || message.includes("parking")) {
        score += 0.4;
      }
      // Negative scoring for non-location keywords
      if (
        message.includes("products") ||
        message.includes("book") ||
        message.includes("hours")
      ) {
        score -= 0.3;
      }
    }

    if (intent === "CONTACT") {
      if (
        message.includes("contact") ||
        message.includes("phone") ||
        message.includes("email")
      ) {
        score += 0.6;
      }
      if (message.includes("reach") || message.includes("call")) {
        score += 0.4;
      }
    }

    if (intent === "PRICING") {
      if (
        message.includes("price") ||
        message.includes("cost") ||
        message.includes("how much")
      ) {
        score += 0.6;
      }
      if (message.includes("rate") || message.includes("fee")) {
        score += 0.4;
      }
    }

    if (intent === "SHIPPING") {
      if (
        message.includes("ship") ||
        message.includes("delivery") ||
        message.includes("shipping")
      ) {
        score += 0.6;
      }
      if (message.includes("how long") || message.includes("when")) {
        score += 0.4;
      }
    }

    if (intent === "RETURN_POLICY") {
      if (
        message.includes("return") ||
        message.includes("refund") ||
        message.includes("exchange")
      ) {
        score += 0.6;
      }
      if (message.includes("policy") || message.includes("if not satisfied")) {
        score += 0.4;
      }
    }

    if (intent === "CUSTOMIZATION") {
      if (
        message.includes("custom") ||
        message.includes("modify") ||
        message.includes("change")
      ) {
        score += 0.6;
      }
      if (
        message.includes("different") ||
        message.includes("size") ||
        message.includes("color")
      ) {
        score += 0.4;
      }
    }

    if (intent === "AVAILABILITY_CHECK") {
      if (
        message.includes("available") ||
        message.includes("in stock") ||
        message.includes("have")
      ) {
        score += 0.6;
      }
      if (
        message.includes("size") ||
        message.includes("color") ||
        message.includes("stock")
      ) {
        score += 0.4;
      }
    }

    if (intent === "PRODUCT_PURCHASE") {
      if (
        message.includes("buy") ||
        message.includes("purchase") ||
        message.includes("order")
      ) {
        score += 0.6;
      }
      if (
        message.includes("want to buy") ||
        message.includes("how much") ||
        message.includes("price")
      ) {
        score += 0.4;
      }
    }

    if (intent === "GENERAL_QUESTION") {
      if (
        message.includes("what") ||
        message.includes("how") ||
        message.includes("why")
      ) {
        score += 0.4;
      }
      if (
        message.includes("tell me") ||
        message.includes("story") ||
        message.includes("different")
      ) {
        score += 0.3;
      }
    }

    if (intent === "APPOINTMENT_MANAGEMENT") {
      if (
        message.includes("reschedule") ||
        message.includes("cancel") ||
        message.includes("change")
      ) {
        score += 0.6;
      }
      if (message.includes("modify") || message.includes("appointment")) {
        score += 0.4;
      }
    }

    return Math.max(0, Math.min(score, 1.0)); // Ensure score is between 0 and 1
  }

  // Keywords cho từng intent
  getIntentKeywords(intent) {
    const keywordMap = {
      PRODUCT_CATEGORY: [
        "corset",
        "lingerie",
        "accessories",
        "collection",
        "show",
        "see",
        "looking for",
      ],
      PRODUCT_PURCHASE: [
        "buy",
        "purchase",
        "order",
        "want to buy",
        "how much",
        "price",
        "cost",
      ],
      BOOKING: [
        "book",
        "schedule",
        "appointment",
        "fitting",
        "consultation",
        "session",
        "available",
      ],
      AVAILABILITY_CHECK: [
        "available",
        "in stock",
        "have",
        "size",
        "color",
        "stock",
      ],
      PRICING: ["price", "cost", "how much", "rate", "fee"],
      SHIPPING: ["ship", "delivery", "deliver", "shipping", "how long", "when"],
      RETURN_POLICY: [
        "return",
        "refund",
        "exchange",
        "policy",
        "if not satisfied",
      ],
      CUSTOMIZATION: [
        "custom",
        "modify",
        "change",
        "different",
        "size",
        "color",
      ],
      BUSINESS_HOURS: [
        "hours",
        "open",
        "close",
        "when",
        "time",
        "sunday",
        "monday",
      ],
      LOCATION: ["where", "location", "address", "store", "parking"],
      CONTACT: ["contact", "phone", "email", "reach", "call"],
      GENERAL_QUESTION: ["what", "how", "why", "tell me", "story", "different"],
      APPOINTMENT_MANAGEMENT: [
        "reschedule",
        "cancel",
        "change",
        "modify",
        "appointment",
      ],
    };

    return keywordMap[intent] || [];
  }

  // Extract entities từ message
  extractEntities(message, intent) {
    const entities = {};

    switch (intent) {
      case "PRODUCT_PURCHASE":
        entities.product = this.extractProductName(message);
        break;
      case "BOOKING":
        entities.service = this.extractServiceName(message);
        break;
      case "AVAILABILITY_CHECK":
        entities.product = this.extractProductName(message);
        entities.size = this.extractSize(message);
        entities.color = this.extractColor(message);
        break;
    }

    return entities;
  }

  extractProductName(message) {
    const products = ["corset", "lingerie set", "stockings", "bra", "panties"];
    return products.find((product) => message.includes(product)) || null;
  }

  extractServiceName(message) {
    const services = ["fitting session", "consultation", "appointment"];
    return services.find((service) => message.includes(service)) || null;
  }

  extractSize(message) {
    const sizes = ["xs", "s", "m", "l", "xl", "one size"];
    return sizes.find((size) => message.includes(size)) || null;
  }

  extractColor(message) {
    const colors = ["black", "red", "navy", "ivory", "pink", "lavender"];
    return colors.find((color) => message.includes(color)) || null;
  }
}

// Singleton instance
export const intentClassifier = new IntentClassifier();
