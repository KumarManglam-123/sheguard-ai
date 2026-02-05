import "./crimeLegend.css";

export default function CrimeLegend() {
  return (
    <div className="crime-legend">

      <h4>Crime Risk Levels</h4>

      <div className="legend-item">
        <span className="dot safe"></span>
        Safe Area
      </div>

      <div className="legend-item">
        <span className="dot medium"></span>
        Medium Risk
      </div>

      <div className="legend-item">
        <span className="dot high"></span>
        High Danger
      </div>

    </div>
  );
}
