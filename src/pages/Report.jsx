/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { fetchPotholes, createPothole } from "../services/api";
import { toast } from "react-hot-toast";

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const LocationMarker = ({ position, setPosition }) => {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Pothole location</Popup>
    </Marker>
  );
};

const LocateUserButton = ({ onLocationFound }) => {
  const map = useMap();

  const handleLocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map.flyTo(userLocation, 15);
          onLocationFound(userLocation);
        },
        (error) => {
          toast.error(`Error getting location: ${error.message}`);
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
    }
  };

  return (
    <button
      onClick={handleLocate}
      className="absolute z-[1000] top-4 right-4 bg-white p-2 rounded shadow-md"
      title="Use my location"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6 text-blue-600"
      >
        <path
          fillRule="evenodd"
          d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

const PotholeMap = ({ potholes, position, setPosition }) => {
  const defaultPosition = [27.700769, 85.30014]; // Center of India

  return (
    <div className="relative">
      <MapContainer
        center={defaultPosition}
        zoom={5}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker position={position} setPosition={setPosition} />
        <LocateUserButton onLocationFound={setPosition} />
        {potholes.map((pothole) => (
          <Marker
            key={pothole._id}
            position={[
              pothole.location.coordinates[1],
              pothole.location.coordinates[0],
            ]}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold capitalize">
                  {pothole.severity} severity
                </h3>
                <p className="text-sm">{pothole.address}</p>
                <p className="text-sm capitalize">Status: {pothole.status}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

const PotholeForm = ({ position, onSubmit }) => {
  const [formData, setFormData] = useState({
    latitude: position.lat,
    longitude: position.lng,
    address: "",
    description: "",
    severity: "medium",
    size: {
      width: "",
      depth: "",
    },
    useCurrentLocation: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    if (name.includes("size.")) {
      const sizeField = name.split(".")[1];
      setFormData({
        ...formData,
        size: {
          ...formData.size,
          [sizeField]: val,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: val,
      });
    }
  };

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setFormData({
            ...formData,
            latitude: userLocation.lat,
            longitude: userLocation.lng,
            useCurrentLocation: true,
          });
        },
        (error) => {
          toast.error(`Error getting location: ${error.message}`);
          setFormData({
            ...formData,
            useCurrentLocation: false,
          });
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          name="useCurrentLocation"
          checked={formData.useCurrentLocation}
          onChange={(e) => {
            handleChange(e);
            if (e.target.checked) {
              handleUseMyLocation();
            }
          }}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label
          htmlFor="useCurrentLocation"
          className="ml-2 block text-sm text-gray-700"
        >
          Use my current location
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Severity
        </label>
        <select
          name="severity"
          value={formData.severity}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Width (cm)
          </label>
          <input
            type="number"
            name="size.width"
            value={formData?.size?.width}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Depth (cm)
          </label>
          <input
            type="number"
            name="size.depth"
            value={formData.size.depth}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm"
      >
        Submit Report
      </button>
    </form>
  );
};

const Report = () => {
  const [potholes, setPotholes] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPotholes = async () => {
      try {
        const { data } = await fetchPotholes();
        setPotholes(data);
      } catch (error) {
        toast.error("Failed to load potholes");
      }
    };
    loadPotholes();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      await createPothole({
        latitude: formData.latitude,
        longitude: formData.longitude,
        address: formData.address,
        description: formData.description,
        severity: formData.severity,
        size: formData.size,
      });
      toast.success("Pothole reported successfully!");
      setSelectedPosition(null);
      const { data } = await fetchPotholes();
      setPotholes(data);
    } catch (error) {
      toast.error("Failed to report pothole");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Report a Pothole
        </h1>

        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <PotholeMap
            potholes={potholes}
            position={selectedPosition}
            setPosition={setSelectedPosition}
          />
        </div>

        {selectedPosition && (
          <div className="bg-white rounded-lg shadow-md p-4">
            <PotholeForm position={selectedPosition} onSubmit={handleSubmit} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Report;
