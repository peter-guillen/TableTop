import { useEffect, useState } from "react";
import { fetchUsers } from "../api/userApi";

const UserPage = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const users = await fetchUsers();
      setUserList(users);
    };
    fetchData();
  }, []);

  const testCookie = async () => {
    console.log("Test cookie function called");
    try {
      console.log("Attempting to fetch test-cookie");
      const response = await fetch("http://localhost:1234/api/test-cookie", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", [...response.headers.entries()]);

      const data = await response.json();
      console.log("Cookie test response:", data);
    } catch (error) {
      console.error("Test cookie error:", error.message);
      console.error("Full error:", error);
    }
  };

  return (
    <div onClick={() => testCookie()}>
      {userList.map((user) => (
        <div key={user._id} style={{ marginBottom: "10px" }}>
          <p>
            <strong>ID:</strong> {user._id}
          </p>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
          <p>
            <strong>Password:</strong> {user.password}
          </p>
        </div>
      ))}
    </div>
  );
};

export default UserPage;
