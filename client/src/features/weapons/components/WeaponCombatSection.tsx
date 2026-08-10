import { useEffect, useRef, useState } from "react";
import { LuSwords, LuChevronDown, LuX, LuPlus } from "react-icons/lu";
import { Weapon } from "../weaponTypes";
import {
  StatModifier,
  DamageType,
  Properties,
} from "../../../shared/constants/constantTypes";

interface WeaponCombatSectionProps {
  damageType: DamageType[];
  damageTypeOptions: DamageType[];
  properties: Properties[];
  propertyOptions: Properties[];
  statModifiers: StatModifier[];
  statModifierOptions: string[];
  onCheckedChange: (
    fieldName: keyof Weapon,
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  onArrayFieldChange: <U>(fieldName: keyof Weapon) => (newData: U[]) => void;
}

const DURATION_TYPE_OPTIONS = ["turns", "until_broken", "permanent"] as const;

export const WeaponCombatSection = ({
  damageType,
  damageTypeOptions,
  properties,
  propertyOptions,
  statModifiers,
  statModifierOptions,
  onCheckedChange,
  onArrayFieldChange,
}: WeaponCombatSectionProps) => {
  const [damageTypeOpen, setDamageTypeOpen] = useState(false);
  const damageTypeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        damageTypeRef.current &&
        !damageTypeRef.current.contains(event.target as Node)
      ) {
        setDamageTypeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const removeDamageType = (tag: DamageType) => {
    onArrayFieldChange<DamageType>("damageType")(
      damageType.filter((d) => d !== tag),
    );
  };

  const emptyModifier = (): StatModifier => ({
    stat: statModifierOptions[0] ?? "",
    value: 0,
    durationType: "permanent",
    duration: undefined,
    target: "",
    description: "",
  });

  const addModifier = () => {
    onArrayFieldChange<StatModifier>("statModifiers")([
      ...statModifiers,
      emptyModifier(),
    ]);
  };

  const removeModifier = (index: number) => {
    onArrayFieldChange<StatModifier>("statModifiers")(
      statModifiers.filter((_, i) => i !== index),
    );
  };

  const updateModifier = (
    index: number,
    field: keyof StatModifier,
    value: string | number | undefined,
  ) => {
    onArrayFieldChange<StatModifier>("statModifiers")(
      statModifiers.map((mod, i) =>
        i === index ? { ...mod, [field]: value } : mod,
      ),
    );
  };

  return (
    <section>
      <h2 className="text-xl font-bold text-cyan-300 dark:text-orange-300 mb-4 flex items-center gap-2">
        <LuSwords size={20} />
        Combat Stats
      </h2>
      <div className="space-y-6">
        {/* Damage Type — multi-select dropdown */}
        <div ref={damageTypeRef} className="relative">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Damage Type *
          </label>
          <button
            type="button"
            onClick={() => setDamageTypeOpen((prev) => !prev)}
            className="w-full flex items-center justify-between px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 transition-all"
          >
            <span className="text-slate-400">
              {damageType.length > 0
                ? `${damageType.length} selected`
                : "Select damage type"}
            </span>
            <LuChevronDown
              size={18}
              className={`transition-transform ${damageTypeOpen ? "rotate-180" : ""}`}
            />
          </button>

          {damageTypeOpen && (
            <div className="absolute z-10 mt-2 w-full max-h-64 overflow-y-auto bg-slate-800 dark:bg-slate-900 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg shadow-xl p-2">
              {damageTypeOptions.map((tag) => (
                <label
                  key={tag}
                  className="flex items-center gap-2 text-slate-300 cursor-pointer p-2 rounded-md hover:bg-slate-700/50 dark:hover:bg-slate-800/50 transition-all"
                >
                  <input
                    type="checkbox"
                    value={tag}
                    checked={damageType.includes(tag)}
                    onChange={onCheckedChange("damageType")}
                    className="w-4 h-4 rounded border-cyan-500/30 dark:border-orange-500/30 bg-slate-800/50 dark:bg-slate-900/50 text-cyan-500 dark:text-orange-500 focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500"
                  />
                  <span className="capitalize text-sm">{tag}</span>
                </label>
              ))}
            </div>
          )}

          {damageType.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {damageType.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 text-xs capitalize bg-cyan-500/10 dark:bg-orange-500/10 border border-cyan-500/30 dark:border-orange-500/30 text-cyan-300 dark:text-orange-300 px-2 py-1 rounded-full"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeDamageType(tag)}
                    className="hover:text-white"
                  >
                    <LuX size={12} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Properties — checkbox grid */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">
            Weapon Properties
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {propertyOptions.map((property) => (
              <label
                key={property}
                className="flex items-center gap-2 text-slate-300 cursor-pointer bg-slate-800/30 dark:bg-slate-900/30 p-3 rounded-lg border border-cyan-500/20 dark:border-orange-500/20 hover:border-cyan-500/40 dark:hover:border-orange-500/40 transition-all"
              >
                <input
                  type="checkbox"
                  value={property}
                  checked={properties.includes(property)}
                  onChange={onCheckedChange("properties")}
                  className="w-4 h-4 rounded border-cyan-500/30 dark:border-orange-500/30 bg-slate-800/50 dark:bg-slate-900/50 text-cyan-500 dark:text-orange-500 focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500"
                />
                <span className="capitalize text-sm">{property}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Stat Modifiers */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-slate-300">
              Stat Modifiers
            </label>
            <button
              type="button"
              onClick={addModifier}
              className="flex items-center gap-1 text-sm text-cyan-300 dark:text-orange-300 hover:text-white transition-all"
            >
              <LuPlus size={16} />
              Add Modifier
            </button>
          </div>

          <div className="space-y-4">
            {statModifiers.map((mod, index) => (
              <div
                key={index}
                className="bg-slate-800/30 dark:bg-slate-900/30 border border-cyan-500/20 dark:border-orange-500/20 rounded-lg p-4"
              >
                <div className="flex justify-end mb-2">
                  <button
                    type="button"
                    onClick={() => removeModifier(index)}
                    className="text-slate-400 hover:text-white"
                  >
                    <LuX size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Stat
                    </label>
                    <select
                      value={mod.stat}
                      onChange={(e) =>
                        updateModifier(index, "stat", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500"
                    >
                      {statModifierOptions.map((stat) => (
                        <option key={stat} value={stat}>
                          {stat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Value
                    </label>
                    <input
                      type="number"
                      value={mod.value}
                      onChange={(e) =>
                        updateModifier(index, "value", Number(e.target.value))
                      }
                      className="w-full px-3 py-2 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Duration Type
                    </label>
                    <select
                      value={mod.durationType}
                      onChange={(e) =>
                        updateModifier(index, "durationType", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500"
                    >
                      {DURATION_TYPE_OPTIONS.map((type) => (
                        <option key={type} value={type}>
                          {type.replace("_", " ")}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Duration (turns)
                    </label>
                    <input
                      type="number"
                      value={mod.duration ?? ""}
                      onChange={(e) =>
                        updateModifier(
                          index,
                          "duration",
                          e.target.value ? Number(e.target.value) : undefined,
                        )
                      }
                      disabled={mod.durationType !== "turns"}
                      className="w-full px-3 py-2 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 disabled:opacity-40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Target
                    </label>
                    <input
                      type="text"
                      value={mod.target}
                      onChange={(e) =>
                        updateModifier(index, "target", e.target.value)
                      }
                      placeholder="e.g., self, wielder"
                      className="w-full px-3 py-2 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      value={mod.description}
                      onChange={(e) =>
                        updateModifier(index, "description", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
