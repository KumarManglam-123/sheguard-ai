import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import CrimeHeatMap from "./CrimeHeatMap";

const MapView = () => {
  return (
    <MapContainer
      center={[28.6139, 77.2090]}
      zoom={12}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Heat Layer MUST be inside MapContainer */}
      <CrimeHeatMap />
    </MapContainer>
  );
};

export default MapView;
