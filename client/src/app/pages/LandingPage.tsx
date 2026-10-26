import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LuSword,
  LuSparkles,
  LuShield,
  LuBookOpen,
  LuArrowRight,
  LuStar,
  LuPlay,
  LuGlobe,
} from "react-icons/lu";

type ContentColor = "cyan" | "orange" | "red";

interface PopularContentItem {
  icon: React.ElementType;
  label: string;
  route: string;
  color: ContentColor;
  title: string;
  description: string;
}

export function LandingPage() {
  const [scrollY, setScrollY] = useState(0);

  const features = [
    {
      icon: LuSparkles,
      title: "Complete Spell Library",
      description:
        "Access a curated collection of spells with detailed descriptions, components, and casting information.",
      stats: "Full CRUD",
      route: "/spells",
    },
    {
      icon: LuSword,
      title: "Weapons & Equipment",
      description:
        "Comprehensive database of weapons, armor, and magical items for every adventure.",
      stats: "Dynamic Data",
      route: "/weapons",
    },
    {
      icon: LuShield,
      title: "Classes & Abilities",
      description:
        "Class features, racial abilities, and special powers organized and searchable.",
      stats: "Admin Panel",
      route: "/professions",
    },
    {
      icon: LuBookOpen,
      title: "Rules & Guides",
      description:
        "In-depth articles, guides, and rule explanations for players and GMs alike.",
      stats: "Custom Content",
      route: "/articles",
    },
  ];

  const popularContent: PopularContentItem[] = [
    {
      icon: LuSparkles,
      label: "Browse Spells",
      title: "Spell Library",
      description:
        "Explore the complete collection of magical abilities and incantations.",
      color: "cyan",
      route: "/spells",
    },
    {
      icon: LuSword,
      label: "View Equipment",
      title: "Weapons & Armor",
      description:
        "Discover weapons, armor, and equipment for your adventures.",
      color: "orange",
      route: "/weapons",
    },
    {
      icon: LuBookOpen,
      label: "Learn Rules",
      title: "Game Basics",
      description: "Master the fundamentals and dive into gameplay mechanics.",
      color: "red",
      route: "/rules",
    },
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-orange-50 to-slate-50 text-slate-900 dark:from-slate-900 dark:via-cyan-900 dark:to-slate-900 dark:text-white overflow-hidden transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-20 left-20 w-2 h-2 bg-cyan-500 dark:bg-cyan-400 rounded-full opacity-40 dark:opacity-60 animate-pulse"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          />
          <div
            className="absolute top-40 right-32 w-1 h-1 bg-cyan-500 dark:bg-cyan-400 rounded-full opacity-30 dark:opacity-40 animate-pulse"
            style={{ transform: `translateY(${scrollY * 0.15}px)` }}
          />
          <div
            className="absolute bottom-32 left-1/4 w-3 h-3 bg-cyan-400 dark:bg-cyan-300 rounded-full opacity-20 dark:opacity-30 animate-pulse"
            style={{ transform: `translateY(${scrollY * -0.1}px)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-orange-500/5 dark:from-cyan-500/10 dark:via-transparent dark:to-orange-500/10" />
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <div className="mb-8 inline-flex items-center space-x-3 bg-cyan-100 dark:bg-cyan-800/30 rounded-full px-6 py-3 backdrop-blur-sm border border-cyan-300 dark:border-cyan-500/20">
            <LuSparkles className="w-5 h-5 text-cyan-600 dark:text-cyan-400 animate-pulse" />
            <span className="text-cyan-800 dark:text-cyan-200 text-sm font-medium">
              A Custom Tabletop RPG System
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-600 via-orange-500 to-orange-500 dark:from-cyan-400 dark:via-orange-400 dark:to-orange-400 bg-clip-text text-transparent leading-tight">
            Epic Adventures
            <br />
            <span className="text-5xl md:text-7xl">Begin Here</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover a complete collection of spells, weapons, abilities, and
            guides. Everything you need to create legendary characters and
            unforgettable campaigns.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group bg-gradient-to-r from-cyan-600 to-orange-600 hover:from-cyan-500 hover:to-orange-500 px-8 py-4 rounded-xl font-semibold text-lg text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/25 flex items-center space-x-2">
              <LuPlay className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <Link to={"/articles/newForm"}>
                <span>Start Exploring</span>
              </Link>
            </button>

            <button className="group border-2 border-cyan-500 dark:border-cyan-400/50 hover:border-cyan-600 dark:hover:border-cyan-400 bg-white/50 dark:bg-transparent hover:bg-cyan-50 dark:hover:bg-cyan-600/20 px-8 py-4 rounded-xl font-semibold text-lg text-cyan-700 dark:text-cyan-100 transition-all duration-300 backdrop-blur-sm flex items-center space-x-2">
              <LuBookOpen className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <Link to={"/articles/newForm"}>
                <span>Browse Content</span>
              </Link>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-600 to-orange-500 dark:from-cyan-400 dark:to-orange-400 bg-clip-text text-transparent">
              Everything You Need
            </h2>
            <p className="text-xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto">
              From spell descriptions to character building, explore all the
              tools to enhance your tabletop experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900/80 rounded-2xl p-8 border border-slate-200 dark:border-cyan-500/20 hover:border-cyan-400 dark:hover:border-cyan-500/40 transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm cursor-pointer shadow-md hover:shadow-xl"
                >
                  <Link to={feature.route}>
                    <div className="flex items-start space-x-4">
                      <div className="bg-gradient-to-br from-cyan-600 to-orange-600 rounded-xl p-3 group-hover:scale-110 transition-transform shadow-md">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            {feature.title}
                          </h3>
                          <span className="text-cyan-600 dark:text-cyan-400 text-sm font-semibold">
                            {feature.stats}
                          </span>
                        </div>
                        <p className="text-slate-600 dark:text-gray-300 leading-relaxed">
                          {feature.description}
                        </p>
                        <div className="mt-4">
                          <div className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-medium flex items-center space-x-2 group-hover:translate-x-1 transition-transform">
                            <span>Explore</span>
                            <LuArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-600 to-orange-500 dark:from-cyan-400 dark:to-orange-400 bg-clip-text text-transparent">
              Begin Your Journey
            </h2>
            <p className="text-xl text-slate-600 dark:text-gray-300">
              Whether you are a new player or seasoned veteran, start your
              adventure in three simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-cyan-50 to-orange-50 dark:from-cyan-600/20 dark:to-orange-600/20 rounded-2xl p-8 backdrop-blur-sm border border-cyan-200 dark:border-cyan-500/20 hover:border-cyan-400 dark:hover:border-cyan-500/40 transition-all duration-300 group-hover:scale-105 shadow-md hover:shadow-xl">
                <div className="bg-gradient-to-br from-cyan-600 to-orange-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  Explore Content
                </h3>
                <p className="text-slate-600 dark:text-gray-300">
                  Browse the extensive library of spells, weapons, and
                  abilities. No account required to get started.
                </p>
              </div>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-cyan-50 to-orange-50 dark:from-cyan-600/20 dark:to-orange-600/20 rounded-2xl p-8 backdrop-blur-sm border border-cyan-200 dark:border-cyan-500/20 hover:border-cyan-400 dark:hover:border-cyan-500/40 transition-all duration-300 group-hover:scale-105 shadow-md hover:shadow-xl">
                <div className="bg-gradient-to-br from-cyan-600 to-orange-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  Create Account
                </h3>
                <p className="text-slate-600 dark:text-gray-300">
                  Sign up to save favorites, create characters, and access
                  advanced campaign management tools.
                </p>
              </div>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-cyan-50 to-orange-50 dark:from-cyan-600/20 dark:to-orange-600/20 rounded-2xl p-8 backdrop-blur-sm border border-cyan-200 dark:border-cyan-500/20 hover:border-cyan-400 dark:hover:border-cyan-500/40 transition-all duration-300 group-hover:scale-105 shadow-md hover:shadow-xl">
                <div className="bg-gradient-to-br from-cyan-600 to-orange-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  Start Playing
                </h3>
                <p className="text-slate-600 dark:text-gray-300">
                  Build characters, plan campaigns, and embark on epic
                  adventures with all the tools you need.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Content Preview */}
      <section className="py-20 px-6 bg-gradient-to-r from-cyan-50 to-orange-50 dark:from-cyan-900/20 dark:to-orange-900/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-600 to-orange-500 dark:from-cyan-400 dark:to-orange-400 bg-clip-text text-transparent">
              Explore Categories
            </h2>
            <p className="text-xl text-slate-600 dark:text-gray-300">
              Jump directly into the content that interests you most.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {popularContent.map((item, index) => {
              const Icon = item.icon;
              const colorClasses = {
                cyan: "text-cyan-600 dark:text-cyan-400",
                orange: "text-orange-600 dark:text-orange-400",
                red: "text-red-600 dark:text-red-400",
              };

              return (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-cyan-500/20 hover:border-cyan-400 dark:hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-sm group hover:scale-[1.02] cursor-pointer shadow-md hover:shadow-xl"
                >
                  <Link to={item.route}>
                    <div className="flex items-center space-x-3 mb-4">
                      <Icon className={`w-6 h-6 ${colorClasses[item.color]}`} />
                      <span
                        className={`${colorClasses[item.color]} font-semibold`}
                      >
                        {item.label}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 dark:text-gray-300 text-sm mb-4">
                      {item.description}
                    </p>
                    <div
                      className={`flex items-center text-sm ${
                        colorClasses[item.color]
                      } group-hover:translate-x-1 transition-transform`}
                    >
                      <span>View Collection</span>
                      <LuArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-600 to-orange-500 dark:from-cyan-400 dark:to-orange-400 bg-clip-text text-transparent">
            Join the Adventure
          </h2>
          <p className="text-xl text-slate-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Ready to enhance your tabletop experience? Create an account to
            unlock character creation and campaign management features.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group bg-gradient-to-r from-cyan-600 to-orange-600 hover:from-cyan-500 hover:to-orange-500 px-10 py-5 rounded-xl font-bold text-lg text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/25 flex items-center space-x-3">
              <LuGlobe className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              <Link to={"/register"}>
                <span>Create Free Account</span>
              </Link>
            </button>

            <div className="flex items-center space-x-4 text-slate-500 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <LuStar className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
                <span className="text-sm">No credit card required</span>
              </div>
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
