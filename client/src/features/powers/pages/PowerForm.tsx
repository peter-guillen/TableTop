import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";

import { useFormHandlers } from "../../../shared/hooks/useFormHandlers.tsx";
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
  primaryButton,
} from "../../../shared/styles/theme.ts";

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
  const [createPower] = useCreatePowerMutation();
  const [updatePower] = useUpdatePowerMutation();

  const {
    handleInputChange,
    handleFieldChange,
    handleCheckedChange,
    handleArrayFieldChange,
    handleObjectFieldChange,
  } = useFormHandlers(setFormData);

  const handleHealthChange = handleArrayFieldChange("healthEffects");
  const handleStatModifiersChange = handleArrayFieldChange("statModifiers");
  const handleConditionsChange = handleArrayFieldChange("conditions");
  const handleTargetingChange = handleObjectFieldChange("targeting");
  const handleActivationChange = handleObjectFieldChange("activation");
  const handleRequirementsChange = handleObjectFieldChange("requirements");
  const handleRechargeChange = handleFieldChange("recharge");
  const handleGrantedPowersChange = handleFieldChange("grantedPowers");

  // Exclude this power itself from pickers that reference other powers —
  // a trait can't require or grant itself
  const otherPowers = powers.filter(
    (p): p is Power & { _id: string } =>
      p._id !== undefined && p._id !== formData._id,
  );

  const handleCancel = () => navigate(-1);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEditing) {
      await updatePower({ id: id ?? "", data: formData });
    } else {
      await createPower(formData);
    }
    navigate("/powers");
  };

  useEffect(() => {
    if (isEditing && power) {
      setFormData({ ...power });
    }
  }, [isEditing, power]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;

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

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
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
