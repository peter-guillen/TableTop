import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetCurrentUserQuery } from "../../auth/api/authApi.tsx";
import { ghostButton } from "../../../shared/styles/theme.ts";
import { useGetProfessionByIdQuery } from "../api/professionApi";
import { useGetAllItemsQuery } from "../../items/api/itemApi";
import { useGetAllPowersQuery } from "../../powers/api/powerApi";
import { NotFound } from "../../../app/pages/NotFound.tsx";
import type { IconType } from "react-icons";
import type { ReactNode } from "react";
import type { LevelGrant } from "../../../shared/constants/constantTypes";
import {
  LuArrowLeft,
  LuPen,
  LuCrown,
  LuShield,
  LuSparkles,
  LuStar,
  LuPackage,
} from "react-icons/lu";

const GRANT_LABELS: Record<LevelGrant["type"], string> = {
  auto: "Auto",
  professionChoice: "Choice",
  playerChoice: "Free Pick",
};

const GRANT_BADGE_CLASSES: Record<LevelGrant["type"], string> = {
  auto: "bg-cyan-100 dark:bg-cyan-500/20 border-cyan-200 dark:border-cyan-500/40 text-cyan-700 dark:text-cyan-300",
  professionChoice:
    "bg-amber-100 dark:bg-amber-500/20 border-amber-200 dark:border-amber-500/40 text-amber-700 dark:text-amber-300",
  playerChoice:
    "bg-emerald-100 dark:bg-emerald-500/20 border-emerald-200 dark:border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
};

// Reusable detail card — matches LandingPage feature card pattern
function DetailCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white dark:bg-gradient-to-br dark:from-stone-800 dark:to-stone-950/80 backdrop-blur-sm rounded-2xl border border-stone-200 dark:border-emerald-500/20 shadow-md p-5 sm:p-8 mb-6 ${className}`}
    >
      {children}
    </div>
  );
}

function SectionTitle({
  icon: Icon,
  children,
}: {
  icon: IconType;
  children: ReactNode;
}) {
  return (
    <h2 className="text-2xl font-bold text-stone-800 dark:text-emerald-300 mb-6 flex items-center gap-2">
      <Icon size={22} />
      {children}
    </h2>
  );
}

function TagGroup({
  label,
  items = [],
  badgeClass,
}: {
  label: string;
  items?: string[];
  badgeClass: string;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-3">
        {label}
      </p>
      {items.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <span
              key={item}
              className={`px-3 py-1 rounded-full border text-sm capitalize ${badgeClass}`}
            >
              {/* Enum values are snake_case, e.g. light_armor */}
              {item.replace(/_/g, " ")}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-stone-400 dark:text-stone-500 text-sm">None</p>
      )}
    </div>
  );
}

export function ProfessionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: currentUser } = useGetCurrentUserQuery();
  const canEdit = ["admin", "moderator", "editor"].includes(
    currentUser?.role ?? "",
  );

  const {
    data: profession,
    error,
    isError,
    isLoading,
  } = useGetProfessionByIdQuery(id ?? "", { skip: !id });
  const { data: items = [] } = useGetAllItemsQuery();
  const { data: powers = [] } = useGetAllPowersQuery();

  if (isLoading) return <p>Loading...</p>;
  // The server answers 404 for a profession that doesn't exist or a
  // malformed id. Anything else (server down, network) is a real failure.
  const isNotFound = error && "status" in error && error.status === 404;
  if (isNotFound || (!isError && !profession)) return <NotFound />;
  if (isError || !profession) return <p>Something went wrong.</p>;

  const itemById = Object.fromEntries(items.map((i) => [i._id, i]));
  const powerById = Object.fromEntries(powers.map((p) => [p._id, p]));

  const sortedLevelRewards = [...(profession.levelRewards || [])].sort(
    (a, b) => a.level - b.level,
  );

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 p-4 sm:p-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-all group"
          >
            <LuArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span>Back to Professions</span>
          </button>

          {/* Edit is only offered to roles the server lets edit */}
          {canEdit && (
            <Link
              to={`/professions/${id}/edit`}
              className={`px-4 py-2 ${ghostButton}`}
            >
              <LuPen size={16} aria-hidden="true" />
              Edit
            </Link>
          )}
        </div>

        {/* ── Header Card ── */}
        <DetailCard>
          <div className="flex items-center gap-3 sm:gap-4 mb-3">
            <LuCrown className="shrink-0 text-emerald-700 dark:text-emerald-400" size={36} />
            <h1 className="text-3xl sm:text-5xl font-bold break-words min-w-0 text-amber-700 dark:text-amber-400 ">
              {profession.name}
            </h1>
          </div>
          {profession.description && (
            <p className="text-lg text-stone-600 dark:text-stone-300 italic leading-relaxed">
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
                  className="bg-stone-50 dark:bg-stone-700/40 rounded-lg p-4 border border-stone-200 dark:border-emerald-500/20"
                >
                  <p className="text-stone-800 dark:text-white font-semibold">
                    {mod.stat}{" "}
                    <span className="text-emerald-700 dark:text-emerald-300">
                      {mod.value > 0 ? `+${mod.value}` : mod.value}
                    </span>
                  </p>
                  {mod.description && (
                    <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">
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
              badgeClass="bg-amber-100 dark:bg-amber-500/20 border-amber-200 dark:border-amber-500/40 text-amber-700 dark:text-amber-300"
            />
            <TagGroup
              label="Weapons"
              items={profession.weaponProficiencies}
              badgeClass="bg-amber-100 dark:bg-amber-500/20 border-amber-200 dark:border-amber-500/40 text-amber-700 dark:text-amber-300"
            />
            <TagGroup
              label="Skills"
              items={profession.skillProficiencies}
              badgeClass="bg-stone-100 dark:bg-stone-700/50 border-stone-200 dark:border-stone-600/40 text-stone-600 dark:text-stone-300"
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
                  className="flex gap-4 items-start bg-stone-50 dark:bg-stone-800/30 border border-stone-200 dark:border-emerald-500/10 rounded-xl p-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center">
                    <span className="text-emerald-700 dark:text-emerald-300 font-bold text-sm">
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
                          <span className="text-stone-700 dark:text-stone-200 text-sm">
                            {powerById[grant.trait]?.name || grant.trait}
                          </span>
                        )}
                        {grant.type === "professionChoice" &&
                          (grant.options?.length ?? 0) > 0 && (
                            <span className="text-stone-700 dark:text-stone-200 text-sm">
                              {(grant.options ?? [])
                                .map((o) => powerById[o]?.name || o)
                                .join(" / ")}
                            </span>
                          )}
                        {grant.type === "playerChoice" && (
                          <span className="text-stone-400 dark:text-stone-500 text-sm italic">
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
                    className="flex items-center justify-between text-stone-600 dark:text-stone-300 bg-stone-50 dark:bg-stone-800/30 rounded-lg px-4 py-2 border border-stone-200 dark:border-emerald-500/10"
                  >
                    <span>{item?.name || entry.item}</span>
                    {entry.quantity > 1 && (
                      <span className="text-stone-400 dark:text-stone-500 text-sm">
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
