import { PDFProps } from "../../types";
import PDF from "./PDF";
import { PDFDownloadLink } from "@react-pdf/renderer";

const Download = (props: PDFProps) => (
  <PDFDownloadLink document={<PDF {...props} />} fileName="preview.pdf">
    {({ blob, url, loading, error }) =>
      loading ? "Loading document..." : "Download now!"
    }
  </PDFDownloadLink>
);

export default Download;