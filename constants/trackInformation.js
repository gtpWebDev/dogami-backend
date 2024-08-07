/**
 * trackTemplates are loaded into the tracks collection using the
 * one-off populatedb function.
 *
 * This information is not used anywhere actively.
 *
 * The trackTemplates array needs to be based on the skills array
 * to make it consistent with other data
 *
 */

const populateTrackData = (skills) => {
  const trackData = [
    {
      name: "C1",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
    },
    {
      name: "C2",
      trial_track: true,
      draw_array: [
        { skill: skills[0], width: 7 },
        { skill: skills[1], width: 22 },
        { skill: skills[4], width: 10 },
        { skill: skills[3], width: 16 },
        { skill: skills[0], width: 10 },
        { skill: skills[3], width: 10 },
        { skill: skills[1], width: 22 },
        { skill: skills[0], width: 3 },
      ],
    },
    {
      name: "C3",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
    },
    {
      name: "C4",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
    },
    {
      name: "C5",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
    },
    {
      name: "C6",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
    },
    {
      name: "C7",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
    },
    {
      name: "C8",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
    },
    {
      name: "C9",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
    },
    {
      name: "C10",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
    },
    {
      name: "C11",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
    },
    {
      name: "C12",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
    },
    {
      name: "C13",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
    },
    {
      name: "C14",
      trial_track: true,
      draw_array: [
        { skill: skills[0], width: 8 },
        { skill: skills[2], width: 18 },
        { skill: skills[0], width: 5 },
        { skill: skills[4], width: 18 },
        { skill: skills[3], width: 10 },
        { skill: skills[2], width: 10 },
        { skill: skills[4], width: 7 },
        { skill: skills[2], width: 10 },
        { skill: skills[0], width: 10 },
        { skill: skills[3], width: 18 },
        { skill: skills[0], width: 3 },
      ],
    },
    {
      name: "C15",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
    },
    {
      name: "C16",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
    },
    {
      name: "C17",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
    },
    {
      name: "C18",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
    },
    {
      name: "C19",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
    },
    {
      name: "C20",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
    },
    {
      name: "C21",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
    },
    {
      name: "C22",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
    },
    {
      name: "C23",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
    },
    {
      name: "C24",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
    },
    {
      name: "D1",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
    },
    {
      name: "D2",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
    },
    {
      name: "D3",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
    },
    {
      name: "D4",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
    },
    {
      name: "D5",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
    },
    {
      name: "D6",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
    },
    {
      name: "D7",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
    },
    {
      name: "D8",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
    },
    {
      name: "D9",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
    },
    {
      name: "D10",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
    },
  ];

  return trackData;
};

module.exports = {
  populateTrackData,
};
