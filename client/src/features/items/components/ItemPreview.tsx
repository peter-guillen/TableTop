import { NavLink } from "react-router-dom";
import {
  GiBroadsword,
  GiShield,
  GiRing,
  GiHealthPotion,
  GiGemPendant,
} from "react-icons/gi";

import { Item, ItemCategory, Rarity } from "../itemTypes.ts";

interface ItemPreviewProps {
  items: Item[];
}

// Rarity ladder runs cool to warm; the top two tiers get a solid fill so a
// legendary never reads like a common
const RARITY_BADGE: Record<Rarity, string> = {
  common:
    "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-300 dark:border-stone-600",
  uncommon:
    "bg-lime-50 dark:bg-lime-500/10 text-lime-700 dark:text-lime-300 border-lime-300 dark:border-lime-500/40",
  rare: "bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-300 dark:border-sky-500/40",
  heroic:
    "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-500/40",
  epic: "bg-fuchsia-50 dark:bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-300 border-fuchsia-300 dark:border-fuchsia-500/40",
  legendary: "bg-amber-400 text-stone-950 border-amber-500 dark:border-amber-300",
  mythic:
    "bg-rose-600 text-white border-rose-700 dark:bg-rose-500 dark:border-rose-400",
};

// Icon by category — the icon carries the category's identity, so the card
// itself stays in the stone/emerald palette
const categoryIconMap: Record<ItemCategory, typeof GiBroadsword> = {
  weapon: GiBroadsword,
  armor: GiShield,
  accessory: GiRing,
  consumable: GiHealthPotion,
  trinket: GiGemPendant,
};

export const ItemPreview = ({ items }: ItemPreviewProps) => {
  return (
    <div className="space-y-3">
      {items.map((item) => {
        const IconComponent =
          categoryIconMap[item.category as ItemCategory] ?? GiGemPendant;

        const damageEffect = item.healthEffects.find(
          (e) => e.direction === "damage",
        );
        const healingEffect = item.healthEffects.find(
          (e) => e.direction === "healing",
        );

        // Damage display: flat value takes priority, then dice notation
        let damageDisplay: string | null = null;
        if (damageEffect?.flat != null && damageEffect.flat !== 0) {
          damageDisplay = `${damageEffect.flat}`;
        } else if (
          damageEffect?.diceCount != null &&
          damageEffect?.diceSize != null &&
          damageEffect.diceCount > 0
        ) {
          damageDisplay = `${damageEffect.diceCount}d${damageEffect.diceSize}`;
        }

        // Healing display: same priority as damage
        let healingDisplay: string | null = null;
        if (healingEffect?.flat != null && healingEffect.flat !== 0) {
          healingDisplay = `${healingEffect.flat}`;
        } else if (
          healingEffect?.diceCount != null &&
          healingEffect?.diceSize != null &&
          healingEffect.diceCount > 0
        ) {
          healingDisplay = `${healingEffect.diceCount}d${healingEffect.diceSize}`;
        }

        const resistedTypes = Array.from(
          new Set(item.resistances.map((r) => r.damageType).filter(Boolean)),
        );

        return (
          <NavLink
            key={item._id ?? item.name}
            to={`/items/${item._id}`}
            className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 dark:focus-visible:ring-emerald-400"
          >
            <div className="group rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-4 transition-colors hover:border-emerald-600 dark:hover:border-emerald-500">
              <div className="flex items-start justify-between">
                {/* Left Section - Icon and Main Info */}
                <div className="flex flex-1 min-w-0 items-start space-x-3">
                  <div className="shrink-0 rounded-lg bg-emerald-700 p-2 text-white dark:bg-emerald-500 dark:text-stone-950">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Name */}
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold break-words text-stone-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors duration-200">
                        {item.name}
                      </h3>
                      {/* Mobile badges sit under the name instead of squeezing the text column */}
                      <div className="flex flex-wrap gap-1.5 sm:hidden">
                        <span className="px-2 py-0.5 rounded-full border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 text-xs font-medium capitalize whitespace-nowrap text-stone-700 dark:text-stone-300">
                          {item.category}
                        </span>
                        {item.rarity && (
                          <span
                            className={`px-2 py-0.5 rounded-full border text-xs font-semibold capitalize whitespace-nowrap ${RARITY_BADGE[item.rarity]}`}
                          >
                            {item.rarity}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-stone-500 dark:text-stone-400 line-clamp-2 mb-3">
                      {item.description}
                    </p>

                    {/* Stats Row */}
                    <div className="flex flex-wrap gap-x-5 gap-y-2">
                      {damageDisplay && (
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-stone-400 dark:text-stone-500">
                            Damage
                          </p>
                          <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">
                            {damageDisplay}
                          </p>
                        </div>
                      )}
                      {healingDisplay && (
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-stone-400 dark:text-stone-500">
                            Healing
                          </p>
                          <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">
                            {healingDisplay}
                          </p>
                        </div>
                      )}
                      {!!item.value && (
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-stone-400 dark:text-stone-500">
                            Value
                          </p>
                          <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                            {item.value}
                          </p>
                        </div>
                      )}
                      {item.category === "trinket" &&
                        item.selfCharges?.recharge && (
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-stone-400 dark:text-stone-500">
                              Recharge
                            </p>
                            <p className="text-sm font-semibold text-stone-800 dark:text-stone-200 capitalize">
                              {item.selfCharges.recharge.replace("_", " ")}
                            </p>
                          </div>
                        )}
                      {/* Granted Powers — any category can grant (weapon → technique, enchanted item → spell) */}
                      {item.grantedPowers.length > 0 && (
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-stone-400 dark:text-stone-500">
                            Grants
                          </p>
                          <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                            {item.grantedPowers.length} power
                            {item.grantedPowers.length === 1 ? "" : "s"}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Weapon Properties */}
                    {item.category === "weapon" &&
                      item.properties.length > 0 && (
                        <div className="flex items-center flex-wrap gap-1.5 mt-3">
                          <span className="text-[10px] uppercase tracking-widest text-stone-400 dark:text-stone-500 mr-1">
                            Properties
                          </span>
                          {item.properties.map((property) => (
                            <span
                              key={property}
                              className="rounded-full border border-stone-200 dark:border-stone-700 px-2 py-0.5 text-xs text-stone-600 dark:text-stone-300 capitalize"
                            >
                              {property}
                            </span>
                          ))}
                        </div>
                      )}

                    {/* Armor Resistances */}
                    {item.category === "armor" && resistedTypes.length > 0 && (
                      <div className="flex items-center flex-wrap gap-1.5 mt-3">
                        <span className="text-[10px] uppercase tracking-widest text-stone-400 dark:text-stone-500 mr-1">
                          Resists
                        </span>
                        {resistedTypes.map((type) => (
                          <span
                            key={type}
                            className="rounded-full border border-stone-200 dark:border-stone-700 px-2 py-0.5 text-xs text-stone-600 dark:text-stone-300 capitalize"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Accessory Stat Modifiers */}
                    {item.category === "accessory" &&
                      item.statModifiers.length > 0 && (
                        <div className="flex items-center flex-wrap gap-1.5 mt-3">
                          <span className="text-[10px] uppercase tracking-widest text-stone-400 dark:text-stone-500 mr-1">
                            Boosts
                          </span>
                          {item.statModifiers.map((modifier, idx) => (
                            <span
                              key={`${modifier.stat}-${idx}`}
                              className="rounded-full border border-stone-200 dark:border-stone-700 px-2 py-0.5 text-xs text-stone-600 dark:text-stone-300 capitalize"
                            >
                              {modifier.stat} {modifier.value > 0 ? "+" : ""}
                              {modifier.value}
                            </span>
                          ))}
                        </div>
                      )}
                  </div>
                </div>

                {/* Right Section - Category / Rarity Badges */}
                <div className="hidden sm:flex shrink-0 ml-3 flex-col items-end space-y-2">
                  <div className="px-3 py-1 rounded-full border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 text-xs font-medium capitalize whitespace-nowrap text-stone-700 dark:text-stone-300">
                    {item.category}
                  </div>
                  {item.rarity && (
                    <div
                      className={`px-3 py-1 rounded-full border text-xs font-semibold capitalize whitespace-nowrap ${RARITY_BADGE[item.rarity]}`}
                    >
                      {item.rarity}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};
