import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";

import { useGetConstantsQuery } from "../../../shared/constants/api/constantsApi.ts";

import {
  useGetPowerByIdQuery,
  useCreatePowerMutation,
  useUpdatePowerMutation,
  useGetAllPowersQuery,
} from "../api/powerApi";

import { PowerBasicInfoSection } from "../components/PowerBasicInfoSection";
import { PowerActivationSection } from "../components/PowerActivationSection.tsx";
import { PowerCombatSection } from "../components/PowerCombatSection";
import { PowerConditionsSection } from "../components/PowerConditionsSection";
import { PowerRequirementsSection } from "../components/PowerRequirementsSection";
import { PowerDescriptionSection } from "../components/PowerDescriptionSection";

import { Power } from "../powerTypes";
import { defaultPowerFormData } from "../powerDefaults.ts";
import {
  formCard,
  formTitle,
  ghostButton,
  inkDanger,
  primaryButton,
} from "../../../shared/styles/theme.ts";
import { ErrorMessage } from "../../../shared/components/ErrorMessage.tsx";
import { LoadingSpinner } from "../../../shared/components/LoadingSpinner.tsx";

export function PowerForm() {
  const [formData, setFormData] = useState<Power>(defaultPowerFormData);
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const { data: constants } = useGetConstantsQuery();
  const {
    data: power,
    isLoading,
    isError,
  } = useGetPowerByIdQuery(id ?? "", { skip: !isEditing });
  const { data: powers = [] } = useGetAllPowersQuery();
  const [createPower, { error: createError }] = useCreatePowerMutation();
  const [updatePower, { error: updateError }] = useUpdatePowerMutation();
  const saveError = createError ?? updateError;

  // Text, select and textarea inputs: the input's name is the formData key
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleHealthChange = (healthEffects: Power["healthEffects"]) =>
    setFormData((prev) => ({ ...prev, healthEffects }));
  const handleStatModifiersChange = (statModifiers: Power["statModifiers"]) =>
    setFormData((prev) => ({ ...prev, statModifiers }));
  const handleConditionsChange = (conditions: Power["conditions"]) =>
    setFormData((prev) => ({ ...prev, conditions }));
  const handleRechargeChange = (recharge: Power["recharge"]) =>
    setFormData((prev) => ({ ...prev, recharge }));
  const handleGrantedPowersChange = (grantedPowers: Power["grantedPowers"]) =>
    setFormData((prev) => ({ ...prev, grantedPowers }));

  // Nested objects: one handler updates any field on that object
  const handleTargetingChange = <K extends keyof Power["targeting"]>(
    field: K,
    value: Power["targeting"][K],
  ) =>
    setFormData((prev) => ({
      ...prev,
      targeting: { ...prev.targeting, [field]: value },
    }));
  const handleActivationChange = <K extends keyof Power["activation"]>(
    field: K,
    value: Power["activation"][K],
  ) =>
    setFormData((prev) => ({
      ...prev,
      activation: { ...prev.activation, [field]: value },
    }));
  const handleRequirementsChange = <K extends keyof Power["requirements"]>(
    field: K,
    value: Power["requirements"][K],
  ) =>
    setFormData((prev) => ({
      ...prev,
      requirements: { ...prev.requirements, [field]: value },
    }));

  // Exclude this power itself from pickers that reference other powers —
  // a trait can't require or grant itself
  const otherPowers = powers.filter(
    (p): p is Power & { _id: string } =>
      p._id !== undefined && p._id !== formData._id,
  );

  const handleCancel = () => navigate(-1);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Only spells have a school, and the server rejects one on any other kind.
    // The school field is hidden for other kinds but its value stays in
    // formData, so drop it here. On edit, null clears a school saved while
    // this power was a spell (leaving it out of the PATCH would keep it)
    const data: Power = { ...formData };
    if (data.kind !== "spell") {
      if (isEditing) {
        data.school = null;
      } else {
        delete data.school;
      }
    }
    const result = isEditing
      ? await updatePower({ id: id ?? "", data })
      : await createPower(data);
    // On failure stay on the form; saveError shows the server's message
    if (result.data) navigate("/powers");
  };

  useEffect(() => {
    if (isEditing && power) {
      setFormData({ ...power });
    }
  }, [isEditing, power]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage />;

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 p-4 sm:p-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <LuSparkles
              className="text-emerald-700 dark:text-emerald-400"
              size={32}
            />
            <h1 className={formTitle}>
              {isEditing ? "Edit Power" : "Create Power"}
            </h1>
          </div>
          <p className="text-stone-500 dark:text-stone-400">
            Weave your magical creation
          </p>
        </div>

        {/* Main Form Card */}
        <form onSubmit={handleSubmit}>
          <div className={formCard}>
            <div className="space-y-8">
              {/* Basic Information */}
              <PowerBasicInfoSection
                name={formData.name}
                kind={formData.kind}
                school={formData.school ?? ""}
                offensiveStat={formData.offensiveStat}
                offensiveStatOptions={constants?.OFFENSIVE_STATS ?? []}
                onInputChange={handleInputChange}
              />

              {/* Activation Details */}
              <PowerActivationSection
                activation={formData.activation}
                recharge={formData.recharge}
                onActivationChange={handleActivationChange}
                onRechargeChange={handleRechargeChange}
              />

              {/* Combat Stats (includes Targeting) */}
              <PowerCombatSection
                targeting={formData.targeting}
                healthEffects={formData.healthEffects}
                damageTypeOptions={constants?.DAMAGE_TYPES ?? []}
                onTargetingChange={handleTargetingChange}
                onHealthChange={handleHealthChange}
              />

              <PowerConditionsSection
                statModifiers={formData.statModifiers}
                conditions={formData.conditions}
                onStatModifiersChange={handleStatModifiersChange}
                onConditionsChange={handleConditionsChange}
              />

              {/* Requirements */}
              <PowerRequirementsSection
                kind={formData.kind}
                minLevel={formData.requirements.minLevel ?? 1}
                requiredTraits={formData.requirements.requiredTraits ?? []}
                weaponTags={formData.requirements.properties ?? []}
                weaponTagOptions={constants?.PROPERTIES ?? []}
                grantedPowers={formData.grantedPowers}
                allPowers={otherPowers}
                onRequirementsChange={handleRequirementsChange}
                onGrantedPowersChange={handleGrantedPowersChange}
              />

              {/* Description */}
              <PowerDescriptionSection
                description={formData.description}
                onInputChange={handleInputChange}
              />
            </div>
          </div>

          {saveError && (
            <p role="alert" className={`mb-4 text-sm ${inkDanger}`}>
              {"data" in saveError
                ? ((saveError.data as { error?: string }).error ??
                  "Failed to save power")
                : "Failed to save power"}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className={`${ghostButton} px-6 py-3`}
            >
              Cancel
            </button>
            <button className={`${primaryButton} px-8 py-3`}>
              {isEditing ? "Update Power" : "Create Power"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
