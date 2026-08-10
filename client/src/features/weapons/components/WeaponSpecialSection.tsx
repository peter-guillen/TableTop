import { useEffect, useRef, useState } from "react";
import { LuSparkles, LuChevronDown, LuX, LuPlus } from "react-icons/lu";
import { Weapon } from "../weaponTypes";
import { Spell } from "../../spells/spellTypes.ts";

interface WeaponSpecialSectionProps {
  skills: string[];
  spellOptions: Spell[];
  uniqueSkills: string[];
  onCheckedChange: (
    fieldName: keyof Weapon,
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  onArrayFieldChange: <U>(fieldName: keyof Weapon) => (newData: U[]) => void;
}

export const WeaponSpecialSection = ({
  skills,
  spellOptions,
  uniqueSkills,
  onCheckedChange,
  onArrayFieldChange,
}: WeaponSpecialSectionProps) => {
  const [skillsOpen, setSkillsOpen] = useState(false);
  const skillsRef = useRef<HTMLDivElement>(null);

  const [uniqueSkillInput, setUniqueSkillInput] = useState("");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        skillsRef.current &&
        !skillsRef.current.contains(event.target as Node)
      ) {
        setSkillsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const spellName = (id: string) =>
    spellOptions.find((spell) => spell._id === id)?.name ?? id;

  const removeSkill = (id: string) => {
    onArrayFieldChange<string>("skills")(skills.filter((s) => s !== id));
  };

  const addUniqueSkill = () => {
    const trimmed = uniqueSkillInput.trim();
    if (trimmed === "" || uniqueSkills.includes(trimmed)) {
      setUniqueSkillInput("");
      return;
    }
    onArrayFieldChange<string>("uniqueSkills")([...uniqueSkills, trimmed]);
    setUniqueSkillInput("");
  };

  const removeUniqueSkill = (skill: string) => {
    onArrayFieldChange<string>("uniqueSkills")(
      uniqueSkills.filter((s) => s !== skill),
    );
  };

  const handleUniqueSkillKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addUniqueSkill();
    }
  };

  return (
    <section>
      <h2 className="text-xl font-bold text-cyan-300 dark:text-orange-300 mb-4 flex items-center gap-2">
        <LuSparkles size={20} />
        Special
      </h2>
      <div className="space-y-6">
        {/* Skills — spell picker */}
        <div ref={skillsRef} className="relative">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Associated Skills
          </label>
          <button
            type="button"
            onClick={() => setSkillsOpen((prev) => !prev)}
            className="w-full flex items-center justify-between px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 transition-all"
          >
            <span className="text-slate-400">
              {skills.length > 0
                ? `${skills.length} selected`
                : "Select skills"}
            </span>
            <LuChevronDown
              size={18}
              className={`transition-transform ${skillsOpen ? "rotate-180" : ""}`}
            />
          </button>

          {skillsOpen && (
            <div className="absolute z-10 mt-2 w-full max-h-64 overflow-y-auto bg-slate-800 dark:bg-slate-900 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg shadow-xl p-2">
              {spellOptions.length === 0 ? (
                <p className="text-sm text-slate-400 p-2">Loading spells...</p>
              ) : (
                spellOptions.map((spell) => (
                  <label
                    key={spell._id}
                    className="flex items-center gap-2 text-slate-300 cursor-pointer p-2 rounded-md hover:bg-slate-700/50 dark:hover:bg-slate-800/50 transition-all"
                  >
                    <input
                      type="checkbox"
                      value={spell._id}
                      checked={skills.includes(spell._id ?? "")}
                      onChange={onCheckedChange("skills")}
                      className="w-4 h-4 rounded border-cyan-500/30 dark:border-orange-500/30 bg-slate-800/50 dark:bg-slate-900/50 text-cyan-500 dark:text-orange-500 focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500"
                    />
                    <span className="text-sm">{spell.name}</span>
                  </label>
                ))
              )}
            </div>
          )}

          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {skills.map((id) => (
                <span
                  key={id}
                  className="flex items-center gap-1 text-xs bg-cyan-500/10 dark:bg-orange-500/10 border border-cyan-500/30 dark:border-orange-500/30 text-cyan-300 dark:text-orange-300 px-2 py-1 rounded-full"
                >
                  {spellName(id)}
                  <button
                    type="button"
                    onClick={() => removeSkill(id)}
                    className="hover:text-white"
                  >
                    <LuX size={12} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Unique Skills — free-text chip input */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Unique Skills
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type a unique skill and press Enter"
              value={uniqueSkillInput}
              onChange={(e) => setUniqueSkillInput(e.target.value)}
              onKeyDown={handleUniqueSkillKeyDown}
              className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
            />
            <button
              type="button"
              onClick={addUniqueSkill}
              className="px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-cyan-300 dark:text-orange-300 hover:text-white transition-all"
            >
              <LuPlus size={18} />
            </button>
          </div>

          {uniqueSkills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {uniqueSkills.map((skill) => (
                <span
                  key={skill}
                  className="flex items-center gap-1 text-xs bg-cyan-500/10 dark:bg-orange-500/10 border border-cyan-500/30 dark:border-orange-500/30 text-cyan-300 dark:text-orange-300 px-2 py-1 rounded-full"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeUniqueSkill(skill)}
                    className="hover:text-white"
                  >
                    <LuX size={12} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
