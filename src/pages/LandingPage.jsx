// import React from "react";
// import DemoSpreadsheet from "./demo-spreadsheet.jsx";
// import DemoChat from "./demo-chat.jsx";

// export default function LandingPage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
//       {/* Hero Section */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//           <div className="text-center">
//             <h1 className="text-4xl font-bold text-gray-900 mb-4">
//               Turn any Google Sheet into an
//               <span className="text-blue-600"> AI-powered chatbot</span>
//             </h1>
//             <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
//               HeySheets transforms your spreadsheet data into intelligent
//               customer service. Handle bookings, sales & support automatically
//               with Claude AI.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <button
//                 onClick={() => (window.location.href = "/")}
//                 className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
//               >
//                 Try Free Demo
//               </button>
//               <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
//                 Learn More
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Demo Section */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">
//             See HeySheets in Action
//           </h2>
//           <p className="text-lg text-gray-600">
//             Watch how your Google Sheets data becomes an intelligent customer
//             assistant
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-12 items-start">
//           {/* Demo Spreadsheet */}
//           <div>
//             <div className="mb-6">
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                 Your Google Sheet Data
//               </h3>
//               <p className="text-gray-600">
//                 Connect your spreadsheet and HeySheets automatically understands
//                 your business
//               </p>
//             </div>
//             <DemoSpreadsheet />
//           </div>

//           {/* Demo Chat */}
//           <div>
//             <div className="mb-6">
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                 AI Chatbot Assistant
//               </h3>
//               <p className="text-gray-600">
//                 Customers get instant, intelligent responses based on your data
//               </p>
//             </div>
//             <DemoChat />
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="bg-white border-t border-gray-200 py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">
//               Why Choose HeySheets?
//             </h2>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg
//                   className="w-8 h-8 text-blue-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M13 10V3L4 14h7v7l9-11h-7z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                 Instant Setup
//               </h3>
//               <p className="text-gray-600">
//                 Connect your Google Sheet in minutes. No coding required.
//               </p>
//             </div>

//             <div className="text-center">
//               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg
//                   className="w-8 h-8 text-green-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                 AI-Powered
//               </h3>
//               <p className="text-gray-600">
//                 Built with Claude AI for intelligent, context-aware responses.
//               </p>
//             </div>

//             <div className="text-center">
//               <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg
//                   className="w-8 h-8 text-purple-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                 24/7 Available
//               </h3>
//               <p className="text-gray-600">
//                 Your customers get instant help anytime, anywhere.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
//         <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-white mb-4">
//             Ready to Transform Your Business?
//           </h2>
//           <p className="text-xl text-blue-100 mb-8">
//             Join hundreds of businesses using HeySheets to automate customer
//             service
//           </p>
//           <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
//             Start Free Trial
//           </button>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="bg-gray-900 text-white py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <div className="text-2xl font-bold text-blue-400 mb-4">
//               HeySheets
//             </div>
//             <p className="text-gray-400 mb-6">
//               Turn any Google Sheet into an AI-powered chatbot
//             </p>
//             <div className="text-sm text-gray-500">
//               © 2024 HeySheets. Built with Claude AI.
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Trophy,
  Sparkles,
  MessageCircle,
  Table,
  Sheet as SheetIcon,
} from "lucide-react";
import botTime from "@/assets/images/botTime.png";
import logoHeysheets from "@/assets/images/logoHeysheets.png";
import bubbleNeedHelp from "@/assets/images/Group 55.png";
import bubbleImHere from "@/assets/images/Group 56.png";
import clickDoodle from "@/assets/images/clickme.png";

/* ====== Tokens ====== */
const container = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";
const headingFont = "font-gelica"; // Gelica cho heading
const bodyFont = "font-productSans"; // Product Sans cho body theo list

/* ====== Nút vàng dùng chung ====== */
function BrandButton({ className = "", children, ...props }) {
  return (
    <Button
      className={`rounded-full bg-[#F6D46B] text-black hover:bg-[#F1C84A] ${bodyFont} ${className} text-base`}
      {...props}
    >
      {children}
    </Button>
  );
}

/* ====== Wrapper Section ====== */
function Section({ id, className = "", children }) {
  return (
    <section id={id} className={`py-16 sm:py-24 ${className}`}>
      <div className={container}>{children}</div>
    </section>
  );
}

/* ====== Header/Footer ====== */
function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur">
      <div className={`${container} flex h-16 items-center justify-between`}>
        <div className="text-xl font-semibold tracking-tight">
          <span className="text-yellow-400">hey</span>
          <span className="text-gray-700">sheets</span>
        </div>
        <BrandButton>
          Free trial <ArrowRight className="ml-2 h-4 w-4" />
        </BrandButton>{" "}
        {/* Product Sans */}
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-white">
      <div className={`${container} pt-6 pb-4`}>
        <div className="grid grid-cols-1 md:grid-cols-[auto_minmax(480px,520px)] items-start gap-0">
          <div className="md:pr-8">
            <div className="text-xl font-semibold tracking-tight">
              <span className="text-[#F6D46B]">hey</span>
              <span className="text-gray-500">sheets</span>
            </div>
            <ul className={`mt-6 space-y-3 text-sm ${bodyFont}`}>
              <li>
                <a href="#" className="text-[#727272] hover:underline">
                  Help Centre
                </a>
              </li>
              <li>
                <a href="#" className="text-[#727272] hover:underline">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div className="md:justify-self-end w-full md:w-auto">
            <div className="max-w-[520px] rounded-xl bg-[#2B2A27] p-5 md:p-6 text-left shadow-sm">
              <h4
                className={`${headingFont} text-[20px] leading-snug text-[#F6D46B]`}
              >
                Save your time and then dummy dummy… dummy text
              </h4>
              <Button
                className={`mt-4 rounded-full bg-[#F6D46B] px-4 py-2 text-black hover:bg-[#F1C84A] ${bodyFont}`}
              >
                Free trial <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <hr className="-mx-4 sm:-mx-6 lg:-mx-8 my-6 border-gray-200" />

        <div className={`text-right text-sm text-gray-500 ${bodyFont}`}>
          ©Heysheets {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}

/* ====== HERO ====== */
function Hero() {
  return (
    <Section className="relative overflow-hidden pt-12">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[8%] top-[35%] h-56 w-56 rounded-full bg-yellow-200/30 blur-3xl" />
        <div className="absolute right-[8%] top-[38%] h-56 w-56 rounded-full bg-emerald-200/30 blur-3xl" />
        <Sparkles className="absolute right-8 top-24 h-8 w-8 text-yellow-400" />
        <Sparkles className="absolute right-16 top-40 h-6 w-6 text-yellow-400" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <Badge
          className={`rounded-full bg-amber-100/80 px-3 py-1 text-lg text-neutral-800 ${bodyFont}`}
        >
          For Small Business
        </Badge>

        <h1
          className={`mx-auto mt-4 max-w-4xl text-4xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl md:text-7xl ${headingFont}`}
        >
          <span className="mr-2">Turn your</span>
          <span className="relative inline-flex items-center gap-2">
            <span className="rounded-lg bg-emerald-100 px-2 py-1 text-emerald-700 ring-1 ring-emerald-200">
              sheets
            </span>
            <SheetIcon className="absolute -left-3 -top-3 h-5 w-5 text-emerald-500" />
          </span>
          <span className="ml-2">into your</span>
          <span className="ml-2 inline-flex items-center gap-2">
            <Trophy className="h-7 w-7 text-yellow-500" />
            <span>best employee</span>
          </span>
        </h1>

        <p
          className={`mx-auto mt-5 max-w-xl text-xl text-muted-foreground ${bodyFont}`}
        >
          heysheets is the blahblah software
        </p>

        <div className="mt-6 flex items-center justify-center">
          <BrandButton className="px-6">
            Free trial <ArrowRight className="ml-2 h-5 w-5" />
          </BrandButton>
        </div>
        <p
          className={`mt-2 text-base text-[#686763] font-semibold ${bodyFont}`}
        >
          No credit card needed
        </p>
      </motion.div>

      <div className="mt-16 grid items-start gap-8 md:grid-cols-2">
        <SheetMockup />
        <ChatMockup />
      </div>
    </Section>
  );
}

function SheetMockup() {
  return (
    <Card className="border-muted-foreground/10 shadow-xl">
      <CardContent className="p-0">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div
            className={`flex items-center gap-2 text-sm font-medium ${bodyFont}`}
          >
            <div className="rounded-md bg-emerald-500/10 p-1">
              <SheetIcon className="h-4 w-4 text-emerald-600" />
            </div>
            Demo Shop{" "}
            <span className="ml-2 rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
              .XLSX
            </span>
          </div>
          <div className={`flex items-center gap-2 text-xs ${bodyFont}`}>
            <Tab label="Shop Info" active />
            <Tab label="Appointments" />
            <Tab label="Orders" />
          </div>
        </div>
        <div className="overflow-hidden p-4">
          <div className="grid grid-cols-3 rounded-t-md bg-gray-100 p-2 text-xs font-semibold">
            <div>Product</div>
            <div>Price</div>
            <div>Stock</div>
          </div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`grid grid-cols-3 items-center border-b p-2 text-sm ${bodyFont}`}
            >
              <div className="h-4 w-40 rounded bg-gray-100" />
              <div className="h-4 w-16 rounded bg-gray-100" />
              <div className="h-4 w-28 rounded bg-gray-100" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ChatMockup() {
  return (
    <Card className="relative border-muted-foreground/10 shadow-xl">
      <CardContent className="p-0">
        <div className="flex items-center gap-3 border-b px-4 py-3">
          <div className="relative">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white">
              S
            </div>
            <span className="absolute -right-1 -top-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-yellow-400 text-[10px] font-bold text-black">
              PRO
            </span>
          </div>
          <div>
            <div className={`text-sm font-semibold ${bodyFont}`}>
              Ceramic Shop
            </div>
            <div className="text-xs text-muted-foreground">online</div>
          </div>
        </div>

        <div className="space-y-4 bg-gray-50 p-4">
          <div className="flex items-start gap-2">
            <div className="rounded-full bg-emerald-600 p-2 text-white">
              <MessageCircle className="h-4 w-4" />
            </div>
            <div
              className={`max-w-[85%] rounded-2xl rounded-tl-none bg-white p-3 text-sm shadow-sm ring-1 ring-gray-200 ${bodyFont}`}
            >
              make the conversation match that
            </div>
          </div>

          <div
            className={`ml-10 max-w-[80%] rounded-2xl rounded-tr-none bg-emerald-50 p-3 text-sm text-emerald-900 ring-1 ring-emerald-100 ${bodyFont}`}
          >
            Sure! I’ll align replies to your sheet data.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Tab({ label, active = false }) {
  return (
    <div
      className={
        `inline-flex items-center gap-1 rounded-md px-3 py-1 text-xs font-medium ${bodyFont} ` +
        (active
          ? "bg-white shadow-sm ring-1 ring-gray-200"
          : "text-muted-foreground hover:bg-gray-100")
      }
    >
      {label}
      {active && <span className="ml-1 h-1 w-1 rounded-full bg-emerald-500" />}
    </div>
  );
}

/* ====== QuickSetup (khối vàng) ====== */
function QuickSetup() {
  return (
    <Section>
      <div className="flex flex-col justify-center items-center text-center rounded-3xl bg-[#F9D84E] px-6 py-10 w-[1184px] h-[258px] mx-auto">
        <h2 className={`${headingFont} text-2xl sm:text-3xl`}>
          Set up in just 5 minutes
        </h2>
        <p className={`mt-2 text-xl text-[#434343] ${bodyFont}`}>
          Skip the complicated setup. Start instantly and turn curiosity into
          conversions.
        </p>
        <BrandButton className="mt-4 bg-[#292926] text-white hover:bg-[#4e462e] flex items-center gap-2">
          Free trial <ArrowRight className="h-4 w-4" />
        </BrandButton>
      </div>
    </Section>
  );
}

/* ====== Natural Language ====== */
function NaturalLanguage() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-2">
          <span
            className={`rounded-full bg-[#F6D46B] px-2.5 py-1 text-xs font-semibold text-black ${bodyFont}`}
          >
            AI
          </span>
        </div>

        <h2 className="font-gelica text-3xl sm:text-4xl">Natural Language</h2>
        <p className={`mt-2 max-w-2xl text-base text-[#727272] ${bodyFont}`}>
          These are dummy things, so that this should be changed and we need to
          write down the frequently asked questions.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-[28px] bg-[#F0E7FF] p-8 sm:p-10">
            <div className={`text-xs text-gray-500 ${bodyFont}`}>
              Dummy Text
            </div>
            <div className="font-gelica mt-8 space-y-6 text-center">
              <div className="text-3xl sm:text-4xl">No✖ worries.</div>
              <div className="text-2xl sm:text-3xl">
                <span className="text-[#F6D46B] font-bold">hey</span>
                <span className="text-gray-500">sheets</span>
                <span className="ml-2 inline-flex items-center rounded-full px-2 text-base ring-2 ring-yellow-300">
                  AI
                </span>
              </div>
              <div className="text-3xl sm:text-4xl">understands</div>
              <div className="text-3xl sm:text-4xl">✺ Natural ✺</div>
              <div className="text-3xl sm:text-4xl">Language</div>
            </div>
          </div>

          <div className="rounded-[28px] bg-[#F0E7FF] p-8 sm:p-10">
            <div className={`text-xs text-gray-500 ${bodyFont}`}>
              Dummy text
            </div>
            <h3 className="font-gelica mt-6 text-3xl leading-tight">
              Can answer
              <br />
              anything
            </h3>

            <p className={`mt-4 text-sm italic text-red-500 ${bodyFont}`}>
              This would be change when the chat GUI is done, but it would be
              image(png)
            </p>

            <div
              className={`mt-6 max-w-sm rounded-2xl bg-white p-4 text-sm shadow-sm ring-1 ring-gray-200 ${bodyFont}`}
            >
              Hey, I’m here to help you! I’m dummy demo shop bot to answer some
              questions…
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ====== Steps (3 bước) ====== */
function Steps() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-2">
          <span className="rounded-full bg-[#F6D46B] px-2.5 py-1 text-xs font-semibold text-black">
            AI
          </span>
        </div>

        <h2 className="font-gelica text-3xl sm:text-4xl">
          Easy Setup and
          <br />
          Update
        </h2>
        <p className="mt-2 max-w-2xl text-base text-[#727272] font-productSans">
          These are dummy things, so that this should be changed and we need to
          write down the frequently asked questions.
        </p>

        {/* GAP gần nhau + không justify-between để tránh bị “hở” */}
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          {/* STEP 1 */}
          <div className="w-[312px] h-[480px] rounded-[24px] bg-[#DDE3FF] p-6 sm:p-7 flex flex-col">
            <div className="text-sm text-gray-600 font-productSans">Step 1</div>

            <h3 className="mt-2 text-[32px] leading-tight font-semibold font-productSans">
              Sign up with
              <br />
              Google
            </h3>

            <div className="relative mt-24 mx-auto w-fit">
              <BrandButton className="h-[52px] px-8 text-base text-[#2D2D2D] font-productSans font-semibold">
                Free trial <ArrowRight className="h-5 w-5" />
              </BrandButton>

              {/* Click! bám vào tâm của nút */}
              <img
                src={clickDoodle}
                alt="Click!"
                className="pointer-events-none select-none absolute -top-10 left-1/2 -translate-x-1/2 w-[106px] h-auto"
              />
            </div>

            <div className="mt-2 text-center text-[19px] text-[#3a3a3a] font-productSans font-semibold">
              No credit card needed
            </div>
          </div>

          {/* STEP 2 */}
          <div className="w-[312px] h-[480px] rounded-[24px] bg-[#FFF3C7] p-6 sm:p-7 flex flex-col">
            <div className="text-sm text-gray-600 font-productSans">Step 2</div>

            <h3 className="mt-2 text-[32px] leading-tight font-semibold font-productSans">
              Link with
              <br />
              Google sheets
            </h3>

            <div className="mt-10 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-[14px] font-semibold shadow-sm ring-1 ring-gray-200 font-productSans mt-16">
                <SheetIcon className="h-4 w-4 text-emerald-600" />
                Syncing to Google sheets…
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-1 text-yellow-500">
              <span className="h-2 w-2 rounded-full bg-yellow-400" />
              <span className="h-2 w-8 rounded-full bg-yellow-300" />
            </div>
          </div>

          {/* STEP 3 */}
          <div className="w-[312px] h-[480px] rounded-[24px] bg-[#FFDCEE] p-6 sm:p-7 flex flex-col">
            <div className="text-sm text-gray-600 font-productSans">Step 3</div>

            <h3 className="mt-2 text-[32px] leading-tight font-semibold font-productSans">
              Now chatbot
              <br />
              is ready
            </h3>

            <div className="mt-6 text-sm font-productSans">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-emerald-600" />
                <div className="font-medium">Pottery Shop AI</div>
              </div>

              <div className="max-w-xs rounded-2xl bg-white p-3 text-sm shadow-sm ring-1 ring-gray-200">
                make the conversation match that please let me know. make the
                conversation match
              </div>

              <p className="mt-4 text-sm italic text-red-500">
                This would be change when the chat GUI is done, but it would be
                image(png)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ====== Time & Cost Savings ====== */
function TimeCostSavings() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* AI badge */}
        <div className="mb-6 flex items-center justify-center">
          <span
            className={`rounded-full bg-[#F6D46B] px-2.5 py-1 text-xs font-semibold text-black ${bodyFont}`}
          >
            AI
          </span>
        </div>

        {/* Heading */}
        <h2 className="font-gelica text-center text-4xl sm:text-5xl">
          Time and Cost Savings
        </h2>

        {/* 2 cards */}
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {/* LEFT CARD */}
          <div className="relative rounded-[36px] bg-[#EFE6FF] p-8 md:p-10 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]">
            <h4 className={`text-xl font-semibold ${bodyFont}`}>
              No More{" "}
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-blue-300 text-[12px] leading-none text-blue-600 align-middle">
                Q
              </span>{" "}
              repeat answers
            </h4>

            {/* ghi chú đỏ */}
            <p
              className={`mt-6 max-w-md text-sm italic text-red-500 ${bodyFont}`}
            >
              This would be change
              <br />
              when the chat GUI is done,
              <br />
              but it would be image(png)
            </p>

            {/* khu vực các stripe nghiêng */}
            <div className="relative mt-6 h-[220px] md:h-[260px]">
              {[
                {
                  t: "Can I book 5 people at Friday?",
                  top: "6%",
                  left: "10%",
                  rot: "-7",
                },
                {
                  t: "2AM blah booking available?",
                  top: "26%",
                  left: "46%",
                  rot: "-5",
                },
                {
                  t: "2AM booking available?",
                  top: "48%",
                  left: "50%",
                  rot: "-3",
                },
                {
                  t: "Empty seats for next weekend?",
                  top: "46%",
                  left: "26%",
                  rot: "-2",
                },
                {
                  t: "5 people for Saturday",
                  top: "33%",
                  left: "32%",
                  rot: "-6",
                },
                {
                  t: "2AM booking blah available?",
                  top: "66%",
                  left: "50%",
                  rot: "-4",
                },
              ].map((m, i) => (
                <div
                  key={i}
                  className={`absolute inline-block rounded-xl bg-white px-3 py-2 text-sm shadow-sm ring-1 ring-gray-200 ${bodyFont}`}
                  style={{
                    top: m.top,
                    left: m.left,
                    transform: `rotate(${m.rot}deg)`,
                  }}
                >
                  {m.t}
                </div>
              ))}
            </div>

            {/* nút Let me help you */}
            {/* nút Let me help you */}
            <div className="mt-3 flex items-center gap-3">
              {/* bot avatar = ảnh tròn 36px */}
              <div className="h-9 w-9 overflow-hidden rounded-full ring-1 ring-black/10">
                <img
                  src={botTime}
                  alt="Bot avatar"
                  className="h-full w-full object-cover"
                />
              </div>

              <div
                className={`inline-flex items-center rounded-full bg-[#F6D46B] px-4 py-2 text-sm text-[#424040] ${bodyFont}`}
              >
                Let me help you!
              </div>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="relative rounded-[36px] bg-[#D9FFF4] p-8 md:p-10 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]">
            <h4
              className={`max-w-sm text-[26px] font-semibold leading-8 ${bodyFont}`}
            >
              24/7 live customer
              <br />
              support is available with
              <br />
              Heysheets.
            </h4>

            {/* bubble + avatar */}
            <div className="mt-10 flex items-center justify-end gap-3">
              <img
                src={bubbleNeedHelp}
                alt="Need help!!"
                className="h-[46px] w-auto select-none pointer-events-none"
                draggable="false"
              />
              <div className="h-10 w-10 overflow-hidden rounded-full ring-1 ring-black/10">
                {/* avatar người dùng, tạm placeholder */}
                <img
                  src="https://i.pravatar.cc/40"
                  alt="user"
                  className="h-full w-full object-cover"
                  draggable="false"
                />
              </div>
            </div>

            <div className="mt-10 flex items-center gap-3">
              {/* logo Heysheets tròn 40px, nền trắng và viền nhẹ */}
              <div className="h-10 w-10 overflow-hidden rounded-full bg-white ring-1 ring-black/10 flex items-center justify-center">
                <img
                  src={logoHeysheets}
                  alt="Heysheets logo"
                  className="h-8 w-8 object-contain select-none pointer-events-none"
                  draggable="false"
                />
              </div>
              <img
                src={bubbleImHere}
                alt="I’m here!"
                className="h-[46px] w-auto select-none pointer-events-none"
                draggable="false"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ====== Testimonial ====== */
function Testimonial() {
  return (
    <section className="bg-[#2B2A27] py-16 sm:py-24 text-white">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-5xl leading-none">“</div>

        <p
          className={`mx-auto mt-6 max-w-3xl text-xl leading-relaxed ${headingFont}`}
        >
          They aren't using our product yet, but hope they will. For now just
          put placeholder and we can try to get a quote from testing.
        </p>

        <div className={`mt-6 text-base opacity-80 ${bodyFont}`}>
          <div className="text-white">Useless Studio</div>
          <div className="text-[#747474]">Seramic Shop at HongKong</div>
        </div>

        <div className="mt-8">
          <Button
            variant="outline"
            className={`rounded-full border-white/60 bg-transparent px-6 text-white hover:bg-white/10 ${bodyFont} text-base`}
          >
            Try real Heysheets <ArrowRight className=" h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ====== CTA ====== */
function CTA() {
  return (
    <section className="bg-[#FFF5CF] py-20">
      <div className={`${container} text-center`}>
        <h3 className={`${headingFont} text-4xl sm:text-5xl text-[#2B2A27]`}>
          Save your time
        </h3>
        <p className={`mt-3 text-base text-[#686763] ${bodyFont}`}>
          heysheets is the blahblah software
        </p>
        <Button
          className={`mt-6 rounded-full bg-[#2B2A27] px-6 text-[#F6D46B] hover:bg-[#1f1e1b] ${bodyFont}`}
        >
          Free trial <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}

/* ====== Landing Page ====== */
export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <Hero />
      <QuickSetup />
      <NaturalLanguage />
      <Steps />
      <TimeCostSavings />
      <Testimonial />
      <CTA />
      <SiteFooter />
    </div>
  );
}
