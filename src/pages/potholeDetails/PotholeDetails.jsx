/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaMapMarkerAlt,
  FaRulerCombined,
  FaClock,
  FaArrowLeft,
  FaThumbsUp,
  FaThumbsDown,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock as FaStatusClock,
  FaUser,
  FaExpand,
  FaImage,
  FaComment,
  FaPaperPlane,
  FaUserCircle,
} from "react-icons/fa";
import {
  fetchAllComment,
  fetchSinglePothole,
  setStatus,
  voteOnPothole,
} from "../../store/potholeSlice";
import { STATUSES } from "../../globals/misc/statuses";

const PotholeDetails = () => {
  const { id } = useParams();
  // console.log("idd", id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get data from Redux store
  const { singlePothole, allComments, status, votingStatus } = useSelector(
    (state) => state.pothole
  );

  const [userVote, setUserVote] = useState(null);
  const [expandedImage, setExpandedImage] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

  // Check if user is authenticated
  const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
  };

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;

    const existingPothole = singlePothole && singlePothole._id === id;

    if (!existingPothole) {
      dispatch(fetchSinglePothole(id));
    } else {
      dispatch(setStatus(STATUSES.SUCCESS));
    }

    if (allComments.length === 0) {
      dispatch(fetchAllComment(id));
    }

    hasFetched.current = true;
  }, [dispatch, id, singlePothole, allComments]);
  const handleVote = async (voteType) => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    try {
      await dispatch(voteOnPothole({ potholeId: id, voteType }));

      // Update userVote state based on the vote type
      if (userVote === voteType) {
        setUserVote(null); // User is undoing their vote
      } else {
        setUserVote(voteType); // User is casting a new vote
      }
    } catch (error) {
      console.error("Voting failed:", error.message);
      // You can show an error message to the user here
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    if (!commentText.trim()) return;

    setCommentLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://fixmyroadb.onrender.com/api/potholes/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text: commentText }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setCommentText("");
        // Refresh comments
        dispatch(fetchAllComment(id));
      } else {
        console.error(data.message || "Failed to post comment");
      }
    } catch (err) {
      console.error("Error posting comment");
    } finally {
      setCommentLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-500";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-500";
      case "low":
        return "bg-green-100 text-green-800 border-green-500";
      default:
        return "bg-gray-100 text-gray-800 border-gray-500";
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
    if (!status) return "bg-gray-100 text-gray-800 border-gray-500";

    switch (status) {
      case "reported":
        return "bg-blue-100 text-blue-800 border-blue-500";
      case "in-progress":
        return "bg-amber-100 text-amber-800 border-amber-500";
      case "resolved":
        return "bg-green-100 text-green-800 border-green-500";
      default:
        return "bg-gray-100 text-gray-800 border-gray-500";
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  if (status === STATUSES.LOADING) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg text-blue-700">Loading pothole details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (status === STATUSES.ERROR || !singlePothole) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Reports
          </button>
          <div className="text-center py-16 bg-red-50 rounded-xl border border-red-200">
            <FaExclamationTriangle className="text-4xl text-red-500 mx-auto mb-4" />
            <p className="text-red-700 text-lg font-medium">
              Failed to load pothole details
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 py-8 px-4">
      {/* Image Modal */}
      {expandedImage && singlePothole?.images?.url && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setExpandedImage(false)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={singlePothole.images.url}
              alt={`Pothole at ${singlePothole.address}`}
              className="max-w-full max-h-full object-contain"
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
            <button
              className="absolute top-4 right-4 bg-white bg-opacity-20 text-white p-2 rounded-full hover:bg-opacity-30 transition-all"
              onClick={() => setExpandedImage(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors group"
        >
          <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Reports
        </button>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100">
          {/* Pothole Image with Expand Option */}
          {singlePothole?.images?.url && (
            <div className="relative h-64 md:h-96 overflow-hidden group bg-gray-100">
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              )}

              {imageError ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-200 text-gray-500">
                  <FaImage className="text-4xl mb-2" />
                  <p>Failed to load image</p>
                </div>
              ) : (
                <img
                  src={singlePothole.images.url}
                  alt={`Pothole at ${singlePothole.address}`}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              )}

              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-end justify-end p-4">
                <button
                  onClick={() => setExpandedImage(true)}
                  className="bg-white bg-opacity-80 text-blue-900 p-2 rounded-full hover:bg-opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                  title="Expand image"
                >
                  <FaExpand className="text-lg" />
                </button>
              </div>
            </div>
          )}

          {!singlePothole?.images?.url && (
            <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-400">
              <FaImage className="text-4xl mr-3" />
              <span>No image available</span>
            </div>
          )}

          <div className="p-6 md:p-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2">
                  {singlePothole.address || "Unknown Address"}
                </h1>
                <p className="text-gray-700 text-lg mb-4">
                  {singlePothole.description || "No description available"}
                </p>

                {/* Image Info */}
                {singlePothole.images?.url && (
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      📷 Photo available
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <span
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border-l-4 ${getSeverityColor(
                    singlePothole.severity
                  )}`}
                >
                  <FaExclamationTriangle className="mr-2" />
                  {singlePothole.severity
                    ? singlePothole.severity.toUpperCase()
                    : "UNKNOWN"}
                </span>
                <span
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border-l-4 ${getStatusColor(
                    singlePothole.status
                  )}`}
                >
                  {getStatusIcon(singlePothole.status)}
                  <span className="ml-2 capitalize">
                    {singlePothole.status
                      ? singlePothole.status.replace("-", " ")
                      : "unknown"}
                  </span>
                </span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-blue-700 mb-3 uppercase tracking-wide">
                  Location Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-blue-800">
                    <FaMapMarkerAlt className="mr-3 text-blue-600 text-lg" />
                    <span className="font-medium">
                      {singlePothole.address || "Address not available"}
                    </span>
                  </div>
                  {singlePothole.location?.coordinates && (
                    <div className="text-sm text-blue-700 bg-blue-100 p-2 rounded">
                      <strong>Coordinates:</strong>
                      <br />
                      Latitude: {singlePothole.location.coordinates[1]}
                      <br />
                      Longitude: {singlePothole.location.coordinates[0]}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-amber-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-amber-700 mb-3 uppercase tracking-wide">
                  Pothole Specifications
                </h3>
                <div className="space-y-3">
                  {singlePothole.size && (
                    <div className="flex items-center text-amber-800">
                      <FaRulerCombined className="mr-3 text-amber-600 text-lg" />
                      <span>
                        <strong>Size:</strong> {singlePothole.size.width}cm ×{" "}
                        {singlePothole.size.depth}cm
                      </span>
                    </div>
                  )}
                  <div className="flex items-center text-amber-800">
                    <FaClock className="mr-3 text-amber-600 text-lg" />
                    <span>
                      <strong>Reported:</strong>{" "}
                      {new Date(singlePothole.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </span>
                  </div>
                  <div className="flex items-center text-amber-800">
                    <FaUser className="mr-3 text-amber-600 text-lg" />
                    <span>
                      <strong>Reported by:</strong> User #
                      {singlePothole.createdBy?._id?.slice(-6) || "Anonymous"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Voting Section */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Community Feedback
              </h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleVote("upvote")}
                  disabled={votingStatus === STATUSES.LOADING}
                  className={`flex items-center px-6 py-3 rounded-lg transition-all ${
                    userVote === "upvote"
                      ? "bg-green-100 text-green-800 border-2 border-green-500 shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700 hover:shadow-md"
                  } ${
                    votingStatus === STATUSES.LOADING
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <FaThumbsUp className="mr-2 text-lg" />
                  <span className="font-semibold text-lg">
                    {singlePothole.votes?.upvotes || 0}
                  </span>
                  <span className="ml-1 text-sm">Upvotes</span>
                </button>

                <button
                  onClick={() => handleVote("downvote")}
                  disabled={votingStatus === STATUSES.LOADING}
                  className={`flex items-center px-6 py-3 rounded-lg transition-all ${
                    userVote === "downvote"
                      ? "bg-red-100 text-red-800 border-2 border-red-500 shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-700 hover:shadow-md"
                  } ${
                    votingStatus === STATUSES.LOADING
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <FaThumbsDown className="mr-2 text-lg" />
                  <span className="font-semibold text-lg">
                    {singlePothole.votes?.downvotes || 0}
                  </span>
                  <span className="ml-1 text-sm">Downvotes</span>
                </button>

                {!isAuthenticated() && (
                  <p className="text-sm text-gray-600">
                    <Link
                      to="/login"
                      className="text-blue-600 hover:text-blue-800 underline font-medium"
                    >
                      Login
                    </Link>{" "}
                    to vote on this pothole
                  </p>
                )}
              </div>
            </div>

            {/* Additional Information */}
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Report Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p>
                    <strong>Report ID:</strong> {singlePothole._id}
                  </p>
                  <p>
                    <strong>Created:</strong>{" "}
                    {new Date(singlePothole.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Last updated:</strong>{" "}
                    {new Date(singlePothole.updatedAt).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="capitalize">
                      {singlePothole.status || "unknown"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-xl shadow-lg border border-blue-100 mt-8">
          <div className="p-6 md:p-8">
            <div className="flex items-center mb-6">
              <FaComment className="text-blue-600 text-xl mr-3" />
              <h2 className="text-2xl font-bold text-blue-900">Comments</h2>
              <span className="ml-3 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                {allComments.length}
              </span>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <div className="flex gap-3">
                <div className="flex-1">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add your comment..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    rows="3"
                    disabled={commentLoading}
                  />
                </div>
                <button
                  type="submit"
                  disabled={commentLoading || !commentText.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed self-end"
                >
                  {commentLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <FaPaperPlane className="text-lg" />
                  )}
                </button>
              </div>
              {!isAuthenticated() && (
                <p className="text-sm text-gray-600 mt-2">
                  <Link
                    to="/login"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Login
                  </Link>{" "}
                  to post a comment
                </p>
              )}
            </form>

            {/* Comments List */}
            {status === STATUSES.LOADING ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-600 mt-2">Loading comments...</p>
              </div>
            ) : allComments.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <FaComment className="text-3xl text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">
                  No comments yet. Be the first to comment!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {allComments.map((comment) => (
                  <div key={comment._id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <FaUserCircle className="text-blue-600 text-xl" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-blue-900">
                            Commented by{" "}
                            <strong>
                              {comment.user?.userName || "Anonymous"}
                            </strong>
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-800">{comment.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <button
            onClick={() => navigate("/report")}
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-md"
          >
            Report Another Pothole
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-md"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PotholeDetails;
