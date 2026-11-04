import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";
import { FaDiceD20 } from "react-icons/fa6";
import { useCreateUserMutation } from "../../features/users/api/userApi";
import { UserFormData } from "../../features/users/userTypes";
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
  surface,
} from "../../shared/styles/theme.ts";

type RegisterUser = Omit<UserFormData, "_id" | "role" | "profile">;

export const Register = () => {
  const [createUser] = useCreateUserMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterUser>({
    username: "",
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
      await createUser({ ...formData, email: formData.email.trim() }).unwrap();
      navigate("/");
    } catch (error) {
      setErrorMessage("Registration failed");
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
          <h1 className={formTitle}>Create Account</h1>
          <p className={`mt-2 ${inkMuted}`}>Join the adventure. It's free to start.</p>
        </div>

        <div className={`${card} p-6 sm:p-8 shadow-sm`}>
          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              {
                id: "username" as keyof RegisterUser,
                label: "Username",
                type: "text",
                placeholder: "Enter your username",
                autoComplete: "username",
              },
              {
                id: "email" as keyof RegisterUser,
                label: "Email",
                type: "email",
                placeholder: "Enter your email",
                autoComplete: "email",
              },
              {
                id: "password" as keyof RegisterUser,
                label: "Password",
                type: "password",
                placeholder: "Enter your password",
                autoComplete: "new-password",
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
              <span>Sign Up</span>
              <LuArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </form>

          <p className={`mt-6 text-center text-sm ${inkMuted}`}>
            Already have an account?{" "}
            <Link
              to="/login"
              className={`rounded font-semibold hover:underline ${inkAccent} ${focusRing}`}
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
