import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SpellContext } from "../context/SpellContext";
import { SpellBasicInfoSection } from "../components/SpellBasicInfoSection";
import {
  LuSparkles,
  LuBookOpen,
  LuClock,
  LuTarget,
  LuFlame,
} from "react-icons/lu";

// Spell
// Name - FlameBlast
// School - Evocation
// Category - Damage
// Source - Arcane
// Element - Fire
// Range - 60ft
// Area - 20ft sphere
// Casting Time - 1 action
// Duration - Instantaneous
// Damage - 4d6
// Effect - Burn
// Cost - Equivalent to level for DnD

export function SpellForm() {
  const { spellList, createSpell, updateSpell } = useContext(SpellContext);
  const [currentSpell, setCurrentSpell] = useState("");
  const [formData, setFormData] = useState({
    name: spellList?.name || "",
    description: spellList?.description || "",
    domain: spellList?.domain || "",
    school: spellList?.school || "",
    category: spellList?.category || "",
    damage: spellList?.damage || "",
    healing: spellList?.healing || "",
    effect: spellList?.effect || "",
    casting: spellList?.casting || "",
    range: spellList?.range || "",
    duration: spellList?.duration || "",
  });
  const { id } = useParams();
  const isEditing = Boolean(id);

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    const getSpellById = spellList.find((spell) => spell._id === id);
    if (getSpellById) {
      setCurrentSpell(getSpellById.name);
      setFormData(getSpellById);
    }
  }, [id, spellList]);

  const handleInputChange = (event) => {
    // const { name, value } = event.target;
    // setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createSpell(formData);
    navigate("/spells");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-350 via-cyan-350 to-slate-300 dark:from-slate-950 dark:via-cyan-950 dark:to-slate-950 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <LuSparkles
              className="text-cyan-400 dark:text-orange-400"
              size={32}
            />
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-orange-400 to-cyan-500 dark:from-cyan-300 dark:via-orange-300 dark:to-cyan-400">
              {isEditing ? "Edit Spell" : "Create Spell"}
            </h1>
          </div>
          <p className="text-slate-400 dark:text-slate-500">
            Weave your magical creation
          </p>
        </div>

        {/* Main Form Card */}
        <form onSubmit={handleSubmit}>
          <div className="bg-slate-900/70 dark:bg-slate-950/70 backdrop-blur-md rounded-2xl border border-cyan-500/30 dark:border-orange-500/30 shadow-2xl p-8 mb-6">
            <div className="space-y-8">
              {/* Basic Information */}
              <SpellBasicInfoSection
                name={formData.name}
                school={formData.school}
                handleInputChange={handleInputChange}
              />

              {/* Casting Details */}
              <section>
                <h2 className="text-xl font-bold text-cyan-300 dark:text-orange-300 mb-4 flex items-center gap-2">
                  <LuClock size={20} />
                  Casting Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Casting Time
                    </label>
                    <input
                      type="text"
                      placeholder="Enter spell name"
                      name="casting"
                      onChange={handleInputChange}
                      value={formData.casting}
                      className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Range
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 60 feet"
                      name="range"
                      onChange={handleInputChange}
                      value={formData.range}
                      className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Instantaneous"
                      name="duration"
                      onChange={handleInputChange}
                      value={formData.duration}
                      className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Components
                  </label>
                  <div className="flex gap-4 mb-3">
                    <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-cyan-500/30 dark:border-orange-500/30 bg-slate-800/50 dark:bg-slate-900/50 text-cyan-500 dark:text-orange-500 focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500"
                      />
                      <span>Verbal (V)</span>
                    </label>
                    <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-cyan-500/30 dark:border-orange-500/30 bg-slate-800/50 dark:bg-slate-900/50 text-cyan-500 dark:text-orange-500 focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500"
                      />
                      <span>Somatic (S)</span>
                    </label>
                    <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-cyan-500/30 dark:border-orange-500/30 bg-slate-800/50 dark:bg-slate-900/50 text-cyan-500 dark:text-orange-500 focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500"
                      />
                      <span>Material (M)</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="Material components (if applicable)"
                    className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>
              </section>

              {/* Combat Stats */}
              <section>
                <h2 className="text-xl font-bold text-cyan-300 dark:text-orange-300 mb-4 flex items-center gap-2">
                  <LuFlame size={20} />
                  Combat Properties
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Damage Dice
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 8d6"
                      name="damage"
                      onChange={handleInputChange}
                      value={formData.damage}
                      className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Damage Type
                    </label>
                    <select className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all">
                      <option value="">None</option>
                      <option>Fire</option>
                      <option>Water</option>
                      <option>Lightning</option>
                      <option>Thunder</option>
                      <option>Acid</option>
                      <option>Poison</option>
                      <option>Vitae</option>
                      <option>Necrotic</option>
                      <option>Radiant</option>
                      <option>Gloom</option>
                      <option>Force</option>
                      <option>Psychic</option>
                      <option>Spirit</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Save Type
                    </label>
                    <select className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all">
                      <option value="">None</option>
                      <option>Strength</option>
                      <option>Dexterity</option>
                      <option>Constitution</option>
                      <option>Intelligence</option>
                      <option>Wisdom</option>
                      <option>Charisma</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Attack Type
                    </label>
                    <select className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all">
                      <option value="">None</option>
                      <option>Melee Spell Attack</option>
                      <option>Ranged Spell Attack</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Area of Effect
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 20-foot radius sphere"
                      className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </section>

              {/* Description */}
              <section>
                <h2 className="text-xl font-bold text-cyan-300 dark:text-orange-300 mb-4 flex items-center gap-2">
                  <LuTarget size={20} />
                  Spell Description
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Description
                    </label>
                    <textarea
                      rows="6"
                      placeholder="Describe what the spell does..."
                      name="description"
                      onChange={handleInputChange}
                      value={formData.description}
                      className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      At Higher Levels
                    </label>
                    <textarea
                      rows="3"
                      placeholder="When you cast this spell using a spell slot of..."
                      className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>
                </div>
              </section>

              {/* Classes */}
              <section>
                <h2 className="text-xl font-bold text-cyan-300 dark:text-orange-300 mb-4">
                  Available To Classes
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    "Bard",
                    "Cleric",
                    "Druid",
                    "Paladin",
                    "Ranger",
                    "Sorcerer",
                    "Warlock",
                    "Wizard",
                  ].map((className) => (
                    <label
                      key={className}
                      className="flex items-center gap-2 text-slate-300 cursor-pointer bg-slate-800/30 dark:bg-slate-900/30 p-3 rounded-lg border border-cyan-500/20 dark:border-orange-500/20 hover:border-cyan-500/40 dark:hover:border-orange-500/40 transition-all"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-cyan-500/30 dark:border-orange-500/30 bg-slate-800/50 dark:bg-slate-900/50 text-cyan-500 dark:text-orange-500 focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500"
                      />
                      <span>{className}</span>
                    </label>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              onClick={handleCancel}
              className="px-6 py-3 rounded-lg font-medium text-slate-400 hover:text-white hover:bg-orange-800/50 dark:hover:bg-slate-900/50 transition-all duration-300 border border-orange-700 dark:border-orange-800"
            >
              Cancel
            </button>
            <button className="px-8 py-3 rounded-lg font-medium bg-gradient-to-r from-cyan-600 to-orange-600 dark:from-cyan-500 dark:to-orange-500 text-white shadow-lg shadow-cyan-500/50 dark:shadow-orange-500/50 hover:shadow-xl hover:shadow-cyan-500/60 dark:hover:shadow-orange-500/60 transition-all duration-300">
              {isEditing ? "Update Spell" : "Create Spell"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
