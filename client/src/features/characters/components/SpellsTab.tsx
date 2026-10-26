import { useState } from "react";

import { useGetAllSpellsQuery } from "../../spells/api/spellApi";
import type { CharacterSectionProps } from "../charactersTypes";

const SPELL_CAP = 5;
export const SpellsTab = ({ formData, patchForm }: CharacterSectionProps) => {
  const { data: spells = [], isLoading, isError } = useGetAllSpellsQuery();
  const [expanded, setExpanded] = useState<string | null>(null);

  if (isLoading)
    return <p className="text-sm text-slate-400">Loading spells...</p>;
  if (isError)
    return <p className="text-sm text-red-500">Failed to load spells.</p>;

  function toggleSpell(id: string) {
    const selected = formData.powers.spells;
    if (selected.includes(id)) {
      patchForm({
        powers: {
          ...formData.powers,
          spells: selected.filter((s) => s !== id),
        },
      });
      return;
    }
    if (selected.length >= SPELL_CAP) return;
    patchForm({ powers: { ...formData.powers, spells: [...selected, id] } });
  }

  return (
    <div className="flex flex-col gap-2">
      {spells.length === 0 && (
        <p className="text-sm italic text-slate-400 dark:text-slate-500">
          No spells available.
        </p>
      )}
      {spells.map((spell) => {
        if (!spell._id) return null;
        const sel = formData.powers.spells.includes(spell._id);
        const maxed = formData.powers.spells.length >= SPELL_CAP && !sel;
        const open = expanded === spell._id;

        return (
          <div
            key={spell._id}
            className={`rounded-xl border overflow-hidden transition-all duration-200 ${
              sel
                ? "bg-cyan-50 dark:bg-cyan-800/20 border-cyan-300 dark:border-cyan-500/40"
                : "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50"
            }`}
          >
            <div
              className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors"
              onClick={() => setExpanded(open ? null : spell._id!)}
            >
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-sm font-semibold ${
                    sel
                      ? "text-cyan-600 dark:text-cyan-400"
                      : "text-slate-900 dark:text-white"
                  }`}
                >
                  {spell.name}
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full border uppercase tracking-wide bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-600/40">
                  {spell.school}
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full border uppercase tracking-wide bg-orange-100 dark:bg-orange-800/30 text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-500/40">
                  Tier {spell.tier}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 ml-2">
                {open ? "▲" : "▼"}
              </span>
            </div>

            {open && (
              <div className="px-4 pb-4 border-t border-slate-100 dark:border-slate-700/50">
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-3">
                  {spell.description}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                  {spell.casting.action.replace("_", " ")} ·{" "}
                  {spell.recharge.replace("_", " ")}
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSpell(spell._id!);
                  }}
                  disabled={maxed}
                  className={`mt-3 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all duration-150 ${
                    sel
                      ? "bg-cyan-50 dark:bg-cyan-800/30 border-cyan-300 dark:border-cyan-500/40 text-cyan-700 dark:text-cyan-300"
                      : "bg-white dark:bg-slate-700/40 border-slate-200 dark:border-slate-600/40 text-slate-600 dark:text-slate-300 hover:border-cyan-300 dark:hover:border-cyan-500/40"
                  } ${maxed ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  {sel ? "Deselect" : "Select Spell"}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
