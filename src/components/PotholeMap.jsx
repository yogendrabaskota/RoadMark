import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const PotholeMap = ({ potholes, onMapClick }) => {
  const defaultPosition = [28.6139, 77.209]; // Default to New Delhi

  return (
    <MapContainer
      center={defaultPosition}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
      onClick={onMapClick}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
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
  );
};

export default PotholeMap;
