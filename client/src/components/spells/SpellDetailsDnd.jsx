import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const SpellDetailsDnd = () => {
  const [currentSpell, setCurrentSpell] = useState([]);
  const { id } = useParams();
  console.log(id);
  const fetchSpells = async () => {
    const response = await fetch(`https://www.dnd5eapi.co/api/spells/${id}`);
    const data = await response.json();
    setCurrentSpell(data);
  };
  useEffect(() => {
    fetchSpells();
  }, []);

  console.log(currentSpell);
  console.log(id);
  return <div>Hi</div>;
};
