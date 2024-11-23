import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// import AuthContext from "../../hooks/authFastRefreshHook";
import { AuthContext } from "../../contexts/AuthContext";
import Button from "../Button";

const Register = () => {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  // Get the formData from the inputs and update the changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  // Call the handleCreate function above
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await signup(formData);

    if (response.success) {
      navigate("/");
    } else {
      console.log(response.message);
    }
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
        <label htmlFor="role">ROLE:</label>
        <input
          name="role"
          onChange={handleInputChange}
          value={formData.value}
          id="role"
          type="role"
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
