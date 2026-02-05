import React, { useState } from "react";
import toast from "react-hot-toast";
import PanicMode from "./PanicMode";
import CrimeHeatMap from "./CrimeHeatMap";
import MapView from "./MapView";

import "./sos.css";

const SOSButton = () => {

  const [panic, setPanic] = useState(false);

  const sendSOS = () => {

    navigator.geolocation.getCurrentPosition(

      async (pos) => {

        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        try {

          const res = await fetch("http://127.0.0.1:8080/sos/trigger", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              latitude: lat,
              longitude: lng
            })
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

    <React.Fragment>

      {/* SOS BUTTON */}
      <button className="sos-btn" onClick={sendSOS}>
        🚨 SEND SOS
      </button>

      {/* PANIC MODE */}
      {panic && <PanicMode onClose={() => setPanic(false)} />}

      {/* CRIME HEAT MAP */}
      <h2 style={{ marginTop: "20px", color: "#ff4444" }}>
        🔥 Crime Heat Zones
      </h2>

      <div style={{ marginTop: "20px", background: "#111", padding: "10px", borderRadius: "12px" }}>
        <MapView />
      </div>

      <CrimeHeatMap />

    </React.Fragment>

  );
};

export default SOSButton;
