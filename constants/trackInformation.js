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
      obstacle_sequence: "zzzzz",
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
      obstacle_sequence: "ybrgygby",
    },
    {
      name: "C3",
      trial_track: true,
      draw_array: [
        { skill: skills[0], width: 12 },
        { skill: skills[4], width: 12 },
        { skill: skills[6], width: 3 },
        { skill: skills[4], width: 10 },
        { skill: skills[1], width: 40 },
        { skill: skills[0], width: 10 },
        { skill: skills[4], width: 10 },
        { skill: skills[0], width: 3 },
      ],
      obstacle_sequence: "yrbyry",
    },

    // 0-Velocity
    // 1-Swim
    // 2-Jump
    // 3-Balance
    // 4-Might
    // 5-Instinct
    // 6-None

    {
      name: "C4",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
      obstacle_sequence: "ybypyrb",
    },
    {
      name: "C5",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
      obstacle_sequence: "zzzzz",
    },
    {
      name: "C6",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
      obstacle_sequence: "yrororoyoy",
    },
    {
      name: "C7",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
      obstacle_sequence: "yoyoyroypy",
    },
    {
      name: "C8",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
      obstacle_sequence: "yrgrgrogy",
    },
    {
      name: "C9",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
      obstacle_sequence: "zzzzz",
    },
    {
      name: "C10",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
      obstacle_sequence: "zzzzz",
    },
    {
      name: "C11",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
      obstacle_sequence: "zzzzz",
    },
    {
      name: "C12",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
      obstacle_sequence: "yorbyrboy",
    },
    {
      name: "C13",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
      obstacle_sequence: "ygrygbrby",
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
      obstacle_sequence: "yoyrgoroygy",
    },
    {
      name: "C15",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
      obstacle_sequence: "yrbogrobgy",
    },
    {
      name: "C16",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
      obstacle_sequence: "ypyobpoby",
    },
    {
      name: "C17",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
      obstacle_sequence: "zzzzz",
    },
    {
      name: "C18",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
      obstacle_sequence: "zzzzz",
    },
    {
      name: "C19",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
      obstacle_sequence: "zzzzz",
    },
    {
      name: "C20",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
      obstacle_sequence: "zzzzz",
    },
    {
      name: "C21",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
      obstacle_sequence: "zzzzz",
    },
    {
      name: "C22",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
      obstacle_sequence: "zzzzz",
    },
    {
      name: "C23",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
      obstacle_sequence: "zzzzz",
    },
    {
      name: "C24",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
      obstacle_sequence: "zzzzz",
    },
    {
      name: "D1",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
      obstacle_sequence: "zzzzz",
    },
    {
      name: "D2",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
      obstacle_sequence: "zzzzz",
    },
    {
      name: "D3",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
      obstacle_sequence: "zzzzz",
    },
    {
      name: "D4",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
      obstacle_sequence: "zzzzz",
    },
    {
      name: "D5",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
      obstacle_sequence: "zzzzz",
    },
    {
      name: "D6",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
      obstacle_sequence: "zzzzz",
    },
    {
      name: "D7",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
      obstacle_sequence: "zzzzz",
    },
    {
      name: "D8",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
      obstacle_sequence: "zzzzz",
    },
    {
      name: "D9",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
      obstacle_sequence: "zzzzz",
    },
    {
      name: "D10",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
      obstacle_sequence: "zzzzz",
    },
  ];

  return trackData;
};

module.exports = {
  populateTrackData,
};
