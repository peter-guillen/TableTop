import { useState } from "react";
import { AdminArticlePage } from "../../articles/pages/AdminArticlePage";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

export const AdminPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const sectionClass = twMerge(
    classNames("border border-white p-4 m-2 rounded-lg", { hidden: !isOpen })
  );
  return (
    <>
      <div>
        <div>CRUD Content Operations - </div>
        <ul>
          <li>
            <div
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              Articles
            </div>
            <div className={sectionClass}>
              <div>
                <AdminArticlePage />
              </div>
            </div>
          </li>
          <li>Spells - </li>
          <li>Abilities - </li>
          <li>Skillls - </li>
          <li>Weapons - </li>
          <li>Armors - </li>
          <li>Items - </li>
        </ul>
      </div>
    </>
  );
};
