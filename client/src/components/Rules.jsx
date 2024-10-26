import { useReducer } from "react";

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

const Rules = () => {
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
    <div>
      <div>Stats</div>
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
          onChange={(e) => handleStatChange("wisdom", parseInt(e.target.value))}
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

      <div>
        <div>Armor</div>
        <div>
          <input
            type="radio"
            id="lightArmor"
            name="armor"
            value="lightArmor"
            onChange={handleArmorChange}
          />
          <label htmlFor="lightArmor">Light Armor:</label>
        </div>
        <div>
          <input
            type="radio"
            id="mediumArmor"
            name="armor"
            value="mediumArmor"
            onChange={handleArmorChange}
          />
          <label htmlFor="mediumArmor">Medium Armor:</label>
        </div>
        <div>
          <input
            type="radio"
            id="heavyArmor"
            name="armor"
            value="heavyArmor"
            onChange={handleArmorChange}
          />
          <label htmlFor="heavyArmor">Heavy Armor:</label>
        </div>
      </div>
      <div>
        <div>Weapon</div>
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
    </div>
  );
};

export default Rules;
