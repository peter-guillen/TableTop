import React from "react";
import { NavLink } from "react-router-dom";
import { LuPlus, LuSearch, LuEye, LuPen, LuTrash2 } from "react-icons/lu";

interface AdminTableProps<T> {
  title: string;
  columns: string[];
  data: T[];
  activeSection: string;
  onDelete: (id: string) => void;
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  renderRow: (row: T) => React.ReactNode[];
  // False for sections with no view/edit/create pages (e.g. users)
  showPageLinks?: boolean;
  // A row that can't be deleted (e.g. your own account in the users table)
  lockedRowId?: string;
}

export function AdminTable<T extends { _id?: string; id?: string }>({
  title,
  columns = [],
  data = [],
  activeSection = "",
  onDelete,
  renderRow,
  searchTerm = "",
  onSearchChange = () => {},
  showPageLinks = true,
  lockedRowId,
}: AdminTableProps<T>) {
  // ==================== SEARCH FILTERING ====================
  const filteredData = React.useMemo(() => {
    if (!searchTerm) return data || [];

    const searchQuery = searchTerm.toLowerCase();
    return (data || []).filter((row) =>
      JSON.stringify(row).toLowerCase().includes(searchQuery),
    );
  }, [data, searchTerm]);

  // ==================== ROW RENDERING ====================
  /**
   * Attempts to match column headers to row properties.
   * Tries multiple naming conventions (camelCase, lowercase, etc.)
   * to handle inconsistent data structures.
   */
  const defaultRenderRow = (row: T) => {
    return columns.map((columnName) => {
      const cellValue = findMatchingProperty(row, columnName);
      return cellValue ?? "";
    });
  };

  /**
   * Searches for a property in the row that matches the column name.
   * Tries various naming conventions to be flexible.
   */
  const findMatchingProperty = (row: T, columnName: string) => {
    // Try different naming variations
    const namingVariations = generateNamingVariations(columnName);
    const rowRecord = row as Record<string, unknown>;
    for (const propertyName of namingVariations) {
      if (propertyName in rowRecord) {
        return rowRecord[propertyName];
      }
    }
    // Fallback to common property names
    return rowRecord.name ?? rowRecord.title ?? rowRecord.username ?? "";
  };

  /**
   * Generates common naming convention variations for a column name.
   * Example: "Last Active" → ["Last Active", "last active", "LastActive", "lastActive"]
   */
  const generateNamingVariations = (columnName: string) => {
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
  const toCamelCase = (str: string) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word, index) =>
        index === 0 ? word : word[0].toUpperCase() + word.slice(1),
      )
      .join("");
  };

  // ==================== RENDER HELPERS ====================
  const getRowKey = (row: T) => {
    return row._id || row.id || JSON.stringify(row).slice(0, 32);
  };

  const renderTableRow = (row: T) => {
    const cells = renderRow ? renderRow(row) : defaultRenderRow(row);

    return (
      <tr
        key={getRowKey(row)}
        className="hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
      >
        {/* Data Cells */}
        {cells.map((cell, index) => (
          <td
            key={index}
            className="px-4 lg:px-6 py-4 text-sm text-stone-900 dark:text-white"
          >
            {(cell as React.ReactNode) ?? ""}
          </td>
        ))}

        {/* Action Buttons */}
        <td className="px-4 lg:px-6 py-4 text-sm text-stone-500 dark:text-stone-400">
          <div className="flex space-x-2">{renderActionButtons(row)}</div>
        </td>
      </tr>
    );
  };

  const renderActionButtons = (row: T) => {
    const rowId = row._id || row.id;

    return (
      <>
        {showPageLinks && (
          <>
            {/* View Button */}
            <NavLink
              to={`/${activeSection}/${rowId}`}
              aria-label="View"
              className="p-1.5 rounded text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300"
            >
              <LuEye className="w-4 h-4" />
            </NavLink>

            {/* Edit Button */}
            <NavLink
              to={`/${activeSection}/${rowId}/edit`}
              aria-label="Edit"
              className="p-1.5 rounded text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300"
            >
              <LuPen className="w-4 h-4" />
            </NavLink>
          </>
        )}

        {/* Delete Button */}
        {rowId !== lockedRowId && (
          <button
            type="button"
            aria-label="Delete"
            onClick={() => rowId && onDelete(rowId)}
            className="p-1.5 rounded text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
          >
            <LuTrash2 className="w-4 h-4" />
          </button>
        )}
      </>
    );
  };

  // ==================== MAIN RENDER ====================
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white">
            {title}
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Manage your {title.toLowerCase()}
          </p>
        </div>

        {showPageLinks && (
          <NavLink
            to={`/${activeSection}/create`}
            className="w-full sm:w-auto justify-center bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <LuPlus className="w-4 h-4" />
            <span>Add {title.slice(0, -1)}</span>
          </NavLink>
        )}
      </div>

      {/* Search Bar */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 dark:text-stone-500 w-4 h-4" />
          <input
            type="text"
            placeholder={`Search ${title.toLowerCase()}...`}
            value={searchTerm}
            onChange={onSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-stone-300 dark:border-stone-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-stone-700 text-stone-900 dark:text-white placeholder-stone-500 dark:placeholder-stone-400"
          />
        </div>
      </div>

      {/* Mobile Cards - one card per row, first cell is the card title */}
      <div className="md:hidden space-y-3">
        {filteredData?.length ? (
          filteredData.map((row) => {
            const cells = renderRow ? renderRow(row) : defaultRenderRow(row);
            return (
              <div
                key={getRowKey(row)}
                className="bg-white dark:bg-stone-800 rounded-lg shadow-sm border border-stone-200 dark:border-stone-700 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="min-w-0 break-words font-semibold text-stone-900 dark:text-white">
                    {(cells[0] as React.ReactNode) ?? ""}
                  </p>
                  <div className="flex shrink-0 -mr-1.5 -mt-1.5">
                    {renderActionButtons(row)}
                  </div>
                </div>
                {cells.length > 1 && (
                  <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
                    {cells.slice(1).map((cell, index) => (
                      <React.Fragment key={index}>
                        <dt className="text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 pt-0.5">
                          {columns[index + 1]}
                        </dt>
                        <dd className="min-w-0 break-words text-stone-900 dark:text-white">
                          {(cell as React.ReactNode) ?? ""}
                        </dd>
                      </React.Fragment>
                    ))}
                  </dl>
                )}
              </div>
            );
          })
        ) : (
          <p className="bg-white dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700 px-4 py-8 text-center text-sm text-stone-500 dark:text-stone-400">
            No {title.toLowerCase()} found.
          </p>
        )}
      </div>

      {/* Data Table */}
      <div className="hidden md:block bg-white dark:bg-stone-800 rounded-lg shadow-sm border border-stone-200 dark:border-stone-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead className="bg-stone-50 dark:bg-stone-900">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider"
                  >
                    {column}
                  </th>
                ))}
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="bg-white dark:bg-stone-800 divide-y divide-stone-200 dark:divide-stone-700">
              {filteredData?.length ? (
                filteredData.map(renderTableRow)
              ) : (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="px-6 py-8 text-center text-sm text-stone-500 dark:text-stone-400"
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
