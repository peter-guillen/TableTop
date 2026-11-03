// components/AdminRouter.jsx
import { AdminTable } from "./AdminTable.tsx";
import { AdminDashboard } from "./AdminDashboard.tsx";
import React from "react";

type SectionEntry = {
  data: any[];
  deleteFn: (id: string) => void;
};

interface AdminRouterTypes {
  activeSection: string;
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sectionConfig: Record<string, SectionEntry>;
  canManageUsers: boolean;
  currentUserId?: string;
  onRoleChange: (id: string, role: string) => void;
}

export function AdminRoutes({
  activeSection,
  searchTerm,
  onSearchChange,
  sectionConfig,
  canManageUsers,
  currentUserId,
  onRoleChange,
}: AdminRouterTypes) {
  switch (activeSection) {
    // DASHBOARD
    case "dashboard":
      return (
        <AdminDashboard
          sectionConfig={sectionConfig}
          canManageUsers={canManageUsers}
        />
      );

    // USERS (admin only; the tab is hidden for moderators)
    case "users":
      if (!canManageUsers) {
        return (
          <AdminDashboard
            sectionConfig={sectionConfig}
            canManageUsers={canManageUsers}
          />
        );
      }
      return (
        <AdminTable
          title="Users"
          columns={["Username", "Email", "Role"]}
          data={sectionConfig.users.data}
          activeSection="users"
          onDelete={sectionConfig.users.deleteFn}
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          showPageLinks={false}
          lockedRowId={currentUserId}
          renderRow={(user: any) => [
            user.username,
            user.email,
            // The server refuses changes to your own role, so lock that row
            <select
              aria-label={`Role for ${user.username}`}
              value={user.role}
              disabled={user._id === currentUserId}
              onChange={(e) => onRoleChange(user._id, e.target.value)}
              className="rounded-md border border-stone-300 bg-white px-2 py-1 text-sm capitalize text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 disabled:opacity-50 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:focus:ring-emerald-400"
            >
              {["admin", "moderator", "editor", "user", "guest"].map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>,
          ]}
        />
      );

    // POWERS
    case "powers":
      return (
        <AdminTable
          title="Powers"
          columns={["Name", "Kind", "School", "Action", "Recharge"]}
          data={sectionConfig.powers.data}
          activeSection="powers"
          onDelete={sectionConfig.powers.deleteFn}
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          renderRow={(power) => [
            power.name,
            power.kind,
            power.school ?? "-",
            power.activation?.action?.replace("_", " ") ?? "-",
            power.recharge?.replace("_", " ") ?? "-",
          ]}
        />
      );

    // ITEMS
    case "items":
      return (
        <AdminTable
          title="Items"
          columns={["Name", "Category", "Rarity", "Value"]}
          data={sectionConfig.items.data}
          activeSection="items"
          onDelete={sectionConfig.items.deleteFn}
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          renderRow={(item) => [
            item.name,
            item.category,
            item.rarity ?? "-",
            item.value,
          ]}
        />
      );

    // PROFESSIONS
    case "professions":
      return (
        <AdminTable
          title="Professions"
          columns={[
            "Name",
            "Weapon Proficiencies",
            "Armor Proficiencies",
            "Levels",
          ]}
          data={sectionConfig.professions.data}
          activeSection="professions"
          onDelete={sectionConfig.professions.deleteFn}
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          renderRow={(profession) => [
            profession.name,
            profession.weaponProficiencies?.join(", ") || "-",
            profession.armorProficiencies?.join(", ") || "-",
            profession.levelRewards?.length ?? 0,
          ]}
        />
      );

    // ARTICLES
    case "articles":
      return (
        <AdminTable
          title="Articles"
          columns={["Title", "Author", "Created", "Updated"]}
          data={sectionConfig.articles.data}
          activeSection="articles"
          onDelete={sectionConfig.articles.deleteFn}
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          renderRow={(article) => [
            article.title || "Untitled",
            article.author || "-",
            new Date(article.createdAt).toLocaleDateString(),
            new Date(article.updatedAt).toLocaleDateString(),
          ]}
        />
      );

    // DEFAULT
    default:
      return (
        <AdminDashboard
          sectionConfig={sectionConfig}
          canManageUsers={canManageUsers}
        />
      );
  }
}
