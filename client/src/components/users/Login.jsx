import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../hooks/authFastRefreshHook";
import Button from "../Button";

const Login = () => {
  const { login } = useContext(AuthContext);
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
    const response = await login(formData);
    if (response.success) {
      login(response.user); // set user state in AuthContext
      navigate("/");
    } else {
      console.log(response.message);
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
