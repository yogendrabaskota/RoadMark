/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaExclamationTriangle,
  FaRulerCombined,
  FaClock,
  FaThumbsUp,
  FaThumbsDown,
  FaEye,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [potholes, setPotholes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPotholes = async () => {
      try {
        const response = await fetch(
          "https://fixmyroadb.onrender.com/api/potholes"
        );
        const data = await response.json();

        if (data.success) {
          setPotholes(data.data);
        } else {
          setError("Failed to fetch pothole data");
        }
      } catch (err) {
        setError("Error connecting to the server");
      } finally {
        setLoading(false);
      }
    };

    fetchPotholes();
  }, []);

  const handlePotholeClick = (id) => {
    navigate(`/pothole/${id}`);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "bg-red-500 text-white";
      case "medium":
        return "bg-amber-500 text-white";
      case "low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getSeverityGradient = (severity) => {
    switch (severity) {
      case "high":
        return "from-red-500 to-red-600";
      case "medium":
        return "from-amber-500 to-amber-600";
      case "low":
        return "from-green-500 to-green-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "reported":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-amber-100 text-amber-800";
      case "fixed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="py-16 px-4 bg-gradient-to-b from-blue-50 to-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">
            Recent Pothole Reports
          </h2>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg text-blue-700">Loading pothole data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 px-4 bg-gradient-to-b from-blue-50 to-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">
            Recent Pothole Reports
          </h2>
          <div className="text-center py-12 bg-red-50 rounded-xl border border-red-200 max-w-2xl mx-auto">
            <FaExclamationTriangle className="text-4xl text-red-500 mx-auto mb-4" />
            <p className="text-red-700 text-lg font-medium">{error}</p>
            <p className="text-red-600 mt-2">
              Please check your connection and try again.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 bg-gradient-to-b from-blue-50 to-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-blue-900">
          Recent Pothole Reports
        </h2>
        <p className="text-lg text-blue-700 text-center mb-12 max-w-2xl mx-auto">
          Help make roads safer by staying informed about reported hazards in
          your area
        </p>

        {potholes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg border border-blue-100 max-w-2xl mx-auto">
            <FaMapMarkerAlt className="text-5xl text-blue-400 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-blue-900 mb-4">
              No potholes reported yet
            </h3>
            <p className="text-blue-700 mb-6">
              Be the first to report a pothole and help make your community
              safer!
            </p>
            <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105">
              Report a Pothole
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {potholes.map((pothole) => (
              <div
                key={pothole._id}
                onClick={() => handlePotholeClick(pothole._id)}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100 cursor-pointer group"
              >
                {/* Pothole Image with Gradient Overlay */}
                {pothole.images?.url && (
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={pothole.images.url}
                      alt={`Pothole at ${pothole.address}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div
                      className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${getSeverityColor(
                        pothole.severity
                      )}`}
                    >
                      <span className="capitalize">{pothole.severity}</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white font-medium flex items-center">
                        <FaEye className="mr-2" /> View Details
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-6">
                  {/* Address with icon */}
                  <div className="flex items-start mb-4">
                    <FaMapMarkerAlt className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                    <h3 className="text-xl font-bold text-blue-900 line-clamp-2 leading-tight">
                      {pothole.address}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 mb-5 line-clamp-3 leading-relaxed">
                    {pothole.description}
                  </p>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    {pothole.size && (
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="flex items-center text-blue-700 mb-1">
                          <FaRulerCombined className="mr-2 text-blue-500" />
                          <span className="text-sm font-medium">Size</span>
                        </div>
                        <p className="text-blue-900 font-semibold">
                          {pothole.size.width}×{pothole.size.depth}cm
                        </p>
                      </div>
                    )}

                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="flex items-center text-blue-700 mb-1">
                        <FaClock className="mr-2 text-blue-500" />
                        <span className="text-sm font-medium">Reported</span>
                      </div>
                      <p className="text-blue-900 font-semibold text-sm">
                        {new Date(pothole.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Footer with votes and status */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="flex space-x-4">
                      <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full">
                        <FaThumbsUp className="mr-1" />
                        <span className="font-medium text-sm">
                          {pothole?.votes?.upvotes || 0}
                        </span>
                      </div>
                      <div className="flex items-center text-red-600 bg-red-50 px-3 py-1 rounded-full">
                        <FaThumbsDown className="mr-1" />
                        <span className="font-medium text-sm">
                          {pothole?.votes?.downvotes || 0}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        pothole.status
                      )}`}
                    >
                      {pothole.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
