export type TextDesign = {
  font: string;
  color: string;
  text: string;
  colorPickerOpen: boolean;
  fontSize: number;
  fontSrc: string;
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

export type PDFProps = {
  text: Array<string>;
  width: number;
  height: number;
  backgroundImage?: string;
  backgroundColor?: string;
  nameText: Text;
  subText: Text;
};

export type Product = {
  name: string;
  height: number;
  width: number;
};

export type Papersize = "A4" | "A5";
export type Orientation = "landscape" | "portrait";

export type Print = {
  printWidth: string;
  printHeight: string;
  twosided: boolean;
  paperSize: Papersize;
  orientation: Orientation;
  printPerPage: number;
};

export type Content = {
  order?: number;
  name: string;
  font: string;
  fontSize: number;
  fontSrc: string;
  color: string;
  text: string;
  colorPickerOpen: boolean;
};

export type Draft = {
  uuid: string;
  useDesign: boolean;
  backgroundImage?: number;
  backgroundColor?: {
    colorPickerOpen: boolean;
    color: string;
  };
  email?: string;
  text: string;
  content: Array<Content>;
  product: Product;
  print: Print;
  sentReceipt?: boolean;
  language?: string;
  paid: boolean;
  premium?: boolean;
  created?: Date;
  updated?: Date;
  opacity?: number;
};

export type Curated = {
  image: number;
  content: Array<{ font: number; color: string }>;
};
