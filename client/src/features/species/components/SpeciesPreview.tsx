import { NavLink } from "react-router-dom";
import { GiDna1 } from "react-icons/gi";

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
    <div className="space-y-2">
      {species.map((s) => (
        <NavLink
          key={s._id ?? s.name}
          to={`/species/${s._id}`}
          className="block"
        >
          <div className="group bg-white dark:bg-stone-800 rounded-lg border-l-4 border border-emerald-200 dark:border-emerald-600 text-emerald-600 dark:text-emerald-400 shadow-sm hover:shadow-md transition-all duration-200 p-4 hover:bg-stone-50">
            <div className="flex items-start justify-between">
              {/* Left Section - Icon and Main Info */}
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg transition-colors duration-200 bg-stone-100 dark:bg-stone-700 group-hover:bg-stone-200 dark:group-hover:bg-stone-600">
                  <GiDna1 className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  {/* Name */}
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-lg font-semibold text-stone-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors duration-200">
                      {s.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-stone-500 dark:text-stone-400 line-clamp-2 mb-2">
                    {s.description}
                  </p>

                  {/* Stat Modifiers Row */}
                  {s.statModifiers.length > 0 && (
                    <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-sm text-stone-600 dark:text-stone-400 mb-2">
                      {s.statModifiers.map((modifier, index) => (
                        <div
                          key={`${modifier.stat}-${index}`}
                          className="flex items-center space-x-1"
                        >
                          <span className="font-medium text-stone-900 dark:text-stone-300 capitalize">
                            {modifier.stat}:
                          </span>
                          <span>
                            {modifier.value > 0 ? "+" : ""}
                            {modifier.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Resistance Tags */}
                  {s.resistances.length > 0 && (
                    <div className="flex items-center flex-wrap mt-2">
                      <span className="text-xs text-stone-500 dark:text-stone-500 mr-2">
                        Resistances:
                      </span>
                      {s.resistances.map((resistance, index) => (
                        <span
                          key={`${resistance.damageType}-${index}`}
                          className="text-xs text-stone-600 dark:text-stone-400 mr-2 capitalize"
                        >
                          {resistance.damageType} ({resistance.rule})
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Trait Tags */}
                  {s.traits.length > 0 && (
                    <div className="flex items-center flex-wrap mt-2">
                      <span className="text-xs text-stone-500 dark:text-stone-500 mr-2">
                        Traits:
                      </span>
                      {s.traits.map((traitId) => {
                        const trait = powersById[traitId];
                        if (!trait) return null;

                        return (
                          <span
                            key={traitId}
                            className="text-xs text-stone-600 dark:text-stone-400 mr-2"
                          >
                            {trait.name}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Section - Badge */}
              <div className="flex flex-col items-end space-y-2">
                <div className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500 bg-opacity-10 dark:bg-opacity-20 text-emerald-700 dark:text-emerald-300">
                  Species
                </div>
              </div>
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
};
