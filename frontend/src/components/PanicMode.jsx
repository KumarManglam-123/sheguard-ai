import { useEffect, useRef } from "react";
import "./panic.css";

export default function PanicMode({ onClose }) {

  const audioRef = useRef(null);

  const startSiren = () => {
    audioRef.current = new Audio("/sounds/siren.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 1.0;

    audioRef.current.play().catch(err => {
      console.log("Sound blocked:", err);
    });
  };

  const stopSiren = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    onClose();
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="panic-overlay">

      <h1>🚨 PANIC MODE ACTIVE 🚨</h1>

      <button onClick={startSiren} className="panic-start-btn">
        ▶ START SIREN
      </button>

      <button onClick={stopSiren} className="panic-stop-btn">
        ⛔ STOP SIREN
      </button>

    </div>
  );
}
