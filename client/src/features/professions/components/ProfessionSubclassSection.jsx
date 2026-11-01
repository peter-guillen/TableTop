import { LuCrown, LuPlus, LuX } from "react-icons/lu";
import { useState } from "react";
import {
  formHeading,
  formHint,
  formLabel,
} from "../../../shared/styles/theme.ts";

export const ProfessionSubclassSection = ({
  subclassName = "",
  subclassLevel = "",
  startingEquipment = [],
  onInputChange,
  onStartingEquipmentChange,
}) => {
  const [equipInput, setEquipInput] = useState("");

  const addEquipment = () => {
    const trimmed = equipInput.trim();
    if (trimmed && !startingEquipment.includes(trimmed)) {
      onStartingEquipmentChange([...startingEquipment, trimmed]);
      setEquipInput("");
    }
  };

  const removeEquipment = (item) => {
    onStartingEquipmentChange(startingEquipment.filter((e) => e !== item));
  };

  return (
    <section>
      <h2 className={formHeading}>
        <LuCrown size={20} />
        Subclass & Equipment
      </h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Subclass Label */}
          <div>
            <label className={`${formLabel} mb-2`}>
              Subclass Label
            </label>
            <input
              type="text"
              placeholder="e.g. Arcane Tradition, Martial Archetype..."
              name="subclassName"
              onChange={onInputChange}
              value={subclassName}
              className="w-full px-4 py-3 bg-white dark:bg-stone-800/50 border border-stone-300 dark:border-emerald-500/30 rounded-lg text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
            <p className={formHint}>
              What this class calls its subclass path
            </p>
          </div>

          {/* Subclass Level */}
          <div>
            <label className={`${formLabel} mb-2`}>
              Subclass Chosen At Level
            </label>
            <input
              type="number"
              min={1}
              max={20}
              placeholder="e.g. 3"
              name="subclassLevel"
              onChange={onInputChange}
              value={subclassLevel}
              className="w-full px-4 py-3 bg-white dark:bg-stone-800/50 border border-stone-300 dark:border-emerald-500/30 rounded-lg text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
            <p className={formHint}>
              Fighter = 3, Cleric = 1, Wizard = 2
            </p>
          </div>
        </div>

        {/* Starting Equipment */}
        <div>
          <label className={`${formLabel} mb-3`}>
            Starting Equipment
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={equipInput}
              onChange={(e) => setEquipInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), addEquipment())
              }
              placeholder="e.g. Leather armor, two daggers, explorer's pack..."
              className="flex-1 px-4 py-2 bg-white dark:bg-stone-800/50 border border-stone-300 dark:border-emerald-500/30 rounded-lg text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition-all"
            />
            <button
              type="button"
              onClick={addEquipment}
              className="px-4 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-600/20 border border-emerald-400 dark:border-emerald-500/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-600/40 transition-all"
            >
              <LuPlus size={16} />
            </button>
          </div>

          {startingEquipment.length > 0 ? (
            <ul className="space-y-2">
              {startingEquipment.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between px-4 py-2 bg-stone-100 dark:bg-stone-800/30 border border-stone-300 dark:border-stone-700/40 rounded-lg text-stone-700 dark:text-stone-300 text-sm group"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => removeEquipment(item)}
                    className="text-stone-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <LuX size={14} />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-stone-600 italic">
              No starting equipment added yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
