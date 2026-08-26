// export const SkillsTab = ({ formData, library }) => {
//   const skills = library?.skills || [];
//   const backgrounds = library?.backgrounds || [];

//   const bgEntry = backgrounds.find((b) => b.name === formData.bg);
//   const bgBonus = bgEntry?.mods?.skillBonus || null;

//   if (!skills.length) {
//     return (
//       <p className="text-sm italic text-slate-400 dark:text-slate-500 pt-2">
//         No skills found in library.
//       </p>
//     );
//   }

//   return (
//     <table className="w-full">
//       <thead>
//         <tr>
//           <th className="text-left text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 pb-3">
//             Skill
//           </th>
//           <th className="text-right text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 pb-3">
//             Bonus
//           </th>
//         </tr>
//       </thead>
//       <tbody>
//         {skills.map((skill) => {
//           const boosted = skill === bgBonus;
//           return (
//             <tr
//               key={skill}
//               className="border-t border-slate-100 dark:border-slate-700/50"
//             >
//               <td className="py-2 text-sm text-slate-900 dark:text-white">
//                 {skill}
//                 {boosted && (
//                   <span className="ml-2 text-[10px] text-cyan-600 dark:text-cyan-400 font-bold">
//                     (+bg)
//                   </span>
//                 )}
//               </td>
//               <td
//                 className={`py-2 text-sm font-bold text-right ${
//                   boosted
//                     ? "text-cyan-600 dark:text-cyan-400"
//                     : "text-slate-400 dark:text-slate-500"
//                 }`}
//               >
//                 {boosted ? "+3" : "+0"}
//               </td>
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
//   );
// };

// SkillsTab.tsx
// import { SKILLS } from "../../../shared/api/constantsApi";
import type { CharacterSectionProps } from "../charactersTypes";

// Same cap as the other selection tabs — see SpellsTab.
const SKILL_CAP = 5;

export const SkillsTab = ({
  formData,
  patchForm,
  constants,
}: CharacterSectionProps) => {
  const SKILLS = constants?.SKILLS;
  const skillNames = Object.values(SKILLS);

  function toggleSkill(name: string) {
    const selected = formData.selectedSkills;
    if (selected.includes(name)) {
      patchForm({ selectedSkills: selected.filter((s) => s !== name) });
      return;
    }
    if (selected.length >= SKILL_CAP) return;
    patchForm({ selectedSkills: [...selected, name] });
  }

  return (
    <div className="flex flex-wrap gap-2">
      {skillNames.map((name) => {
        const sel = formData.selectedSkills.includes(name);
        const maxed = formData.selectedSkills.length >= SKILL_CAP && !sel;
        return (
          <button
            type="button"
            key={name}
            onClick={() => toggleSkill(name)}
            disabled={maxed}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all duration-150 ${
              sel
                ? "bg-cyan-50 dark:bg-cyan-800/20 border-cyan-300 dark:border-cyan-500/40 text-cyan-700 dark:text-cyan-300"
                : "bg-white dark:bg-slate-800/30 border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 hover:border-cyan-300 dark:hover:border-cyan-500/40"
            } ${maxed ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
};
