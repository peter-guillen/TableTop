import { useState } from "react";
import {
  LuUser,
  LuSword,
  LuBookOpen,
  LuPackage,
  LuScrollText,
} from "react-icons/lu";

export default function CharacterCreator() {
  const [activeTab, setActiveTab] = useState("basics");

  const tabs = [
    { id: "basics", label: "Basics", icon: LuUser },
    { id: "stats", label: "Stats & Abilities", icon: LuSword },
    { id: "backstory", label: "Backstory", icon: LuScrollText },
    { id: "appearance", label: "Appearance", icon: LuBookOpen },
    { id: "equipment", label: "Equipment", icon: LuPackage },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-950 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500 dark:from-purple-300 dark:via-blue-300 dark:to-purple-400 mb-2">
            Character Creation
          </h1>
          <p className="text-slate-400 dark:text-slate-500">
            Forge your legend
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6 p-2 bg-slate-900/50 dark:bg-slate-950/50 rounded-xl backdrop-blur-sm border border-purple-500/20 dark:border-blue-500/20">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === id
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-500 dark:to-blue-500 text-white shadow-lg shadow-purple-500/50 dark:shadow-blue-500/50"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50 dark:hover:bg-slate-900/50"
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Content Card */}
        <div className="bg-slate-900/70 dark:bg-slate-950/70 backdrop-blur-md rounded-2xl border border-purple-500/30 dark:border-blue-500/30 shadow-2xl p-8">
          {activeTab === "basics" && <BasicsTab />}
          {activeTab === "stats" && <StatsTab />}
          {activeTab === "backstory" && <BackstoryTab />}
          {activeTab === "appearance" && <AppearanceTab />}
          {activeTab === "equipment" && <EquipmentTab />}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <button className="px-6 py-3 rounded-lg font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 dark:hover:bg-slate-900/50 transition-all duration-300 border border-slate-700 dark:border-slate-800">
            Cancel
          </button>
          <button className="px-8 py-3 rounded-lg font-medium bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-500 dark:to-blue-500 text-white shadow-lg shadow-purple-500/50 dark:shadow-blue-500/50 hover:shadow-xl hover:shadow-purple-500/60 dark:hover:shadow-blue-500/60 transition-all duration-300">
            Save Character
          </button>
        </div>
      </div>
    </div>
  );
}

function BasicsTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-purple-300 dark:text-blue-300 mb-6">
        Basic Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Character Name */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Character Name
          </label>
          <input
            type="text"
            placeholder="Enter character name"
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-purple-500/30 dark:border-blue-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Race */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Race
          </label>
          <select className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-purple-500/30 dark:border-blue-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500 focus:border-transparent transition-all">
            <option>Select race</option>
            <option>Human</option>
            <option>Elf</option>
            <option>Dwarf</option>
            <option>Orc</option>
            <option>Halfling</option>
          </select>
        </div>

        {/* Class */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Class
          </label>
          <select className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-purple-500/30 dark:border-blue-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500 focus:border-transparent transition-all">
            <option>Select class</option>
            <option>Warrior</option>
            <option>Mage</option>
            <option>Rogue</option>
            <option>Cleric</option>
            <option>Ranger</option>
          </select>
        </div>

        {/* Level */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Level
          </label>
          <input
            type="number"
            placeholder="1"
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-purple-500/30 dark:border-blue-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Portrait Upload */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Character Portrait
        </label>
        <div className="border-2 border-dashed border-purple-500/30 dark:border-blue-500/30 rounded-lg p-8 text-center hover:border-purple-500/50 dark:hover:border-blue-500/50 transition-all cursor-pointer">
          <div className="text-slate-400 dark:text-slate-500">
            <p className="mb-2">Click to upload or drag and drop</p>
            <p className="text-sm">PNG, JPG up to 10MB</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatsTab() {
  const stats = [
    { name: "Strength", value: 10, max: 20 },
    { name: "Dexterity", value: 10, max: 20 },
    { name: "Constitution", value: 10, max: 20 },
    { name: "Intelligence", value: 10, max: 20 },
    { name: "Wisdom", value: 10, max: 20 },
    { name: "Charisma", value: 10, max: 20 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-purple-300 dark:text-blue-300">
          Stats & Abilities
        </h2>
        <div className="text-right">
          <p className="text-sm text-slate-400">Available Points</p>
          <p className="text-3xl font-bold text-purple-400 dark:text-blue-400">
            27
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-slate-800/30 dark:bg-slate-900/30 p-6 rounded-xl border border-purple-500/20 dark:border-blue-500/20"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-medium text-slate-200">
                {stat.name}
              </span>
              <span className="text-2xl font-bold text-purple-400 dark:text-blue-400">
                {stat.value}
              </span>
            </div>

            {/* Stat Bar */}
            <div className="w-full bg-slate-700/50 dark:bg-slate-800/50 rounded-full h-3 mb-3">
              <div
                className="bg-gradient-to-r from-purple-500 to-blue-500 dark:from-purple-400 dark:to-blue-400 h-3 rounded-full transition-all duration-300"
                style={{ width: `${(stat.value / stat.max) * 100}%` }}
              />
            </div>

            {/* Increment/Decrement Buttons */}
            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2 bg-slate-700/50 dark:bg-slate-800/50 hover:bg-slate-700 dark:hover:bg-slate-800 text-white rounded-lg transition-all">
                -
              </button>
              <button className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600/80 to-blue-600/80 dark:from-purple-500/80 dark:to-blue-500/80 hover:from-purple-600 hover:to-blue-600 dark:hover:from-purple-500 dark:hover:to-blue-500 text-white rounded-lg transition-all">
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Abilities Section */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-purple-300 dark:text-blue-300 mb-4">
          Special Abilities
        </h3>
        <div className="space-y-3">
          <div className="bg-slate-800/30 dark:bg-slate-900/30 p-4 rounded-lg border border-purple-500/20 dark:border-blue-500/20 flex justify-between items-center">
            <div>
              <p className="text-slate-200 font-medium">Fireball</p>
              <p className="text-sm text-slate-400">Deals 8d6 fire damage</p>
            </div>
            <button className="px-4 py-2 text-red-400 hover:text-red-300 transition-all">
              Remove
            </button>
          </div>
          <button className="w-full px-4 py-3 border-2 border-dashed border-purple-500/30 dark:border-blue-500/30 rounded-lg text-purple-400 dark:text-blue-400 hover:border-purple-500/50 dark:hover:border-blue-500/50 hover:bg-slate-800/20 dark:hover:bg-slate-900/20 transition-all">
            + Add Ability
          </button>
        </div>
      </div>
    </div>
  );
}

function BackstoryTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-purple-300 dark:text-blue-300 mb-6">
        Character Backstory
      </h2>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Background
        </label>
        <input
          type="text"
          placeholder="e.g., Noble, Soldier, Folk Hero"
          className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-purple-500/30 dark:border-blue-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Alignment
        </label>
        <select className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-purple-500/30 dark:border-blue-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500 focus:border-transparent transition-all">
          <option>Select alignment</option>
          <option>Lawful Good</option>
          <option>Neutral Good</option>
          <option>Chaotic Good</option>
          <option>Lawful Neutral</option>
          <option>True Neutral</option>
          <option>Chaotic Neutral</option>
          <option>Lawful Evil</option>
          <option>Neutral Evil</option>
          <option>Chaotic Evil</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Backstory
        </label>
        <textarea
          rows="8"
          placeholder="Tell your character's story..."
          className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-purple-500/30 dark:border-blue-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500 focus:border-transparent transition-all resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Personality Traits
          </label>
          <textarea
            rows="4"
            placeholder="Describe personality traits..."
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-purple-500/30 dark:border-blue-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500 focus:border-transparent transition-all resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Ideals
          </label>
          <textarea
            rows="4"
            placeholder="What drives your character..."
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-purple-500/30 dark:border-blue-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500 focus:border-transparent transition-all resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Bonds
          </label>
          <textarea
            rows="4"
            placeholder="Important connections..."
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-purple-500/30 dark:border-blue-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500 focus:border-transparent transition-all resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Flaws
          </label>
          <textarea
            rows="4"
            placeholder="Character weaknesses..."
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-purple-500/30 dark:border-blue-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500 focus:border-transparent transition-all resize-none"
          />
        </div>
      </div>
    </div>
  );
}

function AppearanceTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-purple-300 dark:text-blue-300 mb-6">
        Physical Appearance
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Age
          </label>
          <input
            type="text"
            placeholder="Character age"
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-purple-500/30 dark:border-blue-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Gender
          </label>
          <input
            type="text"
            placeholder="Character gender"
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-purple-500/30 dark:border-blue-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Height
          </label>
          <input
            type="text"
            placeholder="e.g., 6'2&quot;"
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-purple-500/30 dark:border-blue-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Weight
          </label>
          <input
            type="text"
            placeholder="e.g., 180 lbs"
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-purple-500/30 dark:border-blue-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Hair Color
          </label>
          <input
            type="text"
            placeholder="Hair color"
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-purple-500/30 dark:border-blue-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Eye Color
          </label>
          <input
            type="text"
            placeholder="Eye color"
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-purple-500/30 dark:border-blue-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Skin Tone
          </label>
          <input
            type="text"
            placeholder="Skin tone"
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-purple-500/30 dark:border-blue-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Build
          </label>
          <select className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-purple-500/30 dark:border-blue-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500 focus:border-transparent transition-all">
            <option>Select build</option>
            <option>Slender</option>
            <option>Athletic</option>
            <option>Muscular</option>
            <option>Heavyset</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Distinguishing Features
        </label>
        <textarea
          rows="4"
          placeholder="Scars, tattoos, unique characteristics..."
          className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-purple-500/30 dark:border-blue-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500 focus:border-transparent transition-all resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          General Description
        </label>
        <textarea
          rows="6"
          placeholder="Describe your character's overall appearance..."
          className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-purple-500/30 dark:border-blue-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500 focus:border-transparent transition-all resize-none"
        />
      </div>
    </div>
  );
}

function EquipmentTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-purple-300 dark:text-blue-300 mb-6">
        Equipment & Inventory
      </h2>

      {/* Equipped Items */}
      <div>
        <h3 className="text-lg font-semibold text-slate-200 mb-4">
          Equipped Items
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-800/30 dark:bg-slate-900/30 p-4 rounded-lg border border-purple-500/20 dark:border-blue-500/20">
            <p className="text-sm text-slate-400 mb-2">Weapon</p>
            <input
              type="text"
              placeholder="e.g., Longsword +1"
              className="w-full px-3 py-2 bg-slate-800/50 dark:bg-slate-900/50 border border-purple-500/20 dark:border-blue-500/20 rounded text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="bg-slate-800/30 dark:bg-slate-900/30 p-4 rounded-lg border border-purple-500/20 dark:border-blue-500/20">
            <p className="text-sm text-slate-400 mb-2">Armor</p>
            <input
              type="text"
              placeholder="e.g., Plate Mail"
              className="w-full px-3 py-2 bg-slate-800/50 dark:bg-slate-900/50 border border-purple-500/20 dark:border-blue-500/20 rounded text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="bg-slate-800/30 dark:bg-slate-900/30 p-4 rounded-lg border border-purple-500/20 dark:border-blue-500/20">
            <p className="text-sm text-slate-400 mb-2">Shield</p>
            <input
              type="text"
              placeholder="e.g., Tower Shield"
              className="w-full px-3 py-2 bg-slate-800/50 dark:bg-slate-900/50 border border-purple-500/20 dark:border-blue-500/20 rounded text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="bg-slate-800/30 dark:bg-slate-900/30 p-4 rounded-lg border border-purple-500/20 dark:border-blue-500/20">
            <p className="text-sm text-slate-400 mb-2">Accessory</p>
            <input
              type="text"
              placeholder="e.g., Ring of Protection"
              className="w-full px-3 py-2 bg-slate-800/50 dark:bg-slate-900/50 border border-purple-500/20 dark:border-blue-500/20 rounded text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Inventory */}
      <div>
        <h3 className="text-lg font-semibold text-slate-200 mb-4">Inventory</h3>
        <div className="space-y-3">
          <div className="bg-slate-800/30 dark:bg-slate-900/30 p-4 rounded-lg border border-purple-500/20 dark:border-blue-500/20 flex justify-between items-center">
            <div className="flex-1">
              <p className="text-slate-200">Health Potion</p>
              <p className="text-sm text-slate-400">Restores 50 HP</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-purple-400 dark:text-blue-400">x3</span>
              <button className="text-red-400 hover:text-red-300 transition-all">
                Remove
              </button>
            </div>
          </div>

          <div className="bg-slate-800/30 dark:bg-slate-900/30 p-4 rounded-lg border border-purple-500/20 dark:border-blue-500/20 flex justify-between items-center">
            <div className="flex-1">
              <p className="text-slate-200">Rope (50ft)</p>
              <p className="text-sm text-slate-400">Adventuring gear</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-purple-400 dark:text-blue-400">x1</span>
              <button className="text-red-400 hover:text-red-300 transition-all">
                Remove
              </button>
            </div>
          </div>

          <button className="w-full px-4 py-3 border-2 border-dashed border-purple-500/30 dark:border-blue-500/30 rounded-lg text-purple-400 dark:text-blue-400 hover:border-purple-500/50 dark:hover:border-blue-500/50 hover:bg-slate-800/20 dark:hover:bg-slate-900/20 transition-all">
            + Add Item
          </button>
        </div>
      </div>

      {/* Currency */}
      <div>
        <h3 className="text-lg font-semibold text-slate-200 mb-4">Currency</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/30 dark:bg-slate-900/30 p-4 rounded-lg border border-purple-500/20 dark:border-blue-500/20 text-center">
            <p className="text-sm text-slate-400 mb-2">Gold</p>
            <input
              type="number"
              placeholder="0"
              className="w-full px-3 py-2 bg-slate-800/50 dark:bg-slate-900/50 border border-purple-500/20 dark:border-blue-500/20 rounded text-white text-center placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="bg-slate-800/30 dark:bg-slate-900/30 p-4 rounded-lg border border-purple-500/20 dark:border-blue-500/20 text-center">
            <p className="text-sm text-slate-400 mb-2">Silver</p>
            <input
              type="number"
              placeholder="0"
              className="w-full px-3 py-2 bg-slate-800/50 dark:bg-slate-900/50 border border-purple-500/20 dark:border-blue-500/20 rounded text-white text-center placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="bg-slate-800/30 dark:bg-slate-900/30 p-4 rounded-lg border border-purple-500/20 dark:border-blue-500/20 text-center">
            <p className="text-sm text-slate-400 mb-2">Copper</p>
            <input
              type="number"
              placeholder="0"
              className="w-full px-3 py-2 bg-slate-800/50 dark:bg-slate-900/50 border border-purple-500/20 dark:border-blue-500/20 rounded text-white text-center placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="bg-slate-800/30 dark:bg-slate-900/30 p-4 rounded-lg border border-purple-500/20 dark:border-blue-500/20 text-center">
            <p className="text-sm text-slate-400 mb-2">Platinum</p>
            <input
              type="number"
              placeholder="0"
              className="w-full px-3 py-2 bg-slate-800/50 dark:bg-slate-900/50 border border-purple-500/20 dark:border-blue-500/20 rounded text-white text-center placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-blue-500 transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
