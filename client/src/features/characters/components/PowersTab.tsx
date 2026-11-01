import { useState } from "react";

import { useGetAllPowersQuery } from "../../powers/api/powerApi";
import type { CharacterSectionProps, Powers } from "../charactersTypes";

export const PowersTab = ({ formData, patchForm }: CharacterSectionProps) => {
  const { data: powers = [], isLoading, isError } = useGetAllPowersQuery();
  const { level, powerSlots } = formData.progression;
  const [expanded, setExpanded] = useState<string | null>(null);

  if (isLoading)
    return <p className="text-sm text-stone-400">Loading powers...</p>;
  if (isError)
    return <p className="text-sm text-red-500">Failed to load powers.</p>;

  const groups: { label: string; key: keyof Powers; kinds: string[] }[] = [
    { label: "Spells", key: "spells", kinds: ["spell"] },
    { label: "Abilities", key: "abilities", kinds: ["ability"] },
    { label: "Traits", key: "traits", kinds: ["trait"] },
  ];

  function togglePower(key: keyof Powers, id: string) {
    const selected = formData.powers[key];
    if (selected.includes(id)) {
      patchForm({
        powers: { ...formData.powers, [key]: selected.filter((p) => p !== id) },
      });
      return;
    }
    if (selected.length >= powerSlots[key]) return;
    patchForm({ powers: { ...formData.powers, [key]: [...selected, id] } });
  }

  return (
    <div className="flex flex-col gap-5">
      {groups.map(({ label, key, kinds }) => {
        const options = powers.filter((p) => kinds.includes(p.kind));
        const selected = formData.powers[key];

        return (
          <div key={key}>
            <p className="text-[9px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-2">
              {label} ({selected.length}/{powerSlots[key]})
            </p>
            <div className="flex flex-col gap-2">
              {options.length === 0 && (
                <p className="text-sm italic text-stone-400 dark:text-stone-500">
                  No {label.toLowerCase()} available.
                </p>
              )}
              {options.map((power) => {
                if (!power._id) return null;
                const id = power._id;
                const sel = selected.includes(id);
                const minLevel = power.requirements?.minLevel ?? 1;
                const locked = minLevel > level && !sel;
                const maxed = selected.length >= powerSlots[key] && !sel;
                const open = expanded === id;

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
                          {power.name}
                        </span>
                        {power.school && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full border uppercase tracking-wide bg-stone-100 dark:bg-stone-700/50 text-stone-500 dark:text-stone-400 border-stone-200 dark:border-stone-600/40">
                            {power.school}
                          </span>
                        )}
                        {locked && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full border uppercase tracking-wide bg-stone-100 dark:bg-stone-700/50 text-stone-500 dark:text-stone-400 border-stone-200 dark:border-stone-600/40">
                            Lv {minLevel}
                          </span>
                        )}
                        {power.kind !== "trait" && power.activation && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full border uppercase tracking-wide bg-amber-100 dark:bg-amber-800/30 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-500/40">
                            {power.activation.cost} {power.activation.resource}
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
                          {power.description}
                        </p>
                        {power.kind !== "trait" && power.activation && (
                          <p className="text-xs text-stone-400 dark:text-stone-500 mt-2">
                            {power.activation.action.replace("_", " ")} ·{" "}
                            {power.recharge.replace("_", " ")}
                          </p>
                        )}
                        <button
                          type="button"
                          onClick={() => togglePower(key, id)}
                          disabled={maxed || locked}
                          className={`mt-3 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all duration-150 ${
                            sel
                              ? "bg-emerald-50 dark:bg-emerald-800/30 border-emerald-300 dark:border-emerald-500/40 text-emerald-700 dark:text-emerald-300"
                              : "bg-white dark:bg-stone-700/40 border-stone-200 dark:border-stone-600/40 text-stone-600 dark:text-stone-300 hover:border-emerald-300 dark:hover:border-emerald-500/40"
                          } ${maxed || locked ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                        >
                          {sel
                            ? "Deselect"
                            : locked
                              ? `Requires level ${minLevel}`
                              : "Select"}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
