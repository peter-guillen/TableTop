// export const WeaponsTab = ({
//   formData,
//   patchForm,
//   library,
//   // onToggleWeapon,
// }) => {
//   const weapons = library?.weapons || [];

//   const selectedWeapon = weapons.find(
//     (w) => w.name === formData.selectedWeapon,
//   );
//   const selectedOffhand = weapons.find(
//     (w) => w.name === formData.selectedOffhand,
//   );

//   const isTwoHanded = selectedWeapon?.hands === 2;

//   const oneHandedWeapons = weapons.filter((w) => w.hands === 1);
//   const twoHandedWeapons = weapons.filter((w) => w.hands === 2);

//   const allTechniques = [
//     ...(selectedWeapon?.uniqueTechniques || []),
//     ...(!isTwoHanded ? selectedOffhand?.uniqueTechniques || [] : []),
//   ];

//   function handleMainHandChange(name) {
//     const next = weapons.find((w) => w.name === name);
//     const willBeTwoHanded = next?.hands === 2;
//     patchForm({
//       selectedWeapon: name,
//       selectedOffhand: willBeTwoHanded ? "" : formData.selectedOffhand,
//     });
//     // onToggleWeapon(name);
//   }

//   function handleOffhandChange(name) {
//     patchForm({ selectedOffhand: name });
//   }

//   return (
//     <div className="grid grid-cols-[1fr_2fr] gap-4">
//       {/* Left: weapon selection */}
//       <div className="flex flex-col gap-3">
//         {/* Main hand */}
//         <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl p-3">
//           <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
//             Main Hand
//           </p>
//           {/* One-handed */}
//           <p className="text-[9px] font-bold uppercase tracking-widest text-orange-500 dark:text-orange-400 mb-1.5">
//             One-Handed
//           </p>
//           <div className="flex flex-col gap-1 mb-3">
//             {weapons.map((w) => {
//               // const sel = formData.selectedWeapon === w.name;
//               return (
//                 <button
//                   type="button"
//                   key={w._id || w.name}
//                   onClick={() => handleMainHandChange(w.name)}
//                   className={`text-left px-3 py-2 rounded-lg border text-xs font-semibold transition-all duration-150 ${
//                     w
//                       ? "bg-orange-50 dark:bg-orange-800/20 border-orange-300 dark:border-orange-500/40 text-orange-600 dark:text-orange-400"
//                       : "bg-white dark:bg-slate-800/30 border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 hover:border-orange-300 dark:hover:border-orange-500/30"
//                   }`}
//                 >
//                   {w.name}
//                 </button>
//               );
//             })}
//           </div>
//           {/* <div className="flex flex-col gap-1 mb-3">
//             {oneHandedWeapons.map((w) => {
//               const sel = formData.selectedWeapon === w.name;
//               return (
//                 <button
//                 type="button"
//                   key={w._id || w.name}
//                   onClick={() => handleMainHandChange(w.name)}
//                   className={`text-left px-3 py-2 rounded-lg border text-xs font-semibold transition-all duration-150 ${
//                     sel
//                       ? "bg-orange-50 dark:bg-orange-800/20 border-orange-300 dark:border-orange-500/40 text-orange-600 dark:text-orange-400"
//                       : "bg-white dark:bg-slate-800/30 border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 hover:border-orange-300 dark:hover:border-orange-500/30"
//                   }`}
//                 >
//                   {w.name}
//                 </button>
//               );
//             })}
//           </div> */}

//           {/* Two-handed */}
//           <p className="text-[9px] font-bold uppercase tracking-widest text-orange-500 dark:text-orange-400 mb-1.5">
//             Two-Handed
//           </p>
//           <div className="flex flex-col gap-1">
//             {twoHandedWeapons.map((w) => {
//               const sel = formData.selectedWeapon === w.name;
//               return (
//                 <button
//                   type="button"
//                   key={w._id || w.name}
//                   onClick={() => handleMainHandChange(w.name)}
//                   className={`text-left px-3 py-2 rounded-lg border text-xs font-semibold transition-all duration-150 ${
//                     sel
//                       ? "bg-orange-50 dark:bg-orange-800/20 border-orange-300 dark:border-orange-500/40 text-orange-600 dark:text-orange-400"
//                       : "bg-white dark:bg-slate-800/30 border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 hover:border-orange-300 dark:hover:border-orange-500/30"
//                   }`}
//                 >
//                   {w.name}
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Off hand */}
//         <div
//           className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl p-3"
//           style={{
//             opacity: isTwoHanded ? 0.4 : 1,
//             pointerEvents: isTwoHanded ? "none" : "auto",
//           }}
//         >
//           <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
//             Off Hand{" "}
//             {isTwoHanded && (
//               <span className="text-slate-400 dark:text-slate-600 normal-case tracking-normal font-normal">
//                 — Two-Handed
//               </span>
//             )}
//           </p>
//           <div className="flex flex-col gap-1">
//             {oneHandedWeapons.map((w) => {
//               const sel = formData.selectedOffhand === w.name;
//               return (
//                 <button
//                   type="button"
//                   key={w._id || w.name}
//                   onClick={() => handleOffhandChange(sel ? "" : w.name)}
//                   className={`text-left px-3 py-2 rounded-lg border text-xs font-semibold transition-all duration-150 ${
//                     sel
//                       ? "bg-orange-50 dark:bg-orange-800/20 border-orange-300 dark:border-orange-500/40 text-orange-600 dark:text-orange-400"
//                       : "bg-white dark:bg-slate-800/30 border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 hover:border-orange-300 dark:hover:border-orange-500/30"
//                   }`}
//                 >
//                   {w.name}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* Right: techniques */}
//       <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl p-4">
//         <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">
//           Techniques
//         </p>

//         {!selectedWeapon ? (
//           <p className="text-sm italic text-slate-400 dark:text-slate-500">
//             Select a weapon to see its techniques.
//           </p>
//         ) : allTechniques.length === 0 ? (
//           <p className="text-sm italic text-slate-400 dark:text-slate-500">
//             No techniques for this loadout.
//           </p>
//         ) : (
//           <div className="flex flex-col gap-2">
//             {allTechniques.map((t, i) => (
//               <div
//                 key={t._id || i}
//                 className="rounded-lg border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/30 px-4 py-3"
//               >
//                 <div className="flex justify-between items-start gap-2 mb-1">
//                   <p className="text-sm font-semibold text-slate-900 dark:text-white">
//                     {t.name}
//                   </p>
//                   {t.cost && (
//                     <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full border uppercase tracking-wide whitespace-nowrap bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-600/40">
//                       {t.cost}
//                     </span>
//                   )}
//                 </div>
//                 {t.desc && (
//                   <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
//                     {t.desc}
//                   </p>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

import { useState } from "react";

import { useGetAllWeaponsQuery } from "../../weapons/api/weaponApi";
import { useGetAllSpellsQuery } from "../../spells/api/spellApi";
import type { CharacterSectionProps } from "../charactersTypes";

// Same cap as the other selection tabs — see SpellsTab.
const WEAPON_CAP = 5;

export const WeaponsTab = ({ formData, patchForm }: CharacterSectionProps) => {
  const {
    data: weapons = [],
    isLoading: weaponsLoading,
    isError: weaponsError,
  } = useGetAllWeaponsQuery();
  const { data: spells = [] } = useGetAllSpellsQuery();
  const [expanded, setExpanded] = useState<string | null>(null);

  if (weaponsLoading)
    return <p className="text-sm text-slate-400">Loading weapons...</p>;
  if (weaponsError)
    return <p className="text-sm text-red-500">Failed to load weapons.</p>;

  function toggleWeapon(id: string) {
    const selected = formData.selectedWeapons;
    if (selected.includes(id)) {
      patchForm({ selectedWeapons: selected.filter((w) => w !== id) });
      return;
    }
    if (selected.length >= WEAPON_CAP) return;
    patchForm({ selectedWeapons: [...selected, id] });
  }

  function resolveSkillNames(skillIds: string[]) {
    return skillIds
      .map((id) => spells.find((s) => s._id === id)?.name)
      .filter((name): name is string => Boolean(name));
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
        const sel = formData.selectedWeapons.includes(weapon._id);
        const maxed = formData.selectedWeapons.length >= WEAPON_CAP && !sel;
        const open = expanded === weapon._id;
        const techniqueNames = [
          ...resolveSkillNames(weapon.skills),
          ...weapon.uniqueSkills,
        ];

        return (
          <div
            key={weapon._id}
            className={`rounded-xl border overflow-hidden transition-all duration-200 ${
              sel
                ? "bg-cyan-50 dark:bg-cyan-800/20 border-cyan-300 dark:border-cyan-500/40"
                : "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50"
            }`}
          >
            <div
              className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors"
              onClick={() => setExpanded(open ? null : weapon._id!)}
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
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full border uppercase tracking-wide bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-600/40">
                  {weapon.category}
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full border uppercase tracking-wide bg-orange-100 dark:bg-orange-800/30 text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-500/40">
                  {weapon.rarity}
                </span>
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
                {weapon.damageType.length > 0 && (
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                    {weapon.damageType.join(", ")}
                  </p>
                )}
                {techniqueNames.length > 0 && (
                  <p className="text-xs font-bold text-orange-600 dark:text-orange-400 mt-2">
                    Techniques: {techniqueNames.join(", ")}
                  </p>
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWeapon(weapon._id!);
                  }}
                  disabled={maxed}
                  className={`mt-3 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all duration-150 ${
                    sel
                      ? "bg-cyan-50 dark:bg-cyan-800/30 border-cyan-300 dark:border-cyan-500/40 text-cyan-700 dark:text-cyan-300"
                      : "bg-white dark:bg-slate-700/40 border-slate-200 dark:border-slate-600/40 text-slate-600 dark:text-slate-300 hover:border-cyan-300 dark:hover:border-cyan-500/40"
                  } ${maxed ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  {sel ? "Deselect" : "Select Weapon"}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
