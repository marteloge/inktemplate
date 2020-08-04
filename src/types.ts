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
  print_width: string;
  print_height: string;
  height: number;
  width: number;
  twosided: boolean;
  paper_size: string;
};

export type Content = {
  name: string;
  font: string;
  font_size: number;
  font_src: string;
  color: string;
};

export type Draft = {
  id: 1;
  uuid: string;
  product_id?: number;
  background_image?: string;
  background_color?: string;
  email?: string;
  text: string;
  paid: boolean;
  content: Array<Content>;
  product: Product;
};
