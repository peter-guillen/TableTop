const mongoose = require("mongoose");

const ProfessionSchema = new mongoose.Schema({
  title: String,
  power: String,
  weapon: String,
  armor: String,
  levels: [{ name: String, description: String }],
  // spells: [spellsSchema],
});

module.exports = mongoose.model("Profession", ProfessionSchema);

// // creates a new spell
// const spellsSchema = new mongoose.Schema({
//   name: String,
//   description: String,
// });
// // Output:
// // name: fireball
// // description: burns stuff

// // create a new level which gives a list of all spells
// const levelSchema = new mongoose.Schema({
//   name: String,
//   spells: [spellsSchema],
// });
// // Output:
// // name: One
// // abilities: fireball, lightining bolt {...rest}

// // create the profession schema
// const professionSchema = new mongoose.Schema({
//   title: String,
//   power: String,
//   weapon: String,
//   armor: String,
//   levels: [levelSchema],
// });
// // Output:
// // levels: One {...rest}

// const Profession = mongoose.model("Profession", professionSchema);
// const Level = mongoose.model("Level", levelSchema);
// const Ability = mongoose.model("Ability", abilitySchema);

// module.exports = { Profession, Level, Ability };

// const swordmaster = new Profession({
//   title: "Swordmaster",
//   power: "Mastery of the Blade",
//   weapon: "Sword",
//   armor: "Heavy",
//   levels: [
//     {
//       name: "One",
//       abilities: [
//         { name: "Slash", description: "Basic sword slash" },
//         { name: "Parry", description: "Defensive maneuver" },
//       ],
//     },
//     {
//       name: "Two",
//       abilities: [
//         { name: "Riposte", description: "Counter attack" },
//         { name: "Deflect", description: "Avoid manuver" },
//       ],
//     },
//   ],
//   spells: [spellsSchema],
// });

// swordmaster
//   .save()
//   .then((savedProfession) => {
//     console.log(savedProfession);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
