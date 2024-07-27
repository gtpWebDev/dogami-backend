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
const TrackStrat = require("../models/trackStratModel");

// used to link data correctly
const users = [];
const dogamis = [];
const tracks = [];
const track_strats = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");

  // delete collections if they exist
  await deleteCollection("users");
  await deleteCollection("dogamis");
  await deleteCollection("tracks");
  await deleteCollection("track_strats");

  await createDogamis();
  await createUsers();
  await createTracks();
  await createTrackStrats();

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
      "https://i.seadn.io/s/raw/files/caee0b8abf85e2e4ed3fdae78008cef1.gif"
    ),
    dogamiCreate(
      1,
      3896,
      "Henry",
      "Labrador",
      "Alpha - Series I",
      "https://i.seadn.io/s/raw/files/e0570e940c868bc8b54846b54dd833a8.gif"
    ),
    dogamiCreate(
      2,
      13796,
      "Hugo",
      "Great Dane",
      "Gamma - Series I",
      "https://i.seadn.io/s/raw/files/117723441020b2005adb2a3629f053fa.gif"
    ),
    dogamiCreate(
      3,
      14563,
      "Kit",
      "Beagle",
      "Gamma - Series I",
      "https://i.seadn.io/s/raw/files/0616b2bc7782e0ec716e6477b35d8d8b.gif"
    ),
    dogamiCreate(
      4,
      12895,
      "Nit",
      "Great Dane",
      "Gamma - Series I",
      "https://i.seadn.io/s/raw/files/e491c3bf0a0459c4cec7f4b65d37d20c.gif"
    ),
    dogamiCreate(
      5,
      12862,
      "Frog",
      "Boxer",
      "Gamma - Series I",
      "https://i.seadn.io/s/raw/files/e84a93899b593aa1dd06e2e770061839.gif"
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
  img_url
) {
  const dogami = new Dogami({
    index: index,
    dogami_official_id: dog_off_id,
    name: name,
    breed: breed,
    dog_collection: dog_collection,
    img_url: img_url,
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
    trackCreate(0, "D3", "D3.jpg", true),
    trackCreate(1, "D9", "D9.jpg", true),
    trackCreate(2, "C21", "C21.jpg", true),
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

/* -------- TRACK_STRATS -------- */

async function createTrackStrats() {
  console.log("Adding track strats");
  await Promise.all([
    trackStratCreate(
      0,
      false,
      dogamis[0],
      tracks[0],
      "power1",
      "power2",
      "cons1",
      17.433
    ),
    trackStratCreate(
      0,
      false,
      dogamis[0],
      tracks[0],
      "power2",
      "power3",
      "cons2",
      17.453
    ),
    trackStratCreate(
      0,
      false,
      dogamis[0],
      tracks[0],
      "power4",
      "power5",
      "cons5",
      16.453
    ),
    trackStratCreate(
      1,
      false,
      dogamis[0],
      tracks[1],
      "power1",
      "power3",
      "cons2",
      14.234
    ),
    trackStratCreate(
      2,
      false,
      dogamis[0],
      tracks[2],
      "power1",
      "power4",
      "cons3",
      12.222
    ),
    trackStratCreate(
      3,
      false,
      dogamis[1],
      tracks[1],
      "power3",
      "power4",
      "cons1",
      19.12
    ),
    trackStratCreate(
      4,
      false,
      dogamis[1],
      tracks[1],
      "power5",
      "power6",
      "cons2",
      11.12
    ),
    trackStratCreate(
      5,
      false,
      dogamis[1],
      tracks[1],
      "power7",
      "power8",
      "cons3",
      12.12
    ),
  ]);
}

// We pass the index to the ...Create functions so that, for example,
// condition[0] will always be the same condition, regardless of the order
// in which the elements of promise.all's argument complete.
async function trackStratCreate(
  index,
  isPrivate,
  dogamiId,
  trackId,
  power1,
  power2,
  consumable1,
  bestTime
) {
  const trackStrat = new TrackStrat({
    index: index,
    is_private: isPrivate,
    dogami_id: dogamiId,
    track_id: trackId,
    power_1: power1,
    power_2: power2,
    consumable_1: consumable1,
    strat_best_time: bestTime,
  });
  await trackStrat.save();
  track_strats[index] = trackStrat;
}
