import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import {
  LuArrowLeft,
  LuCrown,
  LuShield,
  LuSword,
  LuSparkles,
  LuStar,
  LuBookOpen,
  LuUsers,
  LuZap,
  LuPackage,
  LuCircle,
} from "react-icons/lu";
import { ProfessionContext } from "../context/ProfessionContext";

const ABILITY_LABELS = {
  strength: "STR",
  dexterity: "DEX",
  constitution: "CON",
  intelligence: "INT",
  wisdom: "WIS",
  charisma: "CHA",
};

const SPELL_LEVELS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// Reusable detail card — matches LandingPage feature card pattern
function DetailCard({ children, className = "" }) {
  return (
    <div
      className={`bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-950/80 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-cyan-500/20 shadow-md p-8 mb-6 ${className}`}
    >
      {children}
    </div>
  );
}

// Section title — cyan in dark, slate in light
function SectionTitle({ icon: Icon, children }) {
  return (
    <h2 className="text-2xl font-bold text-slate-800 dark:text-cyan-300 mb-6 flex items-center gap-2">
      <Icon size={22} />
      {children}
    </h2>
  );
}

// Stat tile — matches LandingPage's inner stat box pattern
function StatTile({ label, value }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-700/40 rounded-lg p-4 border border-slate-200 dark:border-cyan-500/20">
      <p className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">
        {label}
      </p>
      <p className="text-xl text-slate-800 dark:text-white font-semibold">
        {value || "—"}
      </p>
    </div>
  );
}

export function ProfessionDetails() {
  const { professionList } = useContext(ProfessionContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const profession = professionList.find((p) => p._id === id);

  if (!profession) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 dark:text-slate-300">
        <p>Class not found or still loading...</p>
      </div>
    );
  }

  const savingThrowsActive = Object.entries(profession.savingThrows || {})
    .filter(([, v]) => v)
    .map(([k]) => ABILITY_LABELS[k] || k);

  const spellSlotsExist = profession.spellSlots?.length > 0;
  const sortedLevels = [...(profession.levels || [])].sort(
    (a, b) => a.level - b.level,
  );
  const sortedSpellSlots = [...(profession.spellSlots || [])].sort(
    (a, b) => a.level - b.level,
  );

  return (
    // Page background — matches LandingPage exactly
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-orange-50 to-slate-50 dark:from-slate-900 dark:via-cyan-900 dark:to-slate-900 p-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-6 transition-all group"
        >
          <LuArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Back to Classes</span>
        </button>

        {/* ── Header Card ── */}
        <DetailCard>
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <LuCrown
                  className="text-cyan-600 dark:text-cyan-400"
                  size={36}
                />
                {/* Title gradient — matches LandingPage h1 gradient */}
                <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-orange-500 to-orange-500 dark:from-cyan-400 dark:via-orange-400 dark:to-orange-400">
                  {profession.title}
                </h1>
              </div>
              {profession.description && (
                <p className="text-lg text-slate-600 dark:text-gray-300 italic leading-relaxed">
                  {profession.description}
                </p>
              )}
            </div>
            {/* Hit Die badge */}
            <div className="ml-6 flex-shrink-0 flex flex-col items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-600 to-orange-500 shadow-lg shadow-cyan-500/30">
              <span className="text-xs text-white/70 uppercase tracking-widest">
                Hit Die
              </span>
              <span className="text-2xl font-bold text-white">
                d{profession.hitDie}
              </span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <StatTile
              label="Spellcasting"
              value={
                profession.spellcastingAbility
                  ? ABILITY_LABELS[profession.spellcastingAbility] ||
                    profession.spellcastingAbility
                  : "None"
              }
            />
            <StatTile
              label="Subclass At"
              value={
                profession.subclassLevel
                  ? `Level ${profession.subclassLevel}`
                  : "—"
              }
            />
            <StatTile
              label="Subclass Type"
              value={profession.subclassName || "—"}
            />
            <StatTile
              label="Source"
              value={profession.sourceBook || "Homebrew"}
            />
          </div>
        </DetailCard>

        {/* ── Proficiencies ── */}
        <DetailCard>
          <SectionTitle icon={LuShield}>Proficiencies</SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Saving Throws */}
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
                Saving Throws
              </p>
              {savingThrowsActive.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {savingThrowsActive.map((st) => (
                    <span
                      key={st}
                      className="px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-500/20 border border-cyan-200 dark:border-cyan-500/40 text-cyan-700 dark:text-cyan-300 text-sm font-semibold"
                    >
                      {st}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 dark:text-slate-500 text-sm">
                  None
                </p>
              )}
            </div>

            {/* Armor */}
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
                Armor
              </p>
              {profession.armorProficiencies?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {profession.armorProficiencies.map((a) => (
                    <span
                      key={a}
                      className="px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-500/15 border border-orange-200 dark:border-orange-500/30 text-orange-700 dark:text-orange-300 text-sm capitalize"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 dark:text-slate-500 text-sm">
                  None
                </p>
              )}
            </div>

            {/* Weapons */}
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
                Weapons
              </p>
              {profession.weaponProficiencies?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {profession.weaponProficiencies.map((w) => (
                    <span
                      key={w}
                      className="px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-500/15 border border-orange-200 dark:border-orange-500/30 text-orange-700 dark:text-orange-300 text-sm capitalize"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 dark:text-slate-500 text-sm">
                  None
                </p>
              )}
            </div>

            {/* Tools */}
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
                Tools
              </p>
              {profession.toolProficiencies?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {profession.toolProficiencies.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600/40 text-slate-600 dark:text-slate-300 text-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 dark:text-slate-500 text-sm">
                  None
                </p>
              )}
            </div>
          </div>

          {/* Skill Choices */}
          {profession.skillChoices?.from?.length > 0 && (
            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700/50">
              <p className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
                Skills — Choose {profession.skillChoices.choose}
              </p>
              <div className="flex flex-wrap gap-2">
                {profession.skillChoices.from.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-600/30 text-slate-600 dark:text-slate-300 text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </DetailCard>

        {/* ── Level Features ── */}
        {sortedLevels.length > 0 && (
          <DetailCard>
            <SectionTitle icon={LuStar}>Level Features</SectionTitle>
            <div className="space-y-3">
              {sortedLevels.map((feature, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-start bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-cyan-500/10 rounded-xl p-4 hover:border-cyan-400 dark:hover:border-cyan-500/25 transition-colors"
                >
                  {/* Level pip */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-100 to-orange-100 dark:from-cyan-600/40 dark:to-orange-500/30 border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center">
                    <span className="text-cyan-700 dark:text-cyan-300 font-bold text-sm">
                      {feature.level}
                    </span>
                  </div>
                  <div>
                    <p className="text-slate-900 dark:text-white font-semibold">
                      {feature.name}
                    </p>
                    {feature.description && (
                      <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 leading-relaxed">
                        {feature.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </DetailCard>
        )}

        {/* ── Spell Slots ── */}
        {spellSlotsExist && (
          <DetailCard>
            <SectionTitle icon={LuSparkles}>
              Spell Slots
              <span className="ml-2 text-sm font-normal text-slate-400 dark:text-slate-400 capitalize">
                ({profession.spellcastingAbility} based)
              </span>
            </SectionTitle>
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-cyan-500/15">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-cyan-500/20">
                    <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-400">
                      Char Level
                    </th>
                    {SPELL_LEVELS.map((sl) => (
                      <th
                        key={sl}
                        className="px-3 py-3 text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-400 text-center"
                      >
                        {sl}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedSpellSlots.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-slate-100 dark:border-slate-700/30 hover:bg-slate-50 dark:hover:bg-slate-700/10 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-bold text-sm">
                          {row.level}
                        </span>
                      </td>
                      {SPELL_LEVELS.map((sl) => {
                        const count = row.slots?.[sl] ?? 0;
                        return (
                          <td key={sl} className="px-3 py-3 text-center">
                            <span
                              className={`font-semibold text-sm ${
                                count > 0
                                  ? "text-cyan-600 dark:text-cyan-300"
                                  : "text-slate-300 dark:text-slate-700"
                              }`}
                            >
                              {count > 0 ? count : "—"}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DetailCard>
        )}

        {/* ── Subclasses ── */}
        {(profession.subclasses?.length > 0 || profession.subclassName) && (
          <DetailCard>
            <SectionTitle icon={LuUsers}>
              {profession.subclassName || "Subclasses"}
            </SectionTitle>
            {profession.subclasses?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profession.subclasses.map((sub, i) => {
                  const isPopulated = typeof sub === "object" && sub.name;
                  return (
                    <div
                      key={i}
                      className="bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-cyan-500/15 rounded-xl p-5 hover:border-cyan-400 dark:hover:border-cyan-500/35 transition-colors"
                    >
                      {isPopulated ? (
                        <>
                          <p className="text-slate-900 dark:text-white font-semibold text-lg mb-1">
                            {sub.name}
                          </p>
                          {sub.flavourText && (
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                              {sub.flavourText}
                            </p>
                          )}
                          {sub.bonusProficiencies?.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1">
                              {sub.bonusProficiencies.map((p) => (
                                <span
                                  key={p}
                                  className="text-xs px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 text-orange-600 dark:text-orange-300"
                                >
                                  {p}
                                </span>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <p className="text-slate-400 dark:text-slate-500 text-sm italic">
                          Subclass ID: {String(sub)}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-slate-400 dark:text-slate-500 text-sm">
                No subclasses added yet.
              </p>
            )}
          </DetailCard>
        )}

        {/* ── Starting Equipment ── */}
        {profession.startingEquipment?.length > 0 && (
          <DetailCard>
            <SectionTitle icon={LuPackage}>Starting Equipment</SectionTitle>
            <ul className="space-y-2">
              {profession.startingEquipment.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-slate-600 dark:text-slate-300"
                >
                  <LuZap
                    size={14}
                    className="text-cyan-500 dark:text-cyan-500 flex-shrink-0"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </DetailCard>
        )}
      </div>
    </div>
  );
}
