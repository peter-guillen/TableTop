import { useReducer } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

const attributeContainer = twMerge(classNames("flex flex-wrap gap-2"));
const attributeItem = twMerge(
  classNames(
    "flex00 col-span-2 row-span-2 w-1/6 px-4 py-2 border border-gray-300 rounded-lg flex-1 min-w-[30%] justify-around"
  )
);
const attributeInput = twMerge(
  classNames(
    "w-full h-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-black"
  )
);

interface ReducerProps {
  stats: { [key: string]: number };
  armorType: string | number;
  weaponType: string | number;
}

interface Action {
  type: string;
  payload: {
    value: string | number;
    stat?: string;
  };
}

// No reason for these other than error prevention and to identify an action
const UPDATE_STAT = "update_stat";
const ARMOR_SELECT = "armor_select";
const WEAPON_SELECT = "weapon_select";

const reducer = (state: ReducerProps, action: Action): ReducerProps => {
  let updatedStats;
  switch (action.type) {
    case UPDATE_STAT:
      return {
        ...state,
        stats: {
          ...state.stats,
          [action.payload.stat]: action.payload.value,
        },
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

export const Rules = (): JSX.Element => {
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

  const handleStatChange = (stat: string, value: number) => {
    dispatch({ type: UPDATE_STAT, payload: { stat, value } });
  };

  const handleArmorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch({ type: ARMOR_SELECT, payload: { value } });
  };

  const handleWeaponChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch({ type: WEAPON_SELECT, payload: { value } });
  };

  return (
    <div className="h-screen">
      <div className="container w-2/3 mx-auto px-4 grid grid-cols-4 gap-2 p-4">
        <div className="col-span-2 flex flex-wrap items-center justify-center gap-4">
          <div className={attributeItem}>
            <label>Strength: </label>
            <input
              type="number"
              value={state.stats.strength}
              onChange={(e) =>
                handleStatChange("strength", parseInt(e.target.value))
              }
              className={attributeInput}
              max={20}
              min={0}
            />
            <div>Modifier: {Math.floor((state.stats.strength - 10) / 2)}</div>
          </div>
          <div className={attributeItem}>
            <label>Dexterity: </label>
            <input
              type="number"
              value={state.stats.dexterity}
              onChange={(e) =>
                handleStatChange("dexterity", parseInt(e.target.value))
              }
              className={attributeInput}
              max={20}
              min={0}
            />
            <div>Modifier: {Math.floor((state.stats.dexterity - 10) / 2)}</div>
          </div>
          <div className={attributeItem}>
            <label>Constitution: </label>
            <input
              type="number"
              value={state.stats.constitution}
              onChange={(e) =>
                handleStatChange("constitution", parseInt(e.target.value))
              }
              className={attributeInput}
              max={20}
              min={0}
            />
            <div>
              Modifier: {Math.floor((state.stats.constitution - 10) / 2)}
            </div>
          </div>
          <div className={attributeItem}>
            <label>Intelligence: </label>
            <input
              type="number"
              value={state.stats.intelligence}
              onChange={(e) =>
                handleStatChange("intelligence", parseInt(e.target.value))
              }
              className={attributeInput}
              max={20}
              min={0}
            />
            <div>
              Modifier: {Math.floor((state.stats.intelligence - 10) / 2)}
            </div>
          </div>
          <div className={attributeItem}>
            <label>Wisdom: </label>
            <input
              type="number"
              value={state.stats.wisdom}
              onChange={(e) =>
                handleStatChange("wisdom", parseInt(e.target.value))
              }
              className={attributeInput}
              max={20}
              min={0}
            />
            <div>Modifier: {Math.floor((state.stats.wisdom - 10) / 2)}</div>
          </div>
          <div className={attributeItem}>
            <label>Charisma: </label>
            <input
              type="number"
              value={state.stats.charisma}
              onChange={(e) =>
                handleStatChange("charisma", parseInt(e.target.value))
              }
              className={attributeInput}
              max={20}
              min={0}
            />
            <div>Modifier: {Math.floor((state.stats.charisma - 10) / 2)}</div>
          </div>
        </div>
        <div className="col-span-2 border text-center">
          <div>Total Stats:</div>
          <div>Strength: {state.stats.strength || 0}</div>
          <div>Mod: {Math.floor((state.stats.strength - 10) / 2)}</div>
          <div>Dexterity: {state.stats.dexterity || 0}</div>
          <div>Constitution: {state.stats.constitution || 0}</div>
          <div>Intelligence: {state.stats.intelligence || 0}</div>
          <div>Wisdom: {state.stats.wisdom || 0}</div>
          <div>Charisma: {state.stats.charisma || 0}</div>
        </div>
        <div>
          <div>
            <div>
              <div>Shield: </div>
              <div>
                <input
                  type="radio"
                  id="shield"
                  name="armor"
                  value="shield"
                  onChange={handleArmorChange}
                />
                <label htmlFor="shield"> Shield</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="noshield"
                  name="armor"
                  value="noshield"
                  onChange={handleArmorChange}
                />
                <label htmlFor="noshield"> No Shield</label>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>Armor: </div>
          <div>
            <input
              type="radio"
              id="lightArmor"
              name="armor"
              value="lightArmor"
              onChange={handleArmorChange}
            />
            <label htmlFor="lightArmor"> Light</label>
          </div>
          <div>
            <input
              type="radio"
              id="mediumArmor"
              name="armor"
              value="mediumArmor"
              onChange={handleArmorChange}
            />
            <label htmlFor="mediumArmor"> Medium</label>
          </div>
          <div>
            <input
              type="radio"
              id="heavyArmor"
              name="armor"
              value="heavyArmor"
              onChange={handleArmorChange}
            />
            <label htmlFor="heavyArmor"> Heavy</label>
          </div>
        </div>
        <div>
          <div>Weapon: </div>
          <div>
            <input
              type="radio"
              id="claymore"
              name="weapon"
              value="claymore"
              onChange={handleWeaponChange}
            />
            <label htmlFor="claymore"> Claymore</label>
          </div>
          <div>
            <input
              type="radio"
              id="sword"
              name="weapon"
              value="sword"
              onChange={handleWeaponChange}
            />
            <label htmlFor="sword"> Sword</label>
          </div>
          <div>
            <input
              type="radio"
              id="dagger"
              name="weapon"
              value="dagger"
              onChange={handleWeaponChange}
            />
            <label htmlFor="dagger"> Dagger</label>
          </div>
          <div>
            <input
              type="radio"
              id="spear"
              name="weapon"
              value="spear"
              onChange={handleWeaponChange}
            />
            <label htmlFor="spear"> Spear</label>
          </div>
          <div>
            <input
              type="radio"
              id="staff"
              name="weapon"
              value="staff"
              onChange={handleWeaponChange}
            />
            <label htmlFor="staff"> Staff</label>
          </div>
        </div>
        {/* <div className="bg-yellow-300 col-span-2 flex items-center justify-center">
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
            consequuntur nulla voluptatem eius? Repellat quaerat qui commodi
            atque ipsa obcaecati? Totam maiores libero cum. Numquam possimus
            molestias quis quod, saepe exercitationem aut veritatis id enim
            accusantium ullam maxime, delectus mollitia autem. Quis, aliquid.
            Deserunt quos repellat nisi corrupti possimus facilis culpa
            explicabo omnis nulla.
          </div>
        </div> */}
      </div>
    </div>
  );
};
