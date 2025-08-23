/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaExclamationTriangle,
  FaRulerCombined,
  FaClock,
  FaThumbsUp,
  FaThumbsDown,
  FaFilter,
  FaSearch,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Potholes = () => {
  const [potholes, setPotholes] = useState([]);
  const [filteredPotholes, setFilteredPotholes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPotholes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/potholes");
        const data = await response.json();

        if (data.success) {
          setPotholes(data.data);
          setFilteredPotholes(data.data);
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

  useEffect(() => {
    let results = potholes;

    // Apply severity filter
    if (severityFilter !== "all") {
      results = results.filter(
        (pothole) => pothole.severity === severityFilter
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      results = results.filter((pothole) => pothole.status === statusFilter);
    }

    // Apply search filter
    if (searchTerm) {
      results = results.filter(
        (pothole) =>
          pothole.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pothole.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPotholes(results);
  }, [potholes, severityFilter, statusFilter, searchTerm]);

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

  const handleReportClick = () => {
    navigate("/report");
  };

  if (loading) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 pt-24">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-lg text-blue-700">Loading pothole data...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 pt-24">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center py-20 bg-red-50 rounded-xl border border-red-200 max-w-2xl mx-auto">
              <FaExclamationTriangle className="text-4xl text-red-500 mx-auto mb-4" />
              <p className="text-red-700 text-lg font-medium">{error}</p>
              <p className="text-red-600 mt-2">
                Please check your connection and try again.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 pt-24">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">
              Reported Potholes
            </h1>
            <p className="text-lg text-blue-700 max-w-2xl mx-auto">
              Browse all reported potholes in your area. Help make roads safer
              by staying informed about road hazards.
            </p>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by address or description..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center">
                  <FaFilter className="text-blue-600 mr-2" />
                  <select
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={severityFilter}
                    onChange={(e) => setSeverityFilter(e.target.value)}
                  >
                    <option value="all">All Severities</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <select
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="reported">Reported</option>
                  <option value="in-progress">In Progress</option>
                  <option value="fixed">Fixed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-blue-700">
              Showing {filteredPotholes.length} of {potholes.length} potholes
            </p>
          </div>

          {/* Potholes Grid */}
          {filteredPotholes.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-lg border border-blue-100">
              <FaMapMarkerAlt className="text-5xl text-blue-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-blue-900 mb-4">
                No potholes found
              </h3>
              <p className="text-blue-700 mb-6">
                {potholes.length === 0
                  ? "No potholes have been reported yet. Be the first to report one!"
                  : "Try adjusting your filters to see more results."}
              </p>
              <button
                onClick={handleReportClick}
                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
              >
                Report a Pothole
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
              {filteredPotholes.map((pothole) => (
                <div
                  key={pothole._id}
                  onClick={() => handlePotholeClick(pothole._id)}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-100 cursor-pointer"
                >
                  {/* Pothole Image */}
                  {pothole.images?.url && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={pothole.images.url}
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
                            {pothole?.votes?.upvotes || 0}
                          </span>
                        </div>
                        <div className="flex items-center text-red-600">
                          <FaThumbsDown className="mr-1" />
                          <span className="font-medium">
                            {pothole?.votes?.downvotes || 0}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          pothole.status === "reported"
                            ? "bg-blue-100 text-blue-800"
                            : pothole.status === "in-progress"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-green-100 text-green-800"
                        }`}
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
    </>
  );
};

export default Potholes;
