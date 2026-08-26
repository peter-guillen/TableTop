// const ACTION_TYPES = ["Passive", "Major Action", "Minor Action", "Reaction"];

// const Tag = ({ label, variant = "neutral" }) => {
//   const base =
//     "text-[9px] font-bold px-1.5 py-0.5 rounded-full border uppercase tracking-wide whitespace-nowrap";
//   const styles = {
//     learned: `${base} bg-cyan-100   dark:bg-cyan-800/30   text-cyan-800   dark:text-cyan-300   border-cyan-300   dark:border-cyan-500/40`,
//     innate: `${base} bg-orange-100 dark:bg-orange-800/30 text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-500/40`,
//     reaction: `${base} bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-500/40`,
//     neutral: `${base} bg-slate-100  dark:bg-slate-700/50  text-slate-500  dark:text-slate-400  border-slate-200  dark:border-slate-600/40`,
//   };
//   return <span className={styles[variant] || styles.neutral}>{label}</span>;
// };

// function typeVariant(type = "") {
//   if (type === "Passive") return "innate";
//   if (type === "Major Action") return "learned";
//   if (type === "Minor Action") return "neutral";
//   if (type === "Reaction") return "reaction";
//   return "neutral";
// }

// export const FeaturesTab = ({ formData, library, onToggleFeat }) => {
//   const features = library?.traits || [];

//   const pool =
//     formData.mode === "classed"
//       ? features.filter((f) => f?.profession === formData?.profession)
//       : features.filter((f) => formData?.affinities?.includes(f.src));

//   if (!pool.length) {
//     return (
//       <p className="text-sm italic text-slate-400 dark:text-slate-500 pt-2">
//         {formData.mode === "classed"
//           ? "Choose a class to see features."
//           : "Select a power source."}
//       </p>
//     );
//   }

//   return (
//     <>
//       <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
//         {formData.selectedFeats.length} / 3 selected
//       </p>
//       <p>{features.map((feature) => <p>{feature.name}</p>).join(", ")}</p>;
//       <div className="grid md:grid-cols-2 gap-3">
//         {pool.map((f) => {
//           const sel = formData.selectedFeats.includes(f.name);
//           const maxed = formData.selectedFeats.length >= 3 && !sel;
//           const modStr = f.mods
//             ? Object.entries(f.mods)
//                 .filter(([, v]) => v !== 0)
//                 .map(([k, v]) => `+${v} ${k.toUpperCase()}`)
//                 .join("  ")
//             : "";
//           return (
//             <div
//               key={f.name}
//               onClick={maxed ? undefined : () => onToggleFeat(f.name)}
//               className={`rounded-xl p-3 border transition-all duration-200 ${
//                 maxed ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
//               } ${
//                 sel
//                   ? "bg-cyan-50 dark:bg-cyan-800/20 border-cyan-300 dark:border-cyan-500/40"
//                   : "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 hover:border-cyan-400 dark:hover:border-cyan-500/40 hover:scale-[1.01]"
//               }`}
//             >
//               <div className="flex justify-between items-start gap-2 mb-1.5">
//                 <span
//                   className={`text-sm font-semibold ${
//                     sel
//                       ? "text-cyan-600 dark:text-cyan-400"
//                       : "text-slate-900 dark:text-white"
//                   }`}
//                 >
//                   {f.name}
//                 </span>
//                 <div className="flex gap-1 flex-shrink-0">
//                   <Tag label={f.type} variant={typeVariant(f.type)} />
//                   <Tag label={f.cost} />
//                 </div>
//               </div>
//               <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
//                 {f.desc}
//               </p>
//               {modStr && (
//                 <p className="text-xs font-bold text-orange-600 dark:text-orange-400 mt-2">
//                   {modStr}
//                 </p>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// };

// TraitsTab.tsx
// import { TRAITS } from "../../../shared/constants/constants";
import type { CharacterSectionProps } from "../charactersTypes";

// Same cap as the other selection tabs — see SpellsTab.
const TRAIT_CAP = 5;

export const TraitsTab = ({
  formData,
  patchForm,
  constants,
}: CharacterSectionProps) => {
  const TRAITS = constants?.TRAITS;
  function toggleTrait(name: string) {
    const selected = formData.selectedTraits;
    if (selected.includes(name)) {
      patchForm({ selectedTraits: selected.filter((t) => t !== name) });
      return;
    }
    if (selected.length >= TRAIT_CAP) return;
    patchForm({ selectedTraits: [...selected, name] });
  }

  return (
    <div className="flex flex-wrap gap-2">
      {TRAITS.map((name) => {
        const sel = formData.selectedTraits.includes(name);
        const maxed = formData.selectedTraits.length >= TRAIT_CAP && !sel;
        return (
          <button
            type="button"
            key={name}
            onClick={() => toggleTrait(name)}
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
