import { useReducer, useState } from "react";
import { LuShield, LuSword, LuZap, LuWand } from "react-icons/lu";

interface ReducerProps {
  stats: { [key: string]: number };
  armorType: string | number;
  weaponType: string | number;
}

interface Action {
  type: string;
  payload: {
    value: string | number;
    stat?: string;
  };
}

const UPDATE_STAT = "update_stat";
const ARMOR_SELECT = "armor_select";
const WEAPON_SELECT = "weapon_select";

const reducer = (state: ReducerProps, action: Action): ReducerProps => {
  let updatedStats;
  switch (action.type) {
    case UPDATE_STAT:
      return {
        ...state,
        stats: {
          ...state.stats,
          [action.payload.stat]: action.payload.value,
        },
      };

    case ARMOR_SELECT:
      updatedStats = { ...state.stats };
      if (action.payload.value === "heavyArmor") {
        updatedStats.dexterity -= 3;
      } else if (state.armorType === "heavyArmor") {
        updatedStats.dexterity += 3;
      }
      if (action.payload.value === "mediumArmor") {
        updatedStats.dexterity -= 1;
      } else if (state.armorType === "mediumArmor") {
        updatedStats.dexterity += 1;
      }
      return { ...state, armorType: action.payload.value, stats: updatedStats };

    case WEAPON_SELECT:
      updatedStats = { ...state.stats };
      if (action.payload.value === "claymore") {
        if (updatedStats.strength >= 12) {
        } else {
          updatedStats.dexterity -= 1;
        }
      } else if (state.weaponType === "claymore" && state.stats.strength < 12) {
        updatedStats.dexterity += 1;
      }
      return {
        ...state,
        weaponType: action.payload.value,
        stats: updatedStats,
      };

    default:
      return state;
  }
};

export function CharacterBuilder() {
  const initialState = {
    armorType: "",
    weaponType: "",
    stats: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    },
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [weaponFilter, setWeaponFilter] = useState("all");
  const [armorFilter, setArmorFilter] = useState("all");

  const handleStatChange = (stat: string, value: number) => {
    dispatch({ type: UPDATE_STAT, payload: { stat, value } });
  };

  const handleArmorChange = (value: string) => {
    dispatch({ type: ARMOR_SELECT, payload: { value } });
  };

  const handleWeaponChange = (value: string) => {
    dispatch({ type: WEAPON_SELECT, payload: { value } });
  };

  const stats = [
    { name: "strength", label: "Strength" },
    { name: "dexterity", label: "Dexterity" },
    { name: "constitution", label: "Constitution" },
    { name: "intelligence", label: "Intelligence" },
    { name: "wisdom", label: "Wisdom" },
    { name: "charisma", label: "Charisma" },
  ];

  const weaponCategories = [
    { id: "all", label: "All Weapons" },
    { id: "oneHanded", label: "One-Handed" },
    { id: "twoHanded", label: "Two-Handed" },
    { id: "polearms", label: "Polearms" },
    { id: "ranged", label: "Ranged" },
  ];

  const weapons = {
    oneHanded: [
      { id: "sword", label: "Sword", damage: "1d8" },
      { id: "dagger", label: "Dagger", damage: "1d4" },
      { id: "mace", label: "Mace", damage: "1d6" },
      { id: "axe", label: "Axe", damage: "1d6" },
    ],
    twoHanded: [
      { id: "claymore", label: "Claymore", damage: "2d6" },
      { id: "greatsword", label: "Greatsword", damage: "2d6" },
      { id: "greataxe", label: "Greataxe", damage: "1d12" },
    ],
    polearms: [
      { id: "spear", label: "Spear", damage: "1d6" },
      { id: "halberd", label: "Halberd", damage: "1d10" },
      { id: "pike", label: "Pike", damage: "1d10" },
    ],
    ranged: [
      { id: "shortbow", label: "Shortbow", damage: "1d6" },
      { id: "longbow", label: "Longbow", damage: "1d8" },
      { id: "crossbow", label: "Crossbow", damage: "1d10" },
    ],
  };

  const armorCategories = [
    { id: "all", label: "All Armor" },
    { id: "light", label: "Light" },
    { id: "medium", label: "Medium" },
    { id: "heavy", label: "Heavy" },
    { id: "shields", label: "Shield" },
  ];

  const armors = {
    light: [
      { id: "leather", label: "Leather Armor", ac: "11" },
      { id: "studded", label: "Studded Leather", ac: "12" },
      { id: "padded", label: "Padded Armor", ac: "11" },
    ],
    medium: [
      { id: "hide", label: "Hide Armor", ac: "12" },
      { id: "chainShirt", label: "Chain Shirt", ac: "13" },
      { id: "scaleMail", label: "Scale Mail", ac: "14" },
    ],
    heavy: [
      { id: "chainMail", label: "Chain Mail", ac: "16" },
      { id: "plateMail", label: "Plate Mail", ac: "18" },
      { id: "splint", label: "Splint Armor", ac: "17" },
    ],
    shields: [
      { id: "buckler", label: "Buckler", ac: "+1" },
      { id: "shield", label: "Shield", ac: "+2" },
      { id: "towerShield", label: "Tower Shield", ac: "+3" },
    ],
  };

  const getFilteredWeapons = () => {
    if (weaponFilter === "all") return Object.values(weapons).flat();
    return weapons[weaponFilter] || [];
  };

  const getFilteredArmors = () => {
    if (armorFilter === "all") return Object.values(armors).flat();
    return armors[armorFilter] || [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-cyan-50 to-slate-100 dark:from-slate-950 dark:via-cyan-950 dark:to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-500 to-orange-500 dark:from-cyan-300 dark:via-cyan-300 dark:to-orange-400 mb-2">
            Character Configuration
          </h1>
          <p className="text-slate-500 dark:text-slate-500">
            Build your perfect adventurer
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stats Section */}
            <div className="bg-white/80 dark:bg-slate-900/70 backdrop-blur-md rounded-2xl border border-orange-400/30 dark:border-orange-500/30 shadow-md dark:shadow-2xl p-6">
              <h2 className="text-2xl font-bold text-cyan-700 dark:text-cyan-300 mb-6 flex items-center gap-2">
                <LuZap size={24} />
                Ability Scores
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map(({ name, label }) => (
                  <div
                    key={name}
                    className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-orange-400/20 dark:border-orange-500/20"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-lg font-medium text-slate-700 dark:text-slate-200">
                        {label}
                      </label>
                      <span className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">
                        {state.stats[name]}
                      </span>
                    </div>

                    <input
                      type="number"
                      value={state.stats[name]}
                      onChange={(e) =>
                        handleStatChange(name, parseInt(e.target.value) || 0)
                      }
                      className="w-full px-4 py-3 bg-white dark:bg-slate-700/50 border border-orange-400/30 dark:border-orange-500/30 rounded-lg text-slate-900 dark:text-white text-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all mb-3"
                      max={20}
                      min={0}
                    />

                    <div className="flex items-center justify-center gap-2 bg-cyan-100 dark:bg-cyan-600/20 border border-orange-400/30 dark:border-orange-500/40 rounded-lg py-2">
                      <span className="text-sm text-slate-500 dark:text-slate-300">
                        Modifier:
                      </span>
                      <span className="text-xl font-bold text-cyan-700 dark:text-cyan-300">
                        {Math.floor((state.stats[name] - 10) / 2) >= 0
                          ? "+"
                          : ""}
                        {Math.floor((state.stats[name] - 10) / 2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weapons Section */}
            <div className="bg-white/80 dark:bg-slate-900/70 backdrop-blur-md rounded-2xl border border-orange-400/30 dark:border-orange-500/30 shadow-md dark:shadow-2xl p-6">
              <h2 className="text-2xl font-bold text-cyan-700 dark:text-cyan-300 mb-6 flex items-center gap-2">
                <LuSword size={24} />
                Weapons
              </h2>

              <div className="mb-6">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                  Filter by Category
                </p>
                <div className="flex flex-wrap gap-2">
                  {weaponCategories.map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => setWeaponFilter(id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        weaponFilter === id
                          ? "bg-gradient-to-r from-cyan-600 to-orange-500 dark:from-cyan-500 dark:to-orange-500 text-white shadow-sm"
                          : "bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {getFilteredWeapons().map((weapon) => (
                  <button
                    key={weapon.id}
                    onClick={() => handleWeaponChange(weapon.id)}
                    className={`p-4 rounded-lg border transition-all text-left ${
                      state.weaponType === weapon.id
                        ? "bg-cyan-100 dark:bg-cyan-600/30 border-orange-500"
                        : "bg-slate-50 dark:bg-slate-900/30 border-orange-400/20 dark:border-orange-500/20 hover:border-orange-400/50 dark:hover:border-orange-500/40 hover:bg-slate-100 dark:hover:bg-slate-800/30"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-slate-700 dark:text-slate-200 font-medium">
                        {weapon.label}
                      </span>
                      <span className="text-cyan-600 dark:text-cyan-400 text-sm">
                        {weapon.damage}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Armor Section */}
            <div className="bg-white/80 dark:bg-slate-900/70 backdrop-blur-md rounded-2xl border border-orange-400/30 dark:border-orange-500/30 shadow-md dark:shadow-2xl p-6">
              <h2 className="text-2xl font-bold text-cyan-700 dark:text-cyan-300 mb-6 flex items-center gap-2">
                <LuShield size={24} />
                Armor
              </h2>

              <div className="mb-6">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                  Filter by Category
                </p>
                <div className="flex flex-wrap gap-2">
                  {armorCategories.map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => setArmorFilter(id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        armorFilter === id
                          ? "bg-gradient-to-r from-cyan-600 to-orange-500 dark:from-cyan-500 dark:to-orange-500 text-white shadow-sm"
                          : "bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {getFilteredArmors().map((armor) => (
                  <button
                    key={armor.id}
                    onClick={() => handleArmorChange(armor.id)}
                    className={`p-4 rounded-lg border transition-all text-left ${
                      state.armorType === armor.id
                        ? "bg-cyan-100 dark:bg-cyan-600/30 border-orange-500"
                        : "bg-slate-50 dark:bg-slate-900/30 border-orange-400/20 dark:border-orange-500/20 hover:border-orange-400/50 dark:hover:border-orange-500/40 hover:bg-slate-100 dark:hover:bg-slate-800/30"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-slate-700 dark:text-slate-200 font-medium">
                        {armor.label}
                      </span>
                      <span className="text-cyan-600 dark:text-cyan-400 text-sm">
                        AC {armor.ac}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side Panel - Character Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 dark:bg-slate-900/70 backdrop-blur-md rounded-2xl border border-orange-400/30 dark:border-orange-500/30 shadow-md dark:shadow-2xl p-6 sticky top-6">
              <h2 className="text-xl font-bold text-cyan-700 dark:text-cyan-300 mb-6">
                Character Summary
              </h2>

              {/* Stats Summary */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-400 dark:text-slate-400 mb-3 uppercase">
                  Ability Scores
                </h3>
                <div className="space-y-2">
                  {stats.map(({ name, label }) => (
                    <div
                      key={name}
                      className="flex justify-between items-center text-slate-600 dark:text-slate-300"
                    >
                      <span className="text-sm">{label}:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">
                          {state.stats[name]}
                        </span>
                        <span className="text-xs text-cyan-600 dark:text-cyan-400">
                          (
                          {Math.floor((state.stats[name] - 10) / 2) >= 0
                            ? "+"
                            : ""}
                          {Math.floor((state.stats[name] - 10) / 2)})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Equipment */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-400 dark:text-slate-400 mb-3 uppercase">
                  Equipment
                </h3>
                <div className="space-y-3">
                  <div className="bg-slate-50 dark:bg-slate-800/30 p-3 rounded-lg border border-orange-400/20 dark:border-orange-500/20">
                    <p className="text-xs text-slate-400 mb-1">Weapon</p>
                    <p className="text-slate-700 dark:text-slate-200 font-medium">
                      {state.weaponType || "None"}
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/30 p-3 rounded-lg border border-orange-400/20 dark:border-orange-500/20">
                    <p className="text-xs text-slate-400 mb-1">Armor</p>
                    <p className="text-slate-700 dark:text-slate-200 font-medium">
                      {state.armorType || "None"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Spells */}
              <div>
                <h3 className="text-sm font-semibold text-slate-400 dark:text-slate-400 mb-3 uppercase flex items-center gap-2">
                  <LuWand size={16} />
                  Spells
                </h3>
                <div className="bg-slate-50 dark:bg-slate-800/30 p-4 rounded-lg border border-orange-400/20 dark:border-orange-500/20 text-center">
                  <p className="text-slate-400 dark:text-slate-500 text-sm">
                    No spells selected
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
