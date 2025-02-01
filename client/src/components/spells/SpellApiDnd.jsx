import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const SpellApiDnd = () => {
  const [spellDetails, setSpellDetails] = useState([]);
  const fetchSpells = async () => {
    const response = await fetch("https://www.dnd5eapi.co/api/spells");
    const data = await response.json();
    setSpellDetails(data.results);
  };
  useEffect(() => {
    fetchSpells();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-1/2">
        {spellDetails &&
          spellDetails.map((spell) => (
            <div
              key={spell.index}
              className="flex flex-row justify-between items-center text-white bg-gray-500 m-4 p-2 rounded-md"
            >
              <Link
                to={`/spells/dndSpell/${spell.index}`}
                className="flex flex-row"
              >
                <h2>{spell.name}</h2>
              </Link>
              <div className="flex flex-row items-center">
                <p>Level: {spell.level}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
