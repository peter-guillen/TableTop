import { useState } from "react";
import { AdminArticlePage } from "../../articles/pages/AdminArticlePage";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { AdminPanel } from "../../admin/components/AdminPanel";

export const AdminPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const sectionClass = twMerge(
    classNames("border border-white p-4 m-2 rounded-lg", { hidden: !isOpen })
  );
  return (
    <>
      <AdminPanel />
    </>
  );
};
