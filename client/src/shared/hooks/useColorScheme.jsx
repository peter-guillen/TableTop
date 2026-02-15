import { twMerge } from "tailwind-merge";

export function useColorScheme(
  baseColors = {},
  contexts = {},
  tierEffects = {},
) {
  function getColorScheme(category, context = "", extra = "") {
    const key = category?.toLowerCase?.() || "default";
    const color = baseColors[key] || baseColors.default || "gray";
    const template = contexts[context] || "";

    const resolved = template.replaceAll("{color}", color);

    // Optional tier effect (glow, gradient, etc.)
    const effect = tierEffects[key]?.[context] || "";

    return twMerge(resolved, effect, extra);
  }

  return { getColorScheme };
}

export const rarityBaseColors = {
  common: "slate",
  uncommon: "green",
  rare: "blue",
  elite: "purple",
  heroic: "yellow",
  legendary: "orange",
  mythic: "red",
  default: "slate",
};

export const rarityContexts = {
  border:
    "border-{color}-300 dark:border-{color}-600 group-hover:border-{color}-400 dark:group-hover:border-{color}-500",
  bg: "bg-{color}-50 dark:bg-{color}-900/20",
  text: "text-{color}-700 dark:text-{color}-400",
  badge: "bg-{color}-500 text-white dark:text-{color}-100",
  glow: "", // handled by tierEffects
};

export const rarityTierEffects = {
  rare: {
    glow: "shadow-md shadow-blue-500/20",
  },
  elite: {
    glow: "shadow-md shadow-purple-500/25",
  },
  heroic: {
    glow: "shadow-lg shadow-yellow-500/25",
  },
  legendary: {
    glow: "shadow-xl shadow-orange-500/40",
    border:
      "bg-gradient-to-r from-orange-500/20 to-yellow-400/20 border-orange-400 dark:border-orange-500",
  },
  mythic: {
    glow: "shadow-2xl shadow-red-500/50 animate-pulse",
    border:
      "bg-gradient-to-r from-red-600/30 via-orange-500/30 to-yellow-400/30 border-red-500 dark:border-red-400",
  },
};
