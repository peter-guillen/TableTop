import { LuShieldCheck, LuX } from "react-icons/lu";
import { PowerKind } from "../powerTypes";
import {
  formCheckTile,
  formCheckbox,
  formHeading,
  formInput,
  formLabel,
} from "../../../shared/styles/theme.ts";

interface PowerOption {
  _id: string;
  name: string;
  kind: PowerKind;
}

interface PowerRequirementsSectionProps {
  kind: PowerKind;
  minLevel: number;
  requiredTraits: string[];
  weaponTags: string[];
  weaponTagOptions: string[];
  grantedPowers: string[];
  allPowers: PowerOption[];

  onRequirementsChange: (
    field: "minLevel" | "requiredTraits" | "properties",
    value: number | string[],
  ) => void;
  onGrantedPowersChange: (value: string[]) => void;
}

export const PowerRequirementsSection = ({
  kind,
  minLevel,
  requiredTraits,
  weaponTags,
  weaponTagOptions,
  grantedPowers,
  allPowers,
  onRequirementsChange,
  onGrantedPowersChange,
}: PowerRequirementsSectionProps) => {
  // Only Trait-kind powers can be required as prerequisites
  const traitOptions = allPowers.filter((p) => p.kind === "trait");

  return (
    <section>
      <h2 className={formHeading}>
        <LuShieldCheck size={20} />
        Requirements
      </h2>

      <div className="space-y-6">
        <div>
          <label className={`${formLabel} mb-2`}>
            Minimum Level
          </label>
          <input
            type="number"
            placeholder="0"
            value={minLevel || 0}
            min="0"
            onChange={(e) =>
              onRequirementsChange("minLevel", Number(e.target.value))
            }
            className="w-full md:w-1/3 px-4 py-3 bg-white dark:bg-stone-900/50 border border-stone-300 dark:border-emerald-500/30 rounded-lg text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Required Traits — any kind can require a trait as a prerequisite */}
        <div>
          <label className={`${formLabel} mb-2`}>
            Required Traits
          </label>
          {traitOptions.length === 0 ? (
            <p className="text-sm text-stone-500">No traits available yet.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {traitOptions.map((trait) => (
                <label
                  key={trait._id}
                  className={formCheckTile}
                >
                  <input
                    type="checkbox"
                    checked={requiredTraits.includes(trait._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        onRequirementsChange("requiredTraits", [
                          ...requiredTraits,
                          trait._id,
                        ]);
                      } else {
                        onRequirementsChange(
                          "requiredTraits",
                          requiredTraits.filter((id) => id !== trait._id),
                        );
                      }
                    }}
                    className={formCheckbox}
                  />
                  {trait.name}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Weapon Tags — technique-only; hook throws if any other kind declares these */}
        {kind === "technique" && (
          <div>
            <label className={`${formLabel} mb-2`}>
              Weapon Tags *
            </label>
            {weaponTagOptions.length === 0 ? (
              <p className="text-sm text-stone-500">Loading options…</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {weaponTagOptions.map((tag) => (
                  <label
                    key={tag}
                    className={formCheckTile}
                  >
                    <input
                      type="checkbox"
                      value={tag}
                      checked={weaponTags.includes(tag)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          onRequirementsChange("properties", [
                            ...weaponTags,
                            tag,
                          ]);
                        } else {
                          onRequirementsChange(
                            "properties",
                            weaponTags.filter((t) => t !== tag),
                          );
                        }
                      }}
                      className={formCheckbox}
                    />
                    <span className="capitalize">{tag}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Granted Powers — trait-only; hook throws if any other kind populates this */}
        {kind === "trait" && (
          <div>
            <label className={`${formLabel} mb-2`}>
              Grants
            </label>
            {allPowers.length === 0 ? (
              <p className="text-sm text-stone-500">No powers available yet.</p>
            ) : (
              <>
                <select
                  value=""
                  onChange={(e) => {
                    if (
                      e.target.value &&
                      !grantedPowers.includes(e.target.value)
                    ) {
                      onGrantedPowersChange([...grantedPowers, e.target.value]);
                    }
                  }}
                  className={formInput}
                >
                  <option value="">Add a power to grant…</option>
                  {allPowers
                    .filter((p) => !grantedPowers.includes(p._id))
                    .map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.name} ({p.kind})
                      </option>
                    ))}
                </select>

                <div className="flex flex-wrap gap-2 mt-3">
                  {grantedPowers.map((id) => {
                    const power = allPowers.find((p) => p._id === id);
                    if (!power) return null;
                    return (
                      <span
                        key={id}
                        className="flex items-center gap-2 text-sm px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-600/20 text-emerald-700 dark:text-emerald-300 border border-stone-300 dark:border-emerald-500/30"
                      >
                        {power.name}
                        <button
                          type="button"
                          onClick={() =>
                            onGrantedPowersChange(
                              grantedPowers.filter((gId) => gId !== id),
                            )
                          }
                        >
                          <LuX size={14} />
                        </button>
                      </span>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
