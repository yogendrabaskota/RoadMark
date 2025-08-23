/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaCamera,
  FaRulerCombined,
  FaExclamationTriangle,
  FaPaperPlane,
  FaArrowLeft,
} from "react-icons/fa";

const Report = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
    address: "",
    description: "",
    severity: "medium",
    width: "",
    depth: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setError(
            "Unable to get your location. Please enter coordinates manually."
          );
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Basic validation
    if (!formData.latitude || !formData.longitude || !formData.address) {
      setError("Please provide latitude, longitude, and address");
      setLoading(false);
      return;
    }

    if (!formData.image) {
      setError("Pothole image is required");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const submitData = new FormData();
      submitData.append("latitude", formData.latitude);
      submitData.append("longitude", formData.longitude);
      submitData.append("address", formData.address);
      submitData.append("description", formData.description);
      submitData.append("severity", formData.severity);

      if (formData.width && formData.depth) {
        submitData.append(
          "size",
          JSON.stringify({
            width: parseInt(formData.width),
            depth: parseInt(formData.depth),
          })
        );
      }

      submitData.append("image", formData.image);

      const response = await fetch("http://localhost:5000/api/potholes/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: submitData,
      });

      const data = await response.json();

      if (data.success) {
        setSuccess("Pothole reported successfully!");
        // Reset form
        setFormData({
          latitude: "",
          longitude: "",
          address: "",
          description: "",
          severity: "medium",
          width: "",
          depth: "",
          image: null,
        });
        setImagePreview(null);

        // Redirect to home after 2 seconds
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setError(data.message || "Failed to report pothole");
      }
    } catch (err) {
      setError("Error connecting to the server");
    } finally {
      setLoading(false);
    }
  };

  const severityOptions = [
    { value: "low", label: "Low", color: "text-green-600" },
    { value: "medium", label: "Medium", color: "text-yellow-600" },
    { value: "high", label: "High", color: "text-red-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors group"
          >
            <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>

          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaMapMarkerAlt className="text-3xl text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-blue-900 mb-2">
              Report a Pothole
            </h1>
            <p className="text-gray-600">
              Help make roads safer by reporting potholes in your area
            </p>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Report Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-blue-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Location Section */}
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-blue-600" />
                Location Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Latitude *
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 28.6139"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Longitude *
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 77.2090"
                    required
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={getCurrentLocation}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors mb-4"
              >
                Use Current Location
              </button>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter the street address"
                  required
                />
              </div>
            </div>

            {/* Description Section */}
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                Description
              </h3>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe the pothole (optional)"
              />
            </div>

            {/* Severity Section */}
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                <FaExclamationTriangle className="mr-2 text-amber-600" />
                Severity Level
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {severityOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex flex-col items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.severity === option.value
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-blue-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="severity"
                      value={option.value}
                      checked={formData.severity === option.value}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <span className={`text-sm font-medium ${option.color}`}>
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Size Section */}
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                <FaRulerCombined className="mr-2 text-amber-600" />
                Size (Optional)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Width (cm)
                  </label>
                  <input
                    type="number"
                    name="width"
                    value={formData.width}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Width in centimeters"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Depth (cm)
                  </label>
                  <input
                    type="number"
                    name="depth"
                    value={formData.depth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Depth in centimeters"
                    min="1"
                  />
                </div>
              </div>
            </div>

            {/* Image Upload Section */}
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                <FaCamera className="mr-2 text-blue-600" />
                Pothole Image *
              </h3>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                  required
                />

                {imagePreview ? (
                  <div className="mb-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-48 mx-auto rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setFormData({ ...formData, image: null });
                      }}
                      className="text-red-600 text-sm mt-2 hover:text-red-800"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <div className="mb-4">
                    <FaCamera className="text-4xl text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 mb-2">
                      Upload a clear photo of the pothole
                    </p>
                  </div>
                )}

                <label
                  htmlFor="image"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors inline-block"
                >
                  {imagePreview ? "Change Image" : "Choose Image"}
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <FaPaperPlane className="mr-2" />
                  Report Pothole
                </>
              )}
            </button>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Fields marked with * are required</p>
          <p className="mt-2">
            Your report will help make roads safer for everyone!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Report;
