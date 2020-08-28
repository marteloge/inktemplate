import { i18n } from "./i18n";
import { Draft } from "./types";

export const PRODUCTS = {
  PLACECARD: {
    name: "PLACECARD",
    printWidth: 8.05,
    printHeight: 5.15,
    width: 400,
    height: 256,
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
    twosided: true,
    paperSize: "A4",
    product: PRODUCTS[product],
    rotation: "landscape",
    language: i18n.language,
    premium: true,
    paid: false,
    created: date,
    updated: date,
  };
};
