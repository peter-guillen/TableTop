import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const SpellDetailsDnd = () => {
  const [currentSpell, setCurrentSpell] = useState([]);
  const { index } = useParams();
  const fetchSpells = async () => {
    const response = await fetch(`https://www.dnd5eapi.co/api/spells/${index}`);
    const data = await response.json();
    setCurrentSpell(data);
  };
  useEffect(() => {
    fetchSpells();
  }, [index]);

  if (!currentSpell) return <div>Loading...</div>;

  console.log(currentSpell);

  return (
    <div className="flex justify-center m-8">
      <div className="w-3/4 border bg-gray-200 dark:bg-gray-700 p-8 space-y-4">
        <h1 className="text-2xl">{currentSpell.name}</h1>
        <p className="">
          <strong>Description:</strong> {currentSpell.desc}
        </p>
        <p>
          <strong>Higher Level:</strong> {currentSpell.higher_level}
        </p>
        <p>
          <strong>range</strong> {currentSpell.range}
        </p>
      </div>
    </div>
  );
};
