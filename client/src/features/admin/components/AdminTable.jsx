// // components/AdminTable.jsx
// import React from "react";
// import { NavLink } from "react-router-dom";
// import { LuPlus, LuSearch, LuEye, LuPen, LuTrash2 } from "react-icons/lu";

// export function AdminTable({
//   title,
//   columns = [],
//   data = [],
//   activeSection = "",
//   onDelete,
//   renderRow,
//   searchTerm = "",
//   onSearchChange = () => {},
// }) {
//   // Search filter
//   const filtered = React.useMemo(() => {
//     if (!searchTerm) return data || [];
//     const q = searchTerm.toLowerCase();
//     return (data || []).filter((item) =>
//       JSON.stringify(item).toLowerCase().includes(q),
//     );
//   }, [data, searchTerm]);

//   const defaultRenderRow = (item) => {
//     // fallback: map columns to item properties by label heuristics
//     return columns.map((col) => {
//       const keyCandidates = [
//         // standard version: Last Active
//         col,
//         // lowercase version: Last Active -> last active
//         col.toLowerCase(),
//         // remove spaces version: Last Active -> LastActive
//         col.replace(/\s+/g, ""),
//         // remove spaces and lowercase version: Last Avtive -> lastactive
//         col.replace(/\s+/g, "").toLowerCase(),
//         // camelCase version: "Last Active" -> lastActive
//         col
//           .toLowerCase()
//           .split(" ")
//           .map((w, i) => (i === 0 ? w : w[0].toUpperCase() + w.slice(1)))
//           .join(""),
//       ];

//       for (const k of keyCandidates) {
//         if (k in item) return item[k];
//       }

//       // try common keys
//       if (item.name) return item.name;
//       if (item.title) return item.title;
//       if (item.username) return item.username;

//       return ""; // last resort
//     });
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//             {title}
//           </h2>
//           <p className="text-sm text-gray-600 dark:text-slate-400">
//             Manage your {title.toLowerCase()}
//           </p>
//         </div>

//         <div className="flex items-center space-x-3">
//           <NavLink to={`/${activeSection}/create`}>
//             <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
//               <LuPlus className="w-4 h-4" />
//               <span>Add {title.slice(0, -1)}</span>
//             </button>
//           </NavLink>
//         </div>
//       </div>

//       {/* Search */}
//       <div className="flex items-center space-x-4">
//         <div className="relative flex-1 max-w-md">
//           <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-slate-500 w-4 h-4" />
//           <input
//             type="text"
//             placeholder={`Search ${title.toLowerCase()}...`}
//             value={searchTerm}
//             onChange={(e) => onSearchChange(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400"
//           />
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 dark:bg-slate-900">
//               <tr>
//                 {columns.map((column, index) => (
//                   <th
//                     key={index}
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider"
//                   >
//                     {column}
//                   </th>
//                 ))}
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>

//             <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
//               {filtered?.length ? (
//                 filtered.map((item) => {
//                   const cells = renderRow
//                     ? renderRow(item)
//                     : defaultRenderRow(item);

//                   return (
//                     <tr
//                       key={
//                         item._id || item.id || JSON.stringify(item).slice(0, 32)
//                       }
//                       className="hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
//                     >
//                       {cells.map((cell, i) => (
//                         <td
//                           key={i}
//                           className="px-6 py-4 text-sm text-gray-900 dark:text-white"
//                         >
//                           {cell ?? ""}
//                         </td>
//                       ))}

//                       {/* Actions */}
//                       <td className="px-6 py-4 text-sm text-gray-500 dark:text-slate-400">
//                         <div className="flex space-x-2">
//                           {/* View */}
//                           {typeof onView === "function" ? (
//                             <button
//                               onClick={() => onView(item._id || item.id)}
//                               className="text-cyan-600 dark:text-cyan-400 hover:text-blue-800 dark:hover:text-blue-300"
//                             >
//                               <LuEye className="w-4 h-4" />
//                             </button>
//                           ) : (
//                             <NavLink
//                               to={`/${activeSection}/${item._id || item.id}`}
//                             >
//                               <button className="text-cyan-600 dark:text-cyan-400 hover:text-blue-800 dark:hover:text-blue-300">
//                                 <LuEye className="w-4 h-4" />
//                               </button>
//                             </NavLink>
//                           )}

//                           {/* Edit */}
//                           {typeof onEdit === "function" ? (
//                             <button
//                               onClick={() => onEdit(item._id || item.id)}
//                               className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300"
//                             >
//                               <LuPen className="w-4 h-4" />
//                             </button>
//                           ) : (
//                             <NavLink
//                               to={`/${activeSection}/${
//                                 item._id || item.id
//                               }/edit`}
//                             >
//                               <button className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300">
//                                 <LuPen className="w-4 h-4" />
//                               </button>
//                             </NavLink>
//                           )}

//                           {/* Delete (must be provided) */}
//                           <button
//                             onClick={() => onDelete(item._id || item.id)}
//                             className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
//                           >
//                             <LuTrash2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })
//               ) : (
//                 <tr>
//                   <td
//                     colSpan={columns.length + 1}
//                     className="px-6 py-8 text-center text-sm text-gray-500 dark:text-slate-400"
//                   >
//                     No {title.toLowerCase()} found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// components/AdminTable.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { LuPlus, LuSearch, LuEye, LuPen, LuTrash2 } from "react-icons/lu";

export function AdminTable({
  title,
  columns = [],
  data = [],
  activeSection = "",
  onDelete,
  renderRow,
  searchTerm = "",
  onSearchChange = () => {},
}) {
  // ==================== SEARCH FILTERING ====================
  const filteredData = React.useMemo(() => {
    if (!searchTerm) return data || [];

    const searchQuery = searchTerm.toLowerCase();
    return (data || []).filter((item) =>
      JSON.stringify(item).toLowerCase().includes(searchQuery),
    );
  }, [data, searchTerm]);

  // ==================== ROW RENDERING ====================
  /**
   * Attempts to match column headers to item properties.
   * Tries multiple naming conventions (camelCase, lowercase, etc.)
   * to handle inconsistent data structures.
   */
  const defaultRenderRow = (item) => {
    return columns.map((columnName) => {
      const cellValue = findMatchingProperty(item, columnName);
      return cellValue ?? "";
    });
  };

  /**
   * Searches for a property in the item that matches the column name.
   * Tries various naming conventions to be flexible.
   */
  const findMatchingProperty = (item, columnName) => {
    // Try different naming variations
    const namingVariations = generateNamingVariations(columnName);

    for (const propertyName of namingVariations) {
      if (propertyName in item) {
        return item[propertyName];
      }
    }

    // Fallback to common property names
    return item.name || item.title || item.username || "";
  };

  /**
   * Generates common naming convention variations for a column name.
   * Example: "Last Active" → ["Last Active", "last active", "LastActive", "lastActive"]
   */
  const generateNamingVariations = (columnName) => {
    return [
      columnName, // "Last Active"
      columnName.toLowerCase(), // "last active"
      columnName.replace(/\s+/g, ""), // "LastActive"
      columnName.replace(/\s+/g, "").toLowerCase(), // "lastactive"
      toCamelCase(columnName), // "lastActive"
    ];
  };

  /**
   * Converts a string to camelCase.
   * Example: "Last Active" → "lastActive"
   */
  const toCamelCase = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word, index) =>
        index === 0 ? word : word[0].toUpperCase() + word.slice(1),
      )
      .join("");
  };

  // ==================== RENDER HELPERS ====================
  const getRowKey = (item) => {
    return item._id || item.id || JSON.stringify(item).slice(0, 32);
  };

  const renderTableRow = (item) => {
    const cells = renderRow ? renderRow(item) : defaultRenderRow(item);

    return (
      <tr
        key={getRowKey(item)}
        className="hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
      >
        {/* Data Cells */}
        {cells.map((cell, index) => (
          <td
            key={index}
            className="px-6 py-4 text-sm text-gray-900 dark:text-white"
          >
            {cell ?? ""}
          </td>
        ))}

        {/* Action Buttons */}
        <td className="px-6 py-4 text-sm text-gray-500 dark:text-slate-400">
          <div className="flex space-x-2">{renderActionButtons(item)}</div>
        </td>
      </tr>
    );
  };

  const renderActionButtons = (item) => {
    const itemId = item._id || item.id;

    return (
      <>
        {/* View Button */}
        <NavLink to={`/${activeSection}/${itemId}`}>
          <button className="text-cyan-600 dark:text-cyan-400 hover:text-blue-800 dark:hover:text-blue-300">
            <LuEye className="w-4 h-4" />
          </button>
        </NavLink>

        {/* Edit Button */}
        <NavLink to={`/${activeSection}/${itemId}/edit`}>
          <button className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300">
            <LuPen className="w-4 h-4" />
          </button>
        </NavLink>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(itemId)}
          className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
        >
          <LuTrash2 className="w-4 h-4" />
        </button>
      </>
    );
  };

  // ==================== MAIN RENDER ====================
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-slate-400">
            Manage your {title.toLowerCase()}
          </p>
        </div>

        <NavLink to={`/${activeSection}/create`}>
          <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <LuPlus className="w-4 h-4" />
            <span>Add {title.slice(0, -1)}</span>
          </button>
        </NavLink>
      </div>

      {/* Search Bar */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-slate-500 w-4 h-4" />
          <input
            type="text"
            placeholder={`Search ${title.toLowerCase()}...`}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400"
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead className="bg-gray-50 dark:bg-slate-900">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider"
                  >
                    {column}
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
              {filteredData?.length ? (
                filteredData.map(renderTableRow)
              ) : (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="px-6 py-8 text-center text-sm text-gray-500 dark:text-slate-400"
                  >
                    No {title.toLowerCase()} found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
