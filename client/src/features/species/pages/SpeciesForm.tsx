import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuDna } from "react-icons/lu";

import { useFormHandlers } from "../../../shared/hooks/useFormHandlers.tsx";
import { useGetConstantsQuery } from "../../../shared/constants/api/constantsApi.ts";

import {
  useGetSpeciesByIdQuery,
  useCreateSpeciesMutation,
  useUpdateSpeciesMutation,
} from "../api/speciesApi";
import { useGetAllPowersQuery } from "../../powers/api/powerApi";

import { SpeciesBasicInfoSection } from "../components/SpeciesBasicInfoSection";
import { SpeciesStatsSection } from "../components/SpeciesStatsSection";
import { SpeciesTraitsSection } from "../components/SpeciesTraitsSection";
import { SpeciesDescriptionSection } from "../components/SpeciesDescriptionSection";

import { Species } from "../speciesTypes";
import { defaultSpeciesFormData } from "../speciesDefaults.ts";
import {
  formCard,
  formTitle,
  ghostButton,
  primaryButton,
} from "../../../shared/styles/theme.ts";

export function SpeciesForm() {
  const [formData, setFormData] = useState<Species>(defaultSpeciesFormData);
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const { data: constants } = useGetConstantsQuery();
  const {
    data: species,
    isLoading,
    isError,
  } = useGetSpeciesByIdQuery(id ?? "", { skip: !isEditing });
  const { data: powers = [] } = useGetAllPowersQuery();
  const [createSpecies] = useCreateSpeciesMutation();
  const [updateSpecies] = useUpdateSpeciesMutation();

  const { handleInputChange, handleFieldChange, handleArrayFieldChange } =
    useFormHandlers(setFormData);

  const handleStatModifiersChange = handleArrayFieldChange("statModifiers");
  const handleResistancesChange = handleArrayFieldChange("resistances");
  const handleTraitsChange = handleFieldChange("traits");

  // Only trait-kind powers can be attached to a species
  const traitOptions = powers.filter(
    (p): p is typeof p & { _id: string } =>
      p._id !== undefined && p.kind === "trait",
  );

  const handleCancel = () => navigate(-1);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEditing) {
      await updateSpecies({ id: id ?? "", data: formData });
    } else {
      await createSpecies(formData);
    }
    navigate("/species");
  };

  useEffect(() => {
    if (isEditing && species) {
      setFormData({ ...species });
    }
  }, [isEditing, species]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 p-4 sm:p-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <LuDna
              className="text-emerald-700 dark:text-emerald-400"
              size={32}
            />
            <h1 className={formTitle}>
              {isEditing ? "Edit Species" : "Create Species"}
            </h1>
          </div>
          <p className="text-stone-500 dark:text-stone-400">
            Shape the bloodline of a people
          </p>
        </div>

        {/* Main Form Card */}
        <form onSubmit={handleSubmit}>
          <div className={formCard}>
            <div className="space-y-8">
              {/* Basic Information */}
              <SpeciesBasicInfoSection
                name={formData.name}
                onInputChange={handleInputChange}
              />

              {/* Stat Modifiers & Resistances */}
              <SpeciesStatsSection
                statModifiers={formData.statModifiers}
                resistances={formData.resistances}
                statOptions={Object.values(constants?.STATS ?? {})}
                damageTypeOptions={constants?.DAMAGE_TYPES ?? []}
                onStatModifiersChange={handleStatModifiersChange}
                onResistancesChange={handleResistancesChange}
              />

              {/* Traits */}
              <SpeciesTraitsSection
                traits={formData.traits}
                traitOptions={traitOptions}
                onTraitsChange={handleTraitsChange}
              />

              {/* Description */}
              <SpeciesDescriptionSection
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
              className={`${ghostButton} px-6 py-3`}
            >
              Cancel
            </button>
            <button className={`${primaryButton} px-8 py-3`}>
              {isEditing ? "Update Species" : "Create Species"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
