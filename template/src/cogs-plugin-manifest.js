module.exports =
  /**
   * @type {const}
   * @satisfies {import("@clockworkdog/cogs-client").CogsPluginManifest}
   */
  ({
    name: "Custom Media Master",
    description:
      "An example Custom Media Master project that demonstrates how to communicate back and forth with COGS",
    version: "1",
    minCogsVersion: "4.11.0",
    config: [
      {
        name: "Background Color",
        value: {
          default: "#998DF7",
          type: "string",
        },
      },
    ],
    events: {
      fromCogs: [
        {
          name: "Game Finished",
          value: {
            type: "option",
            options: ["Won", "Lost"],
          },
        },
      ],
      toCogs: [
        {
          name: "Go Button Pressed",
        },
      ],
    },
    state: [
      {
        name: "Score",
        value: {
          type: "number",
          integer: true,
          min: 0,
          default: 0,
        },
        writableFromCogs: true,
      },
      {
        name: "Selected Button",
        value: {
          type: "number",
          integer: true,
          min: 1,
          max: 5,
          default: 1,
        },
        writableFromClient: true,
      },
    ],
    media: {
      audio: true,
      video: true,
      images: true,
    },
  });
