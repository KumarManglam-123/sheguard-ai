import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import CrimeHeatLayer from "./CrimeHeatLayer";
import CrimeLegend from "./CrimeLegend";

function CrimeHeatMap() {
  return (
    <div
      style={{
        height: "500px",
        width: "100%",
        position: "relative",
        borderRadius: "18px",
        overflow: "hidden",
        border: "2px solid transparent",
        background:
          "linear-gradient(#020617, #020617) padding-box, linear-gradient(120deg,#ef4444,#facc15,#22c55e) border-box",
      }}
    >
      {/* MAP */}
      <MapContainer
        center={[28.6139, 77.2090]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        whenReady={(map) => {
          map.target.invalidateSize();
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap"
        />

        <CrimeHeatLayer />
      </MapContainer>

      {/* LEGEND OVERLAY */}
      <CrimeLegend />
    </div>
  );
}

export default CrimeHeatMap;
