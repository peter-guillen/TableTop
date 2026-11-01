import { useState } from "react";

import { useGetAllItemsQuery } from "../../items/api/itemApi";
import { useGetAllPowersQuery } from "../../powers/api/powerApi";
import type { CharacterSectionProps } from "../charactersTypes";

export const ArmorsTab = ({ formData, patchForm }: CharacterSectionProps) => {
  const {
    data: items = [],
    isLoading: itemsLoading,
    isError: itemsError,
  } = useGetAllItemsQuery();
  const { data: powers = [] } = useGetAllPowersQuery();
  const [expanded, setExpanded] = useState<string | null>(null);

  if (itemsLoading)
    return <p className="text-sm text-stone-400">Loading armor...</p>;
  if (itemsError)
    return <p className="text-sm text-red-500">Failed to load armor.</p>;

  const armors = items.filter((item) => item.category === "armor");
  const equippedId = formData.equipment.armor;

  function toggleArmor(id: string) {
    patchForm({
      equipment: {
        ...formData.equipment,
        armor: equippedId === id ? null : id,
      },
    });
  }

  return (
    <div className="flex flex-col gap-2">
      {armors.length === 0 && (
        <p className="text-sm italic text-stone-400 dark:text-stone-500">
          No armor available.
        </p>
      )}
      {armors.map((armor) => {
        if (!armor._id) return null;
        const id = armor._id;
        const sel = equippedId === id;
        const open = expanded === id;
        const modifiers = armor.statModifiers.map(
          (m) => `${m.stat} ${m.value > 0 ? "+" : ""}${m.value}`,
        );
        const resistances = armor.resistances.map(
          (r) => `${r.damageType} ${r.rule}`,
        );
        const grantedNames = armor.grantedPowers
          .map((g) => powers.find((p) => p._id === g.power)?.name)
          .filter((name): name is string => Boolean(name));

        return (
          <div
            key={id}
            className={`rounded-xl border overflow-hidden transition-all duration-200 ${
              sel
                ? "bg-emerald-50 dark:bg-emerald-800/20 border-emerald-300 dark:border-emerald-500/40"
                : "bg-white dark:bg-stone-800/50 border-stone-200 dark:border-stone-700/50"
            }`}
          >
            <div
              className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-700/20 transition-colors"
              onClick={() => setExpanded(open ? null : id)}
            >
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-sm font-semibold ${
                    sel
                      ? "text-emerald-700 dark:text-emerald-400"
                      : "text-stone-900 dark:text-white"
                  }`}
                >
                  {armor.name}
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full border uppercase tracking-wide bg-amber-100 dark:bg-amber-800/30 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-500/40">
                  {armor.rarity}
                </span>
                {sel && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full border uppercase tracking-wide bg-emerald-100 dark:bg-emerald-800/30 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/40">
                    Equipped
                  </span>
                )}
              </div>
              <span className="text-[10px] text-stone-400 dark:text-stone-500 ml-2">
                {open ? "▲" : "▼"}
              </span>
            </div>

            {open && (
              <div className="px-4 pb-4 border-t border-stone-100 dark:border-stone-700/50">
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mt-3">
                  {armor.description}
                </p>
                {modifiers.length > 0 && (
                  <p className="text-xs text-stone-400 dark:text-stone-500 mt-2">
                    {modifiers.join(", ")}
                  </p>
                )}
                {resistances.length > 0 && (
                  <p className="text-xs text-stone-400 dark:text-stone-500 mt-2">
                    {resistances.join(", ")}
                  </p>
                )}
                {grantedNames.length > 0 && (
                  <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mt-2">
                    Grants: {grantedNames.join(", ")}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => toggleArmor(id)}
                  className={`mt-3 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all duration-150 cursor-pointer ${
                    sel
                      ? "bg-emerald-50 dark:bg-emerald-800/30 border-emerald-300 dark:border-emerald-500/40 text-emerald-700 dark:text-emerald-300"
                      : "bg-white dark:bg-stone-700/40 border-stone-200 dark:border-stone-600/40 text-stone-600 dark:text-stone-300 hover:border-emerald-300 dark:hover:border-emerald-500/40"
                  }`}
                >
                  {sel ? "Unequip" : "Equip"}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
