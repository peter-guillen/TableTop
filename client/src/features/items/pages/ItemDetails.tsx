import { useNavigate, useParams } from "react-router-dom";
import {
  LuArrowLeft,
  LuSparkles,
  LuBookOpen,
  LuFlame,
  LuShield,
  LuCoins,
  LuGem,
  LuZap,
} from "react-icons/lu";
import { useGetItemByIdQuery } from "../api/itemApi";

// TODO: confirm actual path/hook name for the Power domain's RTK Query slice
import { useGetAllPowersQuery } from "../../powers/api/powerApi";

export function ItemDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: item, isLoading, isError } = useGetItemByIdQuery(id!);
  const { data: powers = [] } = useGetAllPowersQuery();
  const powersById = Object.fromEntries(powers.map((p) => [p._id, p]));

  const navigate = useNavigate();
  const handleReturn = () => navigate(-1);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center text-stone-500 dark:text-stone-300">
        <p>Item not found or still loading...</p>
      </div>
    );
  }

  const damageEffect = item.healthEffects.find((e) => e.direction === "damage");
  const healingEffect = item.healthEffects.find(
    (e) => e.direction === "healing",
  );

  // Damage display: flat value takes priority, then dice notation
  let damageDisplay: string | null = null;
  if (damageEffect?.flat) {
    damageDisplay = `${damageEffect.flat}`;
  } else if (damageEffect?.diceCount && damageEffect?.diceSize) {
    damageDisplay = `${damageEffect.diceCount}d${damageEffect.diceSize}`;
  }

  // Healing display: same priority as damage
  let healingDisplay: string | null = null;
  if (healingEffect?.flat) {
    healingDisplay = `${healingEffect.flat}`;
  } else if (healingEffect?.diceCount && healingEffect?.diceSize) {
    healingDisplay = `${healingEffect.diceCount}d${healingEffect.diceSize}`;
  }

  // Damage types are per-healthEffect entry, not a flat array on the item
  const damageTypesUsed = Array.from(
    new Set(item.healthEffects.map((e) => e.damageType).filter(Boolean)),
  );

  const hasSelfCharges =
    !!item.selfCharges &&
    (item.selfCharges.recharge !== "none" || !!item.selfCharges.usesRemaining);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 p-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={handleReturn}
          className="flex items-center gap-2 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white mb-6 transition-all group"
        >
          <LuArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Back to Item List</span>
        </button>

        {/* Header Card */}
        <div className="bg-white dark:bg-stone-950/70 backdrop-blur-md rounded-2xl border border-stone-200 dark:border-amber-500/30 shadow-md dark:shadow-2xl p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <LuSparkles
                  className="text-emerald-700 dark:text-emerald-400"
                  size={36}
                />
                <h1 className="text-5xl font-bold text-amber-700 dark:text-amber-400 ">
                  {item.name}
                </h1>
              </div>
              <p className="text-xl text-stone-600 dark:text-stone-300 italic capitalize">
                {item.category}
                {item.rarity && <> &bull; {item.rarity}</>}
              </p>
            </div>
            <div className="px-6 py-3 rounded-xl bg-emerald-700 shadow-lg">
              <p className="text-white font-bold text-lg capitalize">
                {item.category}
              </p>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {item.rarity && (
              <div className="bg-stone-50 dark:bg-stone-900/50 rounded-lg p-4 border border-stone-200 dark:border-amber-500/20">
                <div className="flex items-center gap-3 mb-2">
                  <LuGem
                    className="text-emerald-700 dark:text-emerald-400"
                    size={20}
                  />
                  <p className="text-sm text-stone-500 dark:text-stone-400 font-medium">
                    Rarity
                  </p>
                </div>
                <p className="text-xl text-stone-900 dark:text-white font-semibold capitalize">
                  {item.rarity}
                </p>
              </div>
            )}

            {!!item.value && (
              <div className="bg-stone-50 dark:bg-stone-900/50 rounded-lg p-4 border border-stone-200 dark:border-amber-500/20">
                <div className="flex items-center gap-3 mb-2">
                  <LuCoins
                    className="text-emerald-700 dark:text-emerald-400"
                    size={20}
                  />
                  <p className="text-sm text-stone-500 dark:text-stone-400 font-medium">
                    Value
                  </p>
                </div>
                <p className="text-xl text-stone-900 dark:text-white font-semibold">
                  {item.value}
                </p>
              </div>
            )}

            {hasSelfCharges && (
              <div className="bg-stone-50 dark:bg-stone-900/50 rounded-lg p-4 border border-stone-200 dark:border-amber-500/20">
                <div className="flex items-center gap-3 mb-2">
                  <LuZap
                    className="text-emerald-700 dark:text-emerald-400"
                    size={20}
                  />
                  <p className="text-sm text-stone-500 dark:text-stone-400 font-medium">
                    Charges
                  </p>
                </div>
                <p className="text-xl text-stone-900 dark:text-white font-semibold">
                  {item.selfCharges.usesRemaining ?? 0}
                </p>
                <p className="text-sm text-stone-500 dark:text-stone-400 mt-1 capitalize">
                  Recharges: {item.selfCharges.recharge.replace("_", " ")}
                </p>
              </div>
            )}
          </div>

          {/* Quality / Materials Tags */}
          {(item.quality.length > 0 || item.materials.length > 0) && (
            <div className="flex flex-wrap gap-2 mt-6">
              {item.quality.map((q) => (
                <span
                  key={`quality-${q}`}
                  className="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 capitalize"
                >
                  {q}
                </span>
              ))}
              {item.materials.map((m) => (
                <span
                  key={`material-${m}`}
                  className="text-xs px-3 py-1 rounded-full bg-stone-100 text-stone-600 dark:bg-stone-700/50 dark:text-stone-300 capitalize"
                >
                  {m}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Combat & Effects Section */}
        {(damageDisplay ||
          healingDisplay ||
          item.resistances.length > 0 ||
          item.properties.length > 0) && (
          <div className="bg-white dark:bg-stone-950/70 backdrop-blur-md rounded-2xl border border-stone-200 dark:border-amber-500/30 shadow-md dark:shadow-2xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-emerald-700 dark:text-emerald-300 mb-6 flex items-center gap-2">
              <LuFlame size={24} />
              Combat & Effects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {damageDisplay && (
                <div className="bg-stone-50 dark:bg-stone-900/30 rounded-lg p-6 border border-stone-200 dark:border-amber-500/20">
                  <p className="text-sm text-stone-500 dark:text-stone-400 mb-2">
                    Damage
                  </p>
                  <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">
                    {damageDisplay}
                  </p>
                  {damageEffect?.persistent && (
                    <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                      Persistent for{" "}
                      {damageEffect.durationType === "permanent"
                        ? "Permanent"
                        : damageEffect.durationType === "until_broken"
                          ? "Until Broken"
                          : `${damageEffect.duration ?? 0} turn${damageEffect.duration === 1 ? "" : "s"}`}
                    </p>
                  )}
                </div>
              )}

              {healingDisplay && (
                <div className="bg-stone-50 dark:bg-stone-900/30 rounded-lg p-6 border border-stone-200 dark:border-amber-500/20">
                  <p className="text-sm text-stone-500 dark:text-stone-400 mb-2">
                    Healing
                  </p>
                  <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">
                    {healingDisplay}
                  </p>
                </div>
              )}
            </div>

            {/* Damage Type Tags — derived from healthEffects, not a flat field on Item */}
            {damageTypesUsed.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {damageTypesUsed.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-stone-100 text-stone-600 dark:bg-stone-700/50 dark:text-stone-300 capitalize"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Resistances */}
            {item.resistances.length > 0 && (
              <div className="mt-6">
                <p className="text-sm text-stone-500 dark:text-stone-400 mb-2">
                  Resistances
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.resistances.map((r, idx) => (
                    <span
                      key={`${r.damageType}-${idx}`}
                      className="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 capitalize"
                    >
                      {r.rule} &bull; {r.damageType}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Properties */}
            {item.properties.length > 0 && (
              <div className="mt-6">
                <p className="text-sm text-stone-500 dark:text-stone-400 mb-2">
                  Properties
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.properties.map((property) => (
                    <span
                      key={property}
                      className="text-xs px-3 py-1 rounded-full bg-stone-100 text-stone-600 dark:bg-stone-700/50 dark:text-stone-300 capitalize"
                    >
                      {property}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Stat Modifiers Section */}
        {item.statModifiers.length > 0 && (
          <div className="bg-white dark:bg-stone-950/70 backdrop-blur-md rounded-2xl border border-stone-200 dark:border-amber-500/30 shadow-md dark:shadow-2xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-emerald-700 dark:text-emerald-300 mb-6 flex items-center gap-2">
              <LuShield size={24} />
              Stat Modifiers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {item.statModifiers.map((modifier, index) => (
                <div
                  key={index}
                  className="bg-stone-50 dark:bg-stone-900/30 rounded-lg p-4 border border-stone-200 dark:border-amber-500/20"
                >
                  <p className="text-stone-900 dark:text-white font-semibold capitalize">
                    {modifier.stat} {modifier.value > 0 ? "+" : ""}
                    {modifier.value}
                  </p>
                  {modifier.durationType && (
                    <p className="text-sm text-stone-500 dark:text-stone-400">
                      {modifier.durationType === "permanent"
                        ? "Permanent"
                        : modifier.durationType === "until_broken"
                          ? "Until Broken"
                          : `${modifier.duration ?? 0} turn${modifier.duration === 1 ? "" : "s"}`}
                    </p>
                  )}
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

        {/* Granted Powers Section — any category can grant (weapon → technique, enchanted item → spell) */}
        {item.grantedPowers.length > 0 && (
          <div className="bg-white dark:bg-stone-950/70 backdrop-blur-md rounded-2xl border border-stone-200 dark:border-amber-500/30 shadow-md dark:shadow-2xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-emerald-700 dark:text-emerald-300 mb-6 flex items-center gap-2">
              <LuSparkles size={24} />
              Grants
            </h2>
            <div className="flex flex-wrap gap-3">
              {item.grantedPowers.map((grant, idx) => {
                const power = powersById[grant.power];

                return (
                  <div
                    key={`${grant.power}-${idx}`}
                    className="bg-stone-50 dark:bg-stone-900/30 rounded-lg px-4 py-2 border border-stone-200 dark:border-amber-500/20"
                  >
                    <p className="text-stone-900 dark:text-white font-semibold capitalize">
                      {power ? power.name : "Unknown Power"}
                      {power?.kind && (
                        <span className="text-stone-500 dark:text-stone-400 font-normal">
                          {" "}
                          ({power.kind})
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-stone-500 dark:text-stone-400 capitalize">
                      Recharge: {grant.recharge.replace("_", " ")}
                      {!!grant.usesPerRecharge &&
                        ` \u2022 ${grant.usesPerRecharge} use${grant.usesPerRecharge === 1 ? "" : "s"}`}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Description Section */}
        <div className="bg-white dark:bg-stone-950/70 backdrop-blur-md rounded-2xl border border-stone-200 dark:border-amber-500/30 shadow-md dark:shadow-2xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-emerald-700 dark:text-emerald-300 mb-4 flex items-center gap-2">
            <LuBookOpen size={24} />
            Description
          </h2>
          <div className="prose max-w-none">
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-lg">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
