import { Link, useNavigate } from "react-router-dom";
import { LuArrowLeft, LuHouse } from "react-icons/lu";
import {
  card,
  ink,
  inkAccent,
  inkMuted,
  inkPrimary,
  primaryButton,
  secondaryButton,
  surface,
} from "../../shared/styles/theme.ts";

interface ErrorPageProps {
  code: string;
  title: string;
  subtitle: string;
  message: string;
  location: string;
  icon: React.ElementType;
  locationIcon: React.ElementType;
}

// Shared layout for the 404 and 403 pages
export function ErrorPage({
  code,
  title,
  subtitle,
  message,
  location,
  icon: Icon,
  locationIcon: LocationIcon,
}: ErrorPageProps) {
  const navigate = useNavigate();

  return (
    <div
      className={`flex min-h-screen items-center justify-center p-6 ${surface}`}
    >
      <div className="w-full max-w-2xl text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-emerald-100 p-6 dark:bg-emerald-500/10">
            <Icon className={inkAccent} size={72} aria-hidden="true" />
          </div>
        </div>

        <div className="mb-8">
          <p
            className={`mb-2 font-mono text-7xl font-extrabold tracking-tight md:text-8xl ${inkPrimary}`}
          >
            {code}
          </p>
          <h1 className={`mb-2 text-3xl font-bold ${ink}`}>{title}</h1>
          <p className={`text-xl ${inkMuted}`}>{subtitle}</p>
        </div>

        <div className={`mb-8 p-8 ${card}`}>
          <p className={`mb-4 leading-relaxed ${inkMuted}`}>{message}</p>
          <div
            className={`flex items-center justify-center gap-2 font-semibold ${inkAccent}`}
          >
            <LocationIcon size={20} aria-hidden="true" />
            <span>Location: {location}</span>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link to="/" className={`${primaryButton} px-8 py-4`}>
            <LuHouse size={20} aria-hidden="true" />
            Return Home
          </Link>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={`${secondaryButton} px-8 py-4`}
          >
            <LuArrowLeft size={20} aria-hidden="true" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
