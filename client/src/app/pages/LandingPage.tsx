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
// import { Link } from "react-router-dom";
// import {
//   LuSword,
//   LuScroll,
//   LuShield,
//   LuBookOpen,
//   LuArrowRight,
//   LuCheck,
//   LuPlay,
//   LuGlobe,
// } from "react-icons/lu";

// const focusRing =
//   "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50 dark:focus-visible:ring-emerald-500 dark:focus-visible:ring-offset-stone-950";

// // Key action: amber with near-black text, high contrast in both modes
// const primaryButton = `inline-flex items-center justify-center gap-2 rounded-lg border-2 border-amber-500 bg-amber-500 px-8 py-4 text-lg font-bold text-stone-950 transition-colors hover:border-amber-400 hover:bg-amber-400 ${focusRing}`;

// // Secondary action: moss/emerald outline
// const secondaryButton = `inline-flex items-center justify-center gap-2 rounded-lg border-2 border-emerald-700 bg-transparent px-8 py-4 text-lg font-bold text-emerald-800 transition-colors hover:bg-emerald-700 hover:text-white dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-emerald-500 dark:hover:text-stone-950 ${focusRing}`;

// const features = [
//   {
//     icon: LuScroll,
//     title: "Complete Spell Library",
//     description:
//       "Access a curated collection of spells with detailed descriptions, components, and casting information.",
//     stats: "Full CRUD",
//     route: "/spells",
//   },
//   {
//     icon: LuSword,
//     title: "Weapons & Equipment",
//     description:
//       "Comprehensive database of weapons, armor, and magical items for every adventure.",
//     stats: "Dynamic Data",
//     route: "/weapons",
//   },
//   {
//     icon: LuShield,
//     title: "Classes & Abilities",
//     description:
//       "Class features, racial abilities, and special powers organized and searchable.",
//     stats: "Admin Panel",
//     route: "/professions",
//   },
//   {
//     icon: LuBookOpen,
//     title: "Rules & Guides",
//     description:
//       "In-depth articles, guides, and rule explanations for players and GMs alike.",
//     stats: "Custom Content",
//     route: "/articles",
//   },
// ];

// const steps = [
//   {
//     title: "Explore Content",
//     description:
//       "Browse the extensive library of spells, weapons, and abilities. No account required to get started.",
//   },
//   {
//     title: "Create Account",
//     description:
//       "Sign up to save favorites, create characters, and access advanced campaign management tools.",
//   },
//   {
//     title: "Start Playing",
//     description:
//       "Build characters, plan campaigns, and embark on epic adventures with all the tools you need.",
//   },
// ];

// export function LandingPage() {
//   return (
//     <div className="min-h-screen bg-stone-50 text-stone-900 transition-colors duration-300 dark:bg-stone-950 dark:text-stone-100">
//       {/* Hero */}
//       <section className="flex min-h-screen items-center justify-center border-b-4 border-amber-600 px-6 dark:border-amber-500">
//         <div className="mx-auto max-w-6xl text-center">
//           <div className="mb-8 inline-flex items-center rounded-full border-2 border-emerald-700 bg-emerald-50 px-6 py-2 dark:border-stone-700 dark:bg-stone-900">
//             <span className="text-sm font-semibold text-emerald-900 dark:text-emerald-400">
//               A Custom Tabletop RPG System
//             </span>
//           </div>

//           <h1 className="mb-6 text-6xl font-extrabold leading-tight text-stone-950 dark:text-stone-100 md:text-8xl">
//             Epic Adventures
//             <br />
//             <span className="text-5xl text-amber-700 dark:text-amber-500 md:text-7xl">
//               Begin Here
//             </span>
//           </h1>

//           <p className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-stone-700 dark:text-stone-300 md:text-2xl">
//             Discover a complete collection of spells, weapons, abilities, and
//             guides. Everything you need to create legendary characters and
//             unforgettable campaigns.
//           </p>

//           <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
//             <Link to="/spells" className={primaryButton}>
//               <LuPlay className="h-5 w-5" aria-hidden="true" />
//               <span>Start Exploring</span>
//             </Link>

//             <Link to="/articles" className={secondaryButton}>
//               <LuBookOpen className="h-5 w-5" aria-hidden="true" />
//               <span>Browse Content</span>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Features */}
//       <section className="px-6 py-20">
//         <div className="mx-auto max-w-6xl">
//           <div className="mb-16 text-center">
//             <h2 className="mb-6 text-4xl font-bold text-stone-950 dark:text-stone-100 md:text-5xl">
//               Everything You Need
//             </h2>
//             <p className="mx-auto max-w-3xl text-xl text-stone-700 dark:text-stone-300">
//               From spell descriptions to character building, explore all the
//               tools to enhance your tabletop experience.
//             </p>
//           </div>

//           <div className="grid gap-8 md:grid-cols-2">
//             {features.map((feature) => {
//               const Icon = feature.icon;
//               return (
//                 <Link
//                   key={feature.route}
//                   to={feature.route}
//                   className={`group block rounded-xl border-2 border-stone-300 bg-stone-100 p-8 transition-colors hover:border-emerald-700 dark:border-stone-700 dark:bg-stone-900 dark:hover:border-emerald-500 ${focusRing}`}
//                 >
//                   <div className="flex items-start gap-4">
//                     <div className="rounded-lg bg-emerald-700 p-3 text-white dark:bg-emerald-500 dark:text-stone-950">
//                       <Icon className="h-6 w-6" aria-hidden="true" />
//                     </div>
//                     <div className="flex-1">
//                       <div className="mb-2 flex items-center justify-between gap-4">
//                         <h3 className="text-xl font-bold text-stone-950 dark:text-stone-100">
//                           {feature.title}
//                         </h3>
//                         <span className="text-sm font-semibold text-amber-800 dark:text-amber-500">
//                           {feature.stats}
//                         </span>
//                       </div>
//                       <p className="leading-relaxed text-stone-700 dark:text-stone-300">
//                         {feature.description}
//                       </p>
//                       <div className="mt-4 flex items-center gap-2 font-semibold text-emerald-800 group-hover:underline dark:text-emerald-400">
//                         <span>Explore</span>
//                         <LuArrowRight className="h-4 w-4" aria-hidden="true" />
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* Getting started */}
//       <section className="border-y-2 border-stone-200 bg-stone-100 px-6 py-20 dark:border-stone-800 dark:bg-stone-900">
//         <div className="mx-auto max-w-4xl">
//           <div className="mb-16 text-center">
//             <h2 className="mb-6 text-4xl font-bold text-stone-950 dark:text-stone-100 md:text-5xl">
//               Begin Your Journey
//             </h2>
//             <p className="text-xl text-stone-700 dark:text-stone-300">
//               Whether you are a new player or seasoned veteran, start your
//               adventure in three simple steps.
//             </p>
//           </div>

//           <ol className="grid gap-8 md:grid-cols-3">
//             {steps.map((step, index) => (
//               <li
//                 key={step.title}
//                 className="rounded-xl border-2 border-stone-300 bg-stone-50 p-8 text-center dark:border-stone-700 dark:bg-stone-950"
//               >
//                 <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500 text-2xl font-extrabold text-stone-950">
//                   {index + 1}
//                 </div>
//                 <h3 className="mb-4 text-xl font-bold text-stone-950 dark:text-stone-100">
//                   {step.title}
//                 </h3>
//                 <p className="text-stone-700 dark:text-stone-300">
//                   {step.description}
//                 </p>
//               </li>
//             ))}
//           </ol>
//         </div>
//       </section>

//       {/* Call to action: inverted band in both modes */}
//       <section className="bg-stone-900 px-6 py-20 text-stone-100 dark:border-t-2 dark:border-stone-800 dark:bg-stone-950">
//         <div className="mx-auto max-w-4xl text-center">
//           <h2 className="mb-6 text-4xl font-bold md:text-5xl">
//             Join the Adventure
//           </h2>
//           <p className="mx-auto mb-12 max-w-2xl text-xl text-stone-300">
//             Ready to enhance your tabletop experience? Create an account to
//             unlock character creation and campaign management features.
//           </p>

//           <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
//             <Link
//               to="/register"
//               className={`${primaryButton} px-10 py-5 focus-visible:ring-offset-stone-900`}
//             >
//               <LuGlobe className="h-6 w-6" aria-hidden="true" />
//               <span>Create Free Account</span>
//             </Link>

//             <div className="flex items-center gap-2 text-stone-300">
//               <LuCheck
//                 className="h-5 w-5 text-emerald-500"
//                 aria-hidden="true"
//               />
//               <span className="text-sm">No credit card required</span>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
