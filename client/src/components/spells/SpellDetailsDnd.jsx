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
  // console.log(currentSpell.damage.damage_at_slot_level);

  return (
    <div className="flex justify-center m-8">
      <div className="w-3/4 border bg-gray-200 dark:bg-gray-700 p-8 space-y-4">
        <h1 className="text-2xl">{currentSpell.name}</h1>
        <p className="">
          <strong>Description:</strong> {currentSpell.desc}
        </p>

        <p>
          <strong>Range:</strong> {currentSpell.range}
        </p>
        <p>
          <strong>Attack Type:</strong> {currentSpell.attack_type}
        </p>
        <p>
          <strong>Casting Time:</strong> {currentSpell.casting_time}
        </p>
        <p>
          <strong>Level:</strong> {currentSpell.level}
        </p>
        <p>
          <strong>School:</strong>
          {currentSpell.school ? currentSpell.school.name : "Loading"}
        </p>

        <p>
          <strong>Higher Level:</strong> {currentSpell.higher_level}
        </p>

        {currentSpell.damage?.damage_at_slot_level ? (
          <div>
            <strong>Damage:</strong>
            <ul>
              {Object.entries(currentSpell.damage.damage_at_slot_level).map(
                ([level, damage]) => (
                  <li key={level}>
                    Slot {level}: {damage}
                  </li>
                )
              )}
            </ul>
          </div>
        ) : (
          ""
        )}
        {currentSpell.heal_at_slot_level ? (
          <div>
            <strong>Heal:</strong>
            <ul>
              {Object.entries(currentSpell.heal_at_slot_level).map(
                ([level, heal]) => (
                  <li key={level}>
                    Slot {level}: {heal}
                  </li>
                )
              )}
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
