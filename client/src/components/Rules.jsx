import { useReducer } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

const attributeContainer = twMerge(classNames("flex "));

// No reason for these other than error prevention and to identify an action
const UPDATE_STAT = "update_stat";
const ARMOR_SELECT = "armor_select";
const WEAPON_SELECT = "weapon_select";

const reducer = (state, action) => {
  let updatedStats;
  console.log("STATE --- ", state);
  console.log("ACTION ---", action);
  switch (action.type) {
    case UPDATE_STAT:
      return {
        ...state,
        stats: { ...state.stats, [action.payload.stat]: action.payload.value },
      };

    case ARMOR_SELECT:
      updatedStats = { ...state.stats };
      // If the new armor is heavyArmor apply the dexterity penatly
      if (action.payload.value === "heavyArmor") {
        updatedStats.dexterity -= 3;
        // If the old armor is heavyArmor remove the dexterity penalty
      } else if (state.armorType === "heavyArmor") {
        updatedStats.dexterity += 3;
      }
      if (action.payload.value === "mediumArmor") {
        updatedStats.dexterity -= 1;
      } else if (state.armorType === "mediumArmor") {
        updatedStats.dexterity += 1;
      }
      return { ...state, armorType: action.payload.value, stats: updatedStats };

    case WEAPON_SELECT:
      updatedStats = { ...state.stats };
      if (action.payload.value === "claymore") {
        if (updatedStats.strength >= 12) {
          console.log("No penalty");
        } else {
          updatedStats.dexterity -= 1;
        }
      } else if (state.weaponType === "claymore" && state.stats.strength < 12) {
        updatedStats.dexterity += 1;
      }
      return {
        ...state,
        weaponType: action.payload.value,
        stats: updatedStats,
      };

    default:
      return state;
  }
};

export const Rules = () => {
  // This initialState is the data object for the dispatcher
  const initialState = {
    // This is setting one state for the initialState object the others added are the sattes to be changed
    armorType: "",
    weaponType: "",
    // This is the stats changing via the inputs
    stats: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    },
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleStatChange = (stat, value) => {
    dispatch({ type: UPDATE_STAT, payload: { stat, value } });
  };

  const handleArmorChange = (event) => {
    const { value } = event.target;
    dispatch({ type: ARMOR_SELECT, payload: { value } });
  };

  const handleWeaponChange = (event) => {
    const { value } = event.target;
    dispatch({ type: WEAPON_SELECT, payload: { value } });
  };

  return (
    <div className="container mx-auto px-4 grid grid-cols-4 gap-2 p-4 bg-gray-100">
      <div className="bg-blue-300 col-span-3 row-span-2 flex flex-wrap items-center justify-center">
        <div>
          <label>Strength: </label>
          <input
            type="number"
            value={state.stats.strength}
            onChange={(e) =>
              handleStatChange("strength", parseInt(e.target.value))
            }
          />
        </div>
        <div>
          <label>Dexterity: </label>
          <input
            type="number"
            value={state.stats.dexterity}
            onChange={(e) =>
              handleStatChange("dexterity", parseInt(e.target.value))
            }
          />
        </div>
        <div>
          <label>Constitution: </label>
          <input
            type="number"
            value={state.stats.constitution}
            onChange={(e) =>
              handleStatChange("constitution", parseInt(e.target.value))
            }
          />
        </div>
        <div>
          <label>Intelligence: </label>
          <input
            type="number"
            value={state.stats.intelligence}
            onChange={(e) =>
              handleStatChange("intelligence", parseInt(e.target.value))
            }
          />
        </div>
        <div>
          <label>Wisdom: </label>
          <input
            type="number"
            value={state.stats.wisdom}
            onChange={(e) =>
              handleStatChange("wisdom", parseInt(e.target.value))
            }
          />
        </div>
        <div>
          <label>Charisma: </label>
          <input
            type="number"
            value={state.stats.charisma}
            onChange={(e) =>
              handleStatChange("charisma", parseInt(e.target.value))
            }
          />
        </div>
      </div>
      <div className="bg-green-300 flex items-center justify-center">
        <div>Armor: </div>
        <div>
          <input
            type="radio"
            id="lightArmor"
            name="armor"
            value="lightArmor"
            onChange={handleArmorChange}
          />
          <label htmlFor="lightArmor">Light</label>
        </div>
        <div>
          <input
            type="radio"
            id="mediumArmor"
            name="armor"
            value="mediumArmor"
            onChange={handleArmorChange}
          />
          <label htmlFor="mediumArmor">Medium</label>
        </div>
        <div>
          <input
            type="radio"
            id="heavyArmor"
            name="armor"
            value="heavyArmor"
            onChange={handleArmorChange}
          />
          <label htmlFor="heavyArmor">Heavy</label>
        </div>
      </div>
      <div className="bg-red-300 flex items-center justify-center">
        <div>Weapon: </div>
        <div>
          <input
            type="radio"
            id="claymore"
            name="weapon"
            value="claymore"
            onChange={handleWeaponChange}
          />
          <label htmlFor="claymore">Claymore</label>
        </div>
        <div>
          <input
            type="radio"
            id="sword"
            name="weapon"
            value="sword"
            onChange={handleWeaponChange}
          />
          <label htmlFor="sword">Sword</label>
        </div>
        <div>
          <input
            type="radio"
            id="dagger"
            name="weapon"
            value="dagger"
            onChange={handleWeaponChange}
          />
          <label htmlFor="dagger">Dagger</label>
        </div>
      </div>
      <div className="bg-yellow-300 col-span-2 flex items-center justify-center">
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad at enim,
          possimus assumenda corporis laborum dicta nemo aliquid excepturi
          neque, autem magni porro consequatur officia incidunt facere ipsa
          similique a! Molestiae dolorem, officia nesciunt quia fugit illo
          saepe, dignissimos magnam dolores iure alias explicabo vitae tenetur
          vel? Deserunt explicabo voluptates voluptatibus, necessitatibus,
          adipisci in placeat, saepe molestiae amet ullam enim! Adipisci
          repudiandae odio facere veniam? Delectus velit accusamus architecto
          molestias fugit similique minima non eum, qui, voluptates eius?
          Tempora quibusdam esse nobis consequatur commodi sapiente nam rerum
          aliquam dignissimos deleniti?
        </div>
      </div>
      <div className="bg-purple-300 col-span-2 flex items-center justify-center">
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, a
          exercitationem vitae earum accusamus doloribus neque vel aperiam id
          consequatur dolorum ipsum eligendi sapiente deserunt sed recusandae,
          ut tempora iste! Beatae sint sed aliquid ad quisquam necessitatibus!
          Dolor dolore reprehenderit magnam vitae aspernatur alias nisi,
          consequuntur nulla voluptatem eius? Repellat quaerat qui commodi atque
          ipsa obcaecati? Totam maiores libero cum. Numquam possimus molestias
          quis quod, saepe exercitationem aut veritatis id enim accusantium
          ullam maxime, delectus mollitia autem. Quis, aliquid. Deserunt quos
          repellat nisi corrupti possimus facilis culpa explicabo omnis nulla.
        </div>
      </div>
    </div>
  );
};
