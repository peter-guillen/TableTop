import { LuSparkles } from "react-icons/lu";

export const WeaponSpecialSection = ({
  requirements,
  skills,
  special,
  onInputChange,
  onRequirementChange,
  onSkillsChange,
  onProficiencyChange,
}) => {
  // Convert skills array to string for input
  const skillsString = Array.isArray(skills) ? skills.join(", ") : "";
  const proficiencyString = Array.isArray(requirements?.proficiency)
    ? requirements.proficiency.join(", ")
    : "";

  const handleSkillsInputChange = (e) => {
    const value = e.target.value;
    const skillsArray = value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");
    onSkillsChange(skillsArray);
  };

  const handleProficiencyInputChange = (e) => {
    const value = e.target.value;
    const proficiencyArray = value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");
    onProficiencyChange(proficiencyArray);
  };

  return (
    <section>
      <h2 className="text-xl font-bold text-cyan-300 dark:text-orange-300 mb-4 flex items-center gap-2">
        <LuSparkles size={20} />
        Requirements & Special
      </h2>
      <div className="space-y-6">
        {/* Requirements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Strength Requirement
            </label>
            <input
              type="number"
              placeholder="e.g., 13"
              value={requirements?.strength || ""}
              onChange={(e) =>
                onRequirementChange("strength", Number(e.target.value))
              }
              min="0"
              className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Level Requirement
            </label>
            <input
              type="number"
              placeholder="e.g., 5"
              value={requirements?.level || ""}
              onChange={(e) =>
                onRequirementChange("level", Number(e.target.value))
              }
              min="1"
              className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Proficiency Requirements
          </label>
          <input
            type="text"
            placeholder="e.g., Martial Weapons, Longswords (comma-separated)"
            value={proficiencyString}
            onChange={handleProficiencyInputChange}
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
          />
          <p className="text-xs text-slate-400 mt-1">
            Separate multiple proficiencies with commas
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Associated Skills
          </label>
          <input
            type="text"
            placeholder="e.g., Athletics, Acrobatics (comma-separated)"
            value={skillsString}
            onChange={handleSkillsInputChange}
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
          />
          <p className="text-xs text-slate-400 mt-1">
            Separate multiple skills with commas
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Special Abilities
          </label>
          <textarea
            name="special"
            placeholder="Describe any special properties or abilities this weapon grants..."
            value={special}
            onChange={onInputChange}
            rows="4"
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all resize-none"
          />
        </div>
      </div>
    </section>
  );
};
