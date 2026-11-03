import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  LuUsers,
  LuFileText,
  LuDrama,
  LuSparkles,
  LuAnvil,
  LuActivity,
  LuClock,
} from "react-icons/lu";

import API_URL from "../../../shared/api/api";
import {
  card,
  iconTile,
  ink,
  inkAccent,
  inkMuted,
  inkPrimary,
  inkSubtle,
  line,
  hoverRow,
} from "../../../shared/styles/theme.ts";

type SectionEntry = {
  data: any[];
  deleteFn: (id: string) => void;
};

interface AdminDashboardProps {
  sectionConfig: Record<string, SectionEntry>;
  // Only admins see user counts; moderators get content stats only
  canManageUsers: boolean;
}

interface ActivityLogEntry {
  _id: string;
  action: string;
  target: string;
  // Populated by the server; null if the user has since been deleted
  userId: { _id: string; username: string } | null;
  createdAt: string;
}

export function AdminDashboard({
  sectionConfig,
  canManageUsers,
}: AdminDashboardProps) {
  const [logs, setLogs] = useState<ActivityLogEntry[]>([]);
  const [logsError, setLogsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/activity`, {
          credentials: "include",
        });

        if (!response.ok) {
          setLogsError(true);
          return;
        }

        const data = await response.json();
        setLogs(data);
      } catch (error) {
        console.error("Error fetching logs:", error);
        setLogsError(true);
      }
    };

    fetchData();
  }, []);

  const users = sectionConfig.users.data;
  const articles = sectionConfig.articles.data;
  const professions = sectionConfig.professions.data;
  const powers = sectionConfig.powers.data;
  const items = sectionConfig.items.data;

  // Content count tiles
  const countTiles = [
    ...(canManageUsers
      ? [{ label: "Users", count: users.length, icon: LuUsers }]
      : []),
    { label: "Articles", count: articles.length, icon: LuFileText },
    { label: "Professions", count: professions.length, icon: LuDrama },
    { label: "Powers", count: powers.length, icon: LuSparkles },
    { label: "Items", count: items.length, icon: LuAnvil },
  ];

  const powerKinds = ["spell", "technique", "ability", "trait"];

  // Users by role (same order as the enum in user.model.js)
  const roles = ["admin", "moderator", "editor", "user", "guest"];

  // Five most recently updated articles (copy first; RTK data is read-only)
  const recentArticles = [...articles]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
    .slice(0, 5);

  return (
    <div className={`space-y-6 ${ink}`}>
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className={`text-sm ${inkMuted}`}>
          An overview of your {canManageUsers ? "users and " : ""}game content
        </p>
      </div>

      {/* Content Count Tiles */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 gap-6 ${
          canManageUsers ? "lg:grid-cols-5" : "lg:grid-cols-4"
        }`}
      >
        {countTiles.map((tile) => {
          const Icon = tile.icon;
          return (
            <div key={tile.label} className={`p-6 ${card}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${inkMuted}`}>
                    {tile.label}
                  </p>
                  <p className={`text-3xl font-bold ${inkPrimary}`}>
                    {tile.count}
                  </p>
                </div>
                <div className={iconTile}>
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
              </div>

              {/* Powers break down by kind */}
              {tile.label === "Powers" && (
                <div className={`mt-4 pt-4 border-t space-y-1 ${line}`}>
                  {powerKinds.map((kind) => (
                    <div key={kind} className="flex justify-between text-sm">
                      <span className={`capitalize ${inkSubtle}`}>{kind}</span>
                      <span className="font-medium">
                        {powers.filter((power) => power.kind === kind).length}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Recent Activity */}
        <div className={`p-6 ${card}`}>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <LuActivity className={inkAccent} size={20} aria-hidden="true" />
            Recent Activity
          </h3>
          {logsError ? (
            <p className={`text-sm ${inkSubtle}`}>
              Couldn't load the activity log.
            </p>
          ) : logs.length === 0 ? (
            <p className={`text-sm ${inkSubtle}`}>No activity yet.</p>
          ) : (
            <ul className={`divide-y ${line}`}>
              {logs.slice(0, 10).map((log) => (
                <li
                  key={log._id}
                  className="flex items-center justify-between gap-4 py-2"
                >
                  <div>
                    <p className="text-sm font-medium">{log.action}</p>
                    <p className={`text-xs ${inkSubtle}`}>
                      by {log.userId?.username ?? "Deleted user"}
                    </p>
                  </div>
                  <span className={`text-xs whitespace-nowrap ${inkSubtle}`}>
                    {new Date(log.createdAt).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="space-y-6">
          {/* Users by Role */}
          {canManageUsers && (
            <div className={`p-6 ${card}`}>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <LuUsers className={inkAccent} size={20} aria-hidden="true" />
                Users by Role
              </h3>
              <div className="space-y-3">
                {roles.map((role) => {
                  const roleCount = users.filter(
                    (user) => user.role === role,
                  ).length;
                  const percent =
                    users.length === 0 ? 0 : (roleCount / users.length) * 100;

                  return (
                    <div key={role}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className={`capitalize ${inkMuted}`}>{role}</span>
                        <span className="font-medium">{roleCount}</span>
                      </div>
                      <div className="h-2 rounded-full bg-stone-100 dark:bg-stone-800">
                        <div
                          className="h-2 rounded-full bg-emerald-600 dark:bg-emerald-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recently Updated Articles */}
          <div className={`p-6 ${card}`}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <LuClock className={inkAccent} size={20} aria-hidden="true" />
              Recently Updated Articles
            </h3>
            {recentArticles.length === 0 ? (
              <p className={`text-sm ${inkSubtle}`}>No articles yet.</p>
            ) : (
              <ul className="space-y-1">
                {recentArticles.map((article) => (
                  <li key={article._id}>
                    <Link
                      to={`/articles/${article._id}/edit`}
                      className={`flex items-center justify-between gap-4 rounded-md px-2 py-2 transition-colors ${hoverRow}`}
                    >
                      <span className="text-sm font-medium truncate">
                        {article.title || "Untitled"}
                      </span>
                      <span
                        className={`text-xs whitespace-nowrap ${inkSubtle}`}
                      >
                        {new Date(article.updatedAt).toLocaleDateString()}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
