import React, { useState } from "react";
import { FaStar, FaSmile, FaFrown, FaMeh, FaPaperPlane } from "react-icons/fa";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedbackType, setFeedbackType] = useState("general");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    experience: "good",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the feedback to your backend
    console.log("Feedback submitted:", { rating, ...formData });
    alert("Thank you for your feedback!");
    // Reset form
    setRating(0);
    setFormData({
      name: "",
      email: "",
      message: "",
      experience: "good",
    });
  };

  const feedbackTypes = [
    { id: "general", label: "General Feedback", icon: "💬" },
    { id: "bug", label: "Bug Report", icon: "🐛" },
    { id: "suggestion", label: "Feature Suggestion", icon: "💡" },
    { id: "complaint", label: "Complaint", icon: "⚠️" },
  ];

  const experienceOptions = [
    {
      value: "excellent",
      label: "Excellent",
      icon: <FaSmile className="text-green-500 text-xl" />,
    },
    {
      value: "good",
      label: "Good",
      icon: <FaSmile className="text-blue-500 text-xl" />,
    },
    {
      value: "average",
      label: "Average",
      icon: <FaMeh className="text-yellow-500 text-xl" />,
    },
    {
      value: "poor",
      label: "Poor",
      icon: <FaFrown className="text-red-500 text-xl" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Share Your Feedback
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We value your opinion! Help us improve Pothole Reporter by sharing
          your experience.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Left Panel - Info */}
            <div className="md:w-2/5 bg-gradient-to-b from-blue-900 to-blue-700 text-white p-8">
              <h2 className="text-2xl font-bold mb-6">
                Why Your Feedback Matters
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-blue-100 bg-opacity-20 rounded-full p-2 mr-3">
                    <span className="text-amber-400">✨</span>
                  </div>
                  <p>Helps us improve the user experience</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 bg-opacity-20 rounded-full p-2 mr-3">
                    <span className="text-amber-400">🛣️</span>
                  </div>
                  <p>Guides our feature development roadmap</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 bg-opacity-20 rounded-full p-2 mr-3">
                    <span className="text-amber-400">🤝</span>
                  </div>
                  <p>Creates a better service for the community</p>
                </li>
              </ul>

              <div className="mt-10 bg-blue-800 bg-opacity-30 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Other Ways to Reach Us</h3>
                <p className="text-sm text-blue-200">
                  Email: feedback@potholereporter.com
                </p>
                <p className="text-sm text-blue-200">Phone: (800) 555-ROAD</p>
              </div>
            </div>

            {/* Right Panel - Form */}
            <div className="md:w-3/5 p-8">
              <form onSubmit={handleSubmit}>
                {/* Rating */}
                <div className="mb-8">
                  <label className="block text-gray-700 font-medium mb-4">
                    How would you rate your experience?
                  </label>
                  <div className="flex justify-center space-x-1">
                    {[...Array(5)].map((star, index) => {
                      const ratingValue = index + 1;
                      return (
                        <label key={index} className="cursor-pointer">
                          <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}
                            className="hidden"
                          />
                          <FaStar
                            className="text-3xl"
                            color={
                              ratingValue <= (hover || rating)
                                ? "#ffc107"
                                : "#e4e5e9"
                            }
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(0)}
                          />
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Feedback Type */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-3">
                    Type of Feedback
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {feedbackTypes.map((type) => (
                      <div
                        key={type.id}
                        className={`border rounded-lg p-3 text-center cursor-pointer transition-all ${
                          feedbackType === type.id
                            ? "border-amber-500 bg-amber-50"
                            : "border-gray-300 hover:border-blue-400"
                        }`}
                        onClick={() => setFeedbackType(type.id)}
                      >
                        <div className="text-2xl mb-1">{type.icon}</div>
                        <span className="text-sm">{type.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Overall Experience */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-3">
                    How was your overall experience?
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {experienceOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`flex flex-col items-center p-3 border rounded-lg cursor-pointer transition-all ${
                          formData.experience === option.value
                            ? "border-amber-500 bg-amber-50"
                            : "border-gray-300 hover:border-blue-400"
                        }`}
                      >
                        <input
                          type="radio"
                          name="experience"
                          value={option.value}
                          checked={formData.experience === option.value}
                          onChange={handleInputChange}
                          className="hidden"
                        />
                        {option.icon}
                        <span className="text-sm mt-1">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Your Name (Optional)
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Your Email (Optional)
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Your Feedback
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Please share your thoughts, suggestions, or issues..."
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center"
                >
                  <FaPaperPlane className="mr-2" />
                  Submit Feedback
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                How long does it take to get a response?
              </h3>
              <p className="text-gray-600">
                We typically respond to all feedback within 2-3 business days.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Can I report a pothole through this form?
              </h3>
              <p className="text-gray-600">
                For faster processing, please use our{" "}
                <a href="/report" className="text-amber-600 hover:underline">
                  Report
                </a>{" "}
                page to submit pothole reports.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Will my feedback be anonymous?
              </h3>
              <p className="text-gray-600">
                You can choose to provide contact information or submit
                anonymously.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                How is my feedback used?
              </h3>
              <p className="text-gray-600">
                We analyze all feedback to identify common issues and prioritize
                improvements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
