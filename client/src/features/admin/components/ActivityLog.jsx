import { useEffect, useState } from "react";
import API_URL from "../../../shared/api/api";

export const ActivityLog = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/activity`, {
          credentials: "include",
        });

        if (!response.ok) {
          console.error("Failed to load logs");
          return;
        }

        const data = await response.json();
        setLogs(data);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchData();
  }, []);

  console.log(logs);

  return (
    <div>
      <h2>Activity Log</h2>

      {logs.length === 0 ? (
        <p>No logs available.</p>
      ) : (
        <ul>
          {logs.map((log) => (
            <li key={log._id}>
              Action: {log.action} — Target: {log.target} — User: {log.userId}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
