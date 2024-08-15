/**
 * trackTemplates are loaded into the tracks collection using the
 * one-off populatedb function.
 *
 * This information is not used anywhere actively.
 *
 * The trackTemplates array needs to be based on the skills array
 * to make it consistent with other data
 *
 * 0-Yellow
 * 1-Blue
 * 2-Orange
 * 3-Green
 * 4-Red
 * 5-Purple
 * 6-None
 */

const populateTrackData = (skills) => {
  const trackData = [
    {
      name: "C1",
      trial_track: true,
      draw_array: [
        { skill: skills[0], width: 7 },
        { skill: skills[4], width: 10 },
        { skill: skills[0], width: 5 },
        { skill: skills[2], width: 25 },
        { skill: skills[1], width: 28 },
        { skill: skills[0], width: 17 },
      ],

      obstacle_sequence: "yryoby",
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
    {
      name: "C4",
      trial_track: true,
      draw_array: [
        { skill: skills[0], width: 3 },
        { skill: skills[1], width: 15 },
        { skill: skills[0], width: 15 },
        { skill: skills[5], width: 20 },
        { skill: skills[0], width: 10 },
        { skill: skills[4], width: 10 },
        { skill: skills[1], width: 20 },
        { skill: skills[0], width: 3 },
      ],
      obstacle_sequence: "ybypyrby",
    },
    {
      name: "C5",
      trial_track: true,
      draw_array: [
        { skill: skills[0], width: 3 },
        { skill: skills[4], width: 10 },
        { skill: skills[3], width: 30 },
        { skill: skills[2], width: 8 },
        { skill: skills[0], width: 10 },
        { skill: skills[2], width: 19 },
        { skill: skills[0], width: 12 },
      ],
      obstacle_sequence: "yrgoyoy",
    },
    {
      name: "C6",
      trial_track: true,
      draw_array: [
        { skill: skills[0], width: 13 },
        { skill: skills[4], width: 30 },
        { skill: skills[2], width: 8 },
        { skill: skills[4], width: 10 },
        { skill: skills[2], width: 8 },
        { skill: skills[4], width: 10 },
        { skill: skills[2], width: 8 },
        { skill: skills[0], width: 5 },
        { skill: skills[2], width: 10 },
        { skill: skills[0], width: 3 },
      ],
      obstacle_sequence: "yrororoyoy",
    },
    {
      name: "C7",
      trial_track: true,
      draw_array: [
        { skill: skills[0], width: 13 },
        { skill: skills[2], width: 15 },
        { skill: skills[0], width: 5 },
        { skill: skills[2], width: 15 },
        { skill: skills[0], width: 5 },
        { skill: skills[4], width: 6 },
        { skill: skills[2], width: 8 },
        { skill: skills[0], width: 10 },
        { skill: skills[5], width: 20 },
        { skill: skills[0], width: 3 },
      ],
      obstacle_sequence: "yoyoyroypy",
    },

    {
      name: "C8",
      trial_track: true,
      draw_array: [
        { skill: skills[0], width: 3 },
        { skill: skills[4], width: 13 },
        { skill: skills[3], width: 10 },
        { skill: skills[4], width: 10 },
        { skill: skills[3], width: 10 },
        { skill: skills[4], width: 10 },
        { skill: skills[2], width: 20 },
        { skill: skills[3], width: 18 },
        { skill: skills[0], width: 15 },
      ],
      obstacle_sequence: "yrgrgrogy",
    },
    // 0-Yellow
    // 1-Blue
    // 2-Orange
    // 3-Green
    // 4-Red
    // 5-Purple
    // 6-None
    {
      name: "C9",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
      obstacle_sequence: "zzzzz",
    },
    {
      name: "C10",
      trial_track: true,
      draw_array: [
        { skill: skills[0], width: 6 },
        { skill: skills[4], width: 10 },
        { skill: skills[0], width: 5 },
        { skill: skills[5], width: 18 },
        { skill: skills[0], width: 5 },
        { skill: skills[4], width: 14 },
        { skill: skills[0], width: 5 },
        { skill: skills[5], width: 18 },
        { skill: skills[0], width: 12 },
      ],

      obstacle_sequence: "yrypyrypy",
    },
    {
      name: "C11",
      trial_track: true,
      draw_array: [
        { skill: skills[0], width: 13 },
        { skill: skills[2], width: 10 },
        { skill: skills[1], width: 15 },
        { skill: skills[3], width: 10 },
        { skill: skills[0], width: 10 },
        { skill: skills[1], width: 15 },
        { skill: skills[2], width: 10 },
        { skill: skills[3], width: 10 },
        { skill: skills[0], width: 3 },
      ],
      obstacle_sequence: "yobgybogy",
    },

    {
      name: "C12",
      trial_track: true,
      draw_array: [
        { skill: skills[0], width: 18 },
        { skill: skills[2], width: 10 },
        { skill: skills[4], width: 12 },
        { skill: skills[1], width: 15 },
        { skill: skills[0], width: 5 },
        { skill: skills[4], width: 15 },
        { skill: skills[1], width: 15 },
        { skill: skills[2], width: 15 },
        { skill: skills[0], width: 3 },
      ],
      obstacle_sequence: "yorbyrboy",
    },

    {
      name: "C13",
      trial_track: true,
      draw_array: [
        { skill: skills[0], width: 3 },
        { skill: skills[3], width: 10 },
        { skill: skills[4], width: 20 },
        { skill: skills[0], width: 15 },
        { skill: skills[3], width: 10 },
        { skill: skills[1], width: 17 },
        { skill: skills[4], width: 15 },
        { skill: skills[1], width: 15 },
        { skill: skills[0], width: 7 },
      ],
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
      draw_array: [
        { skill: skills[0], width: 3 },
        { skill: skills[4], width: 16 },
        { skill: skills[1], width: 8 },
        { skill: skills[2], width: 13 },
        { skill: skills[3], width: 8 },
        { skill: skills[4], width: 16 },
        { skill: skills[2], width: 8 },
        { skill: skills[1], width: 20 },
        { skill: skills[3], width: 8 },
        { skill: skills[0], width: 3 },
      ],

      obstacle_sequence: "yrbogrobgy",
    },
    {
      name: "C16",
      trial_track: true,
      draw_array: [
        { skill: skills[0], width: 3 },
        { skill: skills[5], width: 10 },
        { skill: skills[0], width: 5 },
        { skill: skills[2], width: 13 },
        { skill: skills[1], width: 15 },
        { skill: skills[5], width: 15 },
        { skill: skills[2], width: 10 },
        { skill: skills[1], width: 15 },
        { skill: skills[0], width: 17 },
      ],

      obstacle_sequence: "ypyobpoby",
    },
    {
      name: "C17",
      trial_track: true,
      draw_array: [
        { skill: skills[0], width: 3 },
        { skill: skills[1], width: 15 },
        { skill: skills[0], width: 10 },
        { skill: skills[3], width: 15 },
        { skill: skills[5], width: 10 },
        { skill: skills[1], width: 10 },
        { skill: skills[3], width: 10 },
        { skill: skills[5], width: 10 },
        { skill: skills[0], width: 12 },
      ],

      obstacle_sequence: "ybygpbgpy",
    },
    {
      name: "C18",
      trial_track: true,
      draw_array: [
        { skill: skills[0], width: 13 },
        { skill: skills[2], width: 10 },
        { skill: skills[0], width: 10 },
        { skill: skills[3], width: 17 },
        { skill: skills[0], width: 10 },
        { skill: skills[5], width: 10 },
        { skill: skills[2], width: 10 },
        { skill: skills[3], width: 10 },
        { skill: skills[5], width: 16 },
        { skill: skills[0], width: 3 },
      ],

      obstacle_sequence: "yoygypogpy",
    },
    {
      name: "C19",
      trial_track: true,
      draw_array: [
        { skill: skills[0], width: 3 },
        { skill: skills[3], width: 17 },
        { skill: skills[5], width: 10 },
        { skill: skills[2], width: 15 },
        { skill: skills[1], width: 15 },
        { skill: skills[3], width: 5 },
        { skill: skills[2], width: 10 },
        { skill: skills[1], width: 15 },
        { skill: skills[5], width: 10 },
        { skill: skills[0], width: 3 },
      ],
      obstacle_sequence: "ygpobgobpy",
    },
    {
      name: "C20",
      trial_track: true,
      draw_array: [
        { skill: skills[0], width: 3 },
        { skill: skills[1], width: 16 },
        { skill: skills[4], width: 11 },
        { skill: skills[0], width: 15 },
        { skill: skills[5], width: 15 },
        { skill: skills[1], width: 11 },
        { skill: skills[0], width: 5 },
        { skill: skills[5], width: 15 },
        { skill: skills[4], width: 20 },
        { skill: skills[0], width: 3 },
      ],
      obstacle_sequence: "ybrypbypry",
    },
    {
      name: "C21",
      trial_track: true,
      draw_array: [
        { skill: skills[0], width: 13 },
        { skill: skills[4], width: 13 },
        { skill: skills[5], width: 5 },
        { skill: skills[2], width: 8 },
        { skill: skills[0], width: 15 },
        { skill: skills[2], width: 10 },
        { skill: skills[4], width: 15 },
        { skill: skills[5], width: 28 },
        { skill: skills[0], width: 3 },
      ],
      obstacle_sequence: "yrpoyorpy",
    },
    {
      name: "C22",
      trial_track: true,
      draw_array: [
        { skill: skills[0], width: 3 },
        { skill: skills[1], width: 15 },
        { skill: skills[4], width: 18 },
        { skill: skills[5], width: 5 },
        { skill: skills[2], width: 10 },
        { skill: skills[1], width: 15 },
        { skill: skills[5], width: 20 },
        { skill: skills[4], width: 15 },
        { skill: skills[2], width: 8 },
        { skill: skills[0], width: 3 },
      ],
      obstacle_sequence: "ybrpobproy",
    },
    {
      name: "C23",
      trial_track: true,
      draw_array: [
        { skill: skills[0], width: 3 },
        { skill: skills[3], width: 16 },
        { skill: skills[0], width: 10 },
        { skill: skills[3], width: 10 },
        { skill: skills[4], width: 16 },
        { skill: skills[5], width: 6 },
        { skill: skills[0], width: 6 },
        { skill: skills[4], width: 7 },
        { skill: skills[0], width: 16 },
        { skill: skills[5], width: 25 },
        { skill: skills[3], width: 5 },
        { skill: skills[0], width: 3 },
      ],
      obstacle_sequence: "ygygrpyrypgy",
    },
    {
      name: "C24",
      trial_track: true,
      draw_array: [
        { skill: skills[0], width: 3 },
        { skill: skills[1], width: 11 },
        { skill: skills[4], width: 12 },
        { skill: skills[3], width: 11 },
        { skill: skills[5], width: 11 },
        { skill: skills[4], width: 17 },
        { skill: skills[3], width: 11 },
        { skill: skills[1], width: 17 },
        { skill: skills[5], width: 20 },
        { skill: skills[0], width: 3 },
      ],
      obstacle_sequence: "ybrgprgbpy",
    },
    {
      name: "C25",
      trial_track: true,
      draw_array: [
        { skill: skills[0], width: 3 },
        { skill: skills[2], width: 15 },
        { skill: skills[4], width: 13 },
        { skill: skills[5], width: 11 },
        { skill: skills[3], width: 15 },
        { skill: skills[4], width: 15 },
        { skill: skills[5], width: 15 },
        { skill: skills[2], width: 9 },
        { skill: skills[3], width: 6 },
        { skill: skills[2], width: 9 },
        { skill: skills[0], width: 3 },
      ],
      obstacle_sequence: "yorpgrpogoy",
    },
    {
      name: "D1",
      trial_track: true,
      draw_array: [
        { skill: skills[0], width: 10 },
        { skill: skills[1], width: 16 },
        { skill: skills[4], width: 6 },
        { skill: skills[1], width: 50 },
        { skill: skills[3], width: 14 },
        { skill: skills[0], width: 3 },
      ],
      obstacle_sequence: "ybrbgy",
    },
    {
      name: "D2",
      trial_track: true,
      draw_array: [
        { skill: skills[0], width: 3 },
        { skill: skills[5], width: 11 },
        { skill: skills[4], width: 17 },
        { skill: skills[3], width: 11 },
        { skill: skills[5], width: 7 },
        { skill: skills[3], width: 11 },
        { skill: skills[4], width: 25 },
        { skill: skills[3], width: 11 },
        { skill: skills[5], width: 17 },
        { skill: skills[0], width: 3 },
      ],
      obstacle_sequence: "yprgpgrgpy",
    },
    {
      name: "D3",
      trial_track: true,
      draw_array: [
        { skill: skills[0], width: 3 },
        { skill: skills[5], width: 5 },
        { skill: skills[4], width: 12 },
        { skill: skills[0], width: 10 },
        { skill: skills[2], width: 9 },
        { skill: skills[4], width: 17 },
        { skill: skills[2], width: 9 },
        { skill: skills[4], width: 27 },
        { skill: skills[5], width: 27 },
        { skill: skills[0], width: 3 },
      ],
      obstacle_sequence: "ypryororpy",
    },
    {
      name: "D4",
      trial_track: true,
      draw_array: [
        { skill: skills[0], width: 3 },
        { skill: skills[3], width: 16 },
        { skill: skills[0], width: 21 },
        { skill: skills[2], width: 10 },
        { skill: skills[0], width: 10 },
        { skill: skills[2], width: 10 },
        { skill: skills[0], width: 10 },
        { skill: skills[2], width: 10 },
        { skill: skills[0], width: 24 },
      ],
      obstacle_sequence: "ygyoyoyoy",
    },
    // 0-Yellow
    // 1-Blue
    // 2-Orange
    // 3-Green
    // 4-Red
    // 5-Purple
    // 6-None
    {
      name: "D5",
      trial_track: true,
      draw_array: [
        { skill: skills[0], width: 3 },
        { skill: skills[3], width: 10 },
        { skill: skills[4], width: 12 },
        { skill: skills[3], width: 10 },
        { skill: skills[1], width: 20 },
        { skill: skills[2], width: 8 },
        { skill: skills[0], width: 10 },
        { skill: skills[5], width: 19 },
        { skill: skills[3], width: 19 },
        { skill: skills[0], width: 3 },
      ],
      obstacle_sequence: "ygrgboypgy",
    },
    {
      name: "D6",
      trial_track: true,
      draw_array: [
        { skill: skills[0], width: 3 },
        { skill: skills[1], width: 18 },
        { skill: skills[0], width: 10 },
        { skill: skills[3], width: 13 },
        { skill: skills[4], width: 10 },
        { skill: skills[5], width: 13 },
        { skill: skills[2], width: 13 },
        { skill: skills[1], width: 18 },
        { skill: skills[0], width: 3 },
      ],
      obstacle_sequence: "ybygrpoby",
    },
    {
      name: "D7",
      trial_track: true,
      draw_array: [
        { skill: skills[0], width: 3 },
        { skill: skills[4], width: 6 },
        { skill: skills[2], width: 9 },
        { skill: skills[4], width: 15 },
        { skill: skills[2], width: 9 },
        { skill: skills[4], width: 6 },
        { skill: skills[5], width: 35 },
        { skill: skills[1], width: 18 },
        { skill: skills[0], width: 3 },
      ],
      obstacle_sequence: "yrororpby",
    },
    {
      name: "D8",
      trial_track: true,
      draw_array: [
        { skill: skills[0], width: 12 },
        { skill: skills[5], width: 14 },
        { skill: skills[0], width: 10 },
        { skill: skills[3], width: 27 },
        { skill: skills[0], width: 10 },
        { skill: skills[4], width: 19 },
        { skill: skills[0], width: 12 },
      ],
      obstacle_sequence: "ypygyry",
    },
    // 0-Yellow
    // 1-Blue
    // 2-Orange
    // 3-Green
    // 4-Red
    // 5-Purple
    // 6-None
    {
      name: "D9",
      trial_track: true,
      draw_array: [{ skill: skills[0], width: 100 }],
      obstacle_sequence: "zzzzz",
    },
    // 0-Yellow
    // 1-Blue
    // 2-Orange
    // 3-Green
    // 4-Red
    // 5-Purple
    // 6-None
    {
      name: "D10",
      trial_track: true,
      draw_array: [
        { skill: skills[0], width: 3 },
        { skill: skills[3], width: 15 },
        { skill: skills[4], width: 13 },
        { skill: skills[5], width: 39 },
        { skill: skills[3], width: 12 },
        { skill: skills[2], width: 29 },
        { skill: skills[0], width: 3 },
      ],
      obstacle_sequence: "ygrpgoy",
    },
    {
      name: "CLIMBING",
      trial_track: true,
      draw_array: [
        { skill: skills[0], width: 3 },
        { skill: skills[4], width: 15 },
        { skill: skills[2], width: 8 },
        { skill: skills[1], width: 15 },
        { skill: skills[4], width: 12 },
        { skill: skills[5], width: 14 },
        { skill: skills[2], width: 15 },
        { skill: skills[4], width: 6 },
        { skill: skills[2], width: 15 },
        { skill: skills[0], width: 3 },
      ],
      obstacle_sequence: "yrobrporoy",
    },

    {
      name: "DIVING",
      trial_track: true,
      draw_array: [
        { skill: skills[0], width: 3 },
        { skill: skills[1], width: 25 },
        { skill: skills[4], width: 7 },
        { skill: skills[3], width: 10 },
        { skill: skills[1], width: 23 },
        { skill: skills[4], width: 7 },
        { skill: skills[3], width: 10 },
        { skill: skills[1], width: 23 },
        { skill: skills[0], width: 3 },
      ],
      obstacle_sequence: "ybrgbrgby",
    },
    {
      name: "RUGBY",
      trial_track: true,
      draw_array: [
        { skill: skills[0], width: 7 },
        { skill: skills[4], width: 21 },
        { skill: skills[0], width: 10 },
        { skill: skills[4], width: 21 },
        { skill: skills[0], width: 10 },
        { skill: skills[4], width: 21 },
        { skill: skills[0], width: 5 },
        { skill: skills[2], width: 5 },
        { skill: skills[0], width: 7 },
      ],
      obstacle_sequence: "yryryryoy",
    },
    {
      name: "TRIATHLON",
      trial_track: true,
      draw_array: [
        { skill: skills[0], width: 3 },
        { skill: skills[1], width: 13 },
        { skill: skills[4], width: 10 },
        { skill: skills[1], width: 13 },
        { skill: skills[4], width: 10 },
        { skill: skills[5], width: 29 },
        { skill: skills[0], width: 24 },
      ],
      obstacle_sequence: "ybrbrpy",
    },
  ];

  return trackData;
};

module.exports = {
  populateTrackData,
};
