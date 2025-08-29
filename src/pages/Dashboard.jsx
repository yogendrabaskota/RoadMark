/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
// import { fetchPotholes } from "../services/api";

import { toast } from "react-hot-toast";
import Potholes from "./potholePage/Potholes";

const Dashboard = () => {
  const [potholes, setPotholes] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = localStorage.getItem("user");

  useEffect(() => {
    const loadUserPotholes = async () => {
      try {
        // const { data } = await fetchPotholes({ userId: user._id });
        // setPotholes(data);
      } catch (error) {
        toast.error("Failed to load your pothole reports");
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      loadUserPotholes();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Your Pothole Reports
        </h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <Potholes potholes={potholes} showActions={true} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
