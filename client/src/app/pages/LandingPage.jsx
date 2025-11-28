// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   LuSword,
//   LuSparkles,
//   LuShield,
//   LuBookOpen,
//   LuUsers,
//   LuDice6,
//   LuArrowRight,
//   LuStar,
//   LuPlay,
//   LuTrendingUp,
//   LuGlobe,
//   LuZap,
//   LuScroll,
// } from "react-icons/lu";

// export const LandingPage = () => {
//   const [currentSpell, setCurrentSpell] = useState(0);
//   const [scrollY, setScrollY] = useState(0);

//   const featuredSpells = [
//     {
//       name: "Fireball",
//       level: "3rd Level",
//       description:
//         "A bright streak flashes from your pointing finger to a point you choose within range...",
//       school: "Evocation",
//     },
//     {
//       name: "Healing Word",
//       level: "1st Level",
//       description:
//         "A creature of your choice that you can see within range regains hit points...",
//       school: "Evocation",
//     },
//     {
//       name: "Shield",
//       level: "1st Level",
//       description:
//         "An invisible barrier of magical force appears and protects you...",
//       school: "Abjuration",
//     },
//   ];

//   const features = [
//     {
//       icon: LuSparkles,
//       title: "Complete Spell Library",
//       description:
//         "Access thousands of spells with detailed descriptions, components, and casting information.",
//       stats: "1,200+ Spells",
//     },
//     {
//       icon: LuSword,
//       title: "Weapons & Equipment",
//       description:
//         "Comprehensive database of weapons, armor, and magical items for every adventure.",
//       stats: "800+ Items",
//     },
//     {
//       icon: LuShield,
//       title: "Abilities & Features",
//       description:
//         "Class features, racial abilities, and special powers organized and searchable.",
//       stats: "500+ Abilities",
//     },
//     {
//       icon: LuBookOpen,
//       title: "Rules & Guides",
//       description:
//         "In-depth articles, guides, and rule explanations for players and DMs alike.",
//       stats: "300+ Articles",
//     },
//   ];

//   const stats = [
//     { number: "10,000+", label: "Active Users", icon: LuUsers },
//     { number: "50,000+", label: "Characters Created", icon: LuDice6 },
//     { number: "2,500+", label: "Content Items", icon: LuScroll },
//     { number: "99.9%", label: "Uptime", icon: LuZap },
//   ];

//   useEffect(() => {
//     const handleScroll = () => setScrollY(window.scrollY);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSpell((prev) => (prev + 1) % featuredSpells.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-900 via-cyan-900 to-slate-900 text-white overflow-hidden">
//       {/* Hero Section */}
//       <section className="relative min-h-screen flex items-center justify-center px-6">
//         {/* Animated Background Elements */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div
//             className="absolute top-20 left-20 w-2 h-2 bg-cyan-400 rounded-full opacity-60 animate-pulse"
//             style={{ transform: `translateY(${scrollY * 0.1}px)` }}
//           />
//           <div
//             className="absolute top-40 right-32 w-1 h-1 bg-orange-400 rounded-full opacity-40 animate-pulse"
//             style={{ transform: `translateY(${scrollY * 0.15}px)` }}
//           />
//           <div
//             className="absolute bottom-32 left-1/4 w-3 h-3 bg-cyan-300 rounded-full opacity-30 animate-pulse"
//             style={{ transform: `translateY(${scrollY * -0.1}px)` }}
//           />
//           <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-orange-500/10" />
//         </div>

//         <div className="relative z-10 text-center max-w-6xl mx-auto">
//           <div className="mb-8 inline-flex items-center space-x-3 bg-cyan-800/30 rounded-full px-6 py-3 backdrop-blur-sm border border-cyan-500/20">
//             <LuSparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
//             <span className="text-cyan-200 text-sm font-medium">
//               Your Ultimate D&D Companion
//             </span>
//           </div>

//           <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-orange-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
//             Epic Adventures
//             <br />
//             <span className="text-5xl md:text-7xl">Begin Here</span>
//           </h1>

//           <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
//             Discover the ultimate collection of spells, weapons, abilities, and
//             guides. Everything you need to create legendary characters and
//             unforgettable campaigns.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
//             <button className="group bg-gradient-to-r from-cyan-600 to-orange-600 hover:from-cyan-500 hover:to-orange-500 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 flex items-center space-x-2">
//               <LuPlay className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               <span>Start Exploring</span>
//             </button>

//             <button className="group border-2 border-cyan-400/50 hover:border-cyan-400 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-cyan-600/20 backdrop-blur-sm flex items-center space-x-2">
//               <LuBookOpen className="w-5 h-5 group-hover:rotate-12 transition-transform" />
//               <span>Browse Content</span>
//             </button>
//           </div>
//         </div>

//         {/* Floating Spell Card */}
//         <div className="absolute right-10 top-1/2 transform -translate-y-1/2 hidden xl:block">
//           <div className="bg-slate-800/80 backdrop-blur-md rounded-xl p-6 border border-cyan-500/30 shadow-2xl w-80 transition-all duration-500">
//             <div className="flex items-center justify-between mb-4">
//               <span className="text-cyan-400 text-sm font-semibold">
//                 {featuredSpells[currentSpell].school}
//               </span>
//               <span className="bg-cyan-600/20 text-cyan-300 px-3 py-1 rounded-full text-xs">
//                 {featuredSpells[currentSpell].level}
//               </span>
//             </div>
//             <h3 className="text-xl font-bold mb-3 text-white">
//               {featuredSpells[currentSpell].name}
//             </h3>
//             <p className="text-gray-300 text-sm leading-relaxed">
//               {featuredSpells[currentSpell].description}
//             </p>
//             <div className="flex space-x-1 mt-4">
//               {featuredSpells.map((_, index) => (
//                 <div
//                   key={index}
//                   className={`h-2 rounded-full transition-all duration-300 ${
//                     index === currentSpell
//                       ? "w-8 bg-cyan-500"
//                       : "w-2 bg-gray-600"
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-20 px-6">
//         <div className="max-w-6xl mx-auto">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {stats.map((stat, index) => {
//               const Icon = stat.icon;
//               return (
//                 <div key={index} className="text-center group">
//                   <div className="bg-gradient-to-br from-cyan-600/20 to-orange-600/20 rounded-2xl p-6 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 group-hover:scale-105">
//                     <Icon className="w-8 h-8 text-cyan-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
//                     <div className="text-3xl font-bold text-white mb-2">
//                       {stat.number}
//                     </div>
//                     <div className="text-gray-400 text-sm">{stat.label}</div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 px-6">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-orange-400 bg-clip-text text-transparent">
//               Everything You Need
//             </h2>
//             <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//               From spell descriptions to character building, we've got all the
//               tools to enhance your tabletop experience.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 gap-8">
//             {features.map((feature, index) => {
//               const Icon = feature.icon;
//               return (
//                 <div
//                   key={index}
//                   className="group bg-gradient-to-br from-slate-800/50 to-cyan-900/20 rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm"
//                 >
//                   <div className="flex items-start space-x-4">
//                     <div className="bg-gradient-to-br from-cyan-600 to-orange-600 rounded-xl p-3 group-hover:scale-110 transition-transform">
//                       <Icon className="w-6 h-6 text-white" />
//                     </div>
//                     <div className="flex-1">
//                       <div className="flex items-center justify-between mb-2">
//                         <h3 className="text-xl font-bold text-white">
//                           {feature.title}
//                         </h3>
//                         <span className="text-cyan-400 text-sm font-semibold">
//                           {feature.stats}
//                         </span>
//                       </div>
//                       <p className="text-gray-300 leading-relaxed">
//                         {feature.description}
//                       </p>
//                       <div className="mt-4">
//                         <button className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center space-x-2 group-hover:translate-x-1 transition-transform">
//                           <span>Explore</span>
//                           <LuArrowRight className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* Getting Started Section */}
//       <section className="py-20 px-6">
//         <div className="max-w-4xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-orange-400 bg-clip-text text-transparent">
//               Begin Your Journey
//             </h2>
//             <p className="text-xl text-gray-300">
//               Whether you're a new player or seasoned veteran, start your
//               adventure in three simple steps.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="text-center group">
//               <div className="bg-gradient-to-br from-cyan-600/20 to-orange-600/20 rounded-2xl p-8 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 group-hover:scale-105">
//                 <div className="bg-gradient-to-br from-cyan-600 to-orange-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
//                   <span className="text-2xl font-bold text-white">1</span>
//                 </div>
//                 <h3 className="text-xl font-bold text-white mb-4">
//                   Explore Content
//                 </h3>
//                 <p className="text-gray-300">
//                   Browse our extensive library of spells, weapons, and
//                   abilities. No account required to get started.
//                 </p>
//               </div>
//             </div>

//             <div className="text-center group">
//               <div className="bg-gradient-to-br from-cyan-600/20 to-orange-600/20 rounded-2xl p-8 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 group-hover:scale-105">
//                 <div className="bg-gradient-to-br from-cyan-600 to-orange-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
//                   <span className="text-2xl font-bold text-white">2</span>
//                 </div>
//                 <h3 className="text-xl font-bold text-white mb-4">
//                   Create Account
//                 </h3>
//                 <p className="text-gray-300">
//                   Sign up to save favorites, create characters, and access
//                   advanced campaign management tools.
//                 </p>
//               </div>
//             </div>

//             <div className="text-center group">
//               <div className="bg-gradient-to-br from-cyan-600/20 to-orange-600/20 rounded-2xl p-8 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 group-hover:scale-105">
//                 <div className="bg-gradient-to-br from-cyan-600 to-orange-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
//                   <span className="text-2xl font-bold text-white">3</span>
//                 </div>
//                 <h3 className="text-xl font-bold text-white mb-4">
//                   Start Playing
//                 </h3>
//                 <p className="text-gray-300">
//                   Build characters, plan campaigns, and embark on epic
//                   adventures with all the tools you need.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Popular Content Preview */}
//       <section className="py-20 px-6 bg-gradient-to-r from-cyan-900/20 to-orange-900/20 backdrop-blur-sm">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-orange-400 bg-clip-text text-transparent">
//               Popular This Week
//             </h2>
//             <p className="text-xl text-gray-300">
//               Discover what the community is exploring most.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="bg-slate-800/50 rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-sm group hover:scale-[1.02]">
//               <div className="flex items-center space-x-3 mb-4">
//                 <LuSparkles className="w-6 h-6 text-cyan-400" />
//                 <span className="text-cyan-400 font-semibold">
//                   Most Viewed Spell
//                 </span>
//               </div>
//               <h3 className="text-xl font-bold text-white mb-2">
//                 Eldritch Blast
//               </h3>
//               <p className="text-gray-300 text-sm mb-4">
//                 A beam of crackling energy streaks toward a creature within
//                 range...
//               </p>
//               <div className="flex items-center text-sm text-cyan-400">
//                 <LuTrendingUp className="w-4 h-4 mr-1" />
//                 <span>2,341 views this week</span>
//               </div>
//             </div>

//             <div className="bg-slate-800/50 rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-sm group hover:scale-[1.02]">
//               <div className="flex items-center space-x-3 mb-4">
//                 <LuSword className="w-6 h-6 text-orange-400" />
//                 <span className="text-orange-400 font-semibold">
//                   Trending Weapon
//                 </span>
//               </div>
//               <h3 className="text-xl font-bold text-white mb-2">
//                 Flame Tongue
//               </h3>
//               <p className="text-gray-300 text-sm mb-4">
//                 You can use a bonus action to speak this magic sword's command
//                 word...
//               </p>
//               <div className="flex items-center text-sm text-orange-400">
//                 <LuTrendingUp className="w-4 h-4 mr-1" />
//                 <span>1,892 views this week</span>
//               </div>
//             </div>

//             <div className="bg-slate-800/50 rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-sm group hover:scale-[1.02]">
//               <div className="flex items-center space-x-3 mb-4">
//                 <LuBookOpen className="w-6 h-6 text-red-400" />
//                 <span className="text-red-400 font-semibold">Hot Article</span>
//               </div>
//               <h3 className="text-xl font-bold text-white mb-2">
//                 Multiclassing Guide
//               </h3>
//               <p className="text-gray-300 text-sm mb-4">
//                 Learn the ins and outs of combining classes for powerful
//                 character builds...
//               </p>
//               <div className="flex items-center text-sm text-red-400">
//                 <LuTrendingUp className="w-4 h-4 mr-1" />
//                 <span>1,567 reads this week</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Community Section */}
//       <section className="py-20 px-6">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-orange-400 bg-clip-text text-transparent">
//             Join the Adventure
//           </h2>
//           <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
//             Ready to enhance your D&D experience? Join thousands of players and
//             DMs who have made their campaigns legendary.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
//             <Link to={"register"}>
//               <button className="group bg-gradient-to-r from-cyan-600 to-orange-600 hover:from-cyan-500 hover:to-orange-500 px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 flex items-center space-x-3">
//                 <LuGlobe className="w-6 h-6 group-hover:rotate-12 transition-transform" />
//                 <span>Create Free Account</span>
//               </button>
//             </Link>

//             <div className="flex items-center space-x-4 text-gray-400">
//               <div className="flex items-center space-x-2">
//                 <LuStar className="w-5 h-5 text-yellow-400" />
//                 <span className="text-sm">No credit card required</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

import { useState, useEffect } from "react";
import {
  LuSword,
  LuSparkles,
  LuShield,
  LuBookOpen,
  LuUsers,
  LuDice6,
  LuArrowRight,
  LuStar,
  LuPlay,
  LuGlobe,
  LuZap,
  LuScroll,
  LuLayers,
} from "react-icons/lu";

export function LandingPage() {
  const [currentSpell, setCurrentSpell] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const featuredSpells = [
    {
      name: "Fireball",
      level: "3rd Level",
      description:
        "A bright streak flashes from your pointing finger to a point you choose within range...",
      school: "Evocation",
    },
    {
      name: "Healing Word",
      level: "1st Level",
      description:
        "A creature of your choice that you can see within range regains hit points...",
      school: "Evocation",
    },
    {
      name: "Shield",
      level: "1st Level",
      description:
        "An invisible barrier of magical force appears and protects you...",
      school: "Abjuration",
    },
  ];

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
      route: "/classes",
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

  const stats = [
    { number: "6", label: "Content Categories", icon: LuScroll },
    { number: "MERN", label: "Tech Stack", icon: LuLayers },
    { number: "CRUD", label: "Admin Operations", icon: LuZap },
    { number: "Custom", label: "Tabletop System", icon: LuDice6 },
  ];

  const popularContent = [
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
      route: "/basic-rules",
    },
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSpell((prev) => (prev + 1) % featuredSpells.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-cyan-900 to-slate-900 text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-20 left-20 w-2 h-2 bg-cyan-400 rounded-full opacity-60 animate-pulse"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          />
          <div
            className="absolute top-40 right-32 w-1 h-1 bg-orange-400 rounded-full opacity-40 animate-pulse"
            style={{ transform: `translateY(${scrollY * 0.15}px)` }}
          />
          <div
            className="absolute bottom-32 left-1/4 w-3 h-3 bg-cyan-300 rounded-full opacity-30 animate-pulse"
            style={{ transform: `translateY(${scrollY * -0.1}px)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-orange-500/10" />
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <div className="mb-8 inline-flex items-center space-x-3 bg-cyan-800/30 rounded-full px-6 py-3 backdrop-blur-sm border border-cyan-500/20">
            <LuSparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span className="text-cyan-200 text-sm font-medium">
              A Custom Tabletop RPG System
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-orange-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
            Epic Adventures
            <br />
            <span className="text-5xl md:text-7xl">Begin Here</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover a complete collection of spells, weapons, abilities, and
            guides. Everything you need to create legendary characters and
            unforgettable campaigns.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group bg-gradient-to-r from-cyan-600 to-orange-600 hover:from-cyan-500 hover:to-orange-500 px-8 py-4 rounded-xl font-semibold text-lg text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 flex items-center space-x-2">
              <LuPlay className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <span>Start Exploring</span>
            </button>

            <button className="group border-2 border-cyan-400/50 hover:border-cyan-400 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-cyan-600/20 backdrop-blur-sm flex items-center space-x-2">
              <LuBookOpen className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>Browse Content</span>
            </button>
          </div>
        </div>

        {/* Floating Spell Card */}
        <div className="absolute right-10 top-1/2 transform -translate-y-1/2 hidden xl:block">
          <div className="bg-slate-800/80 backdrop-blur-md rounded-xl p-6 border border-cyan-500/30 shadow-2xl w-80 transition-all duration-500">
            <div className="flex items-center justify-between mb-4">
              <span className="text-cyan-400 text-sm font-semibold">
                {featuredSpells[currentSpell].school}
              </span>
              <span className="bg-cyan-600/20 text-cyan-300 px-3 py-1 rounded-full text-xs">
                {featuredSpells[currentSpell].level}
              </span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">
              {featuredSpells[currentSpell].name}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {featuredSpells[currentSpell].description}
            </p>
            <div className="flex space-x-1 mt-4">
              {featuredSpells.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSpell
                      ? "w-8 bg-cyan-500"
                      : "w-2 bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="bg-gradient-to-br from-cyan-600/20 to-orange-600/20 rounded-2xl p-6 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 group-hover:scale-105">
                    <Icon className="w-8 h-8 text-cyan-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <div className="text-3xl font-bold text-white mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-orange-400 bg-clip-text text-transparent">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
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
                  className="group bg-gradient-to-br from-slate-800/50 to-cyan-900/20 rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm cursor-pointer"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-cyan-600 to-orange-600 rounded-xl p-3 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-white">
                          {feature.title}
                        </h3>
                        <span className="text-cyan-400 text-sm font-semibold">
                          {feature.stats}
                        </span>
                      </div>
                      <p className="text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>
                      <div className="mt-4">
                        <div className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center space-x-2 group-hover:translate-x-1 transition-transform">
                          <span>Explore</span>
                          <LuArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-orange-400 bg-clip-text text-transparent">
              Begin Your Journey
            </h2>
            <p className="text-xl text-gray-300">
              Whether you're a new player or seasoned veteran, start your
              adventure in three simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-cyan-600/20 to-orange-600/20 rounded-2xl p-8 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 group-hover:scale-105">
                <div className="bg-gradient-to-br from-cyan-600 to-orange-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Explore Content
                </h3>
                <p className="text-gray-300">
                  Browse the extensive library of spells, weapons, and
                  abilities. No account required to get started.
                </p>
              </div>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-cyan-600/20 to-orange-600/20 rounded-2xl p-8 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 group-hover:scale-105">
                <div className="bg-gradient-to-br from-cyan-600 to-orange-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Create Account
                </h3>
                <p className="text-gray-300">
                  Sign up to save favorites, create characters, and access
                  advanced campaign management tools.
                </p>
              </div>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-cyan-600/20 to-orange-600/20 rounded-2xl p-8 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 group-hover:scale-105">
                <div className="bg-gradient-to-br from-cyan-600 to-orange-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Start Playing
                </h3>
                <p className="text-gray-300">
                  Build characters, plan campaigns, and embark on epic
                  adventures with all the tools you need.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Content Preview */}
      <section className="py-20 px-6 bg-gradient-to-r from-cyan-900/20 to-orange-900/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-orange-400 bg-clip-text text-transparent">
              Explore Categories
            </h2>
            <p className="text-xl text-gray-300">
              Jump directly into the content that interests you most.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {popularContent.map((item, index) => {
              const Icon = item.icon;
              const colorClasses = {
                cyan: "text-cyan-400",
                orange: "text-orange-400",
                red: "text-red-400",
              };

              return (
                <div
                  key={index}
                  className="bg-slate-800/50 rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-sm group hover:scale-[1.02] cursor-pointer"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <Icon className={`w-6 h-6 ${colorClasses[item.color]}`} />
                    <span
                      className={`${colorClasses[item.color]} font-semibold`}
                    >
                      {item.label}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">
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
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-orange-400 bg-clip-text text-transparent">
            Join the Adventure
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Ready to enhance your tabletop experience? Create an account to
            unlock character creation and campaign management features.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group bg-gradient-to-r from-cyan-600 to-orange-600 hover:from-cyan-500 hover:to-orange-500 px-10 py-5 rounded-xl font-bold text-lg text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 flex items-center space-x-3">
              <LuGlobe className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              <span>Create Free Account</span>
            </button>

            <div className="flex items-center space-x-4 text-gray-400">
              <div className="flex items-center space-x-2">
                <LuStar className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">No credit card required</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
