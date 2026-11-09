import { useEffect, useState } from "react";
import { LuSparkles } from "react-icons/lu";

// Static, so it lives outside the component (keeps the effect's deps empty)
const featuredIcons = [
  { description: "Welcome to RPGHub, your custom RPG system" },
  { description: "New: build a hero with the Character Builder" },
  { description: "Peruse a library of magical powers and items." },
];

export function Header() {
  const [currentIcon, setCurrentIcon] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % featuredIcons.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header>
      <div className="bg-emerald-800 px-4 py-2 text-emerald-50 dark:bg-emerald-950 dark:text-emerald-200">
        <div
          className="mx-auto flex max-w-7xl items-center justify-center gap-2 text-sm font-medium"
          aria-live="polite"
        >
          <LuSparkles className="h-4 w-4 text-amber-300" aria-hidden="true" />
          <span>{featuredIcons[currentIcon].description}</span>
        </div>
      </div>
    </header>
  );
}
