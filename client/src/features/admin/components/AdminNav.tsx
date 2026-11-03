import { useState } from "react";
import { AdminRoutes } from "./AdminRoutes";

import { useGetCurrentUserQuery } from "../../auth/api/authApi.tsx";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
} from "../../users/api/userApi.tsx";
import {
  useGetAllArticlesQuery,
  useDeleteArticleMutation,
} from "../../articles/api/articleApi.tsx";
import {
  useGetAllProfessionsQuery,
  useDeleteProfessionMutation,
} from "../../professions/api/professionApi";
import {
  useGetAllPowersQuery,
  useDeletePowerMutation,
} from "../../powers/api/powerApi.tsx";
import {
  useGetAllItemsQuery,
  useDeleteItemMutation,
} from "../../items/api/itemApi.tsx";

import {
  LuUsers,
  LuSparkles,
  LuFileText,
  LuHouse,
  LuChevronRight,
  LuDrama,
  LuAnvil,
} from "react-icons/lu";

export const AdminNav = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");

  // Moderators can open the admin page, but only admins manage users
  const { data: currentUser } = useGetCurrentUserQuery();
  const canManageUsers = currentUser?.role === "admin";

  const {
    data: userList = [],
    isLoading: userLoading,
    isError: userError,
  } = useGetAllUsersQuery(undefined, { skip: !canManageUsers });
  const [deleteUser] = useDeleteUserMutation();
  const [updateUserRole] = useUpdateUserRoleMutation();
  const {
    data: articleList = [],
    isLoading: articleLoading,
    isError: articleError,
  } = useGetAllArticlesQuery();
  const [deleteArticle] = useDeleteArticleMutation();
  const {
    data: professionList = [],
    isLoading: professionLoading,
    isError: professionError,
  } = useGetAllProfessionsQuery();
  const [deleteProfession] = useDeleteProfessionMutation();
  const {
    data: powerList = [],
    isLoading: powerLoading,
    isError: powerError,
  } = useGetAllPowersQuery();
  const [deletePower] = useDeletePowerMutation();
  const {
    data: itemList = [],
    isLoading: itemLoading,
    isError: itemError,
  } = useGetAllItemsQuery();
  const [deleteItem] = useDeleteItemMutation();

  // Provide a data and actions map that AdminRoutes consumes
  const sectionConfig = {
    articles: {
      data: articleList,
      deleteFn: deleteArticle,
    },
    professions: {
      data: professionList,
      deleteFn: deleteProfession,
    },
    powers: {
      data: powerList,
      deleteFn: deletePower,
    },
    items: {
      data: itemList,
      deleteFn: deleteItem,
    },
    users: {
      data: userList,
      deleteFn: deleteUser,
    },
  };

  if (
    userLoading ||
    articleLoading ||
    professionLoading ||
    powerLoading ||
    itemLoading
  ) {
    return <p>Loading...</p>;
  }

  if (userError || articleError || professionError || powerError || itemError) {
    return <p>Something went wrong while fetching data.</p>;
  }

  // Sidebar items
  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: LuHouse },
    ...(canManageUsers ? [{ id: "users", label: "Users", icon: LuUsers }] : []),
    { id: "articles", label: "Articles", icon: LuFileText },
    { id: "professions", label: "Professions", icon: LuDrama },
    { id: "powers", label: "Powers", icon: LuSparkles },
    { id: "items", label: "Items", icon: LuAnvil },
  ];

  return (
    <div className="flex h-screen bg-stone-100 dark:bg-stone-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-stone-800 shadow-sm border-r border-stone-200 dark:border-stone-700">
        {/* Logo */}
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-700 rounded-lg flex items-center justify-center">
              <LuSparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-stone-900 dark:text-white">
              D&D Admin
            </h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center px-3 py-2 mb-1 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-r-2 border-emerald-700 dark:border-emerald-400"
                    : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700"
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
                {activeSection === item.id && (
                  <LuChevronRight className="w-4 h-4 ml-auto" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Dashboard Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <AdminRoutes
            activeSection={activeSection}
            searchTerm={searchTerm}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
            sectionConfig={sectionConfig}
            canManageUsers={canManageUsers}
            currentUserId={currentUser?._id}
            onRoleChange={(id, role) => updateUserRole({ id, role })}
          />
        </div>
      </div>
    </div>
  );
};
