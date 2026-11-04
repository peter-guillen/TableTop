import { useState } from "react";

import { useGetAllItemsQuery } from "../../items/api/itemApi";
import { useGetAllPowersQuery } from "../../powers/api/powerApi";
import type { CharacterSectionProps } from "../charactersTypes";
import type { Rarity } from "../../items/itemTypes";

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
    return <p className="text-sm text-stone-400">Loading weapons...</p>;
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
        <p className="text-sm italic text-stone-400 dark:text-stone-500">
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
        // A technique is available if the weapon has at least one of its properties
        const techniqueNames = powers
          .filter(
            (p) =>
              p.kind === "technique" &&
              (p.requirements?.properties ?? []).some((prop) =>
                (weapon.properties as string[]).includes(prop),
              ),
          )
          .map((p) =>
            (p.requirements?.minLevel ?? 1) > formData.progression.level
              ? `${p.name} (Lv ${p.requirements.minLevel})`
              : p.name,
          );
        const grantedNames = [
          ...weapon.grantedPowers
            .map((g) => powers.find((p) => p._id === g.power)?.name)
            .filter((name): name is string => Boolean(name)),
          ...weapon.uniqueSkills,
        ];
        const buttonClass = `text-xs font-bold px-3 py-1.5 rounded-lg border transition-all duration-150 cursor-pointer ${
          sel
            ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-300 dark:border-emerald-500/40 text-emerald-700 dark:text-emerald-300"
            : "bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:border-emerald-300 dark:hover:border-emerald-500/40"
        }`;

        return (
          <div
            key={id}
            className={`rounded-xl border overflow-hidden transition-all duration-200 ${
              sel
                ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-300 dark:border-emerald-500/40"
                : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800"
            }`}
          >
            <div
              className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-800/60 transition-colors"
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
                  {weapon.name}
                </span>
                {weapon.rarity && (
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border uppercase tracking-wide ${RARITY_BADGE[weapon.rarity]}`}
                  >
                    {weapon.rarity}
                  </span>
                )}
                {sel && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full border uppercase tracking-wide bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/40">
                    {slotLabel}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-stone-400 dark:text-stone-500 ml-2">
                {open ? "▲" : "▼"}
              </span>
            </div>

            {open && (
              <div className="px-4 pb-4 border-t border-stone-100 dark:border-stone-800">
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mt-3">
                  {weapon.description}
                </p>
                {damageTypes.length > 0 && (
                  <p className="text-xs text-stone-400 dark:text-stone-500 mt-2">
                    {damageTypes.join(", ")}
                  </p>
                )}
                {techniqueNames.length > 0 && (
                  <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mt-2">
                    Techniques: {techniqueNames.join(", ")}
                  </p>
                )}
                {grantedNames.length > 0 && (
                  <p className="text-xs font-bold text-amber-700 dark:text-amber-400 mt-2">
                    Grants: {grantedNames.join(", ")}
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
