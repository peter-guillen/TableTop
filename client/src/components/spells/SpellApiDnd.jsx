import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export const SpellApiDnd = () => {
  const [spellDetails, setSpellDetails] = useState([]);
  const { id } = useParams();
  const fetchSpells = async () => {
    const response = await fetch("https://www.dnd5eapi.co/api/spells");
    const data = await response.json();
    setSpellDetails(data.results);
  };
  useEffect(() => {
    fetchSpells();
  }, []);
  // console.log(spellDetails.map((spell) => spell.index));
  return (
    <div>
      <div>
        {spellDetails &&
          spellDetails.map((spell) => (
            <div
              key={spell.index}
              className="flex flex-row justify-between items-center text-white bg-gray-500 m-4 p-2 rounded-md"
            >
              <Link
                onClick={() => console.log(spell.index)}
                to={`/spells/${spell.index}`}
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
