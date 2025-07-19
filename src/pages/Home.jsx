import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <FaMapMarkerAlt className="text-4xl text-blue-900 mb-4 mx-auto" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Report Potholes Here
          </h1>
          <p className="text-gray-700 mb-6">Help make our roads safer</p>
          <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-6 rounded-lg transition-colors">
            Report Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
