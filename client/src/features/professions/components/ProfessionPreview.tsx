import { NavLink } from "react-router-dom";
import type { Profession } from "../professionTypes";
import {
  LuCrown,
  LuShield,
  LuSword,
  LuZap,
  LuArrowRight,
  LuSparkles,
} from "react-icons/lu";

const getClassIcon = (name: string) => {
  const t = name.toLowerCase();
  if (t.includes("mage") || t.includes("wizard") || t.includes("sorcerer"))
    return LuSparkles;
  if (t.includes("warrior") || t.includes("fighter") || t.includes("barbarian"))
    return LuSword;
  if (t.includes("paladin") || t.includes("cleric")) return LuShield;
  if (t.includes("rogue") || t.includes("ranger")) return LuZap;
  return LuCrown;
};

function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-stone-50 dark:bg-stone-700/40 rounded-lg px-3 py-2">
      <p className="text-[10px] uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-0.5">
        {label}
      </p>
      <p className="text-sm font-semibold text-stone-800 dark:text-stone-200 truncate">
        {value || "—"}
      </p>
    </div>
  );
}

export const ProfessionPreview = ({
  professions,
}: {
  professions: Profession[];
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {professions.map((profession) => {
        const Icon = getClassIcon(profession.name);

        return (
          <NavLink
            key={profession._id}
            to={`/professions/${profession._id}`}
            className="block"
          >
            <div className="group cursor-pointer relative h-full bg-white dark:bg-gradient-to-br dark:from-stone-800 dark:to-stone-900/80 rounded-2xl border border-stone-200 dark:border-emerald-500/20 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-emerald-400 dark:hover:border-emerald-500/40 shadow-md hover:shadow-xl backdrop-blur-sm">
              {/* Top accent bar */}
              <div className="h-1 w-full bg-amber-500" />

              {/* Background orb */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-500" />

              <div className="relative p-6">
                {/* Icon */}
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-emerald-700 rounded-xl p-3 group-hover:scale-110 transition-transform shadow-md">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Title — bumped up to text-2xl for stronger hierarchy */}
                <h3 className="text-2xl font-bold text-stone-900 dark:text-white mb-1 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors duration-200">
                  {profession.name}
                </h3>

                {/* Description */}
                <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-sm line-clamp-2 mb-5">
                  {profession.description ||
                    "A master of their craft, forged through battle and perseverance."}
                </p>

                {/* Proficiencies (stored as snake_case enum values, e.g. light_armor) */}
                <div className="grid grid-cols-3 gap-2 mb-5">
                  <StatChip
                    label="Armor"
                    value={profession.armorProficiencies
                      .map((v) => v.replace(/_/g, " "))
                      .join(", ")}
                  />
                  <StatChip
                    label="Weapons"
                    value={profession.weaponProficiencies
                      .map((v) => v.replace(/_/g, " "))
                      .join(", ")}
                  />
                  <StatChip
                    label="Skills"
                    value={profession.skillProficiencies
                      .map((v) => v.replace(/_/g, " "))
                      .join(", ")}
                  />
                </div>

                {/* CTA */}
                <div className="pt-4 border-t border-stone-100 dark:border-stone-700/50 text-emerald-700 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium flex items-center space-x-2 group-hover:translate-x-1 transition-transform">
                  <span>Explore</span>
                  <LuArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};
