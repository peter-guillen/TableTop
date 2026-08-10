// import { twMerge } from "tailwind-merge";
import { Rarity } from "../constants/constantTypes"; // verify path
import { twMerge } from "tailwind-merge";

export type ColorContext = "border" | "bg" | "text" | "badge" | "glow";

export type ColorScheme = Record<ColorContext, string>;

export function useColorScheme<T extends string>(
  schemes: Record<T, ColorScheme>,
  defaultKey: T,
) {
  function getColorScheme(
    category: T | undefined,
    context: ColorContext,
    extra = "",
  ) {
    const key = (category?.toLowerCase() as T) ?? defaultKey;
    const scheme = schemes[key] ?? schemes[defaultKey];
    return twMerge(scheme[context], extra);
  }

  return { getColorScheme };
}

export const rarityColorSchemes: Record<Rarity, ColorScheme> = {
  common: {
    border:
      "border-slate-300 dark:border-slate-600 group-hover:border-slate-400 dark:group-hover:border-slate-500",
    bg: "bg-slate-50 dark:bg-slate-900/20",
    text: "text-slate-700 dark:text-slate-400",
    badge: "bg-slate-500 text-white dark:text-slate-100",
    glow: "",
  },
  rare: {
    border:
      "border-green-300 dark:border-green-600 group-hover:border-green-400 dark:group-hover:border-green-500",
    bg: "bg-green-50 dark:bg-green-900/20",
    text: "text-green-700 dark:text-green-400",
    badge: "bg-green-500 text-white dark:text-green-100",
    glow: "shadow-md shadow-green-500/20",
  },
  heroic: {
    border:
      "border-blue-300 dark:border-blue-600 group-hover:border-blue-400 dark:group-hover:border-blue-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    text: "text-blue-700 dark:text-blue-400",
    badge: "bg-blue-500 text-white dark:text-blue-100",
    glow: "shadow-md shadow-blue-500/25",
  },
  epic: {
    border:
      "border-purple-300 dark:border-purple-600 group-hover:border-purple-400 dark:group-hover:border-purple-500",
    bg: "bg-purple-50 dark:bg-purple-900/20",
    text: "text-purple-700 dark:text-purple-400",
    badge: "bg-purple-500 text-white dark:text-purple-100",
    glow: "shadow-lg shadow-purple-500/25",
  },
  legendary: {
    border:
      "group-hover:border-orange-400 dark:group-hover:border-orange-500 bg-gradient-to-r from-orange-500/20 to-yellow-400/20 border-orange-400 dark:border-orange-500",
    bg: "bg-orange-50 dark:bg-orange-900/20",
    text: "text-orange-700 dark:text-orange-400",
    badge: "bg-orange-500 text-white dark:text-orange-100",
    glow: "shadow-xl shadow-orange-500/40",
  },
  mythic: {
    border:
      "group-hover:border-red-400 dark:group-hover:border-red-300 bg-gradient-to-r from-red-600/30 via-orange-500/30 to-yellow-400/30 border-red-500 dark:border-red-400",
    bg: "bg-red-50 dark:bg-red-900/20",
    text: "text-red-700 dark:text-red-400",
    badge: "bg-red-500 text-white dark:text-red-100",
    glow: "shadow-2xl shadow-red-500/50 animate-pulse",
  },
};
