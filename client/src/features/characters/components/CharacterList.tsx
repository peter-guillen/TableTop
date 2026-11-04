import { Link, NavLink } from "react-router-dom";
import { LuArrowRight, LuPlus } from "react-icons/lu";

import { LoadingSpinner } from "../../../shared/components/LoadingSpinner";
import { useGetAllCharactersQuery } from "../api/characterApi.tsx";
import { useGetAllSpeciesQuery } from "../../species/api/speciesApi";
import { useGetAllBackgroundsQuery } from "../../backgrounds/api/backgroundApi";
import { useGetAllProfessionsQuery } from "../../professions/api/professionApi";

export const CharacterList = () => {
  const { data: characters = [], isLoading, isError } =
    useGetAllCharactersQuery();
  const { data: species = [] } = useGetAllSpeciesQuery();
  const { data: backgrounds = [] } = useGetAllBackgroundsQuery();
  const { data: professions = [] } = useGetAllProfessionsQuery();

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return <div className="text-red-500">Error fetching characters</div>;

  // Most recently touched first, so the character in play is at the top
  const sorted = [...characters].sort(
    (a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt),
  );

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-amber-700 dark:text-amber-400">
            Characters
          </h1>
          <p className="text-lg md:text-xl text-stone-600 dark:text-stone-300">
            The heroes of your story
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 mb-6">
          <p className="text-sm text-stone-500 dark:text-stone-400">
            {characters.length} character{characters.length === 1 ? "" : "s"}
          </p>
          <Link
            to="/characters/create"
            className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-semibold bg-amber-500 text-stone-950 hover:bg-amber-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 dark:focus-visible:ring-emerald-400"
          >
            <LuPlus size={18} aria-hidden="true" />
            New Character
          </Link>
        </div>

        {sorted.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 px-6 py-16 text-center">
            <p className="text-lg font-semibold text-stone-900 dark:text-white mb-2">
              No characters yet
            </p>
            <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
              Pick a species, a background and a path, and your first hero
              is ready.
            </p>
            <Link
              to="/characters/create"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold bg-amber-500 text-stone-950 hover:bg-amber-400 transition-colors"
            >
              <LuPlus size={18} aria-hidden="true" />
              Create a Character
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sorted.map((character) => {
              const { identity, origin, archetype, mode, progression } =
                character;
              const { resources } = character.stats;
              const speciesName = species.find(
                (s) => s._id === origin.species,
              )?.name;
              const backgroundName = backgrounds.find(
                (b) => b._id === origin.background,
              )?.name;
              const professionName =
                mode === "classless"
                  ? "Classless"
                  : professions.find((p) => p._id === archetype.profession)
                      ?.name;
              const rewardsPending =
                (mode === "classless" || Boolean(archetype.profession)) &&
                progression.claimedLevel < progression.level;
              const hpMax = resources.hpMax ?? 0;
              const mpMax = resources.mpMax ?? 0;

              return (
                <NavLink
                  key={character._id}
                  to={`/characters/${character._id}`}
                  className="block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 dark:focus-visible:ring-emerald-400"
                >
                  <div className="group flex h-full flex-col rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 transition-colors hover:border-emerald-600 dark:hover:border-emerald-500">
                    {/* Initial + Name + Level */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-lg bg-emerald-700 text-white dark:bg-emerald-500 dark:text-stone-950 text-xl font-extrabold uppercase">
                        {identity.name.charAt(0) || "?"}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl font-bold break-words text-stone-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors duration-200">
                          {identity.name}
                        </h3>
                        <p className="text-sm text-stone-500 dark:text-stone-400 truncate">
                          {[speciesName, professionName]
                            .filter(Boolean)
                            .join(" ") || "Unfinished"}
                        </p>
                      </div>
                      <div
                        title={
                          rewardsPending
                            ? `Level ${progression.claimedLevel + 1} rewards waiting`
                            : `Level ${progression.level}`
                        }
                        className="relative shrink-0 flex flex-col items-center justify-center w-12 h-12 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-950/60"
                      >
                        <span className="text-[8px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 leading-none">
                          Lv
                        </span>
                        <span className="text-xl font-extrabold leading-none text-amber-700 dark:text-amber-400">
                          {progression.level}
                        </span>
                        {rewardsPending && (
                          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-stone-900" />
                        )}
                      </div>
                    </div>

                    {/* Background + Pronouns */}
                    <div className="flex flex-wrap gap-x-5 gap-y-2 mb-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-stone-400 dark:text-stone-500">
                          Background
                        </p>
                        <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                          {backgroundName ?? "—"}
                        </p>
                      </div>
                      {(identity.subjectPronoun || identity.objectPronoun) && (
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-stone-400 dark:text-stone-500">
                            Pronouns
                          </p>
                          <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                            {[identity.subjectPronoun, identity.objectPronoun]
                              .filter(Boolean)
                              .join("/")}
                          </p>
                        </div>
                      )}
                      {identity.age != null && (
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-stone-400 dark:text-stone-500">
                            Age
                          </p>
                          <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                            {identity.age}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* HP / MP bars */}
                    <div className="flex flex-col gap-2 mb-4">
                      <div>
                        <div className="flex justify-between items-baseline mb-1">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-red-700 dark:text-red-400">
                            HP
                          </p>
                          <p className="text-xs text-stone-500 dark:text-stone-400">
                            {resources.hp ?? 0} / {hpMax}
                          </p>
                        </div>
                        <div className="h-1.5 w-full bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-red-500"
                            style={{
                              width: `${hpMax > 0 ? ((resources.hp ?? 0) / hpMax) * 100 : 0}%`,
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-baseline mb-1">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-blue-700 dark:text-blue-400">
                            MP
                          </p>
                          <p className="text-xs text-stone-500 dark:text-stone-400">
                            {resources.mp ?? 0} / {mpMax}
                          </p>
                        </div>
                        <div className="h-1.5 w-full bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-blue-500"
                            style={{
                              width: `${mpMax > 0 ? ((resources.mp ?? 0) / mpMax) * 100 : 0}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-auto pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-2 text-sm">
                      <span className="flex items-center gap-2 font-semibold text-emerald-700 dark:text-emerald-400">
                        View Sheet
                        <LuArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                      <span className="text-xs text-stone-400 dark:text-stone-500">
                        Updated{" "}
                        {new Date(character.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </NavLink>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
