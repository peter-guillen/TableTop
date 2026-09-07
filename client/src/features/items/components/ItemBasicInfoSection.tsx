import { useState } from "react";
import { LuBookOpen, LuX } from "react-icons/lu";
import { ItemCategory } from "../itemTypes";
import {
  Rarity,
  Quality,
  Material,
} from "../../../shared/constants/constantTypes";

interface ItemBasicInfoProps {
  name: string;
  category: ItemCategory | "";
  rarity: Rarity | "";
  quality: Quality[];
  materials: Material[];
  value: number;
  rarityOptions: Rarity[];
  qualityOptions: Quality[];
  materialOptions: Material[];
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onValueChange: (value: number) => void;
  onQualityChange: (newData: Quality[]) => void;
  onMaterialsChange: (newData: Material[]) => void;
}

const CATEGORY_OPTIONS: ItemCategory[] = [
  "weapon",
  "armor",
  "accessory",
  "consumable",
  "trinket",
];

export const ItemBasicInfoSection = ({
  name,
  category,
  rarity,
  quality,
  materials,
  value,
  rarityOptions,
  qualityOptions,
  materialOptions,
  onInputChange,
  onValueChange,
  onQualityChange,
  onMaterialsChange,
}: ItemBasicInfoProps) => {
  const [qualityDraft, setQualityDraft] = useState("");
  const [materialDraft, setMaterialDraft] = useState("");

  const addQuality = (value: string) => {
    if (!value || quality.includes(value as Quality)) return;
    onQualityChange([...quality, value as Quality]);
    setQualityDraft("");
  };

  const removeQuality = (value: Quality) => {
    onQualityChange(quality.filter((q) => q !== value));
  };

  const addMaterial = (value: string) => {
    if (!value || materials.includes(value as Material)) return;
    onMaterialsChange([...materials, value as Material]);
    setMaterialDraft("");
  };

  const removeMaterial = (value: Material) => {
    onMaterialsChange(materials.filter((m) => m !== value));
  };

  return (
    <section>
      <h2 className="text-xl font-bold text-cyan-300 dark:text-orange-300 mb-4 flex items-center gap-2">
        <LuBookOpen size={20} />
        Basic Information
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Item Name
          </label>
          <input
            type="text"
            placeholder="Enter item name"
            name="name"
            onChange={onInputChange}
            value={name}
            required
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Category
          </label>
          <select
            name="category"
            onChange={onInputChange}
            value={category}
            required
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all capitalize"
          >
            <option value="" disabled>
              Select Category
            </option>
            {CATEGORY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Rarity
          </label>
          <select
            name="rarity"
            onChange={onInputChange}
            value={rarity}
            required
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all capitalize"
          >
            <option value="" disabled>
              Select Rarity
            </option>
            {rarityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Value
          </label>
          <input
            type="number"
            placeholder="0"
            name="value"
            onChange={(e) => onValueChange(Number(e.target.value))}
            value={value}
            min="0"
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Quality
          </label>
          <select
            value={qualityDraft}
            onChange={(e) => addQuality(e.target.value)}
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all capitalize"
          >
            <option value="">Add quality...</option>
            {qualityOptions
              .filter((option) => !quality.includes(option))
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          {quality.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {quality.map((q) => (
                <span
                  key={q}
                  className="flex items-center gap-1 px-3 py-1 text-sm bg-cyan-600/20 dark:bg-orange-600/20 text-cyan-300 dark:text-orange-300 rounded-full border border-cyan-500/30 dark:border-orange-500/30 capitalize"
                >
                  {q}
                  <button
                    type="button"
                    onClick={() => removeQuality(q)}
                    className="hover:text-white transition-all"
                  >
                    <LuX size={14} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Materials
          </label>
          <select
            value={materialDraft}
            onChange={(e) => addMaterial(e.target.value)}
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all capitalize"
          >
            <option value="">Add material...</option>
            {materialOptions
              .filter((option) => !materials.includes(option))
              .map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          {materials.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {materials.map((m) => (
                <span
                  key={m}
                  className="flex items-center gap-1 px-3 py-1 text-sm bg-cyan-600/20 dark:bg-orange-600/20 text-cyan-300 dark:text-orange-300 rounded-full border border-cyan-500/30 dark:border-orange-500/30 capitalize"
                >
                  {m}
                  <button
                    type="button"
                    onClick={() => removeMaterial(m)}
                    className="hover:text-white transition-all"
                  >
                    <LuX size={14} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
