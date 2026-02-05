import CrimeHeatMap from "./components/CrimeHeatMap";
import SOSButton from "./components/SOSButton";
import AddContact from "./components/AddContact";
import Chatbot from "./components/Chatbot";


function App() {
  return (
    <div className="app-container">
  <h1 className="main-title">SheGuard AI Dashboard</h1>

  <div className="glow-bg">


    <div className="gradient-border">
  <div className="gradient-inner">
    <CrimeHeatMap />
    <SOSButton />
  </div>
</div>

<div className="gradient-border">
  <div className="gradient-inner">
    <AddContact />
  </div>
</div>

<div className="gradient-border">
  <div className="gradient-inner">
    <Chatbot />
  </div>
</div>



  </div>
</div>

  );
}

export default App;
