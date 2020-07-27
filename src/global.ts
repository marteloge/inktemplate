import { CSSProperties } from "react";

export const calculateResponsiveSize = (min: number, max: number) =>
  `calc(${min}px + (${max} - ${min}) * ((100vw - 300px) / (1600 - 300)))`;

export const fonts = [
  { value: "dawningofanewday", label: "Dawning of a New Day" },
  { value: "raleway", label: "Raleway" },
  { value: "playfairdisplay", label: "Playfair Display" },
  { value: "comicsansms", label: "Comic Sans MS" },
  { value: "impact", label: "Impact" },
  { value: "arial", label: "Arial" },
  { value: "trebuchetms", label: "Trebuchet MS" },
];

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

export const updateField = (state, handler, field, value) =>
  handler({ ...state, [field]: value });

export const update = (handler, nextState) => handler(nextState);

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
