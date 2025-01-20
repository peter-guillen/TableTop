import { useState, useEffect } from "react";

export const ArmorPage = () => {
  const [armorList, setArmorList] = useState([]);
  useEffect(() => {
    const fetchArmors = async () => {
      const categories = ["light-armor", "medium-armor", "heavy-armor"];
      const requests = categories.map((category) =>
        fetch(`https://www.dnd5eapi.co/api/equipment-categories/${category}`)
      );
      const responses = await Promise.all(requests);
      const data = await Promise.all(responses.map((res) => res.json()));
      const combinedArmorList = data.flatMap((category) => category.equipment);
      setArmorList(combinedArmorList);
    };
    fetchArmors();
  }, []);
  return (
    <div>
      {armorList &&
        armorList.map((armor) => <div key={armor.index}>{armor.name}</div>)}
    </div>
  );
};
