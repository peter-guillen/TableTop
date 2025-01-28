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

  return (
    <div>
      <div>
        <h1>{currentSpell.name}</h1>
        <p>Description: {currentSpell.desc}</p>
      </div>
    </div>
  );
};
