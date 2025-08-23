import { useState } from "react";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("users");
  return (
    <div>
      AdminPage
      <div>Users - </div>
      <div>Analtyics - </div>
      <div>
        <div>CRUD Content Operations - </div>
        <ul>
          <li>Articles - </li>
          <li>Spells - </li>
          <li>Abilities - </li>
          <li>Skillls - </li>
          <li>Weapons - </li>
          <li>Armors - </li>
          <li>Items - </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;
