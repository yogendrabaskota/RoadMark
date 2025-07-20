import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

const PotholeCard = ({ pothole, showActions }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg capitalize">
              {pothole.severity} Severity
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              {new Date(pothole.createdAt).toLocaleDateString()}
            </p>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              pothole.status === "reported"
                ? "bg-yellow-100 text-yellow-800"
                : pothole.status === "verified"
                ? "bg-blue-100 text-blue-800"
                : pothole.status === "fixed"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {pothole.status}
          </span>
        </div>

        <div className="mt-3 flex items-center text-gray-600">
          <FaMapMarkerAlt className="mr-1" />
          <p className="text-sm truncate">{pothole.address}</p>
        </div>

        {pothole.description && (
          <p className="mt-2 text-gray-700 line-clamp-2">
            {pothole.description}
          </p>
        )}

        <div className="mt-4 flex justify-between items-center">
          <div className="flex space-x-2">
            <span className="text-sm bg-gray-100 px-2 py-1 rounded">
              👍 {pothole.votes?.upvotes || 0}
            </span>
            <span className="text-sm bg-gray-100 px-2 py-1 rounded">
              👎 {pothole.votes?.downvotes || 0}
            </span>
          </div>

          <Link
            to={`/potholes/${pothole._id}`}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            View Details
          </Link>
        </div>

        {showActions && (
          <div className="mt-4 flex space-x-2">
            <Link
              to={`/potholes/${pothole._id}/edit`}
              className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Edit
            </Link>
            <button className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PotholeCard;
