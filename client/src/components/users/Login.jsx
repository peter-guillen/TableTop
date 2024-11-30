import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../api/userApi";
import Button from "../Button";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    if (!formData.username || !formData.password) {
      setErrorMessage("Please enter both username and password");
      return;
    }
    try {
      // Log sanitized data for debugging
      console.log("Attempting login with:", {
        username: formData.username,
        password: "[REDACTED]",
      });
      // Make API call to login
      const response = await loginUser(formData);

      // Log full response for debugging
      console.log("Login API response:", response);

      // Check if login was successful
      if (response.success) {
        // Optional: Store user info in localStorage for persistence
        localStorage.setItem("user", JSON.stringify(response.user));

        // Navigate to home page or dashboard
        navigate("/");
      } else {
        // Handle login failure
        setErrorMessage(response.message || "Login failed");
      }
    } catch (error) {
      console.error("Login submission error:", error);
      setErrorMessage(error.message || "An unexpected error occurred");
    }
  };

  return (
    <div>
      <div></div>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

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
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default Login;
