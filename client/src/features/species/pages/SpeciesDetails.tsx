import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetCurrentUserQuery } from "../../auth/api/authApi.tsx";
import { ghostButton } from "../../../shared/styles/theme.ts";
import {
  LuArrowLeft,
  LuPen,
  LuDna,
  LuBookOpen,
  LuShield,
  LuFlame,
  LuSparkles,
} from "react-icons/lu";

import { useGetSpeciesByIdQuery } from "../api/speciesApi";
import { useGetAllPowersQuery } from "../../powers/api/powerApi";
import { NotFound } from "../../../app/pages/NotFound.tsx";

export function SpeciesDetails() {
  const { id } = useParams<{ id: string }>();
  const {
    data: species,
    isLoading,
    isError,
    error,
  } = useGetSpeciesByIdQuery(id!);
  const { data: powers = [] } = useGetAllPowersQuery();
  const powersById = Object.fromEntries(powers.map((p) => [p._id, p]));

  const navigate = useNavigate();
  const { data: currentUser } = useGetCurrentUserQuery();
  const canEdit = ["admin", "moderator", "editor"].includes(
    currentUser?.role ?? "",
  );
  const handleReturn = () => navigate(-1);

  if (isLoading) return <p>Loading...</p>;
  // The server answers 404 for a species that doesn't exist or a malformed
  // id. Anything else (server down, network) is a real failure.
  const isNotFound = error && "status" in error && error.status === 404;
  if (isNotFound || (!isError && !species)) return <NotFound />;
  if (isError || !species) return <p>Something went wrong.</p>;

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 p-4 sm:p-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <button
            onClick={handleReturn}
            className="flex items-center gap-2 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white transition-all group"
          >
            <LuArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span>Back to Species List</span>
          </button>

          {/* Edit is only offered to roles the server lets edit */}
          {canEdit && (
            <Link
              to={`/species/${id}/edit`}
              className={`px-4 py-2 ${ghostButton}`}
            >
              <LuPen size={16} aria-hidden="true" />
              Edit
            </Link>
          )}
        </div>

        {/* Header Card */}
        <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm p-5 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 sm:gap-4 mb-3">
                <LuDna
                  className="shrink-0 text-emerald-700 dark:text-emerald-400"
                  size={36}
                />
                <h1 className="text-3xl sm:text-5xl font-bold break-words min-w-0 text-amber-700 dark:text-amber-400">
                  {species.name}
                </h1>
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">
                Species
              </p>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/60 p-4">
              <div className="flex items-center gap-3 mb-2">
                <LuShield
                  className="text-emerald-700 dark:text-emerald-400"
                  size={20}
                />
                <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500">
                  Stat Modifiers
                </p>
              </div>
              <p className="text-xl text-stone-900 dark:text-white font-semibold">
                {species.statModifiers.length}
              </p>
            </div>

            <div className="rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/60 p-4">
              <div className="flex items-center gap-3 mb-2">
                <LuFlame
                  className="text-emerald-700 dark:text-emerald-400"
                  size={20}
                />
                <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500">
                  Resistances
                </p>
              </div>
              <p className="text-xl text-stone-900 dark:text-white font-semibold">
                {species.resistances.length}
              </p>
            </div>

            <div className="rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/60 p-4">
              <div className="flex items-center gap-3 mb-2">
                <LuSparkles
                  className="text-emerald-700 dark:text-emerald-400"
                  size={20}
                />
                <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500">
                  Traits
                </p>
              </div>
              <p className="text-xl text-stone-900 dark:text-white font-semibold">
                {species.traits.length}
              </p>
            </div>
          </div>
        </div>

        {/* Stat Modifiers Section */}
        {species.statModifiers.length > 0 && (
          <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm p-5 sm:p-8 mb-6">
            <h2 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-6 flex items-center gap-2">
              <LuShield size={24} />
              Stat Modifiers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {species.statModifiers.map((modifier, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/60 p-4"
                >
                  <p className="text-stone-900 dark:text-white font-semibold capitalize">
                    {modifier.stat} {modifier.value > 0 ? "+" : ""}
                    {modifier.value}
                  </p>
                  {modifier.description && (
                    <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                      {modifier.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resistances Section */}
        {species.resistances.length > 0 && (
          <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm p-5 sm:p-8 mb-6">
            <h2 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-6 flex items-center gap-2">
              <LuFlame size={24} />
              Resistances
            </h2>
            <div className="flex flex-wrap gap-3">
              {species.resistances.map((resistance, index) => (
                <div
                  key={`${resistance.damageType}-${index}`}
                  className="rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/60 px-4 py-2"
                >
                  <p className="text-stone-900 dark:text-white font-semibold capitalize">
                    {resistance.damageType}
                  </p>
                  <p className="text-sm text-stone-500 dark:text-stone-400 capitalize">
                    {resistance.rule}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Traits Section */}
        {species.traits.length > 0 && (
          <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm p-5 sm:p-8 mb-6">
            <h2 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-6 flex items-center gap-2">
              <LuSparkles size={24} />
              Traits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {species.traits.map((traitId) => {
                const trait = powersById[traitId];
                if (!trait) return null;

                return (
                  <div
                    key={traitId}
                    className="rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/60 p-4"
                  >
                    <p className="text-stone-900 dark:text-white font-semibold">
                      {trait.name}
                    </p>
                    {trait.description && (
                      <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                        {trait.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Description Section */}
        <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm p-5 sm:p-8 mb-6">
          <h2 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-4 flex items-center gap-2">
            <LuBookOpen size={24} />
            Description
          </h2>
          <div className="prose max-w-none">
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-lg">
              {species.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
