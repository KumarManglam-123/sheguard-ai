import React, { useState } from "react";
import toast from "react-hot-toast";
import PanicMode from "./PanicMode";
import CrimeHeatMap from "./CrimeHeatMap";
import MapView from "./MapView";
import "./sos.css";

const API = import.meta.env.VITE_API_BASE_URL;

const SOSButton = () => {
  const [panic, setPanic] = useState(false);

  const sendSOS = () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        try {
          const res = await fetch(`${API}/sos/trigger`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ latitude: lat, longitude: lng })
          });

          if (res.ok) {
            toast.success("SOS Sent Successfully");
            setPanic(true);
          } else {
            toast.error("SOS Failed");
          }
        } catch (err) {
          console.error(err);
          toast.error("Server Error");
        }
      },
      () => {
        toast.error("Location permission denied");
      }
    );
  };

  return (
    <>
      <button className="sos-btn" onClick={sendSOS}>
        🚨 SEND SOS
      </button>

      {panic && <PanicMode onClose={() => setPanic(false)} />}

      <h2 style={{ marginTop: "20px", color: "#ff4444" }}>
        🔥 Crime Heat Zones
      </h2>

      <div style={{ marginTop: "20px", background: "#111", padding: "10px", borderRadius: "12px" }}>
        <MapView />
      </div>

      <CrimeHeatMap />
    </>
  );
};

export default SOSButton;
