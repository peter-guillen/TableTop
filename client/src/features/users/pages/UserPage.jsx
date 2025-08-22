import { useEffect, useState, useContext } from "react";
import { fetchUsers } from "../api/userApi";
import { deleteUser } from "../api/userApi";
import { AuthContext } from "../../auth/hooks/authFastRefreshHook";

export const UserPage = () => {
  const [userList, setUserList] = useState([]);
  const { users } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const users = await fetchUsers();
      setUserList(users);
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteUser(id);
    setUserList((prevList) => prevList.filter((user) => user._id !== id));
  };

  console.log(userList);
  console.log(users);
  return (
    <div>
      <div>
        {userList.map((user) => (
          <div key={user._id}>
            <div>{user.username}</div>
            <div
              onClick={() => {
                handleDelete(user._id);
              }}
            >
              X
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
