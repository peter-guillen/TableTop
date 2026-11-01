import { Link } from "react-router-dom";
import {
  LuSword,
  LuBookOpen,
  LuShield,
  LuSparkles,
  LuGithub,
  LuLinkedin,
} from "react-icons/lu";
import { FaDiceD20 } from "react-icons/fa6";
import { surfaceInverse } from "../../shared/styles/theme.ts";

// The footer is always a dark band, so it uses fixed light-on-dark colors
// instead of the light/dark pairs from theme.ts.
const footerHeading =
  "mb-4 text-xs font-bold uppercase tracking-wider text-amber-400";
const footerLink =
  "flex items-center gap-2 rounded text-stone-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400";

export function Footer() {
  return (
    <footer className={`${surfaceInverse} border-t-4 border-amber-500`}>
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* top section */}
        <div className="grid gap-10 md:grid-cols-4">
          {/* branding */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-amber-500 p-2 text-stone-950">
                <FaDiceD20 className="h-5 w-5" />
              </div>
              <h3 className="text-2xl font-extrabold tracking-tight text-white">
                RPG Hub
              </h3>
            </div>
            <p className="text-stone-400">
              Tools, rules, and resources for building legendary tabletop RPG
              campaigns.
            </p>
          </div>

          {/* navigation */}
          <div>
            <h4 className={footerHeading}>Explore</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/powers" className={footerLink}>
                  <LuSparkles className="h-4 w-4" /> <span>Powers</span>
                </Link>
              </li>
              <li>
                <Link to="/items" className={footerLink}>
                  <LuSword className="h-4 w-4" /> <span>Items & Equipment</span>
                </Link>
              </li>
              <li>
                <Link to="/professions" className={footerLink}>
                  <LuShield className="h-4 w-4" />{" "}
                  <span>Classes & Abilities</span>
                </Link>
              </li>
              <li>
                <Link to="/articles" className={footerLink}>
                  <LuBookOpen className="h-4 w-4" />{" "}
                  <span>Articles & Guides</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* account */}
          <div>
            <h4 className={footerHeading}>Account</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/login" className={footerLink}>
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className={footerLink}>
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          {/* external */}
          <div>
            <h4 className={footerHeading}>Connect</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/peter-guillen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={footerLink}
                >
                  <LuGithub className="h-4 w-4" /> <span>GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/peter-guillen-56a409337/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={footerLink}
                >
                  <LuLinkedin className="h-4 w-4" /> <span>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* divider */}
        <div className="my-10 border-t border-stone-800" />

        {/* bottom bar */}
        <div className="flex flex-col items-center justify-center gap-4 text-sm text-stone-400 sm:flex-row">
          <span>
            © {new Date().getFullYear()} RPG Hub. Built by Peter Guillen.
          </span>
        </div>
      </div>
    </footer>
  );
}
