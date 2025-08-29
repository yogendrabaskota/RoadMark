import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaClock,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock as FaStatusClock,
  FaArrowRight,
} from "react-icons/fa";
import { fetchPotholes } from "../../store/potholeSlice";
import { STATUSES } from "../../globals/misc/statuses";

const AllPotholes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { potholes, status } = useSelector((state) => state.pothole);

  useEffect(() => {
    if (potholes.length === 0) {
      dispatch(fetchPotholes());
    }
  }, [dispatch, potholes.length]);

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

  const getStatusIcon = (status) => {
    if (!status) return <FaStatusClock className="text-gray-500" />;

    switch (status) {
      case "reported":
        return <FaStatusClock className="text-blue-500" />;
      case "in-progress":
        return <FaExclamationTriangle className="text-amber-500" />;
      case "resolved":
        return <FaCheckCircle className="text-green-500" />;
      default:
        return <FaStatusClock className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    if (!status) return "bg-gray-100 text-gray-800";

    switch (status) {
      case "reported":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-amber-100 text-amber-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (status === STATUSES.LOADING && potholes.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg text-blue-700">Loading potholes...</p>
          </div>
        </div>
      </div>
    );
  }

  if (status === STATUSES.ERROR && potholes.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-16 bg-red-50 rounded-xl border border-red-200">
            <FaExclamationTriangle className="text-4xl text-red-500 mx-auto mb-4" />
            <p className="text-red-700 text-lg font-medium">
              Failed to load potholes
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            All Reported Potholes
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse through all the potholes reported by our community members
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {potholes.length}
            </div>
            <div className="text-gray-600">Total Reports</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-amber-600 mb-2">
              {potholes.filter((p) => p.status === "in-progress").length}
            </div>
            <div className="text-gray-600">In Progress</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {potholes.filter((p) => p.status === "resolved").length}
            </div>
            <div className="text-gray-600">Resolved</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {potholes.filter((p) => p.severity === "high").length}
            </div>
            <div className="text-gray-600">High Severity</div>
          </div>
        </div>

        {/* Potholes Grid */}
        {potholes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-md">
            <FaMapMarkerAlt className="text-4xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No potholes reported yet
            </h3>
            <p className="text-gray-600 mb-6">
              Be the first to report a pothole in your area
            </p>
            <button
              onClick={() => navigate("/report")}
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded-lg transition-all"
            >
              Report a Pothole
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {potholes.map((pothole) => (
              <div
                key={pothole._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer"
                onClick={() => navigate(`/pothole/${pothole._id}`)}
              >
                {/* Image */}
                {pothole.images?.url && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={pothole.images.url}
                      alt={`Pothole at ${pothole.address}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                {!pothole.images?.url && (
                  <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                    <FaMapMarkerAlt className="text-3xl" />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getSeverityColor(
                        pothole.severity
                      )}`}
                    >
                      <FaExclamationTriangle className="mr-1 text-xs" />
                      {pothole.severity?.toUpperCase() || "UNKNOWN"}
                    </span>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        pothole.status
                      )}`}
                    >
                      {getStatusIcon(pothole.status)}
                      <span className="ml-1 capitalize">
                        {pothole.status?.replace("-", " ") || "unknown"}
                      </span>
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-blue-900 mb-2 line-clamp-2">
                    {pothole.address || "Unknown Location"}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {pothole.description || "No description available"}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <FaClock className="mr-1 text-xs" />
                      {new Date(pothole.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-blue-600">
                      View Details
                      <FaArrowRight className="ml-1 text-xs" />
                    </div>
                  </div>

                  {/* Votes */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-green-600 font-semibold">
                        👍 {pothole.votes?.upvotes || 0}
                      </span>
                      <span className="text-red-600 font-semibold">
                        👎 {pothole.votes?.downvotes || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back to Home Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-md"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllPotholes;
