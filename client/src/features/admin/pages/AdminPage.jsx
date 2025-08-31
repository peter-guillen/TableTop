import { AdminArticlePage } from "../../articles/admin/AdminArticlePage";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

const sectionClass = twMerge(
  classNames("border border-white p-4 m-2 rounded-lg")
);

export const AdminPage = () => {
  return (
    <>
      <div>
        <div>CRUD Content Operations - </div>
        <ul>
          <li className={sectionClass}>
            <div>Articles - </div>
            <div>
              <AdminArticlePage />
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
