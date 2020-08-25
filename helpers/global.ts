import { CSSProperties } from "react";
const createUuid = require("uuid");

export const calculateResponsiveSize = (min: number, max: number) =>
  `calc(${min}px + (${max} - ${min}) * ((100vw - 300px) / (1600 - 300)))`;

export const updateContent = (handler, contents, content, index) => {
  return handler(contents.map((c, i) => (i !== index ? c : content)));
};

export const newUUID = () => createUuid.v4();

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

export const cardDesigns = [
  "template1",
  "template2",
  "template3",
  "template4",
  "template5",
  "template6",
  "template7",
  "template8",
  "template9",
  "template10",
  "template11",
];

export const imageRoute = "/static/templates/";

export const updateField = (state, handler, field, value) =>
  handler({ ...state, [field]: value });

export const update = (handler, nextState) => handler(nextState);

export const toTextArray = (text: string): Array<string> => {
  if (text.slice(-1) === ";") {
    return text.slice(0, text.length - 1).split(";");
  }
  return text.split(";");
};

type StylesDictionary = {
  [Key: string]: CSSProperties;
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
