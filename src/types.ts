export type TextDesign = {
  font: string;
  color: string;
  text: string;
  colorPickerOpen: boolean;
  fontSize: number;
};

export type ColorPickerDesign = {
  color: string;
  colorPickerOpen: boolean;
};

export type Text = {
  font: string;
  fontSize: number;
  color: string;
  fontSrc: string;
};

export type StyleProps = {
  cardWidth: number;
  cardHeight: number;
};

export type PDFProps = {
  text: Array<string>;
  width: number;
  height: number;
  backgroundImage?: string;
  backgroundColor?: string;
  nameText: Text;
  subText: Text;
};
