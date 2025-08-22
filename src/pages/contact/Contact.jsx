import React, { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom icon
const customIcon = new L.Icon({
  iconUrl:
    "https://static.vecteezy.com/system/resources/previews/000/573/624/original/map-pointer-gps-icon-vector.jpg",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Example coordinates (replace with your actual office location)
  const mapPosition = [27.7172, 85.324]; // KTM coordinates

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the message to your backend
    console.log("Message sent:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const contactMethods = [
    {
      icon: <FaPhone className="text-2xl text-amber-500" />,
      title: "Call Us",
      details: "+1 (555) 123-ROAD",
      description: "Mon to Fri, 9am to 6pm",
    },
    {
      icon: <FaEnvelope className="text-2xl text-amber-500" />,
      title: "Email Us",
      details: "support@potholereporter.com",
      description: "We'll respond within 24 hours",
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl text-amber-500" />,
      title: "Visit Us",
      details: "123 Road Safety Avenue",
      description: "City, State 12345",
    },
    {
      icon: <FaClock className="text-2xl text-amber-500" />,
      title: "Office Hours",
      details: "Monday - Friday",
      description: "9:00 AM - 5:00 PM",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Get in Touch
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Have questions or need assistance? We're here to help you with all
          your road safety concerns.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center"
            >
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                {method.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {method.title}
              </h3>
              <p className="text-gray-700 font-medium mb-1">{method.details}</p>
              <p className="text-gray-500 text-sm">{method.description}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Contact Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="subject"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="What is this regarding?"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Please describe your inquiry in detail..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center"
                >
                  <FaPaperPlane className="mr-2" />
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Additional Info */}
          <div className="lg:w-1/3">
            <div className="bg-gradient-to-b from-blue-900 to-blue-700 text-white rounded-xl p-8 h-full">
              <h2 className="text-2xl font-bold mb-6">Other Ways to Connect</h2>

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="bg-blue-800 hover:bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  >
                    <FaFacebook className="text-xl" />
                  </a>
                  <a
                    href="#"
                    className="bg-blue-800 hover:bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  >
                    <FaTwitter className="text-xl" />
                  </a>
                  <a
                    href="#"
                    className="bg-blue-800 hover:bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  >
                    <FaLinkedin className="text-xl" />
                  </a>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">
                  Emergency Contact
                </h3>
                <p className="text-blue-200">
                  For urgent road safety issues that require immediate
                  attention, please call your local authorities first.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Partnership Inquiries
                </h3>
                <p className="text-blue-200">
                  Interested in partnering with us? Email{" "}
                  <span className="text-amber-300">
                    partnerships@potholereporter.com
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Common Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                How quickly do you respond to messages?
              </h3>
              <p className="text-gray-600">
                We typically respond to all inquiries within 24 hours during
                business days.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Do you have a mobile app?
              </h3>
              <p className="text-gray-600">
                Yes! Our mobile app is available on both iOS and Android
                platforms.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Can I volunteer for your organization?
              </h3>
              <p className="text-gray-600">
                We welcome volunteers! Please email
                volunteer@potholereporter.com for more information.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                How can my city partner with you?
              </h3>
              <p className="text-gray-600">
                We work with municipalities across the country. Contact our
                partnerships team for details.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Map Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="h-96">
            <MapContainer
              center={mapPosition}
              zoom={13}
              style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
              zoomControl={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={mapPosition} icon={customIcon}>
                <Popup>
                  <div className="text-center">
                    <h3 className="font-semibold text-blue-900">
                      Pothole Reporter HQ
                    </h3>
                    <p className="text-gray-600">123 Road Safety Avenue</p>
                    <p className="text-gray-600">City, State 12345</p>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${mapPosition[0]},${mapPosition[1]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 px-3 py-1 bg-amber-500 text-white rounded-md text-sm hover:bg-amber-600 transition-colors"
                    >
                      Get Directions
                    </a>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>

          <div className="p-6 bg-blue-50">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Visit Our Office
                </h3>
                <p className="text-gray-600">
                  123 Road Safety Avenue, City, State 12345
                </p>
              </div>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${mapPosition[0]},${mapPosition[1]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <FaMapMarkerAlt className="mr-2" />
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
