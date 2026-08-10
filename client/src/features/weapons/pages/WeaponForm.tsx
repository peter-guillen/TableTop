import { useEffect, useState } from "react";
import { LuSparkles } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";

import { useFormHandlers } from "../../../shared/hooks/useFormHandlers.tsx";

import {
  useGetWeaponByIdQuery,
  useCreateWeaponMutation,
  useUpdateWeaponMutation,
} from "../api/weaponApi.tsx";

import { useGetConstantsQuery } from "../../../shared/api/constantsApi.ts";
import { useGetAllSpellsQuery } from "../../spells/api/spellApi.tsx";

import { WeaponBasicInfoSection } from "../components/WeaponBasicInfoSection.tsx";
import { WeaponCombatSection } from "../components/WeaponCombatSection.tsx";
import { WeaponDescriptionSection } from "../components/WeaponDescriptionSection.tsx";
import { WeaponSpecialSection } from "../components/WeaponSpecialSection.tsx";

import { Weapon } from "../weaponTypes.ts";
import { defaultWeaponFormData } from "../weaponDefaults.ts";

export function WeaponForm() {
  const [formData, setFormData] = useState<Weapon>(defaultWeaponFormData);

  const { id } = useParams();
  const isEditing = Boolean(id);

  const navigate = useNavigate();

  const {
    data: weapon,
    isLoading,
    isError,
  } = useGetWeaponByIdQuery(id ?? "", { skip: !isEditing });
  const { data: constants } = useGetConstantsQuery();
  const { data: spells } = useGetAllSpellsQuery();
  const [createWeapon] = useCreateWeaponMutation();
  const [updateWeapon] = useUpdateWeaponMutation();

  const { handleInputChange, handleCheckedChange, handleArrayFieldChange } =
    useFormHandlers(setFormData);

  useEffect(() => {
    if (isEditing && weapon) {
      if (weapon) {
        setFormData(weapon);
      }
    }
  }, [isEditing, weapon]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;

  const handleCancel = () => navigate(-1);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEditing) {
      await updateWeapon({ id: id ?? "", formData });
    } else {
      await createWeapon(formData);
    }
    navigate("/weapons");
  };

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
              {isEditing ? "Edit Weapon" : "Create Weapon"}
            </h1>
          </div>
          <p className="text-slate-400 dark:text-slate-500">
            Forge your legendary weapon
          </p>
        </div>

        {/* Main Form Card */}
        <form onSubmit={handleSubmit}>
          <div className="bg-slate-900/70 dark:bg-slate-950/70 backdrop-blur-md rounded-2xl border border-cyan-500/30 dark:border-orange-500/30 shadow-2xl p-8 mb-6">
            <div className="space-y-8">
              {/* Basic Information */}
              <WeaponBasicInfoSection
                name={formData.name}
                category={formData.category}
                rarity={formData.rarity}
                value={formData.value}
                quality={formData.quality}
                qualityOptions={constants?.QUALITY ?? []}
                materials={formData.materials}
                materialOptions={constants?.MATERIALS ?? []}
                onInputChange={handleInputChange}
                onCheckedChange={handleCheckedChange}
                onArrayFieldChange={handleArrayFieldChange}
              />

              {/* Combat Stats */}
              <WeaponCombatSection
                damageType={formData.damageType}
                damageTypeOptions={constants?.DAMAGE_TYPES ?? []}
                properties={formData.properties}
                propertyOptions={constants?.PROPERTIES ?? []}
                statModifiers={formData.statModifiers}
                statModifierOptions={Object.values(constants?.STATS ?? {})}
                onCheckedChange={handleCheckedChange}
                onArrayFieldChange={handleArrayFieldChange}
              />

              {/* Special & Requirements */}
              <WeaponSpecialSection
                skills={formData.skills}
                uniqueSkills={formData.uniqueSkills}
                spellOptions={spells ?? []}
                onCheckedChange={handleCheckedChange}
                onArrayFieldChange={handleArrayFieldChange}
              />

              {/* Description */}
              <WeaponDescriptionSection
                description={formData.description}
                onInputChange={handleInputChange}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 rounded-lg font-medium text-slate-400 hover:text-white hover:bg-orange-800/50 dark:hover:bg-slate-900/50 transition-all duration-300 border border-orange-700 dark:border-orange-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-lg font-medium bg-gradient-to-r from-cyan-600 to-orange-600 dark:from-cyan-500 dark:to-orange-500 text-white shadow-lg shadow-cyan-500/50 dark:shadow-orange-500/50 hover:shadow-xl hover:shadow-cyan-500/60 dark:hover:shadow-orange-500/60 transition-all duration-300"
            >
              {isEditing ? "Update Weapon" : "Create Weapon"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
