import React, { useEffect, useState } from "react";

export const ActivityLog = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:1234/api/activity", {
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
              {log.action} — {log.target} — {log.userId}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
