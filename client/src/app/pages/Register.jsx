import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../features/auth/context/AuthContext";
import { LuSparkles, LuArrowRight } from "react-icons/lu";

export const Register = () => {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-orange-50 to-slate-50 dark:from-slate-900 dark:via-cyan-900 dark:to-slate-900 text-slate-900 dark:text-white flex items-center justify-center px-6 overflow-hidden transition-colors duration-300">
      {/* Animated background dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-500 dark:bg-cyan-400 rounded-full opacity-40 dark:opacity-60 animate-pulse" />
        <div className="absolute top-40 right-32 w-1 h-1 bg-cyan-500 dark:bg-cyan-400 rounded-full opacity-30 dark:opacity-40 animate-pulse" />
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-cyan-400 dark:bg-cyan-300 rounded-full opacity-20 dark:opacity-30 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-orange-500/5 dark:from-cyan-500/10 dark:via-transparent dark:to-orange-500/10" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center space-x-3 bg-cyan-100 dark:bg-cyan-800/30 rounded-full px-6 py-3 backdrop-blur-sm border border-cyan-300 dark:border-cyan-500/20">
            <LuSparkles className="w-5 h-5 text-cyan-600 dark:text-cyan-400 animate-pulse" />
            <span className="text-cyan-800 dark:text-cyan-200 text-sm font-medium">
              Begin Your Adventure
            </span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gradient-to-br dark:from-cyan-800 dark:to-cyan-900/80 rounded-2xl p-8 border border-slate-200 dark:border-cyan-500/20 shadow-xl backdrop-blur-sm">
          <h2 className="text-4xl font-bold mb-2 text-center bg-gradient-to-r from-cyan-600 via-orange-500 to-orange-500 dark:from-cyan-400 dark:via-orange-400 dark:to-orange-400 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="text-center text-slate-500 dark:text-gray-400 text-sm mb-8">
            Join the adventure — it's free to start
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              {
                id: "username",
                label: "Username",
                type: "text",
                placeholder: "Enter your username",
              },
              {
                id: "email",
                label: "Email",
                type: "email",
                placeholder: "Enter your email",
              },
              {
                id: "password",
                label: "Password",
                type: "password",
                placeholder: "Enter your password",
              },
              {
                id: "role",
                label: "Role",
                type: "text",
                placeholder: "Enter your role",
              },
            ].map(({ id, label, type, placeholder }) => (
              <div key={id}>
                <label
                  htmlFor={id}
                  className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1"
                >
                  {label}
                </label>
                <input
                  name={id}
                  type={type}
                  id={id}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-cyan-500/30 bg-slate-50 dark:bg-cyan-900/40 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200"
                  placeholder={placeholder}
                  onChange={handleInputChange}
                  value={formData[id]}
                />
              </div>
            ))}

            <button
              type="submit"
              className="group w-full mt-2 bg-gradient-to-r from-cyan-600 to-orange-600 hover:from-cyan-500 hover:to-orange-500 px-8 py-4 rounded-xl font-semibold text-lg text-white transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-2xl hover:shadow-cyan-500/25 flex items-center justify-center space-x-2"
            >
              <span>Sign Up</span>
              <LuArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-medium hover:underline transition-colors"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
