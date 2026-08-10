import { useEffect, useRef, useState } from "react";
import { LuBookOpen, LuChevronDown, LuX } from "react-icons/lu";
import { Weapon, Category } from "../weaponTypes";
import {
  Rarity,
  Quality,
  Materials,
} from "../../../shared/constants/constantTypes";

interface WeaponBasicInfoProps {
  name: string;
  category: Category;
  rarity: Rarity;
  value: number;
  quality: Quality[];
  qualityOptions: Quality[];
  materials: Materials[];
  materialOptions: Materials[];
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onCheckedChange: (
    fieldName: keyof Weapon,
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  onArrayFieldChange: (fieldName: keyof Weapon) => (newData: string[]) => void;
}

const CATEGORY_OPTIONS: Category[] = ["melee", "ranged", "magic"];

const RARITY_OPTIONS: Rarity[] = [
  "common",
  "rare",
  "heroic",
  "epic",
  "legendary",
  "mythic",
];

export const WeaponBasicInfoSection = ({
  name,
  category,
  rarity,
  value,
  quality,
  qualityOptions,
  materials,
  materialOptions,
  onInputChange,
  onCheckedChange,
  onArrayFieldChange,
}: WeaponBasicInfoProps) => {
  const [qualityOpen, setQualityOpen] = useState(false);
  const qualityRef = useRef<HTMLDivElement>(null);

  const [materialsOpen, setMaterialsOpen] = useState(false);
  const materialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        qualityRef.current &&
        !qualityRef.current.contains(event.target as Node)
      ) {
        setQualityOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        materialsRef.current &&
        !materialsRef.current.contains(event.target as Node)
      ) {
        setMaterialsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const removeQuality = (tag: string) => {
    onArrayFieldChange("quality")(quality.filter((q) => q !== tag));
  };

  const removeMaterial = (tag: string) => {
    onArrayFieldChange("materials")(materials.filter((m) => m !== tag));
  };

  return (
    <section>
      <h2 className="text-xl font-bold text-cyan-300 dark:text-orange-300 mb-4 flex items-center gap-2">
        <LuBookOpen size={20} />
        Basic Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Weapon Name *
          </label>
          <input
            type="text"
            placeholder="Enter weapon name"
            name="name"
            onChange={onInputChange}
            value={name}
            required
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Category *
          </label>
          <select
            name="category"
            onChange={onInputChange}
            value={category}
            required
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
          >
            {CATEGORY_OPTIONS.map((option) => (
              <option key={option} value={option} className="capitalize">
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Rarity *
          </label>
          <select
            name="rarity"
            onChange={onInputChange}
            value={rarity}
            required
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
          >
            {RARITY_OPTIONS.map((option) => (
              <option key={option} value={option} className="capitalize">
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Value (Gold)
          </label>
          <input
            type="number"
            placeholder="Cost in gold"
            name="value"
            onChange={onInputChange}
            value={value}
            min="0"
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Quality — multi-select dropdown */}
        <div ref={qualityRef} className="relative">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Quality
          </label>
          <button
            type="button"
            onClick={() => setQualityOpen((prev) => !prev)}
            className="w-full flex items-center justify-between px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 transition-all"
          >
            <span className="text-slate-400">
              {quality.length > 0
                ? `${quality.length} selected`
                : "Select quality"}
            </span>
            <LuChevronDown
              size={18}
              className={`transition-transform ${qualityOpen ? "rotate-180" : ""}`}
            />
          </button>

          {qualityOpen && (
            <div className="absolute z-10 mt-2 w-full max-h-64 overflow-y-auto bg-slate-800 dark:bg-slate-900 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg shadow-xl p-2">
              {qualityOptions.map((tag) => (
                <label
                  key={tag}
                  className="flex items-center gap-2 text-slate-300 cursor-pointer p-2 rounded-md hover:bg-slate-700/50 dark:hover:bg-slate-800/50 transition-all"
                >
                  <input
                    type="checkbox"
                    value={tag}
                    checked={quality.includes(tag)}
                    onChange={onCheckedChange("quality")}
                    className="w-4 h-4 rounded border-cyan-500/30 dark:border-orange-500/30 bg-slate-800/50 dark:bg-slate-900/50 text-cyan-500 dark:text-orange-500 focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500"
                  />
                  <span className="capitalize text-sm">{tag}</span>
                </label>
              ))}
            </div>
          )}

          {quality.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {quality.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 text-xs capitalize bg-cyan-500/10 dark:bg-orange-500/10 border border-cyan-500/30 dark:border-orange-500/30 text-cyan-300 dark:text-orange-300 px-2 py-1 rounded-full"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeQuality(tag)}
                    className="hover:text-white"
                  >
                    <LuX size={12} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Materials — multi-select dropdown */}
        <div ref={materialsRef} className="relative">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Materials
          </label>
          <button
            type="button"
            onClick={() => setMaterialsOpen((prev) => !prev)}
            className="w-full flex items-center justify-between px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 transition-all"
          >
            <span className="text-slate-400">
              {materials.length > 0
                ? `${materials.length} selected`
                : "Select materials"}
            </span>
            <LuChevronDown
              size={18}
              className={`transition-transform ${materialsOpen ? "rotate-180" : ""}`}
            />
          </button>

          {materialsOpen && (
            <div className="absolute z-10 mt-2 w-full max-h-64 overflow-y-auto bg-slate-800 dark:bg-slate-900 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg shadow-xl p-2">
              {materialOptions.map((tag) => (
                <label
                  key={tag}
                  className="flex items-center gap-2 text-slate-300 cursor-pointer p-2 rounded-md hover:bg-slate-700/50 dark:hover:bg-slate-800/50 transition-all"
                >
                  <input
                    type="checkbox"
                    value={tag}
                    checked={materials.includes(tag)}
                    onChange={onCheckedChange("materials")}
                    className="w-4 h-4 rounded border-cyan-500/30 dark:border-orange-500/30 bg-slate-800/50 dark:bg-slate-900/50 text-cyan-500 dark:text-orange-500 focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500"
                  />
                  <span className="capitalize text-sm">{tag}</span>
                </label>
              ))}
            </div>
          )}

          {materials.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {materials.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 text-xs capitalize bg-cyan-500/10 dark:bg-orange-500/10 border border-cyan-500/30 dark:border-orange-500/30 text-cyan-300 dark:text-orange-300 px-2 py-1 rounded-full"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeMaterial(tag)}
                    className="hover:text-white"
                  >
                    <LuX size={12} />
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
