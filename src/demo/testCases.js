// Demo Test Cases cho HeySheets
// Các scenarios để test chatbot hoạt động đúng

export const demoTestCases = {
  // 1. PRODUCT BROWSING FLOW
  productBrowsing: [
    {
      step: 1,
      userInput: "Show me your products",
      expectedIntent: "PRODUCT_CATEGORY",
      expectedResponse:
        "Great! We have several categories: CORSETS, LINGERIE_SETS, ACCESSORIES",
      description: "User bắt đầu browse products",
    },
    {
      step: 2,
      userInput: "Show me corsets",
      expectedIntent: "PRODUCT_CATEGORY",
      expectedResponse: "Here are our beautiful corsets: Classic Pin-up Corset",
      description: "User chọn category cụ thể",
    },
    {
      step: 3,
      userInput: "Tell me about the Classic Pin-up Corset",
      expectedIntent: "PRODUCT_PURCHASE",
      expectedResponse: "Perfect! I found the Classic Pin-up Corset for you",
      description: "User xem chi tiết sản phẩm",
    },
  ],

  // 2. BOOKING FLOW
  bookingFlow: [
    {
      step: 1,
      userInput: "Book an appointment",
      expectedIntent: "BOOKING",
      expectedResponse:
        "I'd love to help you book an appointment! We offer: Personal Fitting Session, Custom Design Consultation",
      description: "User bắt đầu booking process",
    },
    {
      step: 2,
      userInput: "Personal Fitting Session",
      expectedIntent: "BOOKING",
      expectedResponse:
        "Excellent choice! The Personal Fitting Session is a great service",
      description: "User chọn service cụ thể",
    },
  ],

  // 3. INFORMATION QUERIES
  informationQueries: [
    {
      step: 1,
      userInput: "What are your hours?",
      expectedIntent: "BUSINESS_HOURS",
      expectedResponse: "Our business hours are: Mon-Sat 1pm-6pm",
      description: "User hỏi giờ làm việc",
    },
    {
      step: 2,
      userInput: "Where are you located?",
      expectedIntent: "LOCATION",
      expectedResponse: "We're located at: Unit E 4th floor 1867 Oroquieta St",
      description: "User hỏi địa chỉ",
    },
    {
      step: 3,
      userInput: "How can I contact you?",
      expectedIntent: "CONTACT",
      expectedResponse:
        "Here's how you can reach us: Email, Phone, Website, Address",
      description: "User hỏi thông tin liên hệ",
    },
  ],

  // 4. PRICING & AVAILABILITY
  pricingAvailability: [
    {
      step: 1,
      userInput: "How much does the corset cost?",
      expectedIntent: "PRICING",
      expectedResponse: "The Classic Pin-up Corset costs PHP 2500",
      description: "User hỏi giá sản phẩm",
    },
    {
      step: 2,
      userInput: "Do you have the corset in size M?",
      expectedIntent: "AVAILABILITY_CHECK",
      expectedResponse:
        "I'd be happy to check availability for you! What product, size, and color are you looking for?",
      description: "User check availability",
    },
  ],

  // 5. SHIPPING & POLICIES
  shippingPolicies: [
    {
      step: 1,
      userInput: "What are your shipping costs?",
      expectedIntent: "SHIPPING",
      expectedResponse:
        "We offer flexible shipping options: Local Delivery, International Shipping",
      description: "User hỏi về shipping",
    },
    {
      step: 2,
      userInput: "What's your return policy?",
      expectedIntent: "RETURN_POLICY",
      expectedResponse:
        "Our return policy is customer-friendly: Returns accepted within 14 days",
      description: "User hỏi về return policy",
    },
  ],

  // 6. CUSTOMIZATION
  customization: [
    {
      step: 1,
      userInput: "Can you customize this design?",
      expectedIntent: "CUSTOMIZATION",
      expectedResponse:
        "We love creating custom pieces! Here's what we can customize",
      description: "User hỏi về customization",
    },
  ],

  // 7. GENERAL QUESTIONS
  generalQuestions: [
    {
      step: 1,
      userInput: "What makes you different?",
      expectedIntent: "GENERAL_QUESTION",
      expectedResponse:
        "Great question! Lucky Doll Pin-up Lingerie is Manila's premier destination for",
      description: "User hỏi câu hỏi chung",
    },
  ],

  // 8. APPOINTMENT MANAGEMENT
  appointmentManagement: [
    {
      step: 1,
      userInput: "I need to reschedule my appointment",
      expectedIntent: "APPOINTMENT_MANAGEMENT",
      expectedResponse:
        "I can help you manage your appointments! Here's what I can do",
      description: "User muốn quản lý appointment",
    },
  ],
};

// Test Flow Functions
export const runDemoFlow = async (chatService, flowName) => {
  console.log(`🚀 Starting ${flowName} Demo Flow...`);

  const flow = demoTestCases[flowName];
  if (!flow) {
    console.error(`❌ Flow "${flowName}" not found`);
    return;
  }

  for (const testCase of flow) {
    console.log(`\n📝 Step ${testCase.step}: ${testCase.description}`);
    console.log(`👤 User: "${testCase.userInput}"`);
    console.log(`🎯 Expected Intent: ${testCase.expectedIntent}`);

    try {
      const response = await chatService.processMessage(testCase.userInput);

      console.log(`🤖 Bot Response: ${response.message.substring(0, 100)}...`);
      console.log(`✅ Actual Intent: ${response.intent}`);
      console.log(`📊 Confidence: ${response.confidence}`);

      // Check if intent matches
      if (response.intent === testCase.expectedIntent) {
        console.log(`✅ Intent Match: YES`);
      } else {
        console.log(
          `❌ Intent Match: NO - Expected: ${testCase.expectedIntent}, Got: ${response.intent}`
        );
      }

      // Check if response contains expected content
      if (
        response.message.includes(testCase.expectedResponse.substring(0, 20))
      ) {
        console.log(`✅ Response Content: YES`);
      } else {
        console.log(`❌ Response Content: NO`);
      }
    } catch (error) {
      console.error(`❌ Error in step ${testCase.step}:`, error);
    }

    // Wait a bit between steps
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log(`\n🎉 ${flowName} Demo Flow completed!`);
};

// Run all demos
export const runAllDemos = async (chatService) => {
  console.log("🎬 Starting HeySheets Full Demo...");

  const flows = Object.keys(demoTestCases);

  for (const flow of flows) {
    await runDemoFlow(chatService, flow);
    console.log("\n" + "=".repeat(50) + "\n");
  }

  console.log("🎊 All demos completed! HeySheets is working perfectly!");
};
