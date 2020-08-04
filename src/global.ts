import { CSSProperties } from "react";

export const calculateResponsiveSize = (min: number, max: number) =>
  `calc(${min}px + (${max} - ${min}) * ((100vw - 300px) / (1600 - 300)))`;

export const fonts = [
  {
    value: "dawningofanewday",
    label: "Dawning of a New Day",
    src: "/static/fonts/dawning-of-a-new-day-v11-latin-regular.ttf",
  },
  {
    value: "raleway",
    label: "Raleway",
    src: "/static/fonts/raleway-v17-latin-regular.ttf",
  },
  {
    value: "playfairdisplay",
    label: "Playfair Display",
    src: "/static/fonts/playfair-display-v21-latin-regular.ttf",
  },
  {
    value: "quicksand",
    label: "Quicksand",
    src: "/static/fonts/quicksand-v21-latin-regular.ttf",
  },
  {
    value: "anton",
    label: "Anton",
    src: "/static/fonts/anton-v11-latin-regular.ttf",
  },
  {
    value: "dancingscript",
    label: "Dancing Script",
    src: "/static/fonts/dancing-script-v15-latin-regular.ttf",
  },
  {
    value: "lobster",
    label: "Lobster",
    src: "/static/fonts/lobster-v22-latin-regular.ttf",
  },

  {
    value: "indieflower",
    label: "Indie Flower",
    src: "/static/fonts/indie-flower-v11-latin-regular.ttf",
  },
  {
    value: "pacifico",
    label: "Pacifico",
    src: "/static/fonts/pacifico-v16-latin-regular.ttf",
  },
  {
    value: "shadowsintolight",
    label: "Shadows Into Light",
    src: "/static/fonts/shadows-into-light-v9-latin-regular.ttf",
  },
  {
    value: "amaticsc",
    label: "Amatic SC",
    src: "/static/fonts/amatic-sc-v13-latin-regular.ttf",
  },
  {
    value: "satisfy",
    label: "Satisfy",
    src: "/static/fonts/satisfy-v10-latin-regular.ttf",
  },
  {
    value: "courgette",
    label: "Courgette",
    src: "/static/fonts/courgette-v7-latin-regular.ttf",
  },
  {
    value: "greatvibes",
    label: "Great Vibes",
    src: "/static/fonts/great-vibes-v7-latin-regular.ttf",
  },
  {
    value: "sacramento",
    label: "Sacramento",
    src: "/static/fonts/sacramento-v7-latin-regular.ttf",
  },
  {
    value: "prata",
    label: "Prata",
    src: "/static/fonts/prata-v11-latin-regular.ttf",
  },
  {
    value: "poiretone",
    label: "Poiret One",
    src: "/static/fonts/poiret-one-v8-latin-regular.ttf",
  },
  {
    value: "arapey",
    label: "Arapey",
    src: "/static/fonts/arapey-v8-latin-regular.ttf",
  },
  {
    value: "marckscript",
    label: "Marck Script",
    src: "/static/fonts/marck-script-v10-latin-regular.ttf",
  },
  {
    value: "handlee",
    label: "Handlee",
    src: "/static/fonts/handlee-v8-latin-regular.ttf",
  },
  {
    value: "openSans",
    label: "Open Sans",
    src: "/static/fonts/open-sans-v17-latin-regular.ttf",
  },
  {
    value: "opensanscondensed",
    label: "Open Sans Condensed",
    src: "/static/fonts/open-sans-condensed-v14-latin-300.ttf",
  },

  {
    value: "lora",
    label: "Lora",
    src: "/static/fonts/lora-v16-latin-regular.ttf",
  },
  {
    value: "chewy",
    label: "Chewy",
    src: "/static/fonts/chewy-v11-latin-regular.ttf",
  },
  {
    value: "annieuseyourtelescope",
    label: "Annie Use Your Telescope",
    src: "/static/fonts/annie-use-your-telescope-v10-latin-regular.ttf",
  },
  {
    value: "rocksalt",
    label: "Rock Salt",
    src: "/static/fonts/rock-salt-v10-latin-regular.ttf",
  },
  {
    value: "homemadeapple",
    label: "Homemade Apple",
    src: "/static/fonts/homemade-apple-v10-latin-regular.ttf",
  },
  {
    value: "cedarvillecursive",
    label: "Cedarville Cursive",
    src: "/static/fonts/cedarville-cursive-v11-latin-regular.ttf",
  },
  {
    value: "almendradisplay",
    label: "Almendra Display",
    src: "/static/fonts/almendra-display-v11-latin-regular.ttf",
  },
  {
    value: "bellota",
    label: "Bellota",
    src: "/static/fonts/bellota-v2-latin-regular.ttf",
  },
  {
    value: "barriecito",
    label: "Barriecito",
    src: "/static/fonts/barriecito-v3-latin-regular.ttf",
  },
  {
    value: "mashanzheng",
    label: "Ma Shan Zheng",
    src: "/static/fonts/ma-shan-zheng-v5-latin-regular.ttf",
  },
  {
    value: "bungeehairline",
    label: "Bungee Hairline",
    src: "/static/fonts/bungee-hairline-v6-latin-regular.ttf",
  },
  {
    value: "katibeh",
    label: "Katibeh",
    src: "/static/fonts/katibeh-v7-latin-regular.ttf",
  },
  {
    value: "spacemono",
    label: "Space Mono",
    src: "/static/fonts/space-mono-v5-latin-regular.ttf",
  },
  {
    value: "ranga",
    label: "Ranga",
    src: "/static/fonts/ranga-v6-latin-regular.ttf",
  },
  {
    value: "snowburstone",
    label: "Snowburst One",
    src: "/static/fonts/snowburst-one-v8-latin-regular.ttf",
  },
  {
    value: "clickerscript",
    label: "Clicker Script",
    src: "/static/fonts/clicker-script-v8-latin-regular.ttf",
  },
  {
    value: "molle",
    label: "Molle",
    src: "/static/fonts/molle-v9-latin-italic.ttf",
  },
  {
    value: "petitformalscript",
    label: "Petit Formal Script",
    src: "/static/fonts/petit-formal-script-v8-latin-regular.ttf",
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

export const imageRoute = "/static/images/";

export const updateField = (state, handler, field, value) =>
  handler({ ...state, [field]: value });

export const update = (handler, nextState) => handler(nextState);

type StylesDictionary = {
  [Key: string]: CSSProperties;
};

export const toTextArray = (text: string): Array<string> => {
  if (text.slice(-1) === ";") {
    return text.slice(0, text.length - 1).split(";");
  }
  return text.split(";");
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
