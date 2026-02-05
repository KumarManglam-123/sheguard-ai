import SOSButton from "../components/SOSButton";
import AddContact from "../components/AddContact";
import Chatbot from "../components/Chatbot";
import CrimeHeatMap from "../components/CrimeHeatMap";



const Dashboard = () => {
  return (
    <div className="dashboard">
      <AddContact />
      <SOSButton />
      <Chatbot />
      <CrimeHeatMap />


    </div>
  );
};

export default Dashboard;
