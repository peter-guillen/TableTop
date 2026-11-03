import { Link } from "react-router-dom";
import {
  LuSword,
  LuSparkles,
  LuShield,
  LuBookOpen,
  LuArrowRight,
  LuCheck,
  LuPlay,
  LuGlobe,
} from "react-icons/lu";
import {
  cardInteractive,
  iconTile,
  ink,
  inkAccent,
  inkMuted,
  inkPrimary,
  line,
  lineStrong,
  primaryButton,
  secondaryButton,
  surface,
  surfaceRaised,
  surfaceSunken,
} from "../../shared/styles/theme.ts";

const sectionHeading = `mb-6 text-4xl font-extrabold tracking-tight md:text-5xl ${ink}`;
const sectionLead = `mx-auto max-w-3xl text-xl ${inkMuted}`;

export function LandingPage() {
  const features = [
    {
      icon: LuSparkles,
      title: "Powers & Abilities",
      description:
        "Every power in the system, with activation costs, requirements, combat effects, and conditions.",
      route: "/powers",
    },
    {
      icon: LuSword,
      title: "Items & Equipment",
      description:
        "Weapons, armor, and magical items for every adventure, sorted by rarity.",
      route: "/items",
    },
    {
      icon: LuShield,
      title: "Classes & Abilities",
      description:
        "Class features, species traits, and special powers organized and searchable.",
      route: "/professions",
    },
    {
      icon: LuBookOpen,
      title: "Rules & Guides",
      description:
        "In-depth articles, guides, and rule explanations for players and GMs alike.",
      route: "/articles",
    },
  ];

  const steps = [
    {
      title: "Explore Content",
      description:
        "Browse the extensive library of powers, items, and classes. No account required to get started.",
    },
    {
      title: "Create Account",
      description:
        "Sign up to save favorites, create characters, and access advanced campaign management tools.",
    },
    {
      title: "Start Playing",
      description:
        "Build characters, plan campaigns, and embark on epic adventures with all the tools you need.",
    },
  ];

  return (
    <div className={`min-h-screen ${surface} ${ink}`}>
      {/* Hero - the only decorative touch on the page is a soft amber glow */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-6">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(245,158,11,0.15),_transparent_60%)]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl text-center">
          <div
            className={`mb-8 inline-flex items-center gap-2 rounded-full border px-5 py-2 ${lineStrong} ${surfaceRaised}`}
          >
            <LuSparkles className={`h-4 w-4 ${inkPrimary}`} aria-hidden="true" />
            <span className={`text-sm font-semibold ${inkMuted}`}>
              A Custom Tabletop RPG System
            </span>
          </div>

          <h1 className="mb-6 text-6xl font-extrabold leading-tight tracking-tight md:text-8xl">
            Epic Adventures
            <br />
            <span className={`text-5xl md:text-7xl ${inkPrimary}`}>
              Begin Here
            </span>
          </h1>

          <p
            className={`mx-auto mb-12 max-w-3xl text-xl leading-relaxed md:text-2xl ${inkMuted}`}
          >
            Discover a complete collection of powers, items, classes, and
            guides. Everything you need to create legendary characters and
            unforgettable campaigns.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/powers" className={`${primaryButton} px-8 py-4 text-lg`}>
              <LuPlay className="h-5 w-5" aria-hidden="true" />
              <span>Start Exploring</span>
            </Link>

            <Link
              to="/articles"
              className={`${secondaryButton} px-8 py-4 text-lg`}
            >
              <LuBookOpen className="h-5 w-5" aria-hidden="true" />
              <span>Browse Content</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className={sectionHeading}>Everything You Need</h2>
            <p className={sectionLead}>
              From spell descriptions to character building, explore all the
              tools to enhance your tabletop experience.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.route}
                  to={feature.route}
                  className={`group block p-8 ${cardInteractive}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={iconTile}>
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <div className="mb-2">
                        <h3 className={`text-xl font-bold ${ink}`}>
                          {feature.title}
                        </h3>
                      </div>
                      <p className={`leading-relaxed ${inkMuted}`}>
                        {feature.description}
                      </p>
                      <div
                        className={`mt-4 flex items-center gap-2 font-semibold ${inkAccent}`}
                      >
                        <span>Explore</span>
                        <LuArrowRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Getting Started - tinted band breaks up the page rhythm */}
      <section className={`border-y px-6 py-20 ${line} ${surfaceSunken}`}>
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <h2 className={sectionHeading}>Begin Your Journey</h2>
            <p className={sectionLead}>
              Whether you are a new player or seasoned veteran, start your
              adventure in three simple steps.
            </p>
          </div>

          <ol className="grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className={`rounded-xl border p-8 text-center ${line} ${surfaceRaised}`}
              >
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-2xl font-extrabold text-stone-950">
                  {index + 1}
                </div>
                <h3 className={`mb-3 text-xl font-bold ${ink}`}>
                  {step.title}
                </h3>
                <p className={inkMuted}>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Call to action - amber-tinted band so it stands apart from the dark footer */}
      <section className="border-t border-amber-200 bg-amber-50 px-6 py-20 dark:border-amber-500/20 dark:bg-amber-500/5">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className={sectionHeading}>Join the Adventure</h2>
          <p className={`mb-12 ${sectionLead}`}>
            Ready to enhance your tabletop experience? Create an account to
            unlock character creation and campaign management features.
          </p>

          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link
              to="/register"
              className={`${primaryButton} px-10 py-5 text-lg`}
            >
              <LuGlobe className="h-6 w-6" aria-hidden="true" />
              <span>Create Free Account</span>
            </Link>

            <div className={`flex items-center gap-2 ${inkMuted}`}>
              <LuCheck className={`h-5 w-5 ${inkAccent}`} aria-hidden="true" />
              <span className="text-sm">Free to use, no account needed to browse</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
