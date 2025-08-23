/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaExclamationTriangle,
  FaRulerCombined,
  FaClock,
  FaThumbsUp,
  FaThumbsDown,
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
        const response = await fetch("http://localhost:5000/api/potholes");
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
        return "bg-red-100 text-red-800 border-l-4 border-red-500";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500";
      case "low":
        return "bg-green-100 text-green-800 border-l-4 border-green-500";
      default:
        return "bg-gray-100 text-gray-800 border-l-4 border-gray-500";
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "high":
        return <FaExclamationTriangle className="text-red-500" />;
      case "medium":
        return <FaExclamationTriangle className="text-yellow-500" />;
      case "low":
        return <FaExclamationTriangle className="text-green-500" />;
      default:
        return <FaExclamationTriangle className="text-gray-500" />;
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
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-100"
              >
                {/* Pothole Image */}
                {pothole.images?.url && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={pothole?.images?.url}
                      alt={`Pothole at ${pothole.address}`}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                )}

                <div className="p-6">
                  {/* Header with severity badge */}
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-blue-900 truncate pr-2">
                      {pothole.address}
                    </h3>
                    <span
                      className={`flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getSeverityColor(
                        pothole.severity
                      )}`}
                    >
                      {getSeverityIcon(pothole.severity)}
                      <span className="ml-1 capitalize">
                        {pothole.severity}
                      </span>
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 mb-5 line-clamp-3 leading-relaxed">
                    {pothole.description}
                  </p>

                  {/* Size and details */}
                  <div className="space-y-3 mb-5">
                    {pothole.size && (
                      <div className="flex items-center text-sm text-blue-700">
                        <FaRulerCombined className="mr-2 text-blue-500" />
                        <span>
                          {pothole.size.width}cm × {pothole.size.depth}cm
                        </span>
                      </div>
                    )}

                    <div className="flex items-center text-sm text-blue-700">
                      <FaClock className="mr-2 text-blue-500" />
                      <span>
                        {new Date(pothole.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Votes and status */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="flex space-x-4">
                      <div className="flex items-center text-green-600">
                        <FaThumbsUp className="mr-1" />
                        <span className="font-medium">
                          {pothole?.votes?.upvotes}
                        </span>
                      </div>
                      <div className="flex items-center text-red-600">
                        <FaThumbsDown className="mr-1" />
                        <span className="font-medium">
                          {pothole?.votes?.downvotes}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        pothole.status === "reported"
                          ? "bg-blue-100 text-blue-800"
                          : pothole?.status === "in-progress"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {pothole?.status}
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
