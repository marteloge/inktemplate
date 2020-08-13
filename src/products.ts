import { i18n } from "./../i18n";
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

export const newDraft = (product, uuid): Draft => {
  return {
    uuid,
    useDesign: true,
    backgroundImage: "template4",
    backgroundColor: {
      color: "#FF8A65",
      colorPickerOpen: false,
    },
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
    paper_size: "A4",
    product: PRODUCTS[product],
    rotation: "landscape",
  };
};
