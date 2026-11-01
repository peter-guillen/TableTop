// Shared Tailwind class strings. Each constant names a ROLE, not a color, and
// carries both its light and dark variants so components never write `dark:`.
//
// Palette:
//   Neutral   -> stone   (warm, parchment-like grays)
//   Primary   -> amber   (main calls to action, numbers, key highlights)
//   Secondary -> emerald (secondary actions, links, icon tiles)
//   Danger    -> red     (logout / destructive actions only)
//
// Always write full class names here; Tailwind can't detect `bg-${color}-500`.

// Surfaces (backgrounds)
export const surface = "bg-stone-50 dark:bg-stone-950";
export const surfaceRaised = "bg-white dark:bg-stone-900";
export const surfaceSunken = "bg-stone-100 dark:bg-stone-900";
// Dark band in both modes, used for the final call to action and the footer
export const surfaceInverse = "bg-stone-900 dark:bg-black";

// Text
export const ink = "text-stone-900 dark:text-stone-100";
export const inkMuted = "text-stone-700 dark:text-stone-300";
export const inkSubtle = "text-stone-500 dark:text-stone-400";
export const inkPrimary = "text-amber-700 dark:text-amber-400";
export const inkAccent = "text-emerald-700 dark:text-emerald-400";
export const inkDanger = "text-red-700 dark:text-red-400";

// Borders
export const line = "border-stone-200 dark:border-stone-800";
export const lineStrong = "border-stone-300 dark:border-stone-700";

// Interaction
export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50 dark:focus-visible:ring-emerald-400 dark:focus-visible:ring-offset-stone-950";

export const hoverRow =
  "hover:bg-stone-100 hover:text-stone-900 dark:hover:bg-stone-800 dark:hover:text-stone-100";

// Buttons
const buttonBase = `inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors ${focusRing}`;

// Amber with near-black text: high contrast in both modes
export const primaryButton = `${buttonBase} bg-amber-500 text-stone-950 hover:bg-amber-400`;

export const secondaryButton = `${buttonBase} border-2 border-emerald-700 text-emerald-800 hover:bg-emerald-700 hover:text-white dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-emerald-500 dark:hover:text-stone-950`;

// Cards
export const card = `rounded-xl border ${line} ${surfaceRaised}`;
export const cardInteractive = `${card} transition-colors hover:border-emerald-600 dark:hover:border-emerald-500 ${focusRing}`;

export const iconTile =
  "rounded-lg bg-emerald-700 p-3 text-white dark:bg-emerald-500 dark:text-stone-950";

// Navigation
// Solid amber pill in dark mode; a translucent tint turns muddy on stone-900
const navActive =
  "bg-amber-100 text-amber-900 dark:bg-amber-400 dark:text-stone-950";
const navIdle =
  "text-stone-700 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-200 dark:hover:bg-stone-800 dark:hover:text-white";

// Desktop top bar: the active link (or the dropdown holding the active page)
// gets an amber bar underneath
const navUnderline =
  "after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:rounded-full after:bg-amber-500 after:content-['']";

export const navLink = (isActive: boolean) =>
  `relative flex items-center gap-2 rounded-md px-3 py-2 font-medium transition-colors ${focusRing} ${
    isActive
      ? `text-stone-900 dark:text-white ${navUnderline}`
      : navIdle
  }`;

// Mobile menu: stacked list, so the active row is a filled pill instead
export const navLinkMobile = (isActive: boolean) =>
  `flex items-center gap-2 rounded-md px-3 py-2 font-medium transition-colors ${focusRing} ${
    isActive ? navActive : navIdle
  }`;

export const dropdownItem = (isActive: boolean) =>
  `flex items-center gap-2 rounded px-2 py-1.5 text-sm font-medium transition-colors ${focusRing} ${
    isActive ? navActive : navIdle
  }`;

export const dropdownPanel = `rounded-lg border py-2 shadow-xl ${line} ${surfaceRaised}`;

// Forms
export const formCard = `mb-6 rounded-2xl border p-8 shadow-sm ${line} ${surfaceRaised}`;
export const formHeading = `mb-4 flex items-center gap-2 text-xl font-bold ${inkAccent}`;
export const formTitle = `text-4xl font-extrabold tracking-tight ${ink}`;
export const formLabel = `block text-sm font-medium ${inkMuted}`;
export const formHint = `mt-1 text-xs ${inkSubtle}`;

export const formInput = `w-full rounded-lg border px-4 py-3 transition-colors ${lineStrong} bg-white text-stone-900 placeholder-stone-400 dark:bg-stone-950 dark:text-stone-100 dark:placeholder-stone-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-600 dark:focus:ring-emerald-400 disabled:opacity-40`;

export const formCheckbox =
  "h-4 w-4 rounded border-stone-300 text-emerald-700 focus:ring-2 focus:ring-emerald-600 dark:border-stone-600 dark:bg-stone-950 dark:text-emerald-500 dark:focus:ring-emerald-400";

export const formCheckLabel = `flex cursor-pointer items-center gap-2 ${inkMuted}`;
export const formCheckTile = `flex cursor-pointer items-center gap-2 rounded-lg border p-3 transition-colors ${line} ${surfaceSunken} ${inkMuted} hover:border-emerald-600 dark:hover:border-emerald-500`;

// Small "+ Add" style buttons inside forms
export const formChipButton =
  "flex items-center gap-1 rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800 transition-colors hover:bg-emerald-100 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300 dark:hover:bg-emerald-500/20";

export const formRemoveButton =
  "flex items-center justify-center rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-red-700 transition-colors hover:bg-red-100 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/20";

export const ghostButton = `${buttonBase} border ${lineStrong} ${inkMuted} ${hoverRow}`;
