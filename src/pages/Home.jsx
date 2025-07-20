import React from "react";
import { FaMapMarkerAlt, FaRoad, FaCarCrash, FaThumbsUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Navbar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleReportClick = () => {
    if (isAuthenticated) {
      navigate("/report");
    } else {
      navigate("/login");
    }
  };

  const features = [
    {
      icon: <FaRoad className="text-3xl text-blue-600" />,
      title: "Easy Reporting",
      description: "Quickly report potholes with just a few taps",
    },
    {
      icon: <FaCarCrash className="text-3xl text-amber-600" />,
      title: "Prevent Accidents",
      description: "Help prevent vehicle damage and accidents",
    },
    {
      icon: <FaThumbsUp className="text-3xl text-green-600" />,
      title: "Community Impact",
      description: "Join others in making roads safer for everyone",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="py-20 px-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <FaMapMarkerAlt className="text-5xl mb-6 mx-auto animate-bounce" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Report Potholes in Your Area
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Help your community by reporting road hazards quickly and easily
            </p>
            <button
              onClick={handleReportClick}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              {isAuthenticated ? "Report a Pothole" : "Get Started"}
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 px-4 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Report Potholes?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="py-16 px-4 bg-blue-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Ready to Make a Difference?
            </h2>
            <button
              onClick={handleReportClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              {isAuthenticated ? "Report Now" : "Join Our Community"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
