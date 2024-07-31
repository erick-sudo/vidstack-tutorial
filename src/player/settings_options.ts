export interface MenuOption {
  title: String;
  submenu?: MenuOption[];
}

export const settings_options: MenuOption[] = [
  {
    title: "Quality",
    submenu: [
      {
        title: "Auto",
      },
      {
        title: "1080p",
      },
      {
        title: "720p",
      },
      {
        title: "480p",
      },
      {
        title: "360p",
      },
    ],
  },
  {
    title: "Speed",
    submenu: [
      {
        title: "0.5x",
      },
      {
        title: "1x",
      },
      {
        title: "1.5x",
      },
      {
        title: "2x",
      },
    ],
  },
  {
    title: "Subtitles",
    submenu: [
      {
        title: "Off",
      },
      {
        title: "English",
      },
      {
        title: "Spanish",
      },
      {
        title: "French",
      },
      {
        title: "German",
      },
    ],
  },
  {
    title: "Audio",
    submenu: [
      {
        title: "Default",
      },
      {
        title: "English",
      },
      {
        title: "Spanish",
      },
      {
        title: "French",
      },
    ],
  },
  {
    title: "Preferences",
    submenu: [
      {
        title: "Playback",
        submenu: [
          {
            title: "Auto-play",
          },
          {
            title: "Loop",
          },
        ],
      },
      {
        title: "Display",
        submenu: [
          {
            title: "Dark Mode",
          },
          {
            title: "Light Mode",
          },
        ],
      },
    ],
  },
];
