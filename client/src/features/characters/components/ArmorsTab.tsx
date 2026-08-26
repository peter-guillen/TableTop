// export const ArmorsTab = ({ formData, library, onToggleArmor }) => {
//   const armor = library?.armors || [];

//   if (!armor.length) {
//     return (
//       <p className="text-sm italic text-slate-400 dark:text-slate-500 pt-2">
//         No armor found in library.
//       </p>
//     );
//   }

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//       {armor.map((a) => {
//         const sel = formData.selectedArmor === a.key;
//         return (
//           <div
//             key={a._id || a.key}
//             onClick={() => onToggleArmor(a.key)}
//             className={`rounded-xl p-3 border cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
//               sel
//                 ? "bg-orange-50 dark:bg-orange-800/20 border-orange-300 dark:border-orange-500/40"
//                 : "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 hover:border-orange-300 dark:hover:border-orange-500/30"
//             }`}
//           >
//             <p
//               className={`text-sm font-semibold mb-1 ${
//                 sel
//                   ? "text-orange-600 dark:text-orange-400"
//                   : "text-slate-900 dark:text-white"
//               }`}
//             >
//               {a.label}
//             </p>
//             <p className="text-xs text-slate-500 dark:text-slate-400">
//               +{a.def} Defense
//             </p>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// import { ARMOR } from "../../../shared/constants/constants";
import type { CharacterSectionProps } from "../charactersTypes";

export const ArmorsTab = ({
  formData,
  patchForm,
  constants,
}: CharacterSectionProps) => {
  const ARMOR = constants?.ARMOR;
  function selectArmor(name: string) {
    patchForm({ selectedArmor: formData.selectedArmor === name ? "" : name });
  }

  return (
    <div className="flex flex-wrap gap-2">
      {ARMOR.map((name) => {
        const sel = formData.selectedArmor === name;
        return (
          <button
            type="button"
            key={name}
            onClick={() => selectArmor(name)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all duration-150 ${
              sel
                ? "bg-cyan-50 dark:bg-cyan-800/20 border-cyan-300 dark:border-cyan-500/40 text-cyan-700 dark:text-cyan-300"
                : "bg-white dark:bg-slate-800/30 border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 hover:border-cyan-300 dark:hover:border-cyan-500/40"
            }`}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
};
