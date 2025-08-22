/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaExclamationTriangle,
  FaRulerCombined,
} from "react-icons/fa";

const Hero = () => {
  const [potholes, setPotholes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Recent Pothole Reports
          </h2>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading pothole data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Recent Pothole Reports
          </h2>
          <div className="text-center py-8 text-red-600 bg-red-50 rounded-lg">
            <FaExclamationTriangle className="text-3xl mx-auto mb-4" />
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Recent Pothole Reports
        </h2>

        {potholes.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg shadow">
            <FaMapMarkerAlt className="text-4xl text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              No potholes reported yet. Be the first to report one!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {potholes.map((pothole) => (
              <div
                key={pothole._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 truncate">
                      {pothole.address}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(
                        pothole.severity
                      )}`}
                    >
                      {pothole.severity}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4">{pothole.description}</p>

                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <FaRulerCombined className="mr-2" />
                    <span>
                      Size: {pothole.size.width}cm × {pothole.size.depth}cm
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                    <span>
                      Reported:{" "}
                      {new Date(pothole.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-2">
                      <span className="text-green-600">
                        ↑ {pothole.votes.upvotes}
                      </span>
                      <span className="text-red-600">
                        ↓ {pothole.votes.downvotes}
                      </span>
                    </div>
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
