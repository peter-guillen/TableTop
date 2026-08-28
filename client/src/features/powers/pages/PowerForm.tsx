import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";

import { useFormHandlers } from "../../../shared/hooks/useFormHandlers.tsx";
import { useGetConstantsQuery } from "../../../shared/api/constantsApi.ts";

import {
  useGetPowerByIdQuery,
  useCreatePowerMutation,
  useUpdatePowerMutation,
} from "../api/powerApi";

import { PowerBasicInfoSection } from "../components/PowerBasicInfoSection";
import { PowerCastingSection } from "../components/PowerCastingSection";
import { PowerCombatSection } from "../components/PowerCombatSection";
import { PowerConditionsSection } from "../components/PowerConditionsSection";
import { PowerDescriptionSection } from "../components/PowerDescriptionSection";

import { Power } from "../powerTypes";
import { defaultPowerFormData } from "../powerDefaults.ts";

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
  const handleCastingChange = handleObjectFieldChange("casting");
  const handleTargetingChange = handleObjectFieldChange("targeting");
  const handleRechargeChange = handleFieldChange("recharge");
  const handleTierChange = handleFieldChange("tier");

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

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;

  useEffect(() => {
    if (isEditing && power) {
      setFormData({ ...power });
    }
  }, [isEditing, power]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-350 via-cyan-350 to-slate-300 dark:from-slate-950 dark:via-cyan-950 dark:to-slate-950 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <LuSparkles
              className="text-cyan-400 dark:text-orange-400"
              size={32}
            />
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-orange-400 to-cyan-500 dark:from-cyan-300 dark:via-orange-300 dark:to-cyan-400">
              {isEditing ? "Edit Power" : "Create Power"}
            </h1>
          </div>
          <p className="text-slate-400 dark:text-slate-500">
            Weave your magical creation
          </p>
        </div>

        {/* Main Form Card */}
        <form onSubmit={handleSubmit}>
          <div className="bg-slate-900/70 dark:bg-slate-950/70 backdrop-blur-md rounded-2xl border border-cyan-500/30 dark:border-orange-500/30 shadow-2xl p-8 mb-6">
            <div className="space-y-8">
              {/* Basic Information */}
              <PowerBasicInfoSection
                name={formData.name}
                school={formData.school}
                tier={formData.tier}
                offensiveStat={formData.offensiveStat}
                offensiveStatOptions={constants?.OFFENSIVE_STATS ?? []}
                damageType={formData.damageType}
                damageTypeOptions={constants?.DAMAGE_TYPES ?? []}
                effectType={formData.effectType}
                effectTypeOptions={constants?.EFFECT_TYPES ?? []}
                onInputChange={handleInputChange}
                onTierChange={handleTierChange}
                onCheckedChange={handleCheckedChange}
              />

              {/* Casting Details */}
              <PowerCastingSection
                casting={formData.casting}
                targeting={formData.targeting}
                recharge={formData.recharge}
                onCastingChange={handleCastingChange}
                onRechargeChange={handleRechargeChange}
                onTargetingChange={handleTargetingChange}
              />

              {/* Combat Stats */}
              <PowerCombatSection
                healthEffects={formData.healthEffects}
                onHealthChange={handleHealthChange}
              />

              <PowerConditionsSection
                statModifiers={formData.statModifiers}
                conditions={formData.conditions}
                onStatModifiersChange={handleStatModifiersChange}
                onConditionsChange={handleConditionsChange}
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
              className="px-6 py-3 rounded-lg font-medium text-slate-400 hover:text-white hover:bg-orange-800/50 dark:hover:bg-slate-900/50 transition-all duration-300 border border-orange-700 dark:border-orange-800"
            >
              Cancel
            </button>
            <button className="px-8 py-3 rounded-lg font-medium bg-gradient-to-r from-cyan-600 to-orange-600 dark:from-cyan-500 dark:to-orange-500 text-white shadow-lg shadow-cyan-500/50 dark:shadow-orange-500/50 hover:shadow-xl hover:shadow-cyan-500/60 dark:hover:shadow-orange-500/60 transition-all duration-300">
              {isEditing ? "Update Power" : "Create Power"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
