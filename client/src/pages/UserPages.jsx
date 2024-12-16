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

  const testME = async (token) => {
    const response = await fetch("http://localhost:1234/api/users/me", {
      method: "GET",
      headers: { Authorization: `Bearer: ${token}` },
      credentials: "include",
    });
    const data = await response.json();
    console.log("ME USERPAGE - RESPONSE", response);
    console.log("ME USERPAGE - DATA", data);
    return response;
  };

  return (
    <div>
      <div>
        <div onClick={testME}>TESTING</div>
      </div>
    </div>
  );
};

export default UserPage;
