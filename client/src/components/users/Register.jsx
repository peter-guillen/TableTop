import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../contexts/AuthContext";
import { AuthContext } from "../../hooks/authFastRefreshHook";
import { Button } from "../Button";

export const Register = () => {
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
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                name="username"
                type="username"
                id="username"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your username"
                onChange={handleInputChange}
                value={formData.value}
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
                value={formData.value}
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
                value={formData.value}
              />
            </div>
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <input
                name="role"
                type="role"
                id="role"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your role"
                onChange={handleInputChange}
                value={formData.value}
              />
            </div>
            <Button
              primary
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign up
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
