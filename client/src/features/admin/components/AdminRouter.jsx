// components/AdminRouter.jsx
import { AdminTable } from "./AdminTable";
import {
  DashboardExample,
  AnalyticsExample,
  SettingExample,
} from "../../admin/components/DashboardExample";
import { ActivityLog } from "./ActivityLog";

export function AdminRouter({
  activeSection,
  searchTerm,
  onSearchChange,
  sectionConfig,
}) {
  switch (activeSection) {
    // DASHBOARD
    case "dashboard":
      return (
        <div className="space-y-6">
          <DashboardExample />
        </div>
      );

    // USERS
    case "users":
      return (
        <AdminTable
          title="Users"
          columns={["Name", "Email", "Role", "Last Active", "Status"]}
          data={sectionConfig.users.data}
          activeSection="users"
          onDelete={sectionConfig.users.deleteFn}
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          renderRow={(user) => [
            user.username || user.name,
            user.email,
            user.role,
            user.lastActive || "-",
            user.status || "Active",
          ]}
        />
      );

    // SPELLS
    case "spells":
      return (
        <AdminTable
          title="Spells"
          columns={["Name", "Tier", "School", "Range", "Duration"]}
          data={sectionConfig.spells.data}
          activeSection="spells"
          onDelete={sectionConfig.spells.deleteFn}
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          renderRow={(spell) => [
            spell.name,
            spell.tier,
            spell.school,
            spell.range,
            spell.duration,
          ]}
        />
      );

    // ABILITIES
    case "abilities":
      return <div>Coming Soon...</div>;

    // WEAPONS
    case "weapons":
      return (
        <AdminTable
          title="Weapons"
          columns={["Name", "Damage", "Category", "Weight", "Range"]}
          data={sectionConfig.weapons.data}
          activeSection="weapons"
          onDelete={sectionConfig.weapons.deleteFn}
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          renderRow={(weapon) => [
            weapon.name,
            weapon.damage,
            weapon.category,
            weapon.weight,
            weapon.range,
          ]}
        />
      );

    // ARMORS
    case "armors":
      return (
        <AdminTable
          title="Armors"
          columns={["Name", "Defense", "Category", "Type", "Penalty"]}
          data={sectionConfig.armors.data}
          activeSection="armors"
          onDelete={sectionConfig.armors.deleteFn}
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          renderRow={(armor) => [
            armor.name,
            armor.defense,
            armor.category,
            armor.type,
            armor.penalty,
          ]}
        />
      );

    // ARTICLES
    case "articles":
      return (
        <AdminTable
          title="Articles"
          columns={["Title", "Author", "Category", "Published", "Status"]}
          data={sectionConfig.articles.data}
          activeSection="articles"
          onDelete={sectionConfig.articles.deleteFn}
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          renderRow={(article) => [
            article.title,
            article.author,
            article.category,
            article.published || "-",
            article.status || "Draft",
          ]}
        />
      );

    // ANALYTICS
    case "analytics":
      return <ActivityLog />;

    // SETTINGS
    case "settings":
      return <SettingExample />;

    // DEFAULT
    default:
      return <DashboardExample />;
  }
}
