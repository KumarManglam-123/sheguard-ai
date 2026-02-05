import { useEffect, useState } from "react";

export default function Admin() {

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/admin/sos-logs")
      .then(res => res.json())
      .then(data => setLogs(data));
  }, []);

  return (
    <div style={{ padding: "30px", color: "white" }}>

      <h2>🚨 SheGuard Admin Dashboard</h2>

      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px" }}>

        <thead>
          <tr>
            <th>#</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Location Link</th>
            <th>Contacts Alerted</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{log.latitude}</td>
              <td>{log.longitude}</td>
              <td>
                <a href={log.map_link} target="_blank">
                  View Map
                </a>
              </td>
              <td>{log.contacts_notified}</td>
              <td>{new Date(log.time).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}
