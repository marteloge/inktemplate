import { CSSProperties } from "react";
import { curatedDesigns } from "./products";
import { Draft, Curated } from "./types";
const createUuid = require("uuid");

export const calculateResponsiveSize = (min: number, max: number) =>
  `calc(${min}px + (${max} - ${min}) * ((100vw - 300px) / (1600 - 300)))`;

export const updateContent = (handler, contents, content, index) => {
  return handler(contents.map((c, i) => (i !== index ? c : content)));
};

export const numDesigns = 143;

// prettier-ignore
export const filters = {
  celebration: [4,5,17,19,20,21,68,69,74,75,76,77,83,84,85,86,87,88,89,90,91,92,93,94,95,96,120,115,133,134,135,136,137,139,140,141,142,143],
  abstract: [3,7,8,13,14,15,16,44,45,63,64,65,66,67,70,71,72,78,79,81,116,117,118,119,132],
  nature: [1,2,9,10,11,12,13,15,18,28,29,30,31,43,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,67,80,82,122,124,125,130,129,128,127,126],
  baby: [97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115],
  popular: [4,5,11,22,28,31,37,38,53,62],
  borders: [26,25,24,23,22,42,41,40,39,38,37,36,35,34,33,32],
  all: Array.from(Array(numDesigns), (_, i) => i + 1),
};

export const imageRoute = "/static/templates";

export const newUUID = () => createUuid.v4();

export const randomColor = () =>
  "#" + ((Math.random() * 0xffffff) << 0).toString(16);

export const fonts = [
  {
    value: "dawningofanewday",
    label: "Dawning of a New Day",
    src: "dawning-of-a-new-day-v11-latin-regular",
  },
  {
    value: "raleway",
    label: "Raleway",
    src: "raleway-v17-latin-regular",
  },
  {
    value: "playfairdisplay",
    label: "Playfair Display",
    src: "playfair-display-v21-latin-regular",
  },
  {
    value: "quicksand",
    label: "Quicksand",
    src: "quicksand-v21-latin-regular",
  },
  {
    value: "anton",
    label: "Anton",
    src: "anton-v11-latin-regular",
  },
  {
    value: "dancingscript",
    label: "Dancing Script",
    src: "dancing-script-v15-latin-regular",
  },
  {
    value: "lobster",
    label: "Lobster",
    src: "lobster-v22-latin-regular",
  },

  {
    value: "indieflower",
    label: "Indie Flower",
    src: "indie-flower-v11-latin-regular",
  },
  {
    value: "pacifico",
    label: "Pacifico",
    src: "pacifico-v16-latin-regular",
  },
  {
    value: "shadowsintolight",
    label: "Shadows Into Light",
    src: "shadows-into-light-v9-latin-regular",
  },
  {
    value: "amaticsc",
    label: "Amatic SC",
    src: "amatic-sc-v13-latin-regular",
  },
  {
    value: "satisfy",
    label: "Satisfy",
    src: "satisfy-v10-latin-regular",
  },
  {
    value: "courgette",
    label: "Courgette",
    src: "courgette-v7-latin-regular",
  },
  {
    value: "greatvibes",
    label: "Great Vibes",
    src: "great-vibes-v7-latin-regular",
  },
  {
    value: "sacramento",
    label: "Sacramento",
    src: "sacramento-v7-latin-regular",
  },
  {
    value: "prata",
    label: "Prata",
    src: "prata-v11-latin-regular",
  },
  {
    value: "poiretone",
    label: "Poiret One",
    src: "poiret-one-v8-latin-regular",
  },
  {
    value: "arapey",
    label: "Arapey",
    src: "arapey-v8-latin-regular",
  },
  {
    value: "marckscript",
    label: "Marck Script",
    src: "marck-script-v10-latin-regular",
  },
  {
    value: "handlee",
    label: "Handlee",
    src: "handlee-v8-latin-regular",
  },
  {
    value: "openSans",
    label: "Open Sans",
    src: "open-sans-v17-latin-regular",
  },
  {
    value: "opensanscondensed",
    label: "Open Sans Condensed",
    src: "open-sans-condensed-v14-latin-300",
  },

  {
    value: "lora",
    label: "Lora",
    src: "lora-v16-latin-regular",
  },
  {
    value: "chewy",
    label: "Chewy",
    src: "chewy-v11-latin-regular",
  },
  {
    value: "annieuseyourtelescope",
    label: "Annie Use Your Telescope",
    src: "annie-use-your-telescope-v10-latin-regular",
  },
  {
    value: "rocksalt",
    label: "Rock Salt",
    src: "rock-salt-v10-latin-regular",
  },
  {
    value: "homemadeapple",
    label: "Homemade Apple",
    src: "homemade-apple-v10-latin-regular",
  },
  {
    value: "cedarvillecursive",
    label: "Cedarville Cursive",
    src: "cedarville-cursive-v11-latin-regular",
  },
  {
    value: "almendradisplay",
    label: "Almendra Display",
    src: "almendra-display-v11-latin-regular",
  },
  {
    value: "bellota",
    label: "Bellota",
    src: "bellota-v2-latin-regular",
  },
  {
    value: "barriecito",
    label: "Barriecito",
    src: "barriecito-v3-latin-regular",
  },
  {
    value: "mashanzheng",
    label: "Ma Shan Zheng",
    src: "ma-shan-zheng-v5-latin-regular",
  },
  {
    value: "bungeehairline",
    label: "Bungee Hairline",
    src: "bungee-hairline-v6-latin-regular",
  },
  {
    value: "katibeh",
    label: "Katibeh",
    src: "katibeh-v7-latin-regular",
  },
  {
    value: "spacemono",
    label: "Space Mono",
    src: "space-mono-v5-latin-regular",
  },
  {
    value: "ranga",
    label: "Ranga",
    src: "ranga-v6-latin-regular",
  },
  {
    value: "snowburstone",
    label: "Snowburst One",
    src: "snowburst-one-v8-latin-regular",
  },
  {
    value: "clickerscript",
    label: "Clicker Script",
    src: "clicker-script-v8-latin-regular",
  },
  {
    value: "molle",
    label: "Molle",
    src: "molle-v9-latin-italic",
  },
  {
    value: "petitformalscript",
    label: "Petit Formal Script",
    src: "petit-formal-script-v8-latin-regular",
  },
];

// Italianno
// Dosis
// Alex Brush
// Bilbo
// League Script

export const updateField = (state, handler, field, value) =>
  handler({ ...state, [field]: value });

export const update = (handler, nextState) => handler(nextState);

type StylesDictionary = {
  [Key: string]: CSSProperties;
};

export const getCuratedDesign = (draft: Draft) => {
  const selected: Curated =
    curatedDesigns[Math.floor(Math.random() * curatedDesigns.length)];

  return {
    ...draft,
    backgroundImage: selected.image,
    content: selected.content.map((c, i) => ({
      ...draft.content[i],
      font: fonts[c.font].label,
      fontSrc: fonts[c.font].src,
      color: c.color,
    })),
  };
};

export const colorPickerStyles = (color: string): StylesDictionary => {
  return {
    color: {
      width: "36px",
      height: "36px",
      borderRadius: "36px",
      background: `${color}`,
      cursor: "pointer",
    },
    swatch: {
      padding: "5px",
      background: "#fff",
      borderRadius: "1px",
      boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
      display: "inline-block",
      cursor: "pointer",
    },
    popover: {
      position: "absolute",
      marginLeft: "36px",
      zIndex: 2,
    },
    cover: {
      position: "relative",
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px",
    },
  };
};
