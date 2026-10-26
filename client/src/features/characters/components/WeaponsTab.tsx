import { useState } from "react";

import { useGetAllItemsQuery } from "../../items/api/itemApi";
import { useGetAllPowersQuery } from "../../powers/api/powerApi";
import type { CharacterSectionProps } from "../charactersTypes";

type WeaponSlot = "mainHand" | "offHand";

export const WeaponsTab = ({ formData, patchForm }: CharacterSectionProps) => {
  const {
    data: items = [],
    isLoading: itemsLoading,
    isError: itemsError,
  } = useGetAllItemsQuery();
  const { data: powers = [] } = useGetAllPowersQuery();
  const [expanded, setExpanded] = useState<string | null>(null);

  if (itemsLoading)
    return <p className="text-sm text-slate-400">Loading weapons...</p>;
  if (itemsError)
    return <p className="text-sm text-red-500">Failed to load weapons.</p>;

  const weapons = items.filter((item) => item.category === "weapon");
  const { mainHand, offHand } = formData.equipment.weapons;
  const twoHandedEquipped = mainHand !== null && mainHand === offHand;

  function patchWeapons(next: {
    mainHand: string | null;
    offHand: string | null;
  }) {
    patchForm({
      equipment: {
        ...formData.equipment,
        weapons: next,
      },
    });
  }

  function equipWeapon(id: string, slot: WeaponSlot, twoHanded: boolean) {
    if (twoHanded) {
      patchWeapons({ mainHand: id, offHand: id });
      return;
    }
    const next = twoHandedEquipped
      ? { mainHand: null, offHand: null }
      : { mainHand, offHand };
    const other: WeaponSlot = slot === "mainHand" ? "offHand" : "mainHand";
    if (next[other] === id) next[other] = null;
    patchWeapons({ ...next, [slot]: id });
  }

  function unequipWeapon(id: string) {
    patchWeapons({
      mainHand: mainHand === id ? null : mainHand,
      offHand: offHand === id ? null : offHand,
    });
  }

  return (
    <div className="flex flex-col gap-2">
      {weapons.length === 0 && (
        <p className="text-sm italic text-slate-400 dark:text-slate-500">
          No weapons available.
        </p>
      )}
      {weapons.map((weapon) => {
        if (!weapon._id) return null;
        const id = weapon._id;
        const sel = mainHand === id || offHand === id;
        const hands = weapon.handedness;
        const canMain =
          hands === "one_handed" ||
          hands === "main_hand_only" ||
          hands === "versatile";
        const canOff =
          hands === "one_handed" ||
          hands === "off_hand_only" ||
          hands === "versatile";
        const canBoth = hands === "two_handed" || hands === "versatile";
        const slotLabel =
          mainHand === id && offHand === id
            ? "Both hands"
            : mainHand === id
              ? "Main hand"
              : "Off hand";
        const open = expanded === id;
        const damageTypes = [
          ...new Set(weapon.healthEffects.map((e) => e.damageType)),
        ];
        const techniqueNames = [
          ...weapon.grantedPowers
            .map((g) => powers.find((p) => p._id === g.power)?.name)
            .filter((name): name is string => Boolean(name)),
          ...weapon.uniqueSkills,
        ];
        const buttonClass = `text-xs font-bold px-3 py-1.5 rounded-lg border transition-all duration-150 cursor-pointer ${
          sel
            ? "bg-cyan-50 dark:bg-cyan-800/30 border-cyan-300 dark:border-cyan-500/40 text-cyan-700 dark:text-cyan-300"
            : "bg-white dark:bg-slate-700/40 border-slate-200 dark:border-slate-600/40 text-slate-600 dark:text-slate-300 hover:border-cyan-300 dark:hover:border-cyan-500/40"
        }`;

        return (
          <div
            key={id}
            className={`rounded-xl border overflow-hidden transition-all duration-200 ${
              sel
                ? "bg-cyan-50 dark:bg-cyan-800/20 border-cyan-300 dark:border-cyan-500/40"
                : "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50"
            }`}
          >
            <div
              className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors"
              onClick={() => setExpanded(open ? null : id)}
            >
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-sm font-semibold ${
                    sel
                      ? "text-cyan-600 dark:text-cyan-400"
                      : "text-slate-900 dark:text-white"
                  }`}
                >
                  {weapon.name}
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full border uppercase tracking-wide bg-orange-100 dark:bg-orange-800/30 text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-500/40">
                  {weapon.rarity}
                </span>
                {sel && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full border uppercase tracking-wide bg-cyan-100 dark:bg-cyan-800/30 text-cyan-700 dark:text-cyan-300 border-cyan-300 dark:border-cyan-500/40">
                    {slotLabel}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 ml-2">
                {open ? "▲" : "▼"}
              </span>
            </div>

            {open && (
              <div className="px-4 pb-4 border-t border-slate-100 dark:border-slate-700/50">
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-3">
                  {weapon.description}
                </p>
                {damageTypes.length > 0 && (
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                    {damageTypes.join(", ")}
                  </p>
                )}
                {techniqueNames.length > 0 && (
                  <p className="text-xs font-bold text-orange-600 dark:text-orange-400 mt-2">
                    Techniques: {techniqueNames.join(", ")}
                  </p>
                )}
                <div className="flex gap-2 mt-3">
                  {sel ? (
                    <button
                      type="button"
                      onClick={() => unequipWeapon(id)}
                      className={buttonClass}
                    >
                      Unequip
                    </button>
                  ) : (
                    <>
                      {canMain && (
                        <button
                          type="button"
                          onClick={() => equipWeapon(id, "mainHand", false)}
                          className={buttonClass}
                        >
                          Main hand
                        </button>
                      )}
                      {canOff && (
                        <button
                          type="button"
                          onClick={() => equipWeapon(id, "offHand", false)}
                          className={buttonClass}
                        >
                          Off hand
                        </button>
                      )}
                      {canBoth && (
                        <button
                          type="button"
                          onClick={() => equipWeapon(id, "mainHand", true)}
                          className={buttonClass}
                        >
                          Both hands
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
