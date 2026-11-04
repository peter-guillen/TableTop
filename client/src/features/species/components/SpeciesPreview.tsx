import { NavLink } from "react-router-dom";
import { GiDna1 } from "react-icons/gi";
import { LuArrowRight } from "react-icons/lu";

import { Power } from "../../powers/powerTypes.ts";
import { Species } from "../speciesTypes.ts";

interface SpeciesPreviewProps {
  species: Species[];
  powersById?: Record<string, Power>;
}

export const SpeciesPreview = ({
  species,
  powersById = {},
}: SpeciesPreviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {species.map((s) => (
        <NavLink
          key={s._id ?? s.name}
          to={`/species/${s._id}`}
          className="block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 dark:focus-visible:ring-emerald-400"
        >
          <div className="group flex h-full flex-col rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 transition-colors hover:border-emerald-600 dark:hover:border-emerald-500">
            {/* Icon + Name */}
            <div className="flex items-center gap-3 mb-3">
              <div className="shrink-0 rounded-lg bg-emerald-700 p-3 text-white dark:bg-emerald-500 dark:text-stone-950">
                <GiDna1 className="w-6 h-6" />
              </div>
              <h3 className="min-w-0 text-xl font-bold break-words text-stone-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors duration-200">
                {s.name}
              </h3>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300 line-clamp-3 mb-4">
              {s.description}
            </p>

            {/* Stat Modifier Chips */}
            {s.statModifiers.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {s.statModifiers.map((modifier, index) => (
                  <div
                    key={`${modifier.stat}-${index}`}
                    className="rounded-lg bg-stone-50 dark:bg-stone-800/60 px-3 py-2"
                  >
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-0.5">
                      {modifier.stat}
                    </p>
                    <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">
                      {modifier.value > 0 ? "+" : ""}
                      {modifier.value}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Resistance Tags */}
            {s.resistances.length > 0 && (
              <div className="mb-3">
                <p className="text-[10px] uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-1.5">
                  Resistances
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {s.resistances.map((resistance, index) => (
                    <span
                      key={`${resistance.damageType}-${index}`}
                      className="rounded-full border border-stone-200 dark:border-stone-700 px-2 py-0.5 text-xs text-stone-600 dark:text-stone-300 capitalize"
                    >
                      {resistance.damageType} ({resistance.rule})
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Trait Tags */}
            {s.traits.length > 0 && (
              <div className="mb-3">
                <p className="text-[10px] uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-1.5">
                  Traits
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {s.traits.map((traitId) => {
                    const trait = powersById[traitId];
                    if (!trait) return null;

                    return (
                      <span
                        key={traitId}
                        className="rounded-full border border-stone-200 dark:border-stone-700 px-2 py-0.5 text-xs text-stone-600 dark:text-stone-300"
                      >
                        {trait.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-auto pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
              <span>Explore</span>
              <LuArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
};
