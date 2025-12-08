import { useEffect, useState } from "react";
import { LuSparkles } from "react-icons/lu";

export function Header() {
  const [currentSpell, setCurrentSpell] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSpell((prev) => (prev + 1) % featuredSpells.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const featuredSpells = [
    { description: "Welcome to your custom tabletop RPG system!" },
    { description: "New spell added!" },
    { description: "Sale! 50% off on all content!" },
  ];
  return (
    <header className="relative">
      {/* Announcement Banner */}
      <div className="bg-gradient-to-r from-cyan-600 to-orange-600 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2 text-sm font-medium">
          <LuSparkles className="w-4 h-4 animate-pulse" />
          <span>{featuredSpells[currentSpell].description}</span>
        </div>
      </div>

      {/* Gradient overlay for visual depth */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent pointer-events-none" />
    </header>
  );
}
