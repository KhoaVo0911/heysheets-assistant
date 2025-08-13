// Professional Booking Flow Component
import { useState, useEffect } from "react";

export default function BookingFlow({
  isOpen,
  onClose,
  selectedService,
  onBookingComplete,
}) {
  const [currentStep, setCurrentStep] = useState("service-selection");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    return date.toISOString().split("T")[0];
  });

  const handleServiceSelect = (service) => {
    setCurrentStep("date-selection");
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setCurrentStep("time-selection");
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setCurrentStep("customer-info");
  };

  const handleCustomerInfoSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const bookingData = {
      id: `BK-${Date.now()}`,
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      customer: customerInfo,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("lastBooking", JSON.stringify(bookingData));

    setIsSubmitting(false);
    setBookingConfirmed(true);
    setCurrentStep("confirmation");

    onBookingComplete && onBookingComplete(bookingData);
  };

  const resetFlow = () => {
    setCurrentStep("service-selection");
    setSelectedDate("");
    setSelectedTime("");
    setCustomerInfo({ name: "", email: "", phone: "", notes: "" });
    setBookingConfirmed(false);
  };

  const closeFlow = () => {
    resetFlow();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 md:p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[95vw] md:max-w-2xl max-h-[95vh] md:max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 md:p-6 border-b border-gray-200">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            Book Your Appointment
          </h2>
          <button
            onClick={closeFlow}
            className="text-gray-400 hover:text-gray-600 text-xl md:text-2xl"
          >
            ×
          </button>
        </div>

        <div className="hidden md:block px-6 py-4 bg-gray-50">
          <div className="flex items-center justify-between">
            {["Service", "Date", "Time", "Details", "Confirm"].map(
              (step, index) => {
                const stepNumber = index + 1;
                const isActive =
                  currentStep ===
                  [
                    "service-selection",
                    "date-selection",
                    "time-selection",
                    "customer-info",
                    "confirmation",
                  ][index];
                const isCompleted =
                  [
                    "date-selection",
                    "time-selection",
                    "customer-info",
                    "confirmation",
                  ].indexOf(currentStep) >= index;

                return (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        isCompleted
                          ? "bg-green-500 text-white"
                          : isActive
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      {isCompleted ? "✓" : stepNumber}
                    </div>
                    <span
                      className={`ml-2 text-sm font-medium ${
                        isActive ? "text-blue-600" : "text-gray-500"
                      }`}
                    >
                      {step}
                    </span>
                    {index < 4 && (
                      <div
                        className={`ml-2 w-12 h-1 rounded ${
                          isCompleted ? "bg-green-500" : "bg-gray-300"
                        }`}
                      />
                    )}
                  </div>
                );
              }
            )}
          </div>
        </div>

        <div className="md:hidden px-4 py-3 bg-gray-50 border-b border-gray-200">
          <div className="text-center">
            <span className="text-sm font-medium text-gray-600">
              Step{" "}
              {[
                "service-selection",
                "date-selection",
                "time-selection",
                "customer-info",
                "confirmation",
              ].indexOf(currentStep) + 1}{" "}
              of 5
            </span>
          </div>
        </div>

        <div className="p-4 md:p-6">
          {currentStep === "service-selection" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Choose Your Service
                </h3>
                <p className="text-gray-600 mb-6">
                  Select the service you'd like to book
                </p>
              </div>

              <div className="grid gap-4">
                {[
                  {
                    name: "Personal Fitting Session",
                    duration: "60 minutes",
                    price: "PHP 500",
                    description:
                      "Professional fitting consultation with size recommendations and style advice",
                    features: [
                      "Size measurement",
                      "Style consultation",
                      "Fit adjustments",
                      "Product recommendations",
                    ],
                  },
                  {
                    name: "Custom Design Consultation",
                    duration: "90 minutes",
                    price: "PHP 800",
                    description:
                      "One-on-one design consultation for custom pieces",
                    features: [
                      "Design discussion",
                      "Fabric selection",
                      "Custom measurements",
                      "Design sketches",
                    ],
                  },
                  {
                    name: "Group Fitting Session",
                    duration: "120 minutes",
                    price: "PHP 300 per person",
                    description:
                      "Group fitting session for bridal parties or special events",
                    features: [
                      "Group consultation",
                      "Coordinated styling",
                      "Event planning",
                      "Bulk discounts",
                    ],
                  },
                ].map((service, index) => (
                  <div
                    key={index}
                    onClick={() => handleServiceSelect(service)}
                    className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">
                          {service.name}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {service.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          {service.price}
                        </div>
                        <div className="text-sm text-gray-500">
                          {service.duration}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      {service.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <span className="text-green-500 mr-2">✓</span>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === "date-selection" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Select Date
                </h3>
                <p className="text-gray-600 mb-6">
                  Choose your preferred appointment date
                </p>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {availableDates.map((date) => {
                  const dateObj = new Date(date);
                  const dayName = dateObj.toLocaleDateString("en-US", {
                    weekday: "short",
                  });
                  const dayNumber = dateObj.getDate();
                  const isToday =
                    date === new Date().toISOString().split("T")[0];

                  return (
                    <button
                      key={date}
                      onClick={() => handleDateSelect(date)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        isToday
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                      }`}
                    >
                      <div className="text-xs font-medium text-gray-500">
                        {dayName}
                      </div>
                      <div className="text-lg font-semibold">{dayNumber}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {currentStep === "time-selection" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Select Time
                </h3>
                <p className="text-gray-600 mb-6">
                  Choose your preferred appointment time
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => handleTimeSelect(time)}
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all text-center"
                  >
                    <div className="text-lg font-semibold text-gray-800">
                      {time}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === "customer-info" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Your Information
                </h3>
                <p className="text-gray-600 mb-6">
                  Please provide your details to complete the booking
                </p>
              </div>

              <form onSubmit={handleCustomerInfoSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerInfo.name}
                      onChange={(e) =>
                        setCustomerInfo((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={customerInfo.email}
                      onChange={(e) =>
                        setCustomerInfo((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) =>
                      setCustomerInfo((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Notes
                  </label>
                  <textarea
                    value={customerInfo.notes}
                    onChange={(e) =>
                      setCustomerInfo((prev) => ({
                        ...prev,
                        notes: e.target.value,
                      }))
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Any special requirements or notes..."
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep("time-selection")}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {isSubmitting ? "Processing..." : "Confirm Booking"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {currentStep === "confirmation" && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-4xl text-green-600">✓</span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Booking Confirmed!
                </h3>
                <p className="text-gray-600">
                  Your appointment has been successfully scheduled
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 text-left">
                <h4 className="font-semibold text-gray-800 mb-3">
                  Booking Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium">
                      Personal Fitting Session
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">
                      {new Date(selectedDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booking ID:</span>
                    <span className="font-medium">BK-{Date.now()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  📧 A confirmation email has been sent to{" "}
                  <strong>{customerInfo.email}</strong>
                </p>
                <p className="text-sm text-blue-800 mt-1">
                  📱 We'll also send you a reminder 24 hours before your
                  appointment
                </p>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={resetFlow}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Book Another
                </button>
                <button
                  onClick={closeFlow}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
