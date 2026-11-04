import { Link, useNavigate, useParams } from "react-router-dom";
import { LuArrowLeft, LuPen, LuTrash2, LuSparkles } from "react-icons/lu";

import { LoadingSpinner } from "../../../shared/components/LoadingSpinner";
import {
  useDeleteCharacterMutation,
  useGetCharacterByIdQuery,
} from "../api/characterApi.tsx";
import { useGetConstantsQuery } from "../../../shared/constants/api/constantsApi";
import { useGetAllSpeciesQuery } from "../../species/api/speciesApi";
import { useGetAllBackgroundsQuery } from "../../backgrounds/api/backgroundApi";
import { useGetAllProfessionsQuery } from "../../professions/api/professionApi";
import { useGetAllItemsQuery } from "../../items/api/itemApi";
import { useGetAllPowersQuery } from "../../powers/api/powerApi";
import type { PassiveStatKey } from "../charactersTypes";

// Same resource colors as CharacterStats, so the sheet reads like the editor
const RESOURCE_BARS = [
  {
    label: "HP",
    currentKey: "hp",
    maxKey: "hpMax",
    color: "text-red-600 dark:text-red-400",
    labelColor: "text-red-700 dark:text-red-400",
    barClasses: "bg-red-500",
  },
  {
    label: "MP",
    currentKey: "mp",
    maxKey: "mpMax",
    color: "text-blue-600 dark:text-blue-400",
    labelColor: "text-blue-700 dark:text-blue-400",
    barClasses: "bg-blue-500",
  },
  {
    label: "Momentum",
    currentKey: "mom",
    maxKey: "momMax",
    color: "text-amber-700 dark:text-amber-400",
    labelColor: "text-amber-700 dark:text-amber-400",
    barClasses: "bg-amber-500",
  },
] as const;

const STAT_GROUPS = ["OFFENSIVE", "DEFENSIVE", "MOBILITY"] as const;

const SIGNED_STATS: string[] = ["might"];

const POWER_GROUPS = [
  { label: "Spells", key: "spells" },
  { label: "Abilities", key: "abilities" },
  { label: "Traits", key: "traits" },
] as const;

export const CharacterDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: character,
    isLoading,
    isError,
  } = useGetCharacterByIdQuery(id ?? "", { skip: !id });
  const { data: constants } = useGetConstantsQuery();
  const { data: species = [] } = useGetAllSpeciesQuery();
  const { data: backgrounds = [] } = useGetAllBackgroundsQuery();
  const { data: professions = [] } = useGetAllProfessionsQuery();
  const { data: items = [] } = useGetAllItemsQuery();
  const { data: powers = [] } = useGetAllPowersQuery();
  const [deleteCharacter, { isLoading: isDeleting }] =
    useDeleteCharacterMutation();

  if (isLoading) return <LoadingSpinner />;

  if (isError || !character) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-stone-50 dark:bg-stone-950 text-stone-500 dark:text-stone-300">
        <p>Character not found.</p>
        <Link
          to="/characters"
          className="font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
        >
          Back to Characters
        </Link>
      </div>
    );
  }

  const handleDelete = async () => {
    if (
      !window.confirm(
        `Delete ${character.identity.name}? This can't be undone.`,
      )
    )
      return;
    const result = await deleteCharacter(character._id);
    if (!("error" in result)) navigate("/characters");
  };

  const { identity, origin, archetype, mode, progression, stats, equipment } =
    character;
  const { passive, resources } = stats;

  const speciesEntry = species.find((s) => s._id === origin.species);
  const backgroundEntry = backgrounds.find((b) => b._id === origin.background);
  const professionEntry = professions.find(
    (p) => p._id === archetype.profession,
  );
  const professionName =
    mode === "classless" ? "Classless" : professionEntry?.name;

  // e.g. "Level 3 Human Warrior · Soldier · they/them · 27 years old"
  const summary = [
    [`Level ${progression.level}`, speciesEntry?.name, professionName]
      .filter(Boolean)
      .join(" "),
    backgroundEntry?.name,
    [identity.subjectPronoun, identity.objectPronoun].filter(Boolean).join("/"),
    identity.age ? `${identity.age} years old` : "",
  ]
    .filter(Boolean)
    .join(" · ");

  const rewardsPending =
    (mode === "classless" || Boolean(archetype.profession)) &&
    progression.claimedLevel < progression.level;

  const { mainHand, offHand } = equipment.weapons;
  const weaponSlots =
    mainHand !== null && mainHand === offHand
      ? [{ label: "Both Hands", id: mainHand }]
      : [
          { label: "Main Hand", id: mainHand },
          { label: "Off Hand", id: offHand },
        ];
  const armor = items.find((i) => i._id === equipment.armor);
  const accessories = equipment.accessories
    .map((accessoryId) => items.find((i) => i._id === accessoryId))
    .filter((i) => i !== undefined);

  // A technique is available if an equipped weapon has at least one of its properties
  const weaponProperties = weaponSlots.flatMap(
    ({ id: weaponId }) =>
      (items.find((i) => i._id === weaponId)?.properties as string[]) ?? [],
  );
  const techniques = powers.filter(
    (p) =>
      p.kind === "technique" &&
      (p.requirements?.properties ?? []).some((prop) =>
        weaponProperties.includes(prop),
      ),
  );

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 p-4 sm:p-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Back + Actions */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <Link
            to="/characters"
            className="flex items-center gap-2 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white transition-all group"
          >
            <LuArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span>Back to Characters</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              to={`/characters/${character._id}/edit`}
              className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-semibold border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 hover:text-stone-900 dark:hover:bg-stone-800 dark:hover:text-stone-100 transition-colors"
            >
              <LuPen size={16} aria-hidden="true" />
              Edit
            </Link>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-semibold border border-red-300 dark:border-red-500/40 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LuTrash2 size={16} aria-hidden="true" />
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>

        {/* Header Card */}
        <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm p-5 sm:p-8 mb-4">
          <div className="flex items-start gap-4 mb-6">
            <div className="shrink-0 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-emerald-700 text-white dark:bg-emerald-500 dark:text-stone-950 text-2xl sm:text-3xl font-extrabold uppercase">
              {identity.name.charAt(0) || "?"}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl sm:text-5xl font-bold break-words text-amber-700 dark:text-amber-400 mb-2">
                {identity.name}
              </h1>
              <p className="text-sm text-stone-500 dark:text-stone-400">
                {summary}
              </p>
            </div>
            <div
              title={
                rewardsPending
                  ? `Level ${progression.claimedLevel + 1} rewards waiting`
                  : `Level ${progression.level}`
              }
              className="relative shrink-0 flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-950/60"
            >
              <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 leading-none">
                Lv
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold leading-none text-amber-700 dark:text-amber-400">
                {progression.level}
              </span>
              {rewardsPending && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-stone-900" />
              )}
            </div>
          </div>

          {/* Origin + Archetype: each links to its compendium entry */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                label: "Species",
                name: speciesEntry?.name,
                to: speciesEntry && `/species/${speciesEntry._id}`,
              },
              {
                label: "Background",
                name: backgroundEntry?.name,
                to: backgroundEntry && `/backgrounds/${backgroundEntry._id}`,
              },
              {
                label: "Class",
                name: professionName,
                to:
                  mode === "classed" && professionEntry
                    ? `/professions/${professionEntry._id}`
                    : undefined,
              },
            ].map(({ label, name, to }) =>
              to ? (
                <Link
                  key={label}
                  to={to}
                  className="group rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/60 px-4 py-3 transition-colors hover:border-emerald-600 dark:hover:border-emerald-500"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-0.5">
                    {label}
                  </p>
                  <p className="font-semibold text-stone-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    {name}
                  </p>
                </Link>
              ) : (
                <div
                  key={label}
                  className="rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/60 px-4 py-3"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-0.5">
                    {label}
                  </p>
                  <p className="font-semibold text-stone-900 dark:text-white">
                    {name ?? "—"}
                  </p>
                </div>
              ),
            )}
          </div>

          {rewardsPending && (
            <Link
              to={`/characters/${character._id}/edit`}
              className="mt-4 flex items-center gap-3 rounded-lg border border-emerald-300 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10 px-4 py-3 text-sm text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors"
            >
              <LuSparkles size={18} className="shrink-0" aria-hidden="true" />
              <span>
                Level {progression.claimedLevel + 1} rewards are waiting.{" "}
                <span className="font-semibold underline">
                  Claim them in the editor
                </span>
              </span>
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4 items-start">
          {/* Main column */}
          <div className="flex flex-col gap-4">
            {/* Powers */}
            <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm p-5 sm:p-6">
              <h2 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-4">
                Powers
              </h2>
              <div className="flex flex-col gap-5">
                {POWER_GROUPS.map(({ label, key }) => {
                  const selected = character.powers[key];
                  return (
                    <div key={key}>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2">
                        {label} ({selected.length}/
                        {progression.powerSlots[key]})
                      </p>
                      {selected.length === 0 ? (
                        <p className="text-sm italic text-stone-400 dark:text-stone-500">
                          None chosen.
                        </p>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {selected.map((powerId) => {
                            const power = powers.find((p) => p._id === powerId);
                            if (!power) return null;
                            return (
                              <Link
                                key={powerId}
                                to={`/powers/${powerId}`}
                                className="group rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/60 px-4 py-3 transition-colors hover:border-emerald-600 dark:hover:border-emerald-500"
                              >
                                <p className="font-semibold text-stone-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                                  {power.name}
                                </p>
                                {power.description && (
                                  <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 mt-0.5">
                                    {power.description}
                                  </p>
                                )}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}

                {techniques.length > 0 && (
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2">
                      Techniques (from equipped weapons)
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {techniques.map((technique) => (
                        <Link
                          key={technique._id}
                          to={`/powers/${technique._id}`}
                          className="rounded-full border border-stone-200 dark:border-stone-700 px-3 py-1 text-xs text-stone-600 dark:text-stone-300 hover:border-emerald-600 hover:text-emerald-700 dark:hover:border-emerald-500 dark:hover:text-emerald-400 transition-colors"
                        >
                          {technique.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Skills */}
            <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm p-5 sm:p-6">
              <h2 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-4">
                Skills
              </h2>
              {character.skills.length === 0 ? (
                <p className="text-sm italic text-stone-400 dark:text-stone-500">
                  No skills chosen.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {character.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-emerald-300 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 text-sm text-emerald-800 dark:text-emerald-300 capitalize"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Inventory */}
            <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm p-5 sm:p-6">
              <h2 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-4">
                Inventory
              </h2>
              {character.inventory.length === 0 ? (
                <p className="text-sm italic text-stone-400 dark:text-stone-500">
                  Nothing carried.
                </p>
              ) : (
                <div className="divide-y divide-stone-100 dark:divide-stone-800">
                  {character.inventory.map((entry, index) => {
                    const item = items.find((i) => i._id === entry.item);
                    if (!item) return null;
                    return (
                      <Link
                        key={`${entry.item}-${index}`}
                        to={`/items/${entry.item}`}
                        className="group flex items-center justify-between gap-3 py-2.5"
                      >
                        <div className="min-w-0">
                          <p className="font-semibold text-stone-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors truncate">
                            {item.name}
                          </p>
                          <p className="text-[10px] uppercase tracking-widest text-stone-400 dark:text-stone-500">
                            {item.category}
                          </p>
                        </div>
                        <span className="shrink-0 text-sm font-semibold text-amber-700 dark:text-amber-400">
                          ×{entry.quantity}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Side column */}
          <div className="flex flex-col gap-4">
            {/* Vitals */}
            <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm p-5 flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                {RESOURCE_BARS.map(
                  ({
                    label,
                    currentKey,
                    maxKey,
                    color,
                    labelColor,
                    barClasses,
                  }) => {
                    const max = resources[maxKey] ?? 0;
                    const current = resources[currentKey] ?? 0;
                    const percent = max > 0 ? (current / max) * 100 : 0;
                    return (
                      <div key={label}>
                        <div className="flex justify-between items-baseline mb-1">
                          <p
                            className={`text-[10px] font-bold uppercase tracking-widest ${labelColor}`}
                          >
                            {label}
                          </p>
                          <p className="text-xs text-stone-400 dark:text-stone-500">
                            <span
                              className={`text-base font-extrabold ${color}`}
                            >
                              {current}
                            </span>
                            {" / "}
                            {max}
                          </p>
                        </div>
                        <div className="h-1.5 w-full bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${barClasses}`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  },
                )}
              </div>

              {constants &&
                STAT_GROUPS.map((category) => {
                  const { label, stats: statKeys } =
                    constants.STAT_CATEGORIES[category];
                  return (
                    <div key={category}>
                      <p className="text-[10px] font-semibold uppercase tracking-widest mb-1 text-stone-500 dark:text-stone-400">
                        {label}
                      </p>
                      <div className="rounded-lg border px-3 py-1 bg-stone-50 dark:bg-stone-950/60 border-stone-200 dark:border-stone-800 divide-y divide-stone-100 dark:divide-stone-800">
                        {statKeys.map((key) => {
                          const value = passive[key as PassiveStatKey] ?? 0;
                          const signed = SIGNED_STATS.includes(key);
                          return (
                            <div
                              key={key}
                              className="flex items-center justify-between py-1"
                            >
                              <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                              </span>
                              <span className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
                                {signed && value >= 0 ? "+" : ""}
                                {value}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Loadout */}
            <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm p-5">
              <h2 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-3">
                Loadout
              </h2>
              {weaponSlots.map(({ label, id: weaponId }) => {
                const weapon = items.find((i) => i._id === weaponId);
                const damage = weapon
                  ? weapon.healthEffects
                      .filter((e) => e.direction === "damage")
                      .map(
                        (e) =>
                          `${e.diceCount}d${e.diceSize}${e.flat ? ` + ${e.flat}` : ""} ${e.damageType}`,
                      )
                  : [];
                return (
                  <div
                    key={label}
                    className="py-2 border-b border-stone-100 dark:border-stone-800"
                  >
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-[10px] uppercase tracking-widest text-stone-400 dark:text-stone-500">
                        {label}
                      </span>
                      {weapon ? (
                        <Link
                          to={`/items/${weapon._id}`}
                          className="text-sm font-semibold text-stone-900 dark:text-white hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors text-right"
                        >
                          {weapon.name}
                        </Link>
                      ) : (
                        <span className="text-sm text-stone-400 dark:text-stone-500">
                          —
                        </span>
                      )}
                    </div>
                    {weapon && (
                      <p className="text-xs text-right text-stone-500 dark:text-stone-400 mt-0.5">
                        {[...damage, weapon.handedness?.replace(/_/g, " ")]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    )}
                  </div>
                );
              })}
              <div className="py-2 border-b border-stone-100 dark:border-stone-800">
                <div className="flex justify-between items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 dark:text-stone-500">
                    Armor
                  </span>
                  {armor ? (
                    <Link
                      to={`/items/${armor._id}`}
                      className="text-sm font-semibold text-stone-900 dark:text-white hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors text-right"
                    >
                      {armor.name}
                    </Link>
                  ) : (
                    <span className="text-sm text-stone-400 dark:text-stone-500">
                      —
                    </span>
                  )}
                </div>
                {armor &&
                  (armor.statModifiers.length > 0 ||
                    armor.resistances.length > 0) && (
                    <p className="text-xs text-right text-stone-500 dark:text-stone-400 mt-0.5">
                      {[
                        ...armor.statModifiers.map(
                          (m) => `${m.stat} ${m.value > 0 ? "+" : ""}${m.value}`,
                        ),
                        ...armor.resistances.map(
                          (r) => `${r.damageType} ${r.rule}`,
                        ),
                      ].join(" · ")}
                    </p>
                  )}
              </div>
              <div className="py-2">
                <p className="text-[10px] uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-1.5">
                  Accessories
                </p>
                {accessories.length === 0 ? (
                  <span className="text-sm text-stone-400 dark:text-stone-500">
                    —
                  </span>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {accessories.map((accessory) => (
                      <Link
                        key={accessory._id}
                        to={`/items/${accessory._id}`}
                        className="rounded-full border border-stone-200 dark:border-stone-700 px-2 py-0.5 text-xs text-stone-600 dark:text-stone-300 hover:border-emerald-600 hover:text-emerald-700 dark:hover:border-emerald-500 dark:hover:text-emerald-400 transition-colors"
                      >
                        {accessory.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
