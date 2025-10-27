import {
  LuArrowLeft,
  LuSparkles,
  LuBookOpen,
  LuClock,
  LuTarget,
  LuFlame,
  LuZap,
  LuShield,
  LuUsers,
} from "react-icons/lu";

export function SpellDetails() {
  // Sample spell data - replace with your actual data from context/props
  const spell = {
    name: "Fireball",
    level: "3rd Level",
    school: "Evocation",
    castingTime: "1 action",
    range: "150 feet",
    duration: "Instantaneous",
    components: {
      verbal: true,
      somatic: true,
      material: true,
      materialDescription: "A tiny ball of bat guano and sulfur",
    },
    damage: "8d6",
    damageType: "Fire",
    saveType: "Dexterity",
    attackType: "",
    areaOfEffect: "20-foot radius sphere",
    description:
      "A bright streak flashes from your pointing finger to a point you choose within range and then blossoms with a low roar into an explosion of flame. Each creature in a 20-foot-radius sphere centered on that point must make a Dexterity saving throw. A target takes 8d6 fire damage on a failed save, or half as much damage on a successful one. The fire spreads around corners. It ignites flammable objects in the area that aren't being worn or carried.",
    atHigherLevels:
      "When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd.",
    classes: ["Sorcerer", "Wizard"],
  };

  const schoolColors = {
    Evocation: "from-red-500 to-orange-500",
    Abjuration: "from-orange-500 to-cyan-500",
    Conjuration: "from-cyan-500 to-pink-500",
    Divination: "from-cyan-500 to-orange-500",
    Enchantment: "from-pink-500 to-rose-500",
    Illusion: "from-violet-500 to-cyan-500",
    Necromancy: "from-green-500 to-emerald-500",
    Transmutation: "from-yellow-500 to-amber-500",
  };

  const damageTypeIcons = {
    Fire: "🔥",
    Cold: "❄️",
    Lightning: "⚡",
    Thunder: "💥",
    Acid: "🧪",
    Poison: "☠️",
    Necrotic: "💀",
    Radiant: "✨",
    Force: "🌟",
    Psychic: "🧠",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 dark:from-slate-950 dark:via-cyan-950 dark:to-slate-950 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-all group">
          <LuArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Back to Spell List</span>
        </button>

        {/* Header Card */}
        <div className="bg-slate-900/70 dark:bg-slate-950/70 backdrop-blur-md rounded-2xl border border-cyan-500/30 dark:border-orange-500/30 shadow-2xl p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <LuSparkles
                  className="text-cyan-400 dark:text-orange-400"
                  size={36}
                />
                <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-orange-400 to-cyan-500 dark:from-cyan-300 dark:via-orange-300 dark:to-cyan-400">
                  {spell.name}
                </h1>
              </div>
              <p className="text-xl text-slate-300 italic">
                {spell.level} {spell.school}
              </p>
            </div>
            <div
              className={`px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-orange-500 shadow-lg`}
            >
              <p className="text-white font-bold text-lg">{spell.school}</p>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-slate-800/50 dark:bg-slate-900/50 rounded-lg p-4 border border-cyan-500/20 dark:border-orange-500/20">
              <div className="flex items-center gap-3 mb-2">
                <LuClock
                  className="text-cyan-400 dark:text-orange-400"
                  size={20}
                />
                <p className="text-sm text-slate-400 font-medium">
                  Casting Time
                </p>
              </div>
              <p className="text-xl text-white font-semibold">
                {spell.castingTime}
              </p>
            </div>

            <div className="bg-slate-800/50 dark:bg-slate-900/50 rounded-lg p-4 border border-cyan-500/20 dark:border-orange-500/20">
              <div className="flex items-center gap-3 mb-2">
                <LuTarget
                  className="text-cyan-400 dark:text-orange-400"
                  size={20}
                />
                <p className="text-sm text-slate-400 font-medium">Range</p>
              </div>
              <p className="text-xl text-white font-semibold">{spell.range}</p>
            </div>

            <div className="bg-slate-800/50 dark:bg-slate-900/50 rounded-lg p-4 border border-cyan-500/20 dark:border-orange-500/20">
              <div className="flex items-center gap-3 mb-2">
                <LuZap
                  className="text-cyan-400 dark:text-orange-400"
                  size={20}
                />
                <p className="text-sm text-slate-400 font-medium">Duration</p>
              </div>
              <p className="text-xl text-white font-semibold">
                {spell.duration}
              </p>
            </div>
          </div>
        </div>

        {/* Components Section */}
        <div className="bg-slate-900/70 dark:bg-slate-950/70 backdrop-blur-md rounded-2xl border border-cyan-500/30 dark:border-orange-500/30 shadow-2xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-cyan-300 dark:text-orange-300 mb-4 flex items-center gap-2">
            <LuBookOpen size={24} />
            Components
          </h2>
          <div className="flex flex-wrap gap-3 mb-4">
            {spell.components.verbal && (
              <div className="px-4 py-2 bg-cyan-600/20 dark:bg-orange-600/20 border border-cyan-500/40 dark:border-orange-500/40 rounded-lg">
                <span className="text-cyan-300 dark:text-orange-300 font-semibold">
                  V
                </span>
                <span className="text-slate-300 ml-2">Verbal</span>
              </div>
            )}
            {spell.components.somatic && (
              <div className="px-4 py-2 bg-cyan-600/20 dark:bg-orange-600/20 border border-cyan-500/40 dark:border-orange-500/40 rounded-lg">
                <span className="text-cyan-300 dark:text-orange-300 font-semibold">
                  S
                </span>
                <span className="text-slate-300 ml-2">Somatic</span>
              </div>
            )}
            {spell.components.material && (
              <div className="px-4 py-2 bg-cyan-600/20 dark:bg-orange-600/20 border border-cyan-500/40 dark:border-orange-500/40 rounded-lg">
                <span className="text-cyan-300 dark:text-orange-300 font-semibold">
                  M
                </span>
                <span className="text-slate-300 ml-2">Material</span>
              </div>
            )}
          </div>
          {spell.components.material &&
            spell.components.materialDescription && (
              <div className="bg-slate-800/30 dark:bg-slate-900/30 rounded-lg p-4 border border-cyan-500/20 dark:border-orange-500/20">
                <p className="text-slate-300">
                  <span className="text-cyan-400 dark:text-orange-400 font-semibold">
                    Materials:{" "}
                  </span>
                  {spell.components.materialDescription}
                </p>
              </div>
            )}
        </div>

        {/* Combat Properties Section */}
        {(spell.damage ||
          spell.saveType ||
          spell.attackType ||
          spell.areaOfEffect) && (
          <div className="bg-slate-900/70 dark:bg-slate-950/70 backdrop-blur-md rounded-2xl border border-cyan-500/30 dark:border-orange-500/30 shadow-2xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-cyan-300 dark:text-orange-300 mb-6 flex items-center gap-2">
              <LuFlame size={24} />
              Combat Properties
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {spell.damage && (
                <div className="bg-slate-800/30 dark:bg-slate-900/30 rounded-lg p-6 border border-cyan-500/20 dark:border-orange-500/20">
                  <p className="text-sm text-slate-400 mb-2">Damage</p>
                  <div className="flex items-center gap-3">
                    <p className="text-3xl font-bold text-cyan-400 dark:text-orange-400">
                      {spell.damage}
                    </p>
                    {spell.damageType && (
                      <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600/30 to-orange-600/30 dark:from-cyan-500/30 dark:to-orange-500/30 rounded-lg border border-cyan-500/40 dark:border-orange-500/40">
                        <span className="text-2xl">
                          {damageTypeIcons[spell.damageType] || "💫"}
                        </span>
                        <span className="text-white font-semibold">
                          {spell.damageType}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {spell.saveType && (
                <div className="bg-slate-800/30 dark:bg-slate-900/30 rounded-lg p-6 border border-cyan-500/20 dark:border-orange-500/20">
                  <p className="text-sm text-slate-400 mb-2">Saving Throw</p>
                  <div className="flex items-center gap-2">
                    <LuShield
                      className="text-cyan-400 dark:text-orange-400"
                      size={28}
                    />
                    <p className="text-3xl font-bold text-white">
                      {spell.saveType}
                    </p>
                  </div>
                </div>
              )}

              {spell.attackType && (
                <div className="bg-slate-800/30 dark:bg-slate-900/30 rounded-lg p-6 border border-cyan-500/20 dark:border-orange-500/20">
                  <p className="text-sm text-slate-400 mb-2">Attack Type</p>
                  <p className="text-xl font-semibold text-white">
                    {spell.attackType}
                  </p>
                </div>
              )}

              {spell.areaOfEffect && (
                <div className="bg-slate-800/30 dark:bg-slate-900/30 rounded-lg p-6 border border-cyan-500/20 dark:border-orange-500/20">
                  <p className="text-sm text-slate-400 mb-2">Area of Effect</p>
                  <p className="text-xl font-semibold text-white">
                    {spell.areaOfEffect}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Description Section */}
        <div className="bg-slate-900/70 dark:bg-slate-950/70 backdrop-blur-md rounded-2xl border border-cyan-500/30 dark:border-orange-500/30 shadow-2xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-cyan-300 dark:text-orange-300 mb-4">
            Description
          </h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-slate-300 leading-relaxed text-lg">
              {spell.description}
            </p>
          </div>

          {spell.atHigherLevels && (
            <div className="mt-6 bg-slate-800/30 dark:bg-slate-900/30 rounded-lg p-6 border border-cyan-500/20 dark:border-orange-500/20">
              <p className="text-cyan-400 dark:text-orange-400 font-bold mb-2 text-lg">
                At Higher Levels
              </p>
              <p className="text-slate-300 leading-relaxed">
                {spell.atHigherLevels}
              </p>
            </div>
          )}
        </div>

        {/* Classes Section */}
        {spell.classes && spell.classes.length > 0 && (
          <div className="bg-slate-900/70 dark:bg-slate-950/70 backdrop-blur-md rounded-2xl border border-cyan-500/30 dark:border-orange-500/30 shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-cyan-300 dark:text-orange-300 mb-4 flex items-center gap-2">
              <LuUsers size={24} />
              Available To Classes
            </h2>
            <div className="flex flex-wrap gap-3">
              {spell.classes.map((className) => (
                <div
                  key={className}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-600/20 to-orange-600/20 dark:from-cyan-500/20 dark:to-orange-500/20 border border-cyan-500/40 dark:border-orange-500/40 rounded-lg"
                >
                  <span className="text-white font-semibold text-lg">
                    {className}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
