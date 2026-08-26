//

import type { Character, PatchForm } from "../charactersTypes";
import type { Constants } from "../../../shared/api/constantsApi";

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
    {children}
  </p>
);

interface CharacterArchetypeProps {
  constants: Constants;
  formData: Character;
  patchForm: PatchForm;
}

export const CharacterArchetype = ({
  formData,
  patchForm,
  constants,
}: CharacterArchetypeProps) => {
  const selectClasses =
    "bg-transparent border-none text-slate-900 dark:text-white text-xs font-semibold outline-none cursor-pointer w-full mt-0.5 leading-tight";

  const fieldClasses =
    "bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-lg px-3 py-2 flex flex-col justify-center min-w-0";

  return (
    <div className="flex items-stretch gap-2 mb-3 flex-wrap">
      {/* Mode pill toggle */}
      <div className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-lg p-0.5 flex gap-0.5 flex-shrink-0 self-stretch items-center">
        {(["classed", "classless"] as const).map((m) => (
          <button
            type="button"
            key={m}
            onClick={() => patchForm({ mode: m })}
            className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wide transition-all duration-150 ${
              formData.mode === m
                ? "bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            {m === "classed" ? "Classed" : "Classless"}
          </button>
        ))}
      </div>

      {/* Species */}
      <div className={`${fieldClasses} flex-1 min-w-[90px]`}>
        <SectionLabel>Species</SectionLabel>
        <select
          className={selectClasses}
          value={formData.species}
          onChange={(e) =>
            patchForm({ species: e.target.value as Character["species"] })
          }
        >
          {constants?.SPECIES?.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Background */}
      <div className={`${fieldClasses} flex-1 min-w-[90px]`}>
        <SectionLabel>Background</SectionLabel>
        <select
          className={selectClasses}
          value={formData.background}
          onChange={(e) =>
            patchForm({
              background: e.target.value as Character["background"],
            })
          }
        >
          {constants?.BACKGROUNDS?.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* Classed: Primary Class */}
      {formData.mode === "classed" && (
        <div className={`${fieldClasses} flex-1 min-w-[100px]`}>
          <SectionLabel>Class</SectionLabel>
          <select
            className={selectClasses}
            value={formData.profession}
            onChange={(e) =>
              patchForm({
                profession: e.target.value as Character["profession"],
                selectedSpells: [],
                selectedTraits: [],
              })
            }
          >
            {constants?.PROFESSIONS?.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Classed: Dip */}
      {formData.mode === "classed" && (
        <div className={`${fieldClasses} flex-1 min-w-[100px]`}>
          <SectionLabel>Dip</SectionLabel>
          <select
            className={selectClasses}
            value={formData.subProfession}
            onChange={(e) =>
              patchForm({
                subProfession: e.target.value as Character["subProfession"],
              })
            }
          >
            {constants?.PROFESSIONS?.filter(
              (p) => p !== formData.profession,
            )?.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Classless: Power Source */}
      {formData.mode === "classless" && (
        <div className={`${fieldClasses} flex-1 min-w-[110px]`}>
          <SectionLabel>Power Source</SectionLabel>
          <select
            className={selectClasses}
            value={formData.affinity}
            onChange={(e) => {
              patchForm({
                affinity: e.target.value as Character["affinity"],
                selectedSpells: [],
                selectedTraits: [],
              });
            }}
          >
            {constants?.AFFINITIES?.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};
