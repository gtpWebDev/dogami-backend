#! /usr/bin/env node

const DogamiOfficialApi = require("../models/dogamiOfficialApiModel");

const axios = require("axios");

/**
 * This script facilitates a one-off exercise now complete, to download data
 * for the 16000 dogami as of August 2024. This data is stored in the
 * "dogami_official_api" collection to ensure that this app is future-proofed
 * should access to the dogami API be removed.
 */

// Invoke with LCI command: - e.g.: node lib/proxy databaseurl,startDogId - put databaseurl in quotes
// e.g. 'node lib/proxy "mongodb+srv://ADDUSERNAME:ADDPASSWORD@cluster0.lz91hw2.mongodb.net/ADDDATABASENAME?retryWrites=true&w=majority" 3001'
// databaseurl = "mongodb+srv://ADDUSERNAME:ADDPASSWORD@cluster0.lz91hw2.mongodb.net/ADDDATABASENAME?retryWrites=true&w=majority"
// (user name = "admin" will work but guess can also add other usernames)

// Get arguments passed on command line - in this case the database url
const userArgs = process.argv.slice(2);

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = userArgs[0];
const startDogId = Math.floor(userArgs[1]);

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);

  const startAgain = false;
  // const startDogId = 2001; // now collected through node CLI
  const numDogsInBatch = 100;
  const numRepeats = 10;

  // be careful!
  if (startAgain) await deleteCollection("dogami_official_api");

  let collectedArray = [];

  for (let i = 0; i < numRepeats; i++) {
    let first = startDogId + numDogsInBatch * i;
    let last = first + numDogsInBatch - 1;
    const data = await getDogamiData(first, last);

    collectedArray = [...collectedArray, ...data];
  }

  // construct data
  let constructedDataArray = [];
  collectedArray.forEach((dogami) => {
    constructedDataArray.push(restructureDataPoint(dogami));
  });

  // add data to collection - commented to avoid accidental addition
  // await DogamiOfficialApi.insertMany(constructedDataArray);

  console.log("process complete");
}

/**
 * Restructures an individual data item as received from API
 * Extracts nftId, otherwise maintains data exactly as received
 */
function restructureDataPoint(indivData) {
  const constructedData = {
    dogami_official_id: indivData.nftId,
    data: indivData,
  };
  return constructedData;
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

async function getDogamiData(minInc, maxInc) {
  const dogamiList = constructDogamiList(minInc, maxInc);
  // console.log("dogamiList", dogamiList);
  const dogamiData = await axiosDogamiUri(dogamiList);
  return dogamiData.data;
}

function constructDogamiList(minInc, maxInc) {
  let string = "";
  for (let i = minInc; i < maxInc + 1; i++) {
    string += i.toString();
    i !== maxInc ? (string += ",") : null;
  }

  return string;
}

async function axiosDogamiUri(dogamiIdList) {
  try {
    /**
     * improved endpoint found courtesy of Lewis on discord, form:
     * "https://proxy.dogami.com/metadata/dogami/ids/12560,2345"
     * comma delimited list at end for multiple dogami
     */

    const uri = `https://proxy.dogami.com/metadata/dogami/ids/${dogamiIdList}`;

    const response = await axios.get(uri); // response is an array
    const successResponse = {
      success: true,
      data: response.data, // axios returns .data in JSON
      error: null,
    };
    // console.log("axiosDogamiUri returning successResponse", successResponse);
    return successResponse;
  } catch (error) {
    const errorResponse = {
      success: false,
      data: null,
      error: {
        status: error.response.status,
        message: error.response.data.msg,
      },
    };
    // console.log("axiosDogamiUri returning errorResponse", errorResponse);
    return errorResponse;
  }
}

// for info only on structure of data

const changingData = {
  owner: "0x251E39B51Edf91b88393D13872E8E883F8C8Ff74",
  sitter: "cddf8ba4-629f-4309-b891-d6f8722fac1b",
  attributes: [
    { trait_type: "Level", value: 50 },
    { trait_type: "Birthday", display_type: "date", value: 1675555200000 },
    { trait_type: "Xp", value: 612500 },
    { trait_type: "Breed Count", value: 0 },
    { trait_type: "Status", value: "Puppy" },
    { trait_type: "Velocity", bonus: 10000, bonus_level: 100, level: 189 },
    { trait_type: "Swim", bonus: 8910, bonus_level: 89, level: 274 }, // units trained, trained level, moving base
    { trait_type: "Jump", bonus: 8900, bonus_level: 89, level: 260 },
    { trait_type: "Balance", bonus: 8740, bonus_level: 87, level: 306 },
    { trait_type: "Might", bonus: 9370, bonus_level: 93, level: 347 },
    { trait_type: "Instinct", bonus: 8600, bonus_level: 86, level: 302 },
    { display_type: "boost_number", trait_type: "Cat", value: 10 },
    { display_type: "boost_number", trait_type: "Octopus", value: 10 },
    { display_type: "boost_number", trait_type: "Rhinoceros", value: 10 },
    { display_type: "boost_number", trait_type: "Horse", value: 10 },
    { display_type: "boost_number", trait_type: "Raven", value: 10 },
  ],
};

const staticData = {
  nftId: 12000, // USED
  name: "DOGAMI #12000", // USED
  image: "ipfs://QmZ3nFrdfbpbDTYF3pEeXrD9vUPvYY7ykSqGDMHAcnskMP", // USED
  animation_url: "ipfs://QmRTv1cvHRL735dpEcTHypoPYZfQt3A9vE6ue7CPyuz46p", // USED
  description: "Your true virtual companion!",
  attributes: [
    { trait_type: "Rarity", value: "Bronze" }, // USED
    { trait_type: "Generation", value: 1 }, // USED
    { trait_type: "Collection", value: "Alpha - Series II" }, // USED
    { trait_type: "Group", value: "Non-sporting" },
    { trait_type: "Gender", value: "Female" },
    { trait_type: "Size", value: "medium female" },
    { trait_type: "Breed", value: "Chow Chow" },
    { trait_type: "Fur", value: "Blue #10" },
    { trait_type: "Eyes", value: "Brown #2" },
    { trait_type: "Dominant Personality", value: "Needy" },
    { trait_type: "Recessive Personality", value: "Charming" },
    { trait_type: "Velocity", rank: "E", min_value: 8, max_value: 189 }, // USED
    { trait_type: "Swim", rank: "C", min_value: 30, max_value: 274 }, // USED
    { trait_type: "Jump", rank: "C", min_value: 28, max_value: 260 }, // USED
    { trait_type: "Balance", rank: "B", min_value: 36, max_value: 306 }, // USED
    { trait_type: "Might", rank: "A", min_value: 49, max_value: 347 }, // USED
    { trait_type: "Instinct", rank: "B", min_value: 38, max_value: 302 }, // USED
    { display_type: "boost_number", trait_type: "Cat" }, // USED
    { display_type: "boost_number", trait_type: "Octopus" }, // USED
    { display_type: "boost_number", trait_type: "Rhinoceros" }, // USED
    { display_type: "boost_number", trait_type: "Horse" }, // USED
    { display_type: "boost_number", trait_type: "Raven" }, // USED
    { trait_type: "Series Ranking", value: 1922 },
    { trait_type: "Global Ranking", value: 8102 },
    { trait_type: "Rarity Score", value: 3924.55 },
  ],
};
