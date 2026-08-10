import { useNavigate, useParams } from "react-router-dom";
import {
  LuArrowLeft,
  LuSword,
  LuBookOpen,
  LuGem,
  LuCoins,
  LuHammer,
  LuShield,
  LuUsers,
} from "react-icons/lu";

import { useGetAllSpellsQuery } from "../../spells/api/spellApi";
import { useGetWeaponByIdQuery } from "../api/weaponApi.tsx";

// const titleCase = (str: string) =>
//   str
//     .split("_")
//     .map((word) => word[0].toUpperCase() + word.slice(1))
//     .join(" ");

export function WeaponDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: weapon, isLoading, isError } = useGetWeaponByIdQuery(id ?? "");
  const { data: spells = [] } = useGetAllSpellsQuery();
  const spellsById = Object.fromEntries(spells.map((s) => [s._id, s]));

  const navigate = useNavigate();
  const handleReturn = () => navigate(-1);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;

  if (!weapon) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 dark:text-slate-300">
        <p>Weapon not found or still loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-orange-50 to-slate-50 dark:from-slate-950 dark:via-cyan-950 dark:to-slate-950 p-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={handleReturn}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-6 transition-all group"
        >
          <LuArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Back to Weapon List</span>
        </button>

        {/* Header Card */}
        <div className="bg-white dark:bg-slate-950/70 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-orange-500/30 shadow-md dark:shadow-2xl p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <LuSword
                  className="text-cyan-600 dark:text-orange-400"
                  size={36}
                />
                <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-orange-500 to-cyan-600 dark:from-cyan-300 dark:via-orange-300 dark:to-cyan-400">
                  {weapon.name}
                </h1>
              </div>

              <p className="text-xl text-slate-600 dark:text-slate-300 italic">
                <span className="capitalize">{weapon.category}</span> &bull;{" "}
                <span className="capitalize">{weapon.rarity}</span>
              </p>
            </div>
            <div className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-orange-600 shadow-lg">
              <p className="text-white font-bold text-lg capitalize">
                {weapon.rarity}
              </p>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-200 dark:border-orange-500/20">
              <div className="flex items-center gap-3 mb-2">
                <LuHammer
                  className="text-cyan-600 dark:text-orange-400"
                  size={20}
                />
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  Category
                </p>
              </div>
              <p className="text-xl text-slate-900 dark:text-white font-semibold capitalize">
                {weapon.category}
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-200 dark:border-orange-500/20">
              <div className="flex items-center gap-3 mb-2">
                <LuGem
                  className="text-cyan-600 dark:text-orange-400"
                  size={20}
                />
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  Rarity
                </p>
              </div>
              <p className="text-xl text-slate-900 dark:text-white font-semibold capitalize">
                {weapon.rarity}
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-200 dark:border-orange-500/20">
              <div className="flex items-center gap-3 mb-2">
                <LuCoins
                  className="text-cyan-600 dark:text-orange-400"
                  size={20}
                />
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  Value
                </p>
              </div>
              <p className="text-xl text-slate-900 dark:text-white font-semibold">
                {weapon.value != null ? weapon.value : "\u2014"}
              </p>
            </div>
          </div>
        </div>
        {/* Combat Properties Section */}
        <div className="bg-white dark:bg-slate-950/70 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-orange-500/30 shadow-md dark:shadow-2xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-cyan-700 dark:text-orange-300 mb-6 flex items-center gap-2">
            <LuSword size={24} />
            Combat Properties
          </h2>

          <div className="space-y-4">
            {weapon.damageType && weapon.damageType.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 mb-2">
                  Damage Type
                </p>
                <div className="flex flex-wrap gap-2">
                  {weapon.damageType.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 dark:bg-orange-500/20 dark:text-orange-300 capitalize"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {weapon.properties && weapon.properties.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 mb-2">
                  Properties
                </p>
                <div className="flex flex-wrap gap-2">
                  {weapon.properties.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300 capitalize"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {weapon.materials && weapon.materials.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 mb-2">
                  Materials
                </p>
                <div className="flex flex-wrap gap-2">
                  {weapon.materials.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-700/50 dark:text-slate-300 capitalize"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {weapon.quality && weapon.quality.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 mb-2">
                  Quality
                </p>
                <div className="flex flex-wrap gap-2">
                  {weapon.quality.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300 capitalize"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stat Modifiers Section */}
        {weapon.statModifiers && weapon.statModifiers.length > 0 && (
          <div className="bg-white dark:bg-slate-950/70 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-orange-500/30 shadow-md dark:shadow-2xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-cyan-700 dark:text-orange-300 mb-6 flex items-center gap-2">
              <LuShield size={24} />
              Stat Modifiers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {weapon.statModifiers.map((modifier, index) => (
                <div
                  key={index}
                  className="bg-slate-50 dark:bg-slate-900/30 rounded-lg p-4 border border-slate-200 dark:border-orange-500/20"
                >
                  <p className="text-slate-900 dark:text-white font-semibold mb-1">
                    {modifier.stat} {modifier.value > 0 ? "+" : ""}
                    {modifier.value}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {modifier.durationType === "until_broken"
                      ? "Until Broken"
                      : modifier.durationType === "turns"
                        ? "Turns"
                        : "Permanent"}
                    {modifier.durationType === "turns" &&
                    modifier.duration != null
                      ? ` (${modifier.duration} turns)`
                      : ""}
                    {modifier.target
                      ? ` \u2022 Target: ${modifier.target}`
                      : ""}
                  </p>
                  {modifier.description && (
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                      {modifier.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {weapon.skills && weapon.skills.length > 0 && (
          <div className="bg-white dark:bg-slate-950/70 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-orange-500/30 shadow-md dark:shadow-2xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-cyan-700 dark:text-orange-300 mb-6 flex items-center gap-2">
              <LuUsers size={24} />
              Skills
            </h2>
            <div className="flex flex-wrap gap-3">
              {weapon.skills.map((skillId) => {
                const spell = spellsById[skillId];
                return (
                  <div
                    key={skillId}
                    className="bg-slate-50 dark:bg-slate-900/30 rounded-lg px-4 py-2 border border-slate-200 dark:border-orange-500/20"
                  >
                    <p className="text-slate-900 dark:text-white font-semibold">
                      {spell ? spell.name : skillId}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Unique Skills Section */}
        {weapon.uniqueSkills && weapon.uniqueSkills.length > 0 && (
          <div className="bg-white dark:bg-slate-950/70 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-orange-500/30 shadow-md dark:shadow-2xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-cyan-700 dark:text-orange-300 mb-6 flex items-center gap-2">
              <LuGem size={24} />
              Unique Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {weapon.uniqueSkills.map((skill, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 dark:bg-orange-500/20 dark:text-orange-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Description Section */}
        <div className="bg-white dark:bg-slate-950/70 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-orange-500/30 shadow-md dark:shadow-2xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-cyan-700 dark:text-orange-300 mb-4 flex items-center gap-2">
            <LuBookOpen size={24} />
            Description
          </h2>
          <div className="prose max-w-none">
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
              {weapon.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
