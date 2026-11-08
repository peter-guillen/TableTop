import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";
import { FaDiceD20 } from "react-icons/fa6";
import { useLoginMutation } from "../../features/auth/api/authApi";
import {
  card,
  focusRing,
  formInput,
  formLabel,
  formTitle,
  ink,
  inkAccent,
  inkMuted,
  primaryButton,
  secondaryButton,
  surface,
} from "../../shared/styles/theme.ts";
interface UserLogin {
  email: string;
  password: string;
}

export const Login = () => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserLogin>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Mobile keyboards often add a trailing space after an email suggestion
      await login({ ...formData, email: formData.email.trim() }).unwrap();
      navigate("/");
    } catch (error) {
      // Only a 401 means bad credentials, anything else is a network/server problem
      const status = (error as { status?: number | string })?.status;
      setErrorMessage(
        status === 401
          ? "Invalid email or password"
          : "Unable to log in right now. Please try again.",
      );
    }
  };

  // Logs in with the public demo account (a regular "user"), so visitors can
  // try the app without signing up. The same credentials are in the README
  const handleDemoLogin = async () => {
    try {
      await login({ email: "demo@rpg.com", password: "demo" }).unwrap();
      navigate("/");
    } catch (error) {
      const status = (error as { status?: number | string })?.status;
      setErrorMessage(
        status === 401
          ? "The demo account is unavailable right now."
          : "Unable to log in right now. Please try again.",
      );
    }
  };

  return (
    <div
      className={`flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 sm:py-16 ${surface} ${ink}`}
    >
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 rounded-xl bg-amber-500 p-3 text-stone-950">
            <FaDiceD20 className="h-7 w-7" aria-hidden="true" />
          </div>
          <h1 className={formTitle}>Welcome Back</h1>
          <p className={`mt-2 ${inkMuted}`}>Log in to continue your journey</p>
        </div>

        <div className={`${card} p-6 sm:p-8 shadow-sm`}>
          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              {
                id: "email" as keyof UserLogin,
                label: "Email",
                type: "email",
                placeholder: "Enter your email",
                autoComplete: "email",
              },
              {
                id: "password" as keyof UserLogin,
                label: "Password",
                type: "password",
                placeholder: "Enter your password",
                autoComplete: "current-password",
              },
            ].map(({ id, label, type, placeholder, autoComplete }) => (
              <div key={id}>
                <label htmlFor={id} className={`${formLabel} mb-1`}>
                  {label}
                </label>
                <input
                  name={id}
                  type={type}
                  id={id}
                  className={formInput}
                  placeholder={placeholder}
                  autoComplete={autoComplete}
                  autoCapitalize="none"
                  autoCorrect="off"
                  onChange={handleInputChange}
                  value={formData[id]}
                />
              </div>
            ))}
            {errorMessage && (
              <p
                role="alert"
                className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-center text-sm text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-300"
              >
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              className={`${primaryButton} mt-2 w-full px-8 py-3 text-lg`}
            >
              <span>Log In</span>
              <LuArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </form>

          <button
            type="button"
            onClick={handleDemoLogin}
            className={`${secondaryButton} mt-3 w-full px-8 py-3`}
          >
            Try the demo
          </button>

          <p className={`mt-6 text-center text-sm ${inkMuted}`}>
            Don't have an account?{" "}
            <Link
              to="/register"
              className={`rounded font-semibold hover:underline ${inkAccent} ${focusRing}`}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
