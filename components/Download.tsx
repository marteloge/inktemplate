import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import PDF from "./PDF";

export const downloadPdfDocument = async (draft) => {
  const blob = await pdf(<PDF {...draft} />).toBlob();
  saveAs(blob, "inktemplate");
};
