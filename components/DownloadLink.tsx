import { Draft } from "../helpers/types";
import PDF from "./PDF";
import { PDFDownloadLink } from "@react-pdf/renderer";

const DownloadLink = (draft: Draft) => (
  <PDFDownloadLink document={<PDF {...draft} />} fileName="Inktemplate.pdf">
    {({ blob, url, loading, error }) =>
      loading ? "Loading document..." : "Download now!"
    }
  </PDFDownloadLink>
);

export default DownloadLink;
