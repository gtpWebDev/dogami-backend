/**
 * Service functions for dogami controllers, located in
 * "controllers/dogamiController"
 */

/**
 * Pipeline used in the "dogami_page_get" controller, serving the
 * individual dogami page on the client website.
 * Provides the "best" strategy for each track, hence needs to aggregate
 * and is made complex by the need to populate fields from a number
 * of related collections.
 */

const filterByDogamiStage = (dogamiObjId) => ({
  $match: {
    dogami_id: dogamiObjId,
  },
});

/**
 * Generate complete document for minimum strat_best_time
 * for each track_id
 */
const collectBestStrategyByTrack = [
  {
    $sort: {
      track_id: 1,
      strat_best_time: 1,
    },
  },
  {
    $group: {
      _id: "$track_id",
      doc: { $first: "$$ROOT" }, // collect full document
    },
  },

  {
    $replaceRoot: { newRoot: "$doc" }, // reduce down to just doc
  },
];

/**
 * Use lookups and unwinds to do equivalent of populate track info.
 * In particular need the name and draw_array for the track
 */
const addTrackInformation = [
  {
    // lookup track details
    $lookup: {
      from: "tracks",
      localField: "track_id",
      foreignField: "_id",
      as: "trackDetails",
    },
  },

  // Deconstruct the array - replace single-item array with object
  { $unwind: "$trackDetails" },

  // Deconstructs the draw_array - splits strat with track with 8 array elements into 8 strats!
  // an artificial stage to give access to allow a lookup on the contents of the draw array
  { $unwind: "$trackDetails.draw_array" },

  // Lookup the skills collection to get skill details for each skill_id in the draw_array.
  {
    $lookup: {
      from: "skills",
      localField: "trackDetails.draw_array.skill",
      foreignField: "_id",
      as: "trackDetails.draw_array.skillDetails",
    },
  },

  // Deconstructs the skillDetails array - replace single-item array with object
  { $unwind: "$trackDetails.draw_array.skillDetails" },

  // bring the draw_array back to an array
  {
    $group: {
      _id: "$track_id",
      power_1: { $first: "$power_1" },
      power_2: { $first: "$power_2" },
      consumable_1: { $first: "$consumable_1" },
      is_private: { $first: "$is_private" },
      strat_best_time: { $first: "$strat_best_time" },
      track_draw_array: { $push: "$trackDetails.draw_array" },
      track_name: { $first: "$trackDetails.name" },
      track_trial: { $first: "$trackDetails.trial_track" },
    },
  },

  // reorganise (collect together trackDetails) to simplify next stages
  {
    $project: {
      track_id: "$_id",
      is_private: 1,
      strat_best_time: 1,
      power_1: 1,
      power_2: 1,
      consumable_1: 1,
      trackDetails: {
        name: "$track_name",
        track_trial: "$track_trial",
        draw_array: {
          $map: {
            input: "$track_draw_array",
            as: "item",
            in: {
              width: "$$item.width",
              skill: {
                skill_id: "$$item.skill",
                name: "$$item.skillDetails.name",
                colour: "$$item.skillDetails.colour",
              },
            },
          },
        },
      },
    },
  },
];

const renameField = (fromProp, toProp) => {
  const pipeline = [];

  // replace toProp with fromProp
  const addFieldStage = { $addFields: {} };
  addFieldStage.$addFields[`${toProp}`] = `$${fromProp}`;
  pipeline.push(addFieldStage);

  // remove fromProp
  const removeFieldStage = { $project: {} };
  removeFieldStage.$project[`${fromProp}`] = 0;
  pipeline.push(removeFieldStage);

  return pipeline;
};

/**
 * Populates the item passed as an input param
 * Either power_1, power_2 or consumable_1.
 */

const addConsumableInformation = (inputProp) => {
  let pipeline = [];

  const consCollection =
    inputProp === "consumable_1" ? "consumables" : "powers";

  const typeText = inputProp === "consumable_1" ? "consumable_type" : "type";

  pipeline.push({
    $lookup: {
      from: consCollection, // Collection name
      localField: `${inputProp}`,
      foreignField: "_id",
      as: `${inputProp}_details`,
    },
  });

  // Deconstruct through power1 and skills array to enable access to each skill
  pipeline.push({ $unwind: `$${inputProp}_details` });
  pipeline.push({ $unwind: `$${inputProp}_details.skills` });

  // Bring in the detail for each skill
  pipeline.push({
    $lookup: {
      from: "skills",
      localField: `${inputProp}_details.skills`,
      foreignField: "_id",
      as: `${inputProp}_details.skillDetails`,
    },
  });
  // Replace single-item array with object
  pipeline.push({ $unwind: `$${inputProp}_details.skillDetails` });

  // cater for types having different names in collection
  let groupStage = {
    $group: {
      _id: "$track_id",
      power_1: { $first: "$power_1" },
      power_2: { $first: "$power_2" },
      consumable_1: { $first: "$consumable_1" },
      is_private: { $first: "$is_private" },
      strat_best_time: { $first: "$strat_best_time" },
      trackDetails: { $first: "$trackDetails" },
      temp_skills_array: { $push: `$${inputProp}_details.skillDetails` },
      temp_name: { $first: `$${inputProp}_details.name` },
      temp_type: { $first: `$${inputProp}_details.type` },
    },
  };
  groupStage.$group.temp_type.$first = `$${inputProp}_details.${typeText}`;
  pipeline.push(groupStage);

  /**
   * Final stages is to create the final output structure
   * We create a temporary name for the new details, then overwrite inputProp
   */
  pipeline.push({
    $project: {
      track_id: "$_id",
      is_private: 1,
      strat_best_time: 1,
      power_1: 1,
      power_2: 1,
      consumable_1: 1,
      trackDetails: 1,
      temp_replacement: {
        _id: `$${inputProp}`,
        name: "$temp_name",
        type: "$temp_type",
        skills: {
          $map: {
            input: "$temp_skills_array",
            as: "item",
            in: {
              skill_id: "$$item._id",
              name: "$$item.name",
              colour: "$$item.colour",
            },
          },
        },
      },
    },
  });

  const renamePipeline = renameField("temp_replacement", `${inputProp}`);
  pipeline = [...pipeline, ...renamePipeline];

  return pipeline;
};

exports.bestStrategyByTrackPipeline = (dogamiObjId) => {
  const pipeline = [
    filterByDogamiStage(dogamiObjId),
    ...collectBestStrategyByTrack,
    ...addTrackInformation,
    // ...renameConsumableFields(),
    // ...addPower1Information,
    ...addConsumableInformation("power_1"),
    ...addConsumableInformation("power_2"),
    ...addConsumableInformation("consumable_1"),
  ];
  return pipeline;
};

/**
 * TESTING PARAMS
 */
