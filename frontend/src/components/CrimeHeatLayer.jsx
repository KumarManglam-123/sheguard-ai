import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";
import axios from "axios";

const CrimeHeatLayer = () => {

  const map = useMap();

  useEffect(() => {

    const loadHeatmap = async () => {

      try {

        const res = await axios.get("http://127.0.0.1:8080/crime/zones");

        const points = res.data.map(p => [
          p.lat,
          p.lng,
          p.intensity
        ]);

        const heatLayer = L.heatLayer(points, {
          radius: 25,
          blur: 18,
          maxZoom: 17
        });

        heatLayer.addTo(map);

      } catch (err) {
        console.error("Heatmap error:", err);
      }
    };

    loadHeatmap();

  }, [map]);

  return null;
};

export default CrimeHeatLayer;
