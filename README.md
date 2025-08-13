# HeySheets - AI Chatbot for Google Sheets

HeySheets transforms any Google Sheets into an intelligent chatbot that can handle customer service, sales, and appointment booking 24/7. Think of it as turning a simple spreadsheet into a smart business assistant.

## 🚀 What We're Building

- **Intelligent Chatbot**: Powered by AI intent classification (13 different intents)
- **Real-time Integration**: Reads data from Google Sheets in real-time
- **Multi-step Flows**: Handles complex conversations with state management
- **Context Preservation**: Bot remembers what customers talked about
- **Automated Actions**: Books appointments, processes orders, updates inventory

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React Frontend │    │  Intent Classifier │    │  Response Generator │
│   (Tailwind CSS) │◄──►│  (Groq LLM)      │◄──►│  (AI Responses)   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Chat Service  │    │  Entity Extractor │    │  Google Sheets API │
│   (State Mgmt)  │    │  (Keywords)       │    │  (Real-time Sync) │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🎯 Supported Intents

1. **PRODUCT_CATEGORY** - Browse products by category
2. **PRODUCT_PURCHASE** - Buy products with multi-step flow
3. **BOOKING** - Schedule appointments and consultations
4. **AVAILABILITY_CHECK** - Check stock and variants
5. **PRICING** - Get product and service prices
6. **SHIPPING** - Shipping options and costs
7. **RETURN_POLICY** - Return and exchange policies
8. **CUSTOMIZATION** - Custom design requests
9. **BUSINESS_HOURS** - Operating hours and availability
10. **LOCATION** - Store location and directions
11. **CONTACT** - Contact information and methods
12. **GENERAL_QUESTION** - Brand and company information
13. **APPOINTMENT_MANAGEMENT** - Modify/cancel appointments

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 16+
- npm or yarn
- Google Sheets API access (for production)

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd heysheets-assistant
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

4. **Open in browser**

```
http://localhost:5173
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── thread.jsx      # Chat interface
│   └── ui/             # UI components
├── services/            # Business logic
│   ├── chatService.js      # Main chat orchestrator
│   ├── intentClassifier.js # Intent classification
│   └── responseGenerator.js # AI response generation
├── data/               # Mock data and API
│   └── fakeData.js     # Simulated Google Sheets data
├── HeySheet.jsx        # Main application component
├── index.css           # Tailwind CSS + custom styles
└── main.jsx            # Application entry point
```

## 🔧 Configuration

### Fake Data Setup

The current implementation uses mock data in `src/data/fakeData.js`:

- **Business Information**: Name, hours, address, contact
- **Products**: Corsets, lingerie sets, accessories
- **Services**: Fitting sessions, consultations
- **Appointments**: Customer bookings and schedules
- **FAQs**: Common questions and answers

### Google Sheets Integration (Production)

To connect real Google Sheets:

1. **Enable Google Sheets API**
2. **Create service account credentials**
3. **Share spreadsheet with service account**
4. **Update `mockSheetsAPI` in `fakeData.js`**

```javascript
// Example Google Sheets API integration
import { google } from "googleapis";

const sheets = google.sheets({ version: "v4", auth: client });
const response = await sheets.spreadsheets.values.get({
  spreadsheetId: "your-spreadsheet-id",
  range: "Products!A2:F",
});
```

## 🧪 Testing the Chatbot

### Sample Conversations

**Product Browsing:**

```
User: "Show me your corsets"
Bot: "Great! We have several categories: CORSETS, LINGERIE_SETS, ACCESSORIES..."
```

**Appointment Booking:**

```
User: "I want to book a fitting session"
Bot: "I'd love to help you book an appointment! We offer: Personal Fitting Session..."
```

**Availability Check:**

```
User: "Do you have the corset in size M?"
Bot: "I'd be happy to check availability for you! What product, size, and color..."
```

### Testing Different Intents

Try these phrases to test intent classification:

- **Products**: "I'm looking for corsets", "Show me your collection"
- **Booking**: "I need to schedule an appointment", "Book a consultation"
- **Information**: "What are your hours?", "Where are you located?"
- **Support**: "What's your return policy?", "Do you ship internationally?"

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel/Netlify

```bash
# Vercel
vercel --prod

# Netlify
netlify deploy --prod
```

### Environment Variables

```bash
# .env.local
VITE_GOOGLE_SHEETS_API_KEY=your_api_key
VITE_GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id
VITE_GROQ_API_KEY=your_groq_api_key
```

## 🔮 Next Steps

1. **Landing Page**: Build marketing website
2. **Brand Work**: Logo, colors, messaging
3. **Real Google Sheets**: Replace mock data
4. **Groq LLM Integration**: Implement real intent classification
5. **Analytics**: Track conversation flows and success rates
6. **Multi-business Support**: Handle different business types
7. **Payment Integration**: Process orders and payments
8. **Email Notifications**: Send confirmations and updates

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [Project Wiki](link-to-wiki)
- **Issues**: [GitHub Issues](link-to-issues)
- **Discussions**: [GitHub Discussions](link-to-discussions)
- **Email**: support@heysheets.com

---

**Built with ❤️ for small businesses who deserve their own AI assistant**
