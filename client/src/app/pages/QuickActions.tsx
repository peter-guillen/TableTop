import { Link } from "react-router-dom";
import {
  LuAnvil,
  LuDrama,
  LuFileText,
  LuPencil,
  LuPersonStanding,
  LuPlus,
  LuSchool,
  LuSparkles,
} from "react-icons/lu";

import {
  card,
  formTitle,
  ghostButton,
  iconTile,
  ink,
  inkMuted,
  inkPrimary,
  inkSubtle,
  primaryButton,
  surface,
} from "../../shared/styles/theme.ts";

// Everything an editor is allowed to create (see the role matrix on the server routes)
const contentTypes = [
  {
    label: "Article",
    plural: "Articles",
    description: "News, lore, and design notes for players to read.",
    to: "/articles",
    icon: LuFileText,
  },
  {
    label: "Class",
    plural: "Classes",
    description: "Professions, their proficiencies, and level rewards.",
    to: "/professions",
    icon: LuDrama,
  },
  {
    label: "Species",
    plural: "Species",
    description: "Playable ancestries and what they bring to a character.",
    to: "/species",
    icon: LuPersonStanding,
  },
  {
    label: "Background",
    plural: "Backgrounds",
    description: "Where a character came from before the adventure.",
    to: "/backgrounds",
    icon: LuSchool,
  },
  {
    label: "Item",
    plural: "Items",
    description: "Weapons, armor, accessories, trinkets, and consumables.",
    to: "/items",
    icon: LuAnvil,
  },
  {
    label: "Power",
    plural: "Powers",
    description: "Spells, techniques, abilities, and traits.",
    to: "/powers",
    icon: LuSparkles,
  },
];

export function QuickActions() {
  return (
    <div className={`min-h-screen p-6 md:p-8 ${surface} ${ink}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <LuPencil className={inkPrimary} size={32} aria-hidden="true" />
            <h1 className={formTitle}>Quick Actions</h1>
          </div>
          <p className={`text-lg ${inkMuted}`}>
            Start something new or browse what's already been made.
          </p>
          <p className={`mt-2 text-sm ${inkSubtle}`}>
            Editors can create and edit content. Deleting is handled by
            moderators and admins.
          </p>
        </div>

        {/* Content Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contentTypes.map((type) => {
            const Icon = type.icon;
            return (
              <div key={type.to} className={`flex flex-col p-6 ${card}`}>
                <div className="flex items-start gap-4 mb-6">
                  <div className={iconTile}>
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{type.plural}</h2>
                    <p className={`text-sm leading-relaxed ${inkMuted}`}>
                      {type.description}
                    </p>
                  </div>
                </div>

                <div className="mt-auto flex gap-3">
                  <Link
                    to={`${type.to}/create`}
                    className={`flex-1 px-4 py-2 ${primaryButton}`}
                  >
                    <LuPlus className="w-4 h-4" aria-hidden="true" />
                    New {type.label}
                  </Link>
                  <Link to={type.to} className={`px-4 py-2 ${ghostButton}`}>
                    Browse
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
