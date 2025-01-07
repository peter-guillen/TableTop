import { useEffect, useState } from "react";
import { fetchUsers } from "../api/userApi";

export const UserPage = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const users = await fetchUsers();
      setUserList(users);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div>
        {userList.map((user) => (
          <div key={user._id}>{user.username}</div>
        ))}
      </div>
    </div>
  );
};
