import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { Button } from "../Button";

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { login, error } = useContext(AuthContext);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await login(formData);
    if (response.success) {
      navigate("/");
    } else {
      setErrorMessage(error);
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
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username -- Work into eliminating this for email
              </label>
              <input
                name="username"
                type="username"
                id="username"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your username"
                onChange={handleInputChange}
                value={formData.username}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                name="email"
                type="email"
                id="email"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                onChange={handleInputChange}
                value={formData.email}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                name="password"
                type="password"
                id="password"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                onChange={handleInputChange}
                value={formData.password}
              />
            </div>
            <Button
              primary
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?
            <a href="/register" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
