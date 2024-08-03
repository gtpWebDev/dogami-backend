#! /usr/bin/env node

// This script populates some test data for the development stage
// Invoke with LCI command: - e.g.: node populatedb databaseurl
// databaseurl = "mongodb+srv://ADDUSERNAME:ADDPASSWORD@cluster0.lz91hw2.mongodb.net/ADDDATABASENAME?retryWrites=true&w=majority"
// (user name = "admin" will work but guess can also add other usernames)

// Get arguments passed on command line - in this case the database url
const userArgs = process.argv.slice(2);

const User = require("../models/userModel");
const Dogami = require("../models/dogamiModel");
const Track = require("../models/trackModel");
const Skill = require("../models/skillModel");
const PowerType = require("../models/powerTypeModel");
const ConsumableType = require("../models/consumableTypeModel");
const Consumable = require("../models/consumableModel");
const Power = require("../models/powerModel");
const DogStrat = require("../models/dogStratModel");

// used to link data correctly
const skills = [];
const users = [];
const dogamis = [];
const tracks = [];
const dog_strats = [];
const power_types = [];
const consumable_types = [];
const consumables = [];
const powers = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");

  // delete collections if they exist
  await deleteCollection("skills");
  await deleteCollection("power_types");
  await deleteCollection("powers");
  await deleteCollection("consumable_types");
  await deleteCollection("consumables");
  await deleteCollection("tracks");
  await deleteCollection("dogamis");
  await deleteCollection("dog_strats");
  await deleteCollection("users");

  await createSkills();
  await createPowerTypes();
  await createPowers();
  await createConsumableTypes();
  await createConsumables();
  await createTracks();
  await createDogamis();
  await createDogStrats();
  await createUsers();

  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function deleteCollection(collectionName) {
  const collections = await mongoose.connection.db
    .listCollections({ name: collectionName })
    .toArray();
  if (collections.length > 0) {
    // Drop the collection
    await mongoose.connection.db.dropCollection(collectionName);
    console.log(`Collection '${collectionName}' deleted successfully.`);
  }
}

/* -------- SKILLS -------- */

async function createSkills() {
  console.log("Adding skills");
  await Promise.all([
    skillCreate(0, "Velocity"),
    skillCreate(1, "Swim"),
    skillCreate(2, "Jump"),
    skillCreate(3, "Balance"),
    skillCreate(4, "Might"),
    skillCreate(5, "Instinct"),
    skillCreate(6, "None"),
  ]);
}

async function skillCreate(index, name) {
  const skill = new Skill({
    index: index,
    name: name,
  });
  await skill.save();
  skills[index] = skill;
}

/* -------- POWER_TYPE -------- */

async function createPowerTypes() {
  console.log("Adding power types");
  await Promise.all([
    powerTypeCreate(0, "Single"),
    powerTypeCreate(1, "Double"),
    powerTypeCreate(2, "Dragon"),
  ]);
}

async function powerTypeCreate(index, name) {
  const powerType = new PowerType({
    index: index,
    name: name,
  });
  await powerType.save();
  power_types[index] = powerType;
}

/* -------- POWER -------- */

async function createPowers() {
  console.log("Adding powers");
  await Promise.all([
    powerCreate(0, "Fish", power_types[0], [skills[1]]),
    powerCreate(1, "Eagle", power_types[1], [skills[0], skills[5]]),
    powerCreate(2, "Cat", power_types[0], [skills[3]]),
    powerCreate(3, "Lion", power_types[1], [skills[2], skills[4]]),
    powerCreate(4, "Monkey", power_types[1], [skills[2], skills[3]]),
    powerCreate(5, "Octopus", power_types[1], [skills[1], skills[5]]),
    powerCreate(6, "Antelope", power_types[0], [skills[0]]),
    powerCreate(7, "Raven", power_types[0], [skills[5]]),
    powerCreate(8, "Rhinoceros", power_types[0], [skills[4]]),
    powerCreate(9, "Swordfish", power_types[1], [skills[0], skills[1]]),
    powerCreate(10, "Kangaroo", power_types[0], [skills[2]]),
    powerCreate(11, "Snake", power_types[1], [skills[3], skills[5]]),
    powerCreate(12, "Dragon", power_types[2], [
      skills[0],
      skills[1],
      skills[2],
      skills[3],
      skills[4],
      skills[5],
    ]),
    powerCreate(13, "Wolf", power_types[1], [skills[0], skills[4]]),
    powerCreate(14, "Frog", power_types[1], [skills[1], skills[2]]),
    powerCreate(15, "Elephant", power_types[1], [skills[4], skills[5]]),
    powerCreate(16, "Horse", power_types[1], [skills[0], skills[2]]),
    powerCreate(17, "Gorilla", power_types[1], [skills[3], skills[4]]),
    powerCreate(18, "Rabbit", power_types[1], [skills[2], skills[5]]),
    powerCreate(19, "Cheetah", power_types[1], [skills[0], skills[3]]),
    powerCreate(20, "Shark", power_types[1], [skills[1], skills[4]]),
    powerCreate(21, "Ray", power_types[1], [skills[1], skills[3]]),
  ]);
}

async function powerCreate(index, name, type, skillsArray) {
  const power = new Power({
    index: index,
    name: name,
    type: type,
    skills: skillsArray,
  });
  await power.save();
  powers[index] = power;
}

/* -------- CONSUMABLE_TYPE -------- */

async function createConsumableTypes() {
  console.log("Adding consumable types");
  await Promise.all([
    consumableTypeCreate(0, "Weak", 20),
    consumableTypeCreate(1, "Strong", 40),
  ]);
}

async function consumableTypeCreate(index, name, percBoost) {
  const consumableType = new ConsumableType({
    index: index,
    name: name,
    percentage_boost: percBoost,
  });
  await consumableType.save();
  consumable_types[index] = consumableType;
}

/* -------- CONSUMABLE -------- */

async function createConsumables() {
  console.log("Adding consumables");
  await Promise.all([
    consumableCreate(0, "Hurryberry", [skills[0]], consumable_types[0]),
    consumableCreate(1, "Aquastar", [skills[1]], consumable_types[0]),
    consumableCreate(2, "Manghop", [skills[2]], consumable_types[0]),
    consumableCreate(3, "Lilybrium", [skills[3]], consumable_types[0]),
    consumableCreate(4, "Smakiwi", [skills[4]], consumable_types[0]),
    consumableCreate(5, "Mystifig", [skills[5]], consumable_types[0]),
    consumableCreate(6, "Velocitrus", [skills[0]], consumable_types[1]),
    consumableCreate(7, "Sealight", [skills[1]], consumable_types[1]),
    consumableCreate(8, "Jumpkin", [skills[2]], consumable_types[1]),
    consumableCreate(9, "Zenvine", [skills[3]], consumable_types[1]),
    consumableCreate(10, "Powtaya", [skills[4]], consumable_types[1]),
    consumableCreate(11, "Orchidoga", [skills[5]], consumable_types[1]),
  ]);
}

async function consumableCreate(index, name, skillsArray, consumableType) {
  const consumable = new Consumable({
    index: index,
    name: name,
    skills: skillsArray,
    consumable_type: consumableType,
  });
  await consumable.save();
  consumables[index] = consumable;
}

/* -------- DOGAMIS -------- */

async function createDogamis() {
  console.log("Adding dogamis");
  await Promise.all([
    dogamiCreate(
      0,
      1576,
      "Dash",
      "Shiba Inu",
      "Alpha - Series I",
      "https://i.seadn.io/s/raw/files/caee0b8abf85e2e4ed3fdae78008cef1.gif",
      "Puppy",
      50,
      "Bronze",
      [powers[2], powers[5], powers[6], powers[3], powers[7]],
      { rank: "A", base_level: 341, trained_level: 81 },
      { rank: "D", base_level: 225, trained_level: 80 },
      { rank: "C", base_level: 261, trained_level: 80 },
      { rank: "B", base_level: 319, trained_level: 81 },
      { rank: "C", base_level: 277, trained_level: 80 },
      { rank: "C", base_level: 276, trained_level: 81 }
    ),
    dogamiCreate(
      1,
      3896,
      "Henry",
      "Labrador",
      "Alpha - Series I",
      "https://i.seadn.io/s/raw/files/e0570e940c868bc8b54846b54dd833a8.gif",
      "Puppy",
      50,
      "Gold",
      [powers[0], powers[1], powers[2], powers[3], powers[4]],
      { rank: "C", base_level: 279, trained_level: 200 },
      { rank: "S", base_level: 382, trained_level: 200 },
      { rank: "C", base_level: 278, trained_level: 200 },
      { rank: "B", base_level: 303, trained_level: 200 },
      { rank: "C", base_level: 278, trained_level: 200 },
      { rank: "C", base_level: 265, trained_level: 200 }
    ),
    dogamiCreate(
      2,
      13796,
      "Hugo",
      "Great Dane",
      "Gamma - Series I",
      "https://i.seadn.io/s/raw/files/117723441020b2005adb2a3629f053fa.gif",
      "Puppy",
      35,
      "Gold",
      [powers[8], powers[9], powers[10], powers[11], powers[12]],
      { rank: "C", base_level: 279, trained_level: 200 },
      { rank: "S", base_level: 382, trained_level: 200 },
      { rank: "C", base_level: 278, trained_level: 200 },
      { rank: "B", base_level: 303, trained_level: 200 },
      { rank: "C", base_level: 278, trained_level: 200 },
      { rank: "C", base_level: 265, trained_level: 200 }
    ),
    dogamiCreate(
      3,
      14563,
      "Kit",
      "Beagle",
      "Gamma - Series I",
      "https://i.seadn.io/s/raw/files/0616b2bc7782e0ec716e6477b35d8d8b.gif",
      "Puppy",
      28,
      "Bronze",
      [powers[2], powers[13], powers[7], powers[14], powers[10]],
      { rank: "D", base_level: 129, trained_level: 61 },
      { rank: "B", base_level: 187, trained_level: 60 },
      { rank: "B", base_level: 185, trained_level: 61 },
      { rank: "B", base_level: 192, trained_level: 60 },
      { rank: "D", base_level: 131, trained_level: 60 },
      { rank: "B", base_level: 191, trained_level: 60 }
    ),
    dogamiCreate(
      4,
      12895,
      "Nit",
      "Great Dane",
      "Gamma - Series I",
      "https://i.seadn.io/s/raw/files/e491c3bf0a0459c4cec7f4b65d37d20c.gif",
      "Puppy",
      29,
      "Bronze",
      [powers[6], powers[15], powers[0], powers[4], powers[8]],
      { rank: "B", base_level: 192, trained_level: 61 },
      { rank: "B", base_level: 188, trained_level: 60 },
      { rank: "B", base_level: 197, trained_level: 60 },
      { rank: "C", base_level: 159, trained_level: 61 },
      { rank: "B", base_level: 191, trained_level: 61 },
      { rank: "E", base_level: 114, trained_level: 60 }
    ),
    dogamiCreate(
      5,
      12862,
      "Frog",
      "Boxer",
      "Gamma - Series I",
      "https://i.seadn.io/s/raw/files/e84a93899b593aa1dd06e2e770061839.gif",
      "Puppy",
      30,
      "Silver",
      [powers[8], powers[9], powers[10], powers[11], powers[16]],
      { rank: "B", base_level: 198, trained_level: 80 },
      { rank: "C", base_level: 171, trained_level: 81 },
      { rank: "S", base_level: 256, trained_level: 80 },
      { rank: "D", base_level: 139, trained_level: 80 },
      { rank: "A", base_level: 224, trained_level: 81 },
      { rank: "E", base_level: 121, trained_level: 80 }
    ),
  ]);
}

// We pass the index to the ...Create functions so that, for example,
// condition[0] will always be the same condition, regardless of the order
// in which the elements of promise.all's argument complete.
async function dogamiCreate(
  index,
  dog_off_id,
  name,
  breed,
  dog_collection,
  img_url,
  status,
  level,
  rarity,
  powersArray,
  velocityStats,
  swimStats,
  jumpStats,
  balanceStats,
  mightStats,
  instinctStats
) {
  const dogami = new Dogami({
    index: index,
    dogami_official_id: dog_off_id,
    name: name,
    breed: breed,
    dog_collection: dog_collection,
    img_url: img_url,
    status: status,
    level: level,
    rarity: rarity,
    powers: powersArray,
    velocity_stats: velocityStats,
    swim_stats: swimStats,
    jump_stats: jumpStats,
    balance_stats: balanceStats,
    might_stats: mightStats,
    instinct_stats: instinctStats,
  });
  await dogami.save();
  dogamis[index] = dogami;
}

/* -------- USERS -------- */

async function createUsers() {
  console.log("Adding users");
  // works with password "123"
  await Promise.all([
    userCreate(
      0,
      "glen", // works with password "123"
      "0afab03957ddb96094a8f87c8e7d1c82e766c7f72e6c31a01ca4aff3ce8087e6",
      "1aaf58d9f2a1e3e59c0d858afe8f6b2ec00c3049e78de2c2cdbaebd9acab63a305f4b302992b566e7ad19660fe2cd3bd29e4ff3574014a49aca1577474758640",
      true,
      [dogamis[0], dogamis[1], dogamis[2]]
    ),
    userCreate(
      1,
      "arsh", // works with password "123"
      "8dd031737e1e1c6da407fca82029b58e34f5380770c6abe18d565f5aa0fc9200",
      "0d594859e3ecb3eb4b28fce5b83fb421a6111678e8535e17d961a539ce56ccb90b9380b42bcead6f7a25d505aee49cddd8bb522ef3a7bd34e2ede0866fdad130",
      false,
      [dogamis[3], dogamis[4], dogamis[5]]
    ),
  ]);
}

// We pass the index to the ...Create functions so that, for example,
// condition[0] will always be the same condition, regardless of the order
// in which the elements of promise.all's argument complete.
async function userCreate(index, username, salt, hash, admin, dogamiArray) {
  const dateNow = new Date();
  const user = new User({
    index: index,
    username: username,
    salt: salt,
    hash: hash,
    admin: admin,
  });
  if (dogamis != false) user.owned_dogs = dogamiArray;
  await user.save();
  users[index] = user;
}

/* -------- TRACKS -------- */

async function createTracks() {
  console.log("Adding tracks");
  await Promise.all([
    trackCreate(0, "C1", "C1.jpg", true),
    trackCreate(1, "C2", "C2.jpg", true),
    trackCreate(2, "C3", "C3.jpg", true),
    trackCreate(3, "C4", "C4.jpg", true),
    trackCreate(4, "C5", "C5.jpg", true),
    trackCreate(5, "C6", "C6.jpg", true),
    trackCreate(6, "C7", "C7.jpg", true),
    trackCreate(7, "C8", "C8.jpg", true),
    trackCreate(8, "C9", "C9.jpg", true),
    trackCreate(9, "C10", "C10.jpg", true),
    trackCreate(10, "C11", "C11.jpg", true),
    trackCreate(11, "C12", "C12.jpg", true),
    trackCreate(12, "C13", "C13.jpg", true),
    trackCreate(13, "C14", "C14.jpg", true),
    trackCreate(14, "C15", "C15.jpg", true),
    trackCreate(15, "C16", "C16.jpg", true),
    trackCreate(16, "C17", "C17.jpg", true),
    trackCreate(17, "C18", "C18.jpg", true),
    trackCreate(18, "C19", "C19.jpg", true),
    trackCreate(19, "C20", "C20.jpg", true),
    trackCreate(20, "C21", "C21.jpg", true),
    trackCreate(21, "C22", "C22.jpg", true),
    trackCreate(22, "C23", "C23.jpg", true),
    trackCreate(23, "C24", "C24.jpg", true),
    trackCreate(24, "D1", "D1.jpg", true),
    trackCreate(25, "D2", "D2.jpg", true),
    trackCreate(26, "D3", "D3.jpg", true),
    trackCreate(27, "D4", "D4.jpg", true),
    trackCreate(28, "D5", "D5.jpg", true),
    trackCreate(29, "D6", "D6.jpg", true),
    trackCreate(30, "D7", "D7.jpg", true),
    trackCreate(31, "D8", "D8.jpg", true),
    trackCreate(32, "D9", "D9.jpg", true),
    trackCreate(33, "D10", "D10.jpg", true),
  ]);
}

// We pass the index to the ...Create functions so that, for example,
// condition[0] will always be the same condition, regardless of the order
// in which the elements of promise.all's argument complete.
async function trackCreate(index, name, imgLoc, trial_track) {
  const track = new Track({
    index: index,
    name: name,
    image_loc: imgLoc,
    trial_track: trial_track,
  });
  await track.save();
  tracks[index] = track;
}

/* -------- DOG_STRATS -------- */

async function createDogStrats() {
  console.log("Adding dog strats");
  await Promise.all([
    dogStratCreate(
      0,
      false,
      dogamis[0],
      tracks[0],
      powers[0],
      powers[2],
      consumables[3],
      17.433
    ),
    dogStratCreate(
      1,
      false,
      dogamis[0],
      tracks[0],
      powers[1],
      powers[2],
      consumables[1],
      17.453
    ),
    dogStratCreate(
      2,
      false,
      dogamis[0],
      tracks[0],
      powers[0],
      powers[4],
      consumables[5],
      16.453
    ),
    dogStratCreate(
      3,
      false,
      dogamis[0],
      tracks[1],
      powers[4],
      powers[3],
      consumables[6],
      14.234
    ),
    dogStratCreate(
      4,
      false,
      dogamis[0],
      tracks[2],
      powers[0],
      powers[2],
      consumables[3],
      12.222
    ),
    dogStratCreate(
      5,
      false,
      dogamis[1],
      tracks[1],
      powers[0],
      powers[1],
      consumables[1],
      19.12
    ),
    dogStratCreate(
      6,
      false,
      dogamis[1],
      tracks[1],
      powers[1],
      powers[3],
      consumables[0],
      11.12
    ),
    dogStratCreate(
      7,
      false,
      dogamis[1],
      tracks[1],
      powers[0],
      powers[2],
      consumables[3],
      12.12
    ),
  ]);
}

// We pass the index to the ...Create functions so that, for example,
// condition[0] will always be the same condition, regardless of the order
// in which the elements of promise.all's argument complete.
async function dogStratCreate(
  index,
  isPrivate,
  dogamiId,
  trackId,
  power1,
  power2,
  consumable1,
  bestTime
) {
  const dogStrat = new DogStrat({
    index: index,
    is_private: isPrivate,
    dogami_id: dogamiId,
    track_id: trackId,
    power_1: power1,
    power_2: power2,
    consumable_1: consumable1,
    strat_best_time: bestTime,
  });
  await dogStrat.save();
  dog_strats[index] = dogStrat;
}
