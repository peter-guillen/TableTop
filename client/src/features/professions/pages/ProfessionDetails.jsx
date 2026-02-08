import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
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
import { SpellContext } from "../context/SpellContext";

export function SpellDetails() {
  const { spellList } = useContext(SpellContext);

  const { id } = useParams();
  const navigate = useNavigate();
  const handleReturn = () => navigate(-1);

  const spell = spellList.find((spell) => spell._id === id);

  if (!spell) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-300">
        <p>Spell not found or still loading...</p>
      </div>
    );
  }

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
        <button
          onClick={handleReturn}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-all group"
        >
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
                {spell.tier} {spell.school}
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
        {/* Combat Properties Section */}
        <div className="bg-slate-900/70 dark:bg-slate-950/70 backdrop-blur-md rounded-2xl border border-cyan-500/30 dark:border-orange-500/30 shadow-2xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-cyan-300 dark:text-orange-300 mb-6 flex items-center gap-2">
            <LuFlame size={24} />
            Combat Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800/30 dark:bg-slate-900/30 rounded-lg p-6 border border-cyan-500/20 dark:border-orange-500/20">
              <p className="text-sm text-slate-400 mb-2">Damage</p>
              <div className="flex items-center gap-3">
                <p className="text-3xl font-bold text-cyan-400 dark:text-orange-400">
                  {`${spell.damage[0].diceCount}d${spell.damage[0].diceSize}`}
                </p>
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600/30 to-orange-600/30 dark:from-cyan-500/30 dark:to-orange-500/30 rounded-lg border border-cyan-500/40 dark:border-orange-500/40">
                  <span className="text-2xl">
                    {damageTypeIcons[spell.damageType] || "💫"}
                  </span>
                  <span className="text-white font-semibold">
                    {spell.modifier} - 0
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/30 dark:bg-slate-900/30 rounded-lg p-6 border border-cyan-500/20 dark:border-orange-500/20">
              <p className="text-sm text-slate-400 mb-2">Attack Type</p>
              <p className="text-xl font-semibold text-white">
                {spell.attackType}
              </p>
            </div>

            <div className="bg-slate-800/30 dark:bg-slate-900/30 rounded-lg p-6 border border-cyan-500/20 dark:border-orange-500/20">
              <p className="text-sm text-slate-400 mb-2">Area of Effect</p>
              <p className="text-xl font-semibold text-white">
                {spell.areaOfEffect}
              </p>
            </div>
          </div>
        </div>
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
        </div>
      </div>
    </div>
  );
}
