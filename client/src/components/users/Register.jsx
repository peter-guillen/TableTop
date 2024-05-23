import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createUser } from "../../api/userApi";
import Button from "../Button";

const Register = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleCreate = async (formData) => {
    const newUser = await createUser(formData);
    setUsers([...users, newUser]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCreate(formData);
    navigate("/");
  };

  return (
    <div>
      <div></div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          name="username"
          onChange={handleInputChange}
          value={formData.value}
          id="username"
          type="text"
          placeholder="username"
        />
        <label htmlFor="email">Email:</label>
        <input
          name="email"
          onChange={handleInputChange}
          value={formData.value}
          id="email"
          type="text"
          placeholder="example@gmail.com"
        />
        <label htmlFor="password">Password:</label>
        <input
          name="password"
          onChange={handleInputChange}
          value={formData.value}
          id="password"
          type="password"
          placeholder="......."
        />
        <Button primary type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Register;
