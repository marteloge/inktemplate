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
  printWidth: string;
  printHeight: string;
  height: number;
  width: number;
};

// export type Languages = "no" | "en";

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

export type Papersize = "A4" | "A5";
export type Rotation = "landscape" | "portrait";

export type Draft = {
  uuid: string;
  useDesign: boolean;
  backgroundImage?: string;
  backgroundColor?: {
    colorPickerOpen: boolean;
    color: string;
  };
  email?: string;
  text: string;
  content: Array<Content>;
  product: Product;
  twosided: boolean;
  paper_size: Papersize;
  rotation: Rotation;
  sentReceipt?: boolean;
  language?: string;
  paid?: boolean;
};
