import { useNavigate, useParams } from "react-router-dom";
import { useGetProfessionQuery } from "../api/professionApi";
import { useGetAllItemsQuery } from "../../items/api/itemApi";
import { useGetAllPowersQuery } from "../../powers/api/powerApi";
import {
  LuArrowLeft,
  LuCrown,
  LuShield,
  LuSparkles,
  LuStar,
  LuPackage,
} from "react-icons/lu";

const GRANT_LABELS = {
  auto: "Auto",
  professionChoice: "Choice",
  playerChoice: "Free Pick",
};

const GRANT_BADGE_CLASSES = {
  auto: "bg-cyan-100 dark:bg-cyan-500/20 border-cyan-200 dark:border-cyan-500/40 text-cyan-700 dark:text-cyan-300",
  professionChoice:
    "bg-orange-100 dark:bg-orange-500/20 border-orange-200 dark:border-orange-500/40 text-orange-700 dark:text-orange-300",
  playerChoice:
    "bg-emerald-100 dark:bg-emerald-500/20 border-emerald-200 dark:border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
};

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

function SectionTitle({ icon: Icon, children }) {
  return (
    <h2 className="text-2xl font-bold text-slate-800 dark:text-cyan-300 mb-6 flex items-center gap-2">
      <Icon size={22} />
      {children}
    </h2>
  );
}

function TagGroup({ label, items = [], badgeClass }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
        {label}
      </p>
      {items.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <span
              key={item}
              className={`px-3 py-1 rounded-full border text-sm capitalize ${badgeClass}`}
            >
              {item}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-slate-400 dark:text-slate-500 text-sm">None</p>
      )}
    </div>
  );
}

export function ProfessionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: profession, error, isLoading } = useGetProfessionQuery(id);
  const { data: items = [] } = useGetAllItemsQuery();
  const { data: powers = [] } = useGetAllPowersQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong.</p>;

  if (!profession) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 dark:text-slate-300">
        <p>Profession not found or still loading...</p>
      </div>
    );
  }

  const itemById = Object.fromEntries(items.map((i) => [i._id, i]));
  const powerById = Object.fromEntries(powers.map((p) => [p._id, p]));

  const sortedLevelRewards = [...(profession.levelRewards || [])].sort(
    (a, b) => a.level - b.level,
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-orange-50 to-slate-50 dark:from-slate-900 dark:via-cyan-900 dark:to-slate-900 p-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-6 transition-all group"
        >
          <LuArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Back to Professions</span>
        </button>

        {/* ── Header Card ── */}
        <DetailCard>
          <div className="flex items-center gap-4 mb-3">
            <LuCrown className="text-cyan-600 dark:text-cyan-400" size={36} />
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-orange-500 to-orange-500 dark:from-cyan-400 dark:via-orange-400 dark:to-orange-400">
              {profession.name}
            </h1>
          </div>
          {profession.description && (
            <p className="text-lg text-slate-600 dark:text-gray-300 italic leading-relaxed">
              {profession.description}
            </p>
          )}
        </DetailCard>

        {/* ── Stat Modifiers ── */}
        {profession.statModifiers?.length > 0 && (
          <DetailCard>
            <SectionTitle icon={LuSparkles}>Stat Modifiers</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profession.statModifiers.map((mod, i) => (
                <div
                  key={i}
                  className="bg-slate-50 dark:bg-slate-700/40 rounded-lg p-4 border border-slate-200 dark:border-cyan-500/20"
                >
                  <p className="text-slate-800 dark:text-white font-semibold">
                    {mod.stat}{" "}
                    <span className="text-cyan-600 dark:text-cyan-300">
                      {mod.value > 0 ? `+${mod.value}` : mod.value}
                    </span>
                  </p>
                  {mod.description && (
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                      {mod.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </DetailCard>
        )}

        {/* ── Proficiencies ── */}
        <DetailCard>
          <SectionTitle icon={LuShield}>Proficiencies</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TagGroup
              label="Armor"
              items={profession.armorProficiencies}
              badgeClass="bg-orange-100 dark:bg-orange-500/20 border-orange-200 dark:border-orange-500/40 text-orange-700 dark:text-orange-300"
            />
            <TagGroup
              label="Weapons"
              items={profession.weaponProficiencies}
              badgeClass="bg-orange-100 dark:bg-orange-500/20 border-orange-200 dark:border-orange-500/40 text-orange-700 dark:text-orange-300"
            />
            <TagGroup
              label="Skills"
              items={profession.skillProficiencies}
              badgeClass="bg-slate-100 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600/40 text-slate-600 dark:text-slate-300"
            />
          </div>
        </DetailCard>

        {/* ── Level Rewards ── */}
        {sortedLevelRewards.length > 0 && (
          <DetailCard>
            <SectionTitle icon={LuStar}>Level Rewards</SectionTitle>
            <div className="space-y-3">
              {sortedLevelRewards.map((reward) => (
                <div
                  key={reward.level}
                  className="flex gap-4 items-start bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-cyan-500/10 rounded-xl p-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-100 to-orange-100 dark:from-cyan-600/40 dark:to-orange-500/30 border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center">
                    <span className="text-cyan-700 dark:text-cyan-300 font-bold text-sm">
                      {reward.level}
                    </span>
                  </div>
                  <div className="flex-1 space-y-2">
                    {reward.grants?.map((grant, gi) => (
                      <div
                        key={gi}
                        className="flex flex-wrap items-center gap-2"
                      >
                        <span
                          className={`px-2 py-0.5 rounded-full border text-xs font-semibold ${GRANT_BADGE_CLASSES[grant.type]}`}
                        >
                          {GRANT_LABELS[grant.type] || grant.type}
                        </span>
                        {grant.type === "auto" && grant.trait && (
                          <span className="text-slate-700 dark:text-slate-200 text-sm">
                            {powerById[grant.trait]?.name || grant.trait}
                          </span>
                        )}
                        {grant.type === "professionChoice" &&
                          grant.options?.length > 0 && (
                            <span className="text-slate-700 dark:text-slate-200 text-sm">
                              {grant.options
                                .map((o) => powerById[o]?.name || o)
                                .join(" / ")}
                            </span>
                          )}
                        {grant.type === "playerChoice" && (
                          <span className="text-slate-400 dark:text-slate-500 text-sm italic">
                            Free pick, any trait
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </DetailCard>
        )}

        {/* ── Starting Items ── */}
        {profession.startingItems?.length > 0 && (
          <DetailCard>
            <SectionTitle icon={LuPackage}>Starting Items</SectionTitle>
            <ul className="space-y-2">
              {profession.startingItems.map((entry, i) => {
                const item = itemById[entry.item];
                return (
                  <li
                    key={i}
                    className="flex items-center justify-between text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/30 rounded-lg px-4 py-2 border border-slate-200 dark:border-cyan-500/10"
                  >
                    <span>{item?.name || entry.item}</span>
                    {entry.quantity > 1 && (
                      <span className="text-slate-400 dark:text-slate-500 text-sm">
                        x{entry.quantity}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </DetailCard>
        )}
      </div>
    </div>
  );
}
