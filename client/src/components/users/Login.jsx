import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import Button from "../Button";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const { login } = useContext(AuthContext);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await login(formData);
    if (response.success) {
      console.log("Successfully logged in");
      navigate("/");
    } else {
      console.log("Login failed");
    }
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setErrorMessage("");
  //   if (!formData.username || !formData.password) {
  //     setErrorMessage("Please enter both username and password");
  //     return;
  //   }
  //   const response = await loginUser(formData);
  //   // Check if login was successful
  //   if (response.success) {
  //     // Optional: Store user info in localStorage for persistence
  //     localStorage.setItem("user", JSON.stringify(response.user));
  //     navigate("/");
  //   } else {
  //     setErrorMessage(response.message || "Login failed");
  //   }
  // };

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
