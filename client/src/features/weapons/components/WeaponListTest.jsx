import { LuSword, LuShield, LuWeight, LuCoins, LuStar } from "react-icons/lu";

export function ItemCard({ item }) {
  // Rarity configuration with colors

  const rarityConfig = {
    common: {
      border: "border-slate-300 dark:border-slate-600",
      bg: "bg-slate-50 dark:bg-slate-800/30",
      text: "text-slate-600 dark:text-slate-400",
      glow: "",
    },
    uncommon: {
      border: "border-green-400 dark:border-green-500/50",
      bg: "bg-green-50 dark:bg-green-900/20",
      text: "text-green-600 dark:text-green-400",
      glow: "shadow-green-500/20",
    },
    rare: {
      border: "border-blue-400 dark:border-blue-500/50",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      text: "text-blue-600 dark:text-blue-400",
      glow: "shadow-blue-500/20",
    },
    epic: {
      border: "border-purple-400 dark:border-purple-500/50",
      bg: "bg-purple-50 dark:bg-purple-900/20",
      text: "text-purple-600 dark:text-purple-400",
      glow: "shadow-purple-500/20",
    },
    legendary: {
      border: "border-orange-400 dark:border-orange-500/50",
      bg: "bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20",
      text: "text-orange-600 dark:text-orange-400",
      glow: "shadow-orange-500/30",
    },
  };

  const rarity = item.rarity?.toLowerCase() || "common";
  const styles = rarityConfig[rarity] || rarityConfig.common;
  const isWeapon = item.type?.toLowerCase().includes("weapon") || item.damage;

  return (
    <div
      className={`group bg-white dark:bg-slate-800/50 rounded-xl overflow-hidden border-2 ${styles.border} hover:border-cyan-400 dark:hover:border-cyan-500/60 transition-all duration-300 hover:scale-[1.02] cursor-pointer shadow-md hover:shadow-xl ${styles.glow} backdrop-blur-sm`}
    >
      {/* Image Section */}
      <div className={`relative h-48 ${styles.bg} overflow-hidden`}>
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {isWeapon ? (
              <LuSword className="w-20 h-20 text-slate-300 dark:text-slate-600" />
            ) : (
              <LuShield className="w-20 h-20 text-slate-300 dark:text-slate-600" />
            )}
          </div>
        )}

        {/* Rarity Badge */}
        <div
          className={`absolute top-3 right-3 ${styles.bg} ${styles.text} px-3 py-1 rounded-full text-xs font-bold uppercase backdrop-blur-sm border ${styles.border} flex items-center space-x-1`}
        >
          <LuStar className="w-3 h-3" />
          <span>{item.rarity || "Common"}</span>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-slate-900/80 dark:bg-slate-800/80 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase backdrop-blur-sm">
          {item.category || (isWeapon ? "Weapon" : "Armor")}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
          {item.name}
        </h3>

        {/* Description */}
        <p className="text-slate-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
          {item.description || "A mysterious item awaiting discovery..."}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {isWeapon && item.damage && (
            <div className="flex items-center space-x-2 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg p-2 border border-red-200 dark:border-red-500/20">
              <LuSword className="w-4 h-4 text-red-600 dark:text-red-400" />
              <div>
                <div className="text-xs text-slate-500 dark:text-gray-500 font-medium">
                  Damage
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  {item.damage}
                </div>
              </div>
            </div>
          )}

          {!isWeapon && item.armorClass !== undefined && (
            <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-2 border border-blue-200 dark:border-blue-500/20">
              <LuShield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <div>
                <div className="text-xs text-slate-500 dark:text-gray-500 font-medium">
                  AC
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  {item.armorClass}
                </div>
              </div>
            </div>
          )}

          {item.weight !== undefined && (
            <div className="flex items-center space-x-2 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700/20 dark:to-slate-800/20 rounded-lg p-2 border border-slate-200 dark:border-slate-600/20">
              <LuWeight className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <div>
                <div className="text-xs text-slate-500 dark:text-gray-500 font-medium">
                  Weight
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  {item.weight} lbs
                </div>
              </div>
            </div>
          )}

          {item.price !== undefined && (
            <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-lg p-2 border border-yellow-200 dark:border-yellow-500/20">
              <LuCoins className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
              <div>
                <div className="text-xs text-slate-500 dark:text-gray-500 font-medium">
                  Value
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  {item.price} gp
                </div>
              </div>
            </div>
          )}
        </div>

        {/* View Details Button */}
        <button className="w-full bg-gradient-to-r from-cyan-600 to-orange-600 hover:from-cyan-500 hover:to-orange-500 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 transform group-hover:scale-[1.02] shadow-md hover:shadow-lg">
          View Details
        </button>
      </div>
    </div>
  );
}

// Example Usage Component
export function ItemCardDemo() {
  const exampleItems = [
    {
      name: "Flaming Longsword",
      description:
        "A masterfully crafted blade that burns with eternal flames, dealing devastating fire damage to enemies.",
      type: "Weapon",
      category: "Longsword",
      rarity: "legendary",
      damage: "1d8+2d6",
      weight: 3,
      price: 5000,
      image: null,
    },
    {
      name: "Dragon Scale Mail",
      description:
        "Armor forged from the scales of an ancient red dragon, providing exceptional protection.",
      type: "Armor",
      category: "Heavy Armor",
      rarity: "epic",
      armorClass: 18,
      weight: 45,
      price: 8000,
      image: null,
    },
    {
      name: "Steel Dagger",
      description:
        "A simple but effective blade, perfect for quick strikes and stealth attacks.",
      type: "Weapon",
      category: "Dagger",
      rarity: "common",
      damage: "1d4",
      weight: 1,
      price: 20,
      image: null,
    },
    {
      name: "Enchanted Buckler",
      description:
        "A small shield imbued with protective magic, granting the wielder enhanced defense.",
      type: "Armor",
      category: "Shield",
      rarity: "rare",
      armorClass: 14,
      weight: 6,
      price: 750,
      image: null,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-orange-50 to-slate-50 dark:from-slate-900 dark:via-cyan-900 dark:to-slate-900 p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-orange-500 dark:from-cyan-400 dark:to-orange-400 bg-clip-text text-transparent">
            Item Cards
          </h1>
          <p className="text-xl text-slate-600 dark:text-gray-300">
            Weapons and armor for your epic adventures
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {exampleItems.map((item, index) => (
            <ItemCard key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
