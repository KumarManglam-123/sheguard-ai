import { useState } from "react";
import axios from "axios";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

export default function Chatbot() {

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {

    const finalText = input || transcript;

    if (!finalText.trim()) {
      alert("Type or speak something");
      return;
    }

    setLoading(true);

    try {

      const res = await axios.post(
        "http://127.0.0.1:8080/chat/ask",
        { message: finalText }
      );

      console.log("Chat API:", res.data);

      setReply(res.data.reply);

    } catch (err) {

      console.error("Chat Error:", err);
      setReply("❌ Chat service error");

    }

    setInput("");
    resetTranscript();
    setLoading(false);
  };

  return (

    <div style={{
      background: "#020617",
      padding: "15px",
      borderRadius: "12px",
      color: "white",
      width: "350px"
    }}>

      <h3>🤖 SheGuard Assistant</h3>

      {reply && (
        <div style={{
          background: "#0f172a",
          padding: "10px",
          borderRadius: "8px",
          marginBottom: "10px"
        }}>
          {reply}
        </div>
      )}

      <input
        value={input || transcript}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask safety question..."
        style={{ width: "100%", padding: "8px" }}
      />

      <br /><br />

      <button onClick={sendMessage}>
        {loading ? "Sending..." : "Send"}
      </button>

      <button
        style={{ marginLeft: "10px" }}
        onClick={() => SpeechRecognition.startListening({ continuous: false })}
      >
        🎤 {listening ? "Listening..." : "Speak"}
      </button>

    </div>
  );
}
