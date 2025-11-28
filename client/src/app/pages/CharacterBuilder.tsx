// import { useReducer } from "react";
// import classNames from "classnames";
// import { twMerge } from "tailwind-merge";

// const attributeContainer = twMerge(classNames("flex flex-wrap gap-2"));
// const attributeItem = twMerge(
//   classNames(
//     "flex00 col-span-2 row-span-2 w-1/6 px-4 py-2 border border-gray-300 rounded-lg flex-1 min-w-[30%] justify-around"
//   )
// );
// const attributeInput = twMerge(
//   classNames(
//     "w-full h-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:text-black"
//   )
// );

// interface ReducerProps {
//   stats: { [key: string]: number };
//   armorType: string | number;
//   weaponType: string | number;
// }

// interface Action {
//   type: string;
//   payload: {
//     value: string | number;
//     stat?: string;
//   };
// }

// // No reason for these other than error prevention and to identify an action
// const UPDATE_STAT = "update_stat";
// const ARMOR_SELECT = "armor_select";
// const WEAPON_SELECT = "weapon_select";

// const reducer = (state: ReducerProps, action: Action): ReducerProps => {
//   let updatedStats;
//   switch (action.type) {
//     case UPDATE_STAT:
//       return {
//         ...state,
//         stats: {
//           ...state.stats,
//           [action.payload.stat]: action.payload.value,
//         },
//       };

//     case ARMOR_SELECT:
//       updatedStats = { ...state.stats };
//       // If the new armor is heavyArmor apply the dexterity penatly
//       if (action.payload.value === "heavyArmor") {
//         updatedStats.dexterity -= 3;
//         // If the old armor is heavyArmor remove the dexterity penalty
//       } else if (state.armorType === "heavyArmor") {
//         updatedStats.dexterity += 3;
//       }
//       if (action.payload.value === "mediumArmor") {
//         updatedStats.dexterity -= 1;
//       } else if (state.armorType === "mediumArmor") {
//         updatedStats.dexterity += 1;
//       }
//       return { ...state, armorType: action.payload.value, stats: updatedStats };

//     case WEAPON_SELECT:
//       updatedStats = { ...state.stats };
//       if (action.payload.value === "claymore") {
//         if (updatedStats.strength >= 12) {
//         } else {
//           updatedStats.dexterity -= 1;
//         }
//       } else if (state.weaponType === "claymore" && state.stats.strength < 12) {
//         updatedStats.dexterity += 1;
//       }
//       return {
//         ...state,
//         weaponType: action.payload.value,
//         stats: updatedStats,
//       };

//     default:
//       return state;
//   }
// };

// export const Rules = (): JSX.Element => {
//   // This initialState is the data object for the dispatcher
//   const initialState = {
//     // This is setting one state for the initialState object the others added are the sattes to be changed
//     armorType: "",
//     weaponType: "",
//     // This is the stats changing via the inputs
//     stats: {
//       strength: 10,
//       dexterity: 10,
//       constitution: 10,
//       intelligence: 10,
//       wisdom: 10,
//       charisma: 10,
//     },
//   };

//   const [state, dispatch] = useReducer(reducer, initialState);

//   const handleStatChange = (stat: string, value: number) => {
//     dispatch({ type: UPDATE_STAT, payload: { stat, value } });
//   };

//   const handleArmorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { value } = event.target;
//     dispatch({ type: ARMOR_SELECT, payload: { value } });
//   };

//   const handleWeaponChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { value } = event.target;
//     dispatch({ type: WEAPON_SELECT, payload: { value } });
//   };

//   return (
//     <div className="h-screen">
//       <div className="container w-2/3 mx-auto px-4 grid grid-cols-4 gap-2 p-4">
//         <div className="col-span-2 flex flex-wrap items-center justify-center gap-4">
//           <div className={attributeItem}>
//             <label>Strength: </label>
//             <input
//               type="number"
//               value={state.stats.strength}
//               onChange={(e) =>
//                 handleStatChange("strength", parseInt(e.target.value))
//               }
//               className={attributeInput}
//               max={20}
//               min={0}
//             />
//             <div>Modifier: {Math.floor((state.stats.strength - 10) / 2)}</div>
//           </div>
//           <div className={attributeItem}>
//             <label>Dexterity: </label>
//             <input
//               type="number"
//               value={state.stats.dexterity}
//               onChange={(e) =>
//                 handleStatChange("dexterity", parseInt(e.target.value))
//               }
//               className={attributeInput}
//               max={20}
//               min={0}
//             />
//             <div>Modifier: {Math.floor((state.stats.dexterity - 10) / 2)}</div>
//           </div>
//           <div className={attributeItem}>
//             <label>Constitution: </label>
//             <input
//               type="number"
//               value={state.stats.constitution}
//               onChange={(e) =>
//                 handleStatChange("constitution", parseInt(e.target.value))
//               }
//               className={attributeInput}
//               max={20}
//               min={0}
//             />
//             <div>
//               Modifier: {Math.floor((state.stats.constitution - 10) / 2)}
//             </div>
//           </div>
//           <div className={attributeItem}>
//             <label>Intelligence: </label>
//             <input
//               type="number"
//               value={state.stats.intelligence}
//               onChange={(e) =>
//                 handleStatChange("intelligence", parseInt(e.target.value))
//               }
//               className={attributeInput}
//               max={20}
//               min={0}
//             />
//             <div>
//               Modifier: {Math.floor((state.stats.intelligence - 10) / 2)}
//             </div>
//           </div>
//           <div className={attributeItem}>
//             <label>Wisdom: </label>
//             <input
//               type="number"
//               value={state.stats.wisdom}
//               onChange={(e) =>
//                 handleStatChange("wisdom", parseInt(e.target.value))
//               }
//               className={attributeInput}
//               max={20}
//               min={0}
//             />
//             <div>Modifier: {Math.floor((state.stats.wisdom - 10) / 2)}</div>
//           </div>
//           <div className={attributeItem}>
//             <label>Charisma: </label>
//             <input
//               type="number"
//               value={state.stats.charisma}
//               onChange={(e) =>
//                 handleStatChange("charisma", parseInt(e.target.value))
//               }
//               className={attributeInput}
//               max={20}
//               min={0}
//             />
//             <div>Modifier: {Math.floor((state.stats.charisma - 10) / 2)}</div>
//           </div>
//         </div>
//         <div className="col-span-2 border text-center">
//           <div>Total Stats:</div>
//           <div>Strength: {state.stats.strength || 0}</div>
//           <div>Mod: {Math.floor((state.stats.strength - 10) / 2)}</div>
//           <div>Dexterity: {state.stats.dexterity || 0}</div>
//           <div>Constitution: {state.stats.constitution || 0}</div>
//           <div>Intelligence: {state.stats.intelligence || 0}</div>
//           <div>Wisdom: {state.stats.wisdom || 0}</div>
//           <div>Charisma: {state.stats.charisma || 0}</div>
//         </div>
//         <div>
//           <div>
//             <div>
//               <div>Shield: </div>
//               <div>
//                 <input
//                   type="radio"
//                   id="shield"
//                   name="armor"
//                   value="shield"
//                   onChange={handleArmorChange}
//                 />
//                 <label htmlFor="shield"> Shield</label>
//               </div>
//               <div>
//                 <input
//                   type="radio"
//                   id="noshield"
//                   name="armor"
//                   value="noshield"
//                   onChange={handleArmorChange}
//                 />
//                 <label htmlFor="noshield"> No Shield</label>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div>
//           <div>Armor: </div>
//           <div>
//             <input
//               type="radio"
//               id="lightArmor"
//               name="armor"
//               value="lightArmor"
//               onChange={handleArmorChange}
//             />
//             <label htmlFor="lightArmor"> Light</label>
//           </div>
//           <div>
//             <input
//               type="radio"
//               id="mediumArmor"
//               name="armor"
//               value="mediumArmor"
//               onChange={handleArmorChange}
//             />
//             <label htmlFor="mediumArmor"> Medium</label>
//           </div>
//           <div>
//             <input
//               type="radio"
//               id="heavyArmor"
//               name="armor"
//               value="heavyArmor"
//               onChange={handleArmorChange}
//             />
//             <label htmlFor="heavyArmor"> Heavy</label>
//           </div>
//         </div>
//         <div>
//           <div>Weapon: </div>
//           <div>
//             <input
//               type="radio"
//               id="claymore"
//               name="weapon"
//               value="claymore"
//               onChange={handleWeaponChange}
//             />
//             <label htmlFor="claymore"> Claymore</label>
//           </div>
//           <div>
//             <input
//               type="radio"
//               id="sword"
//               name="weapon"
//               value="sword"
//               onChange={handleWeaponChange}
//             />
//             <label htmlFor="sword"> Sword</label>
//           </div>
//           <div>
//             <input
//               type="radio"
//               id="dagger"
//               name="weapon"
//               value="dagger"
//               onChange={handleWeaponChange}
//             />
//             <label htmlFor="dagger"> Dagger</label>
//           </div>
//           <div>
//             <input
//               type="radio"
//               id="spear"
//               name="weapon"
//               value="spear"
//               onChange={handleWeaponChange}
//             />
//             <label htmlFor="spear"> Spear</label>
//           </div>
//           <div>
//             <input
//               type="radio"
//               id="staff"
//               name="weapon"
//               value="staff"
//               onChange={handleWeaponChange}
//             />
//             <label htmlFor="staff"> Staff</label>
//           </div>
//         </div>
//         {/* <div className="bg-yellow-300 col-span-2 flex items-center justify-center">
//           <div>
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad at enim,
//             possimus assumenda corporis laborum dicta nemo aliquid excepturi
//             neque, autem magni porro consequatur officia incidunt facere ipsa
//             similique a! Molestiae dolorem, officia nesciunt quia fugit illo
//             saepe, dignissimos magnam dolores iure alias explicabo vitae tenetur
//             vel? Deserunt explicabo voluptates voluptatibus, necessitatibus,
//             adipisci in placeat, saepe molestiae amet ullam enim! Adipisci
//             repudiandae odio facere veniam? Delectus velit accusamus architecto
//             molestias fugit similique minima non eum, qui, voluptates eius?
//             Tempora quibusdam esse nobis consequatur commodi sapiente nam rerum
//             aliquam dignissimos deleniti?
//           </div>
//         </div>
//         <div className="bg-red-300 col-span-2 flex items-center justify-center">
//           <div>
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, a
//             exercitationem vitae earum accusamus doloribus neque vel aperiam id
//             consequatur dolorum ipsum eligendi sapiente deserunt sed recusandae,
//             ut tempora iste! Beatae sint sed aliquid ad quisquam necessitatibus!
//             Dolor dolore reprehenderit magnam vitae aspernatur alias nisi,
//             consequuntur nulla voluptatem eius? Repellat quaerat qui commodi
//             atque ipsa obcaecati? Totam maiores libero cum. Numquam possimus
//             molestias quis quod, saepe exercitationem aut veritatis id enim
//             accusantium ullam maxime, delectus mollitia autem. Quis, aliquid.
//             Deserunt quos repellat nisi corrupti possimus facilis culpa
//             explicabo omnis nulla.
//           </div>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// -------------------------------------------- VERSION 2 ------------------------------------------------
// -------------------------------------------- VERSION 2 ------------------------------------------------
// -------------------------------------------- VERSION 2 ------------------------------------------------
// -------------------------------------------- VERSION 2 ------------------------------------------------
// -------------------------------------------- VERSION 2 ------------------------------------------------

// import { useReducer } from "react";
// import { LuShield, LuSword, LuZap } from "react-icons/lu";

// interface ReducerProps {
//   stats: { [key: string]: number };
//   armorType: string | number;
//   weaponType: string | number;
// }

// interface Action {
//   type: string;
//   payload: {
//     value: string | number;
//     stat?: string;
//   };
// }

// // No reason for these other than error prevention and to identify an action
// const UPDATE_STAT = "update_stat";
// const ARMOR_SELECT = "armor_select";
// const WEAPON_SELECT = "weapon_select";

// const reducer = (state: ReducerProps, action: Action): ReducerProps => {
//   let updatedStats;
//   switch (action.type) {
//     case UPDATE_STAT:
//       return {
//         ...state,
//         stats: {
//           ...state.stats,
//           [action.payload.stat]: action.payload.value,
//         },
//       };

//     case ARMOR_SELECT:
//       updatedStats = { ...state.stats };
//       // If the new armor is heavyArmor apply the dexterity penatly
//       if (action.payload.value === "heavyArmor") {
//         updatedStats.dexterity -= 3;
//         // If the old armor is heavyArmor remove the dexterity penalty
//       } else if (state.armorType === "heavyArmor") {
//         updatedStats.dexterity += 3;
//       }
//       if (action.payload.value === "mediumArmor") {
//         updatedStats.dexterity -= 1;
//       } else if (state.armorType === "mediumArmor") {
//         updatedStats.dexterity += 1;
//       }
//       return { ...state, armorType: action.payload.value, stats: updatedStats };

//     case WEAPON_SELECT:
//       updatedStats = { ...state.stats };
//       if (action.payload.value === "claymore") {
//         if (updatedStats.strength >= 12) {
//         } else {
//           updatedStats.dexterity -= 1;
//         }
//       } else if (state.weaponType === "claymore" && state.stats.strength < 12) {
//         updatedStats.dexterity += 1;
//       }
//       return {
//         ...state,
//         weaponType: action.payload.value,
//         stats: updatedStats,
//       };

//     default:
//       return state;
//   }
// };

// export const Rules = () => {
//   // This initialState is the data object for the dispatcher
//   const initialState = {
//     // This is setting one state for the initialState object the others added are the sattes to be changed
//     armorType: "",
//     weaponType: "",
//     // This is the stats changing via the inputs
//     stats: {
//       strength: 10,
//       dexterity: 10,
//       constitution: 10,
//       intelligence: 10,
//       wisdom: 10,
//       charisma: 10,
//     },
//   };

//   const [state, dispatch] = useReducer(reducer, initialState);

//   const handleStatChange = (stat: string, value: number) => {
//     dispatch({ type: UPDATE_STAT, payload: { stat, value } });
//   };

//   const handleArmorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { value } = event.target;
//     dispatch({ type: ARMOR_SELECT, payload: { value } });
//   };

//   const handleWeaponChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { value } = event.target;
//     dispatch({ type: WEAPON_SELECT, payload: { value } });
//   };

//   const stats = [
//     { name: "strength", label: "Strength" },
//     { name: "dexterity", label: "Dexterity" },
//     { name: "constitution", label: "Constitution" },
//     { name: "intelligence", label: "Intelligence" },
//     { name: "wisdom", label: "Wisdom" },
//     { name: "charisma", label: "Charisma" },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950 to-slate-900 dark:from-slate-950 dark:via-cyan-950 dark:to-slate-950 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8 text-center">
//           <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-cyan-400 to-red-500 dark:from-red-300 dark:via-cyan-300 dark:to-red-400 mb-2">
//             Character Stats
//           </h1>
//           <p className="text-slate-400 dark:text-slate-500">
//             Configure your character's abilities
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Stats Section */}
//           <div className="lg:col-span-2">
//             <div className="bg-slate-900/70 dark:bg-slate-950/70 backdrop-blur-md rounded-2xl border border-red-500/30 dark:border-orange-500/30 shadow-2xl p-6">
//               <h2 className="text-2xl font-bold text-red-300 dark:text-cyan-300 mb-6 flex items-center gap-2">
//                 <LuZap size={24} />
//                 Ability Scores
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {stats.map(({ name, label }) => (
//                   <div
//                     key={name}
//                     className="bg-slate-800/50 dark:bg-slate-900/50 p-6 rounded-xl border border-red-500/20 dark:border-orange-500/20"
//                   >
//                     <div className="flex justify-between items-center mb-3">
//                       <label className="text-lg font-medium text-slate-200">
//                         {label}
//                       </label>
//                       <span className="text-3xl font-bold text-red-400 dark:text-cyan-400">
//                         {state.stats[name]}
//                       </span>
//                     </div>

//                     {/* Stat Input */}
//                     <input
//                       type="number"
//                       value={state.stats[name]}
//                       onChange={(e) =>
//                         handleStatChange(name, parseInt(e.target.value) || 0)
//                       }
//                       className="w-full px-4 py-3 bg-slate-700/50 dark:bg-slate-800/50 border border-red-500/30 dark:border-orange-500/30 rounded-lg text-white text-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-cyan-500 focus:border-transparent transition-all mb-3"
//                       max={20}
//                       min={0}
//                     />

//                     {/* Modifier Display */}
//                     <div className="flex items-center justify-center gap-2 bg-red-600/20 dark:bg-cyan-600/20 border border-red-500/40 dark:border-orange-500/40 rounded-lg py-2">
//                       <span className="text-sm text-slate-300">Modifier:</span>
//                       <span className="text-xl font-bold text-red-300 dark:text-cyan-300">
//                         {Math.floor((state.stats[name] - 10) / 2) >= 0
//                           ? "+"
//                           : ""}
//                         {Math.floor((state.stats[name] - 10) / 2)}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Summary & Equipment Section */}
//           <div className="space-y-6">
//             {/* Stats Summary */}
//             <div className="bg-slate-900/70 dark:bg-slate-950/70 backdrop-blur-md rounded-2xl border border-red-500/30 dark:border-orange-500/30 shadow-2xl p-6">
//               <h2 className="text-xl font-bold text-red-300 dark:text-cyan-300 mb-4">
//                 Summary
//               </h2>
//               <div className="space-y-3">
//                 {stats.map(({ name, label }) => (
//                   <div
//                     key={name}
//                     className="flex justify-between items-center text-slate-300"
//                   >
//                     <span>{label}:</span>
//                     <div className="flex items-center gap-3">
//                       <span className="font-bold text-white">
//                         {state.stats[name]}
//                       </span>
//                       <span className="text-sm text-red-400 dark:text-cyan-400">
//                         (
//                         {Math.floor((state.stats[name] - 10) / 2) >= 0
//                           ? "+"
//                           : ""}
//                         {Math.floor((state.stats[name] - 10) / 2)})
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Armor Section */}
//             <div className="bg-slate-900/70 dark:bg-slate-950/70 backdrop-blur-md rounded-2xl border border-red-500/30 dark:border-orange-500/30 shadow-2xl p-6">
//               <h2 className="text-xl font-bold text-red-300 dark:text-cyan-300 mb-4 flex items-center gap-2">
//                 <LuShield size={20} />
//                 Armor
//               </h2>
//               <div className="space-y-3">
//                 {[
//                   {
//                     id: "lightArmor",
//                     value: "lightArmor",
//                     label: "Light Armor",
//                   },
//                   {
//                     id: "mediumArmor",
//                     value: "mediumArmor",
//                     label: "Medium Armor",
//                   },
//                   {
//                     id: "heavyArmor",
//                     value: "heavyArmor",
//                     label: "Heavy Armor",
//                   },
//                   { id: "shield", value: "shield", label: "LuShield" },
//                   { id: "noshield", value: "noshield", label: "No Shield" },
//                 ].map(({ id, value, label }) => (
//                   <label
//                     key={id}
//                     className="flex items-center gap-3 p-3 bg-slate-800/30 dark:bg-slate-900/30 rounded-lg border border-red-500/20 dark:border-orange-500/20 hover:border-red-500/40 dark:hover:border-orange-500/40 cursor-pointer transition-all"
//                   >
//                     <input
//                       type="radio"
//                       id={id}
//                       name="armor"
//                       value={value}
//                       checked={state.armorType === value}
//                       onChange={handleArmorChange}
//                       className="w-4 h-4 text-red-500 dark:text-cyan-500 focus:ring-2 focus:ring-red-500 dark:focus:ring-cyan-500"
//                     />
//                     <span className="text-slate-300">{label}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Weapon Section */}
//             <div className="bg-slate-900/70 dark:bg-slate-950/70 backdrop-blur-md rounded-2xl border border-red-500/30 dark:border-orange-500/30 shadow-2xl p-6">
//               <h2 className="text-xl font-bold text-red-300 dark:text-cyan-300 mb-4 flex items-center gap-2">
//                 <LuSword size={20} />
//                 Weapon
//               </h2>
//               <div className="space-y-3">
//                 {[
//                   { id: "claymore", value: "claymore", label: "Claymore" },
//                   { id: "sword", value: "sword", label: "Sword" },
//                   { id: "dagger", value: "dagger", label: "Dagger" },
//                   { id: "spear", value: "spear", label: "Spear" },
//                   { id: "staff", value: "staff", label: "Staff" },
//                 ].map(({ id, value, label }) => (
//                   <label
//                     key={id}
//                     className="flex items-center gap-3 p-3 bg-slate-800/30 dark:bg-slate-900/30 rounded-lg border border-red-500/20 dark:border-orange-500/20 hover:border-red-500/40 dark:hover:border-orange-500/40 cursor-pointer transition-all"
//                   >
//                     <input
//                       type="radio"
//                       id={id}
//                       name="weapon"
//                       value={value}
//                       checked={state.weaponType === value}
//                       onChange={handleWeaponChange}
//                       className="w-4 h-4 text-red-500 dark:text-cyan-500 focus:ring-2 focus:ring-red-500 dark:focus:ring-cyan-500"
//                     />
//                     <span className="text-slate-300">{label}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// -------------------------------------------- VERSION 3 ------------------------------------------------
// -------------------------------------------- VERSION 3 ------------------------------------------------
// -------------------------------------------- VERSION 3 ------------------------------------------------
// -------------------------------------------- VERSION 3 ------------------------------------------------
// -------------------------------------------- VERSION 3 ------------------------------------------------

import { useReducer, useState } from "react";
import { LuShield, LuSword, LuZap, LuWand } from "react-icons/lu";

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

export function CharacterBuilder() {
  const initialState = {
    armorType: "",
    weaponType: "",
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
  const [weaponFilter, setWeaponFilter] = useState("all");
  const [armorFilter, setArmorFilter] = useState("all");

  const handleStatChange = (stat: string, value: number) => {
    dispatch({ type: UPDATE_STAT, payload: { stat, value } });
  };

  const handleArmorChange = (value: string) => {
    dispatch({ type: ARMOR_SELECT, payload: { value } });
  };

  const handleWeaponChange = (value: string) => {
    dispatch({ type: WEAPON_SELECT, payload: { value } });
  };

  const stats = [
    { name: "strength", label: "Strength" },
    { name: "dexterity", label: "Dexterity" },
    { name: "constitution", label: "Constitution" },
    { name: "intelligence", label: "Intelligence" },
    { name: "wisdom", label: "Wisdom" },
    { name: "charisma", label: "Charisma" },
  ];

  const weaponCategories = [
    { id: "all", label: "All Weapons" },
    { id: "oneHanded", label: "One-Handed" },
    { id: "twoHanded", label: "Two-Handed" },
    { id: "polearms", label: "Polearms" },
    { id: "ranged", label: "Ranged" },
  ];

  const weapons = {
    oneHanded: [
      { id: "sword", label: "Sword", damage: "1d8" },
      { id: "dagger", label: "Dagger", damage: "1d4" },
      { id: "mace", label: "Mace", damage: "1d6" },
      { id: "axe", label: "Axe", damage: "1d6" },
    ],
    twoHanded: [
      { id: "claymore", label: "Claymore", damage: "2d6" },
      { id: "greatsword", label: "Greatsword", damage: "2d6" },
      { id: "greataxe", label: "Greataxe", damage: "1d12" },
    ],
    polearms: [
      { id: "spear", label: "Spear", damage: "1d6" },
      { id: "halberd", label: "Halberd", damage: "1d10" },
      { id: "pike", label: "Pike", damage: "1d10" },
    ],
    ranged: [
      { id: "shortbow", label: "Shortbow", damage: "1d6" },
      { id: "longbow", label: "Longbow", damage: "1d8" },
      { id: "crossbow", label: "Crossbow", damage: "1d10" },
    ],
  };

  const armorCategories = [
    { id: "all", label: "All Armor" },
    { id: "light", label: "Light" },
    { id: "medium", label: "Medium" },
    { id: "heavy", label: "Heavy" },
    { id: "shields", label: "Lus" },
  ];

  const armors = {
    light: [
      { id: "leather", label: "Leather Armor", ac: "11" },
      { id: "studded", label: "Studded Leather", ac: "12" },
      { id: "padded", label: "Padded Armor", ac: "11" },
    ],
    medium: [
      { id: "hide", label: "Hide Armor", ac: "12" },
      { id: "chainShirt", label: "Chain Shirt", ac: "13" },
      { id: "scaleMail", label: "Scale Mail", ac: "14" },
    ],
    heavy: [
      { id: "chainMail", label: "Chain Mail", ac: "16" },
      { id: "plateMail", label: "Plate Mail", ac: "18" },
      { id: "splint", label: "Splint Armor", ac: "17" },
    ],
    shields: [
      { id: "buckler", label: "Buckler", ac: "+1" },
      { id: "shield", label: "Shield", ac: "+2" },
      { id: "towerShield", label: "Tower Shield", ac: "+3" },
    ],
  };

  const getFilteredWeapons = () => {
    if (weaponFilter === "all") {
      return Object.values(weapons).flat();
    }
    return weapons[weaponFilter] || [];
  };

  const getFilteredArmors = () => {
    if (armorFilter === "all") {
      return Object.values(armors).flat();
    }
    return armors[armorFilter] || [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 dark:from-slate-950 dark:via-cyan-950 dark:to-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-400 to-orange-500 dark:from-cyan-300 dark:via-cyan-300 dark:to-orange-400 mb-2">
            Character Configuration
          </h1>
          <p className="text-slate-400 dark:text-slate-500">
            Build your perfect adventurer
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stats Section */}
            <div className="bg-slate-900/70 dark:bg-slate-950/70 backdrop-blur-md rounded-2xl border border-orange-500/30 dark:border-orange-500/30 shadow-2xl p-6">
              <h2 className="text-2xl font-bold text-cyan-300 dark:text-cyan-300 mb-6 flex items-center gap-2">
                <LuZap size={24} />
                Ability Scores
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map(({ name, label }) => (
                  <div
                    key={name}
                    className="bg-slate-800/50 dark:bg-slate-900/50 p-6 rounded-xl border border-orange-500/20 dark:border-orange-500/20"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-lg font-medium text-slate-200">
                        {label}
                      </label>
                      <span className="text-3xl font-bold text-cyan-400 dark:text-cyan-400">
                        {state.stats[name]}
                      </span>
                    </div>

                    <input
                      type="number"
                      value={state.stats[name]}
                      onChange={(e) =>
                        handleStatChange(name, parseInt(e.target.value) || 0)
                      }
                      className="w-full px-4 py-3 bg-slate-700/50 dark:bg-slate-800/50 border border-orange-500/30 dark:border-orange-500/30 rounded-lg text-white text-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-500 focus:border-transparent transition-all mb-3"
                      max={20}
                      min={0}
                    />

                    <div className="flex items-center justify-center gap-2 bg-cyan-600/20 dark:bg-cyan-600/20 border border-orange-500/40 dark:border-orange-500/40 rounded-lg py-2">
                      <span className="text-sm text-slate-300">Modifier:</span>
                      <span className="text-xl font-bold text-cyan-300 dark:text-cyan-300">
                        {Math.floor((state.stats[name] - 10) / 2) >= 0
                          ? "+"
                          : ""}
                        {Math.floor((state.stats[name] - 10) / 2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weapons Section */}
            <div className="bg-slate-900/70 dark:bg-slate-950/70 backdrop-blur-md rounded-2xl border border-orange-500/30 dark:border-orange-500/30 shadow-2xl p-6">
              <h2 className="text-2xl font-bold text-cyan-300 dark:text-cyan-300 mb-6 flex items-center gap-2">
                <LuSword size={24} />
                Weapons
              </h2>

              {/* Weapon Filter */}
              <div className="mb-6">
                <p className="text-sm text-slate-400 mb-3">
                  Filter by Category
                </p>
                <div className="flex flex-wrap gap-2">
                  {weaponCategories.map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => setWeaponFilter(id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        weaponFilter === id
                          ? "bg-gradient-to-r from-cyan-600 to-orange-600 dark:from-cyan-500 dark:to-orange-500 text-white"
                          : "bg-slate-800/50 dark:bg-slate-900/50 text-slate-400 hover:text-white hover:bg-slate-800 dark:hover:bg-slate-900"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weapon Selection Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {getFilteredWeapons().map((weapon) => (
                  <button
                    key={weapon.id}
                    onClick={() => handleWeaponChange(weapon.id)}
                    className={`p-4 rounded-lg border transition-all text-left ${
                      state.weaponType === weapon.id
                        ? "bg-cyan-600/30 dark:bg-cyan-600/30 border-orange-500 dark:border-orange-500"
                        : "bg-slate-800/30 dark:bg-slate-900/30 border-orange-500/20 dark:border-orange-500/20 hover:border-orange-500/40 dark:hover:border-orange-500/40"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-slate-200 font-medium">
                        {weapon.label}
                      </span>
                      <span className="text-cyan-400 dark:text-cyan-400 text-sm">
                        {weapon.damage}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Armor Section */}
            <div className="bg-slate-900/70 dark:bg-slate-950/70 backdrop-blur-md rounded-2xl border border-orange-500/30 dark:border-orange-500/30 shadow-2xl p-6">
              <h2 className="text-2xl font-bold text-cyan-300 dark:text-cyan-300 mb-6 flex items-center gap-2">
                <LuShield size={24} />
                Armor
              </h2>

              {/* Armor Filter */}
              <div className="mb-6">
                <p className="text-sm text-slate-400 mb-3">
                  Filter by Category
                </p>
                <div className="flex flex-wrap gap-2">
                  {armorCategories.map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => setArmorFilter(id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        armorFilter === id
                          ? "bg-gradient-to-r from-cyan-600 to-orange-600 dark:from-cyan-500 dark:to-orange-500 text-white"
                          : "bg-slate-800/50 dark:bg-slate-900/50 text-slate-400 hover:text-white hover:bg-slate-800 dark:hover:bg-slate-900"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Armor Selection Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {getFilteredArmors().map((armor) => (
                  <button
                    key={armor.id}
                    onClick={() => handleArmorChange(armor.id)}
                    className={`p-4 rounded-lg border transition-all text-left ${
                      state.armorType === armor.id
                        ? "bg-cyan-600/30 dark:bg-cyan-600/30 border-orange-500 dark:border-orange-500"
                        : "bg-slate-800/30 dark:bg-slate-900/30 border-orange-500/20 dark:border-orange-500/20 hover:border-orange-500/40 dark:hover:border-orange-500/40"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-slate-200 font-medium">
                        {armor.label}
                      </span>
                      <span className="text-cyan-400 dark:text-cyan-400 text-sm">
                        AC {armor.ac}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side Panel - Character Summary */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/70 dark:bg-slate-950/70 backdrop-blur-md rounded-2xl border border-orange-500/30 dark:border-orange-500/30 shadow-2xl p-6 sticky top-6">
              <h2 className="text-xl font-bold text-cyan-300 dark:text-cyan-300 mb-6">
                Character Summary
              </h2>

              {/* Stats Summary */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase">
                  Ability Scores
                </h3>
                <div className="space-y-2">
                  {stats.map(({ name, label }) => (
                    <div
                      key={name}
                      className="flex justify-between items-center text-slate-300"
                    >
                      <span className="text-sm">{label}:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">
                          {state.stats[name]}
                        </span>
                        <span className="text-xs text-cyan-400 dark:text-cyan-400">
                          (
                          {Math.floor((state.stats[name] - 10) / 2) >= 0
                            ? "+"
                            : ""}
                          {Math.floor((state.stats[name] - 10) / 2)})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Equipment */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase">
                  Equipment
                </h3>
                <div className="space-y-3">
                  <div className="bg-slate-800/30 dark:bg-slate-900/30 p-3 rounded-lg border border-orange-500/20 dark:border-orange-500/20">
                    <p className="text-xs text-slate-400 mb-1">Weapon</p>
                    <p className="text-slate-200 font-medium">
                      {state.weaponType || "None"}
                    </p>
                  </div>
                  <div className="bg-slate-800/30 dark:bg-slate-900/30 p-3 rounded-lg border border-orange-500/20 dark:border-orange-500/20">
                    <p className="text-xs text-slate-400 mb-1">Armor</p>
                    <p className="text-slate-200 font-medium">
                      {state.armorType || "None"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Spells (Placeholder) */}
              <div>
                <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase flex items-center gap-2">
                  <LuWand size={16} />
                  Spells
                </h3>
                <div className="bg-slate-800/30 dark:bg-slate-900/30 p-4 rounded-lg border border-orange-500/20 dark:border-orange-500/20 text-center">
                  <p className="text-slate-500 text-sm">No spells selected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
