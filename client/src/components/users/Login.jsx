import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../api/userApi";
import Button from "../Button";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser(formData);
      console.log("Login successful:", response);
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div>
      <div></div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          name="username"
          onChange={handleInputChange}
          value={formData.username}
          id="username"
          type="text"
          placeholder="username"
        />

        <label htmlFor="password">Password:</label>
        <input
          name="password"
          onChange={handleInputChange}
          value={formData.password}
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

export default Login;
