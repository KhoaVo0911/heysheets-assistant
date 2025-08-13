// Fake data mô phỏng Google Sheets cho HeySheets
export const fakeBusinessData = {
  business: {
    name: "Lucky Doll Pin-up Lingerie",
    logo: "LD",
    hours: "Mon-Sat 1pm-6pm",
    address:
      "Unit E 4th floor 1867 Oroquieta St. Sta. Cruz, Manila, Metro Manila 1003",
    email: "info@luckydoll.com",
    website: "https://luckydoll.com",
    phone: "+63 912 345 6789",
  },

  // Products từ Google Sheets
  products: [
    {
      id: "prod_001",
      name: "Classic Pin-up Corset",
      category: "CORSETS",
      price: 2500,
      currency: "PHP",
      availability: "IN_STOCK",
      description:
        "Classic black corset with lace details, perfect for pin-up styling",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Black", "Red", "Navy"],
      image_url: "https://example.com/corset1.jpg",
    },
    {
      id: "prod_002",
      name: "Victorian Lingerie Set",
      category: "LINGERIE_SETS",
      price: 3200,
      currency: "PHP",
      availability: "IN_STOCK",
      description:
        "Elegant Victorian-style lingerie set with matching bra and panties",
      sizes: ["S", "M", "L"],
      colors: ["Ivory", "Pink", "Lavender"],
      image_url: "https://example.com/lingerie1.jpg",
    },
    {
      id: "prod_003",
      name: "Retro Stockings",
      category: "ACCESSORIES",
      price: 800,
      currency: "PHP",
      availability: "LOW_STOCK",
      description: "Vintage-style stockings with garter belt attachment",
      sizes: ["One Size"],
      colors: ["Black", "Navy", "Red"],
      image_url: "https://example.com/stockings1.jpg",
    },
  ],

  // Services từ Google Sheets
  services: [
    {
      id: "service_001",
      name: "Personal Fitting Session",
      category: "BOOKING",
      duration: 60, // minutes
      price: 500,
      currency: "PHP",
      description: "Professional fitting session with our expert staff",
      available_slots: ["Mon 2pm", "Wed 3pm", "Fri 4pm"],
    },
    {
      id: "service_002",
      name: "Custom Design Consultation",
      category: "BOOKING",
      duration: 90,
      price: 1000,
      currency: "PHP",
      description: "One-on-one consultation for custom lingerie design",
      available_slots: ["Tue 2pm", "Thu 3pm", "Sat 2pm"],
    },
  ],

  // Appointments từ Google Sheets
  appointments: [
    {
      id: "apt_001",
      customer_name: "Maria Santos",
      service: "Personal Fitting Session",
      date: "2024-01-15",
      time: "2:00 PM",
      status: "CONFIRMED",
      notes: "First time customer, prefers evening appointments",
    },
    {
      id: "apt_002",
      customer_name: "Ana Rodriguez",
      service: "Custom Design Consultation",
      date: "2024-01-16",
      time: "3:00 PM",
      status: "PENDING",
      notes: "Interested in wedding lingerie",
    },
  ],

  // FAQ từ Google Sheets
  faqs: [
    {
      question: "What are your return policies?",
      answer:
        "We accept returns within 14 days with original tags attached. Custom items are non-refundable.",
      category: "POLICIES",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship worldwide via DHL Express. Shipping costs vary by location.",
      category: "SHIPPING",
    },
    {
      question: "Can I modify existing designs?",
      answer:
        "Absolutely! We offer customization services for most of our products.",
      category: "CUSTOMIZATION",
    },
  ],
};

// Intent classification data
export const intentExamples = {
  PRODUCT_CATEGORY: [
    "I'm looking for corsets",
    "Show me your lingerie sets",
    "What accessories do you have?",
    "I want to see your collection",
  ],
  PRODUCT_PURCHASE: [
    "I want to buy the Classic Pin-up Corset",
    "How much is the Victorian Lingerie Set?",
    "Can I order the Retro Stockings?",
    "I'd like to purchase something",
  ],
  BOOKING: [
    "I need to book a fitting session",
    "Can I schedule a consultation?",
    "I want to make an appointment",
    "When are you available for fittings?",
  ],
  AVAILABILITY_CHECK: [
    "Do you have the corset in size M?",
    "Is the lingerie set in stock?",
    "What colors are available?",
    "Do you have this in red?",
  ],
  PRICING: [
    "How much does the corset cost?",
    "What's the price of your services?",
    "How much for custom design?",
    "What are your rates?",
  ],
  SHIPPING: [
    "How long does shipping take?",
    "Do you ship to Cebu?",
    "What are your shipping costs?",
    "Can you deliver to my address?",
  ],
  RETURN_POLICY: [
    "What's your return policy?",
    "Can I return if it doesn't fit?",
    "How do I get a refund?",
    "What if I'm not satisfied?",
  ],
  CUSTOMIZATION: [
    "Can you customize this design?",
    "I want different colors",
    "Can you make it in my size?",
    "Is modification possible?",
  ],
  BUSINESS_HOURS: [
    "What are your business hours?",
    "When are you open?",
    "Are you open on Sundays?",
    "What time do you close?",
  ],
  LOCATION: [
    "Where are you located?",
    "How do I get to your store?",
    "What's your address?",
    "Is there parking available?",
  ],
  CONTACT: [
    "How can I contact you?",
    "What's your phone number?",
    "Can I email you?",
    "How do I reach customer service?",
  ],
  GENERAL_QUESTION: [
    "What makes you different?",
    "Tell me about your brand",
    "What's your story?",
    "Why should I choose you?",
  ],
  APPOINTMENT_MANAGEMENT: [
    "I need to reschedule my appointment",
    "Can I cancel my booking?",
    "I want to change my consultation time",
    "How do I modify my appointment?",
  ],
};

// Conversation flows
export const conversationFlows = {
  PRODUCT_PURCHASE: {
    steps: [
      "PRODUCT_SELECTION",
      "SIZE_COLOR_SELECTION",
      "QUANTITY_CONFIRMATION",
      "CONTACT_INFO_COLLECTION",
      "PAYMENT_METHOD",
      "ORDER_CONFIRMATION",
    ],
    required_info: [
      "product_id",
      "size",
      "color",
      "quantity",
      "customer_name",
      "phone",
      "email",
    ],
  },

  BOOKING: {
    steps: [
      "SERVICE_SELECTION",
      "DATE_SELECTION",
      "TIME_SELECTION",
      "CUSTOMER_INFO_COLLECTION",
      "SPECIAL_REQUESTS",
      "BOOKING_CONFIRMATION",
    ],
    required_info: [
      "service_id",
      "date",
      "time",
      "customer_name",
      "phone",
      "email",
    ],
  },

  AVAILABILITY_CHECK: {
    steps: [
      "PRODUCT_IDENTIFICATION",
      "VARIANT_SELECTION",
      "STOCK_CHECK",
      "ALTERNATIVE_SUGGESTIONS",
    ],
    required_info: ["product_id", "size", "color"],
  },
};

// Mock Google Sheets API responses
export const mockSheetsAPI = {
  // Simulate reading from Google Sheets
  readProducts: () => Promise.resolve(fakeBusinessData.products),
  readServices: () => Promise.resolve(fakeBusinessData.services),
  readAppointments: () => Promise.resolve(fakeBusinessData.appointments),
  readFAQs: () => Promise.resolve(fakeBusinessData.faqs),

  // Simulate writing back to Google Sheets
  createAppointment: (appointmentData) => {
    console.log("Creating appointment in Google Sheets:", appointmentData);
    return Promise.resolve({ success: true, id: `apt_${Date.now()}` });
  },

  createOrder: (orderData) => {
    console.log("Creating order in Google Sheets:", orderData);
    return Promise.resolve({ success: true, id: `order_${Date.now()}` });
  },

  updateInventory: (productId, quantity) => {
    console.log("Updating inventory in Google Sheets:", {
      productId,
      quantity,
    });
    return Promise.resolve({ success: true });
  },
};
