import { Link } from "react-router-dom";
import PotholeCard from "./PotholeCard";

const PotholeList = ({ potholes, showActions = false }) => {
  if (potholes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No potholes found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {potholes.map((pothole) => (
        <PotholeCard
          key={pothole._id}
          pothole={pothole}
          showActions={showActions}
        />
      ))}
    </div>
  );
};

export default PotholeList;
