import { i18n } from "./i18n";
import { Draft, Curated } from "./types";

export const PRODUCTS = {
  PLACECARD: {
    name: "PLACECARD",
    width: 400,
    height: 256,
  },
  NAMETAG: {
    name: "NAMETAG",
    width: 400,
    height: 256,
  },
};

export const PRINT = {
  PLACECARD: {
    printWidth: 8.05,
    printHeight: 5.15,
    twosided: true,
    printPerPage: 6,
    orientation: "landscape",
    paperSize: "A4",
  },
  NAMETAG: {
    printWidth: 8.05,
    printHeight: 5.15,
    twosided: false,
    printPerPage: 12,
    orientation: "landscape",
    paperSize: "A4",
  },
};

type Props = {
  width?: number;
  height?: number;
  useDesign?: boolean;
  selectedDesign?: number;
  backgroundColor?: string;
  scale?: number;
  fonts?: Array<{ src: string; font: string; color: string }>;
  texts?: Array<string>;
};

export const newCanvas = (props: Props) => {
  return {
    width: props.width || 400,
    height: props.width || 256,
    useDesign: props.useDesign || true,
    selectedDesign: props.selectedDesign || 4,
    backgroundColor: props.backgroundColor || "#FF8A65",
    scale: props.scale || 0.5,
    opacity: 1,
    content: [
      {
        order: 1,
        name: "nameText",
        font: (props.fonts && props.fonts[0].font) || "Dawning of a New Day",
        fontSize: 35,
        fontSrc:
          (props.fonts && props.fonts[0].src) ||
          "dawning-of-a-new-day-v11-latin-regular",
        color: (props.fonts && props.fonts[0].color) || "#000000",
        text: (props.texts && props.texts[0]) || i18n.t("product:nameText"),
        colorPickerOpen: false,
      },
      {
        order: 2,
        name: "subText",
        font: (props.fonts && props.fonts[1].font) || "Raleway",
        fontSize: 20,
        fontSrc:
          (props.fonts && props.fonts[1].src) || "raleway-v17-latin-regular",
        color: (props.fonts && props.fonts[1].color) || "#000000",
        text: (props.texts && props.texts[1]) || i18n.t("product:subText"),
        colorPickerOpen: false,
      },
    ],
  };
};

export const newDraft = (product, uuid): Draft => {
  const date = new Date();

  return {
    uuid,
    useDesign: true,
    backgroundImage: 4,
    backgroundColor: {
      color: "#FF8A65",
      colorPickerOpen: false,
    },
    opacity: 1,
    content: [
      {
        order: 1,
        name: "nameText",
        font: "Dawning of a New Day",
        fontSize: 35,
        fontSrc: "dawning-of-a-new-day-v11-latin-regular",
        color: "#000000",
        text: i18n.t("product:nameText"),
        colorPickerOpen: false,
      },
      {
        order: 2,
        name: "subText",
        font: "Raleway",
        fontSize: 20,
        fontSrc: "raleway-v17-latin-regular",
        color: "#000000",
        text: i18n.t("product:subText"),
        colorPickerOpen: false,
      },
    ],
    text: i18n.t("product:defaultText"),
    product: PRODUCTS[product],
    print: PRINT[product],
    language: i18n.language,
    premium: true,
    paid: false,
    created: date,
    updated: date,
  };
};

export const curatedDesigns: Array<Curated> = [
  {
    image: 53,
    content: [
      { font: 0, color: "#0B660D" },
      { font: 1, color: "#83B167" },
    ],
  },
  {
    image: 114,
    content: [
      { font: 14, color: "#750404" },
      { font: 16, color: "#CB6464" },
    ],
  },
  {
    image: 4,
    content: [
      { font: 0, color: "#000000" },
      { font: 1, color: "#000000" },
    ],
  },
  {
    image: 14,
    content: [{ font: 4, color: "#F5D985" }],
  },
  {
    image: 86,
    content: [
      { font: 10, color: "#FBD366" },
      { font: 10, color: "#88BED2" },
    ],
  },
  {
    image: 65,
    content: [{ font: 26, color: "#FFFFFF" }],
  },
  {
    image: 112,
    content: [
      { font: 10, color: "#3F66AF" },
      { font: 1, color: "#54ADDE" },
    ],
  },
  {
    image: 44,
    content: [{ font: 25, color: "#3FABAF" }],
  },
  {
    image: 59,
    content: [{ font: 14, color: "#F0B486" }],
  },
  {
    image: 11,
    content: [{ font: 24, color: "#397B17" }],
  },
  {
    image: 57,
    content: [{ font: 38, color: "#FFFFFF" }],
  },
  {
    image: 128,
    content: [{ font: 39, color: "#95A225" }],
  },
  {
    image: 124,
    content: [{ font: 24, color: "#000000" }],
  },
  {
    image: 60,
    content: [
      { font: 32, color: "#FFFFFF" },
      { font: 1, color: "#257B3F" },
    ],
  },
];
