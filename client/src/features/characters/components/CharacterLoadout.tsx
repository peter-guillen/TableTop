import type { CharacterBaseProps } from "../charactersTypes";
import { useGetAllItemsQuery } from "../../items/api/itemApi";

export const CharacterLoadout = ({ formData }: CharacterBaseProps) => {
  const { equipment } = formData;
  const { data: items = [] } = useGetAllItemsQuery();

  const { mainHand, offHand } = equipment.weapons;
  const weaponSlots =
    mainHand !== null && mainHand === offHand
      ? [{ label: "Both Hands", id: mainHand }]
      : [
          { label: "Main Hand", id: mainHand },
          { label: "Off Hand", id: offHand },
        ];

  const armor = items.find((i) => i._id === equipment.armor);
  const armorDetails = armor
    ? [
        ...armor.statModifiers.map(
          (m) => `${m.stat} ${m.value > 0 ? "+" : ""}${m.value}`,
        ),
        ...armor.resistances.map((r) => `${r.damageType} ${r.rule}`),
      ]
    : [];

  return (
    <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-4">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-2">
        Loadout
      </p>
      {weaponSlots.map(({ label, id }) => {
        const weapon = items.find((i) => i._id === id);
        const damage = weapon
          ? weapon.healthEffects
              .filter((e) => e.direction === "damage")
              .map(
                (e) =>
                  `${e.diceCount}d${e.diceSize}${e.flat ? ` + ${e.flat}` : ""} ${e.damageType}`,
              )
          : [];
        return (
          <div
            key={label}
            className="py-1.5 border-b border-stone-100 dark:border-stone-800 last:border-0"
          >
            <div className="flex justify-between items-center">
              <span className="text-xs text-stone-500 dark:text-stone-400">
                {label}
              </span>
              <span className="text-xs font-semibold text-stone-900 dark:text-white">
                {weapon?.name ?? "—"}
              </span>
            </div>
            {weapon && (
              <p className="text-[11px] text-right text-stone-400 dark:text-stone-500 mt-0.5">
                {[...damage, weapon.handedness?.replace(/_/g, " ")]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            )}
          </div>
        );
      })}
      <div className="py-1.5 border-b border-stone-100 dark:border-stone-800 last:border-0">
        <div className="flex justify-between items-center">
          <span className="text-xs text-stone-500 dark:text-stone-400">
            Armor
          </span>
          <span className="text-xs font-semibold text-stone-900 dark:text-white">
            {armor?.name ?? "—"}
          </span>
        </div>
        {armorDetails.length > 0 && (
          <p className="text-[11px] text-right text-stone-400 dark:text-stone-500 mt-0.5">
            {armorDetails.join(" · ")}
          </p>
        )}
      </div>
    </div>
  );
};
